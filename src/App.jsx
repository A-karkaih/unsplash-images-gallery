import { useState } from "react";
import axios from "axios";
const App = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      if (e.target.value.trim() === "") return;
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.unsplash.com/search/photos`,
          {
            params: { query: e.target.value, per_page: 10 },
            headers: {
              Authorization: `Client-ID ${import.meta.env.VITE_ACCESS_KEY}`,
            },
          }
        );
        setImages(response.data.results);
        setLoading(false);
        console.log(images);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="w-screen h-screen pt-5">
      <div className="flex w-[300px] h-[40px]  sm:w-[350px]  mx-auto bg-[#2B2A2E] rounded-md">
        <input
          onKeyDown={handleKeyDown}
          className="bg-[#2B2A2E] rounded-tl-md rounded-bl-md w-full pl-3 text-white  focus:outline-none focus:border-t focus:border-b focus:border-l focus:border-blue-500"
          type="text"
          placeholder="Search by topics Ex: Food"
        />
        <div className=" w-[35px] m-1 ml-2">
          <img className="object-fit" src="/search.svg" alt="" />
        </div>
      </div>
      <div className="flex w-[90%] mx-auto items-center  mt-5  flex-col  sm: sm:mt-4 sm:w-[80%] sm:mx-auto  sm:grid  sm:grid-cols-12 gap-4">
        {images.length !== 0 &&
          images.map((image) => (
            <div className="md:col-span-6 lg:col-span-4" key={image.id}>
              <img
                src={image.urls.small}
                alt={image.alt_description}
                className="rounded-md"
              />
            </div>
          ))}
      </div>
      {loading && (
        <div className="w-full text-center mt-7 text-4xl font-bold text-white">
          Loading...
        </div>
      )}
      {images.length === 0 && (
        <div>
          <div className=" flex justify-center sm:mt-5">
            <img src="/alpha_system_360.png" alt="alpha_system_360" />
          </div>
          <div className="text-center text-white mt-2">
            <h1 className="text-sm">
              Image search gallery created By :{" "}
              <a href="https://github.com/A-karkaih" target="_blank">
                <span className="text-green-600 font-bold hover:underline">
                  Achraf Karkaih
                </span>
              </a>
            </h1>
          </div>
        </div>
      )}
      <div className="w-full h-5"></div>
    </div>
  );
};

export default App;
