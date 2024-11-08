import { useEffect, useState } from "react";
import { BiLoader } from "react-icons/bi";
import axios from "axios";
import RecipeCard from "./RecipeCard";

const Categories = () => {
  const URL_CATEGORIES =
    "https://www.themealdb.com/api/json/v1/1/categories.php";
  const URL_RECIPES = "https://www.themealdb.com/api/json/v1/1/filter.php?c=";

  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const res = await axios.get(URL_CATEGORIES); //  to get categories
        setCategories(res.data.categories);
        setActiveCategory(res.data.categories[0].strCategory); // Default active category
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${URL_RECIPES}${activeCategory}`); //  to get recipes by category
        setRecipes(res.data.meals.slice(0, 100)); // Limit to 100 recipes
      } catch (error) {
        console.error("Error fetching recipes:", error);
      } finally {
        setLoading(false);
      }
    };
    if (activeCategory) {
      fetchRecipes();
    }
  }, [activeCategory]);

  return (
    <div className="w-full pt-8 text-white bg-black min-h-[100vh] h-[100%]">
      <div className="h-full w-[90%] md:w-[85%] mx-auto">
        <div className="flex flex-col items-center gap-6 mb-10">
          <h2 className="text-2xl md:text-3xl text-white tracking-wide text-center font-bold">
            Choose a Category for your Meal
          </h2>
        </div>
        <div className="flex flex-wrap gap-3 mb-12 overflow-x-auto">
          {categories?.map((category) => (
            <div
              onClick={() => setActiveCategory(category.strCategory)}
              className={`px-3 py-1 border border-red-800 rounded-md cursor-pointer ${
                activeCategory === category.strCategory ? "bg-red-500" : ""
              }`}
              key={category.idCategory}
            >
              {category.strCategory}
            </div>
          ))}
        </div>
        {loading ? (
          <div className="flex justify-center items-center">
            <BiLoader className="animate-spin h-5 w-5 mr-2" />
            Loading...
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {recipes?.map((recipe) => (
              <RecipeCard key={recipe.idMeal} recipe={recipe} /> //RecipeCard
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;
