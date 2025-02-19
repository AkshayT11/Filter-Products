import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/cartSlice";
import { fetchProducts } from "../store/ProductSlice";

function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();

  // Get all products from Redux store
  const products = useSelector((state) => state.products.items);
  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);

  // Find the product by ID
  const product = products.find((item) => item.id === Number(id));

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(product));
    }
  };

  if (status === "loading") {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (status === "failed") {
    return <div className="text-center mt-8 text-red-500">{error}</div>;
  }

  if (!product) {
    return <div className="text-center mt-8 text-gray-500">Product not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center md:flex-row">
        <div className="md:w-1/2">
          <img
            src={product.thumbnail || "/placeholder.svg"}
            alt={product.title}
            className="w-full h-auto object-cover rounded-lg shadow-md"
          />
        </div>
        <div className="md:w-1/2 md:pl-8 mt-4 md:mt-0">
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-2xl font-semibold mb-4">${product.price}</p>
          <p className="mb-4">Rating: {product.rating}/5</p>
          <p className="mb-4">Category: {product.category}</p>
          <p className="mb-4">Brand: {product.brand}</p>
          <button
            onClick={handleAddToCart}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
