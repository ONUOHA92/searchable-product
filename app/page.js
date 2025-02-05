"use client";
import { useState } from "react";
import { products } from "./data";

export default function ProductTable() {
  const [search, setSearch] = useState("");
  const [filterLocation, setFilterLocation] = useState(false);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const categorizedProducts = filteredProducts.reduce((acc, product) => {
    if (!acc[product.category]) acc[product.category] = [];
    acc[product.category].push(product);
    return acc;
  }, {});

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 text-black">
      <div className="p-8 w-full max-w-2xl bg-white shadow-lg rounded-lg">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 mb-4 border rounded-lg text-lg text-black"
        />
        <label className="flex items-center space-x-2 mb-4 text-black">
          <input
            type="checkbox"
            checked={filterLocation}
            onChange={() => setFilterLocation(!filterLocation)}
          />
          <span>Only show products in your current location</span>
        </label>
        {Object.keys(categorizedProducts).map((category) => (
          <div key={category} className="mb-4 border rounded-lg p-4 text-black">
            <h2 className="text-lg font-semibold mb-2">{category}</h2>
            {categorizedProducts[category].map((product) => (
              <div
                key={product.id}
                className="flex justify-between py-2 border-b"
              >
                <span>{product.name}</span>
                <span>{product.price}</span>
              </div>
            ))}
          </div>
        ))}
        {filteredProducts.length === 0 && (
          <p className="text-center text-gray-500">No products found</p>
        )}
      </div>
    </div>
  );
}
