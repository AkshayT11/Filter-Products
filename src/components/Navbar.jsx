import React, { useState } from "react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa"

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
//   const cartItems = useSelector((state) => state.cart.items)

  return (
    <nav className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold">
              E-Shop
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link to="/" className="hover:bg-gray-700 px-3 py-2 rounded-md">
                Home
              </Link>
              <Link to="/products" className="hover:bg-gray-700 px-3 py-2 rounded-md">
                Products
              </Link>
              <Link to="/cart" className="hover:bg-gray-700 px-3 py-2 rounded-md">
                <FaShoppingCart className="inline mr-1" />
                Cart 
              </Link>
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block hover:bg-gray-700 px-3 py-2 rounded-md" onClick={() => setIsOpen(false)}>
              Home
            </Link>
            <Link
              to="/products"
              className="block hover:bg-gray-700 px-3 py-2 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Products
            </Link>
            <Link to="/cart" className="block hover:bg-gray-700 px-3 py-2 rounded-md" onClick={() => setIsOpen(false)}>
              <FaShoppingCart className="inline mr-1" />
              Cart
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar

