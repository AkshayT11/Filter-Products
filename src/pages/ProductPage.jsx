import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { fetchProducts } from "../store/ProductSlice"

function ProductPage() {
  const dispatch = useDispatch()
  const products = useSelector((state) => state.products.items)
  const status = useSelector((state) => state.products.status)
  const [filteredProducts, setFilteredProducts] = useState([])
  const [priceRange, setPriceRange] = useState({ min: 0, max: 2000 })
  const [selectedCategory, setSelectedCategory] = useState("")

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts())
    }
  }, [status, dispatch])

  useEffect(() => {
    let result = products
    if (selectedCategory) {
      result = result.filter((product) => product.category === selectedCategory)
    }
    result = result.filter((product) => product.price >= priceRange.min && product.price <= priceRange.max)
    setFilteredProducts(result)
  }, [products, selectedCategory, priceRange])

  const handlePriceChange = (e) => {
    const { name, value } = e.target
    setPriceRange((prev) => ({ ...prev, [name]: Number(value) }))
  }

  const categories = [...new Set(products.map((product) => product.category))]

  if (status === "loading") {
    return <div className="text-center mt-8">Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/4 pr-4">
          <h2 className="text-xl font-bold mb-4">Filters</h2>
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Price Range</h3>
            <input
              type="range"
              min="0"
              max="2000"
              value={priceRange.max}
              onChange={(e) => setPriceRange((prev) => ({ ...prev, max: Number(e.target.value) }))}
              className="w-full"
            />
            <div className="flex justify-between">
              <span>${priceRange.min}</span>
              <span>${priceRange.max}</span>
            </div>
          </div>
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Categories</h3>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="md:w-3/4">
          <h1 className="text-3xl font-bold mb-6">All Products</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                  src={product.thumbnail || "/placeholder.svg"}
                  alt={product.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
                  <p className="text-gray-600 mb-2">${product.price}</p>
                  <Link
                    to={`/product/${product.id}`}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductPage;

