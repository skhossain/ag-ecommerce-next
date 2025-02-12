import Image from "next/image";
import axios from "axios";
import CartButton from "./Components/CartButton";

export default async function Home() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const productsResponse = await axios.get(`${apiUrl}/products`);
  const products = productsResponse.data.data;

  const categoriesResponse = await axios.get(`${apiUrl}/categories`);
  const categories = categoriesResponse.data;
  
      let url = apiUrl;
      if (!apiUrl) {
          console.error('NEXT_PUBLIC_API_URL is not defined in .env file');
          return undefined;
      }
      if (apiUrl.includes('/api')) {
        url = apiUrl.replace('/api', ''); // Remove '/api' if it exists
      }
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Featured Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="bg-white text-gray-600 shadow-md rounded-lg overflow-hidden">
              <Image src={`${url}/${product.image_url}`} alt={product.name} width={500} height={500} className="w-full h-64 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{product.name}</h2>
                <p className="text-gray-600 mb-4">{product.price} TK</p>
                <CartButton product={product} />
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-4">No products available</p>
        )}
      </div>

      <h1 className="text-3xl font-bold text-center mb-8">Categories</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {categories.length > 0 ? (
          categories.map((category) => (
            <div key={category.id} className="bg-white text-gray-600 shadow-md rounded-lg overflow-hidden p-4">
              <h2 className="text-xl font-bold mb-2">{category.name}</h2>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded">Shop Now</button>
            </div>
          ))
        ) : (
          <p className="text-center col-span-4">No categories available</p>
        )}
      </div>
    </div>
  );
}
