import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { fetchProducts } from "../store/ProductSlice"

function Home() {
  const dispatch = useDispatch()
  const products = useSelector((state) => state.products.items)
  const status = useSelector((state) => state.products.status)

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts())
    }
  }, [status, dispatch])

  if (status === "loading") {
    return <div className="text-center mt-8">Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Featured Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.slice(0, 8).map((product) => (
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
      <div className="text-center mt-8">
        <Link to="/products" className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700">
          View All Products
        </Link>
      </div>
    </div>
  )
}

export default Home;

