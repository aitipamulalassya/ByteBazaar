import { React, useState, useEffect } from "react";
import axios from "axios";

function ProductCard({ productName, productDescription, price, productThumbnail }) {
  return (
    <div className="border-2 border-black shadow-[4px_4px_0px_0px_black] p-4 w-72 rounded-md bg-white hover:shadow-lg transition-shadow duration-300">
      <div className="border-2 border-black shadow-[4px_4px_0px_0px_black] mb-3 h-40 flex items-center justify-center bg-white rounded-md overflow-hidden">
        <img
          src={"uploadedImages/" + productThumbnail}
          alt={productName}
          className="max-h-full max-w-full object-contain"
        />
      </div>
      <h3 className="font-semibold text-lg mb-1 truncate">{productName}</h3>
      <p className="text-md mb-1 font-semibold text-green-700">₹{price}</p>
      <p className="text-sm text-gray-600 mb-4 line-clamp-3">{productDescription}</p>
      <button
        onClick={() => {
          alert(`Buying ${productName} for ₹${price}...`);
          // Add actual buy logic here
        }}
        className="bg-blue-400 text-white px-4 py-2 border-2 border-black shadow-[4px_4px_0px_0px_black] rounded-md cursor-pointer transition-transform transform hover:scale-110 hover:bg-blue-500"
      >
        Buy Now
      </button>
    </div>
  );
}

const Marketplace = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsRes = await axios.get(
          "http://localhost:3000/api/v1/marketplace/bulk",
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        if (productsRes.status === 200) setProducts(productsRes.data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-8 text-center">Marketplace</h1>

      {loading ? (
        <div className="text-center text-gray-600 font-medium">Loading products...</div>
      ) : products.length === 0 ? (
        <div className="text-center text-gray-600 font-medium">No products available.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-center">
          {products.map((product) => (
            <ProductCard key={product._id} {...product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Marketplace;