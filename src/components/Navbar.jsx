import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    navigate(`/search/${searchQuery}`);
  };

  const randomMeal = async () => {
    try {
      const res = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/random.php"
      ); // to fetch random meal
      navigate(`/recipe/${res.data.meals[0].idMeal}`);
    } catch (error) {
      console.error("Error fetching random meal:", error);
    }
  };

  return (
    <div className="bg-black">
      <div className="w-full px-4 sm:px-10 mb-24 lg:mb-0 md:h-40 sm:h-40 lg:h-20">
        <div className="h-full w-full flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-3 md:flex-col md:gap-3 lg:flex-row lg:gap-3">
          <Link to="/" className="text-3xl sm:text-4xl font-bold text-red-500">
            Insta<span className="text-white">Cook</span>
          </Link>
          <a
            className="relative px-5 py-2 overflow-hidden font-medium mt-5 text-white bg-black border border-gray-100 rounded-lg shadow-inner group cursor-pointer"
            onClick={randomMeal}
          >
            <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-gray-600 group-hover:w-full ease"></span>
            <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-gray-600 group-hover:w-full ease"></span>
            <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
            <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
            <span className="absolute inset-0 w-full h-full duration-300 delay-300 bg-red-600 opacity-0 group-hover:opacity-100"></span>
            <span className="relative transition-colors duration-300 delay-200 group-hover:text-white ease">
              Feeling Lucky! Pick a random meal
            </span>
          </a>
          <div className="flex items-center bg-gray-200 p-2 rounded-lg border-red-500 border-2 mt-5 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search for recipes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
              className="bg-gray-200 outline-none  pl-1 pr-2 w-full sm:w-40 lg:w-50"
            />
            <AiOutlineSearch
              onClick={handleSearch}
              className="text-gray-600 cursor-pointer size-5"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-5 mt-5">
        <Link
          to="/areas"
          className="relative inline-flex items-center justify-center px-6 py-2 text-lg font-medium tracking-tighter text-white bg-gray-800 rounded-md group"
        >
          <span className="absolute inset-0 w-full h-full mt-1 ml-1 transition-all duration-300 ease-in-out bg-red-600 rounded-md group-hover:mt-0 group-hover:ml-0"></span>
          <span className="absolute inset-0 w-full h-full bg-white rounded-md "></span>
          <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-in-out delay-100 bg-red-600 rounded-md opacity-0 group-hover:opacity-100 "></span>
          <span className="relative text-red-500 transition-colors duration-200 ease-in-out delay-100 group-hover:text-white">
            Explore by Areas
          </span>
        </Link>
        <Link
          to="/ingredients"
          className="relative inline-flex items-center justify-center px-6 py-2 text-lg font-medium tracking-tighter text-white bg-gray-800 rounded-md group"
        >
          <span className="absolute inset-0 w-full h-full mt-1 ml-1 transition-all duration-300 ease-in-out bg-red-600 rounded-md group-hover:mt-0 group-hover:ml-0"></span>
          <span className="absolute inset-0 w-full h-full bg-white rounded-md "></span>
          <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-in-out delay-100 bg-red-600 rounded-md opacity-0 group-hover:opacity-100 "></span>
          <span className="relative text-red-500 transition-colors duration-200 ease-in-out delay-100 group-hover:text-white">
            Explore by Ingredients
          </span>
        </Link>
        <Link
          to="/categories"
          className="relative inline-flex items-center justify-center px-6 py-2 text-lg font-medium tracking-tighter text-white bg-gray-800 rounded-md group"
        >
          <span className="absolute inset-0 w-full h-full mt-1 ml-1 transition-all duration-300 ease-in-out bg-red-600 rounded-md group-hover:mt-0 group-hover:ml-0"></span>
          <span className="absolute inset-0 w-full h-full bg-white rounded-md "></span>
          <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-in-out delay-100 bg-red-600 rounded-md opacity-0 group-hover:opacity-100 "></span>
          <span className="relative text-red-500 transition-colors duration-200 ease-in-out delay-100 group-hover:text-white">
            Explore by Categories
          </span>
        </Link>

        <Link
          to="/saved"
          className="relative inline-flex items-center justify-center px-6 py-2 text-lg font-medium tracking-tighter text-white bg-gray-800 rounded-md group"
        >
          <span className="absolute inset-0 w-full h-full mt-1 ml-1 transition-all duration-300 ease-in-out bg-red-600 rounded-md group-hover:mt-0 group-hover:ml-0"></span>
          <span className="absolute inset-0 w-full h-full bg-white rounded-md "></span>
          <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-in-out delay-100 bg-red-600 rounded-md opacity-0 group-hover:opacity-100 "></span>
          <span className="relative text-red-500 transition-colors duration-200 ease-in-out delay-100 group-hover:text-white">
            Saved Recipes
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
