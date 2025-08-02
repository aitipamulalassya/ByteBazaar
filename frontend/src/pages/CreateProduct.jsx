import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateProduct = () => {
  const navigate = useNavigate();

  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [productFile, setProductFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile) {1
      alert("Please select an image.");
      return;
    }

    setLoading(true);
    try {
      // Step 1: Upload the image
      const formData = new FormData();
      formData.append("image", imageFile);

      const uploadRes = await axios.post("https://bytebazaar-backend.onrender.com/api/v1/image/upload", formData, {
        headers: { "Content-Type": "multipart/form-data", Authorization: "Bearer " + localStorage.getItem("token") },
      });

      const imageName = uploadRes.data.imageName;
      // Step 2: Upload the file
      const formData2 = new FormData();
      formData2.append("file", productFile);

      const uploadRes2 = await axios.post("https://bytebazaar-backend.onrender.com/api/v1/file/upload", formData2, {
        headers: { "Content-Type": "multipart/form-data", Authorization: "Bearer " + localStorage.getItem("token") },
      });

      const fileName = uploadRes2.data.fileName;

      // Step 3: Create the product using the uploaded image path
      const productData = {
        productName,
        productDescription: description,
        productThumbnail: imageName,
        productFile: fileName,
        price
      };

      await axios.post("https://bytebazaar-backend.onrender.com/api/v1/product/create-product", productData, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      });

      alert("Product created successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.error("Error:", err);
      alert("Failed to create product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white border-4 border-black p-8 rounded-lg shadow-[6px_6px_0px_0px_black] w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-6 text-center tracking-wide text-black select-none">Create New Product</h2>

        <input
          type="text"
          placeholder="Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="w-full mb-4 p-3 border-2 border-black rounded shadow-[4px_4px_0px_0px_black] placeholder-gray-500 text-black font-semibold focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          required
        />

        <textarea
          placeholder="Product Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full mb-4 p-3 border-2 border-black rounded shadow-[4px_4px_0px_0px_black] placeholder-gray-500 resize-none h-28 text-black font-medium focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          required
        ></textarea>

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full mb-5 p-3 border-2 border-black rounded shadow-[4px_4px_0px_0px_black] placeholder-gray-500 text-black font-semibold focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          required
          min="0"
          step="0.01"
        />

        <label className="block mb-1 font-semibold text-black">Product Thumbnail</label>
        <input
          type="file"
          onChange={(e) => setImageFile(e.target.files[0])}
          className="w-full mb-6 p-2 border-2 border-black rounded cursor-pointer file:border-2 file:bg-amber-50 file:rounded file:px-3 file:py-1 file:cursor-pointer shadow-[4px_4px_0px_0px_black] focus:outline-none"
          accept="image/*"
          required
        />

        <label className="block mb-1 font-semibold text-black">Product File</label>
        <input
          type="file"
          onChange={(e) => setProductFile(e.target.files[0])}
          className="w-full mb-8 p-2 border-2 border-black rounded cursor-pointer file:border-2 file:bg-amber-50 file:rounded file:px-3 file:py-1 file:cursor-pointer shadow-[4px_4px_0px_0px_black] focus:outline-none"
          accept="*/*"
          required
        />

        <div className="flex justify-between">
          <button
            type="submit"
            disabled={loading}
            className={`bg-green-400 hover:bg-green-500 text-black font-bold px-6 py-2 rounded border-2 border-black shadow-[4px_4px_0px_0px_black] transition-transform transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {loading ? 'Creating...' : 'Create'}
          </button>

          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="bg-gray-300 hover:bg-gray-400 text-black font-semibold px-6 py-2 rounded border-2 border-black shadow-[4px_4px_0px_0px_black] transition-transform transform hover:scale-110"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
