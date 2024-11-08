import { useEffect, useState } from "react";
import { BiLoader } from "react-icons/bi";
import RecipeCard from "./RecipeCard";
import axios from "axios";

const Ingredients = () => {
  const URL_INGREDIENTS =
    "https://www.themealdb.com/api/json/v1/1/list.php?i=list";
  const URL_RECIPES_BY_INGREDIENT =
    "https://www.themealdb.com/api/json/v1/1/filter.php?i=";

  const [ingredients, setIngredients] = useState([]);
  const [activeIngredient, setActiveIngredient] = useState("Chicken");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchIngredients = async () => {
      setLoading(true);
      try {
        const res = await axios.get(URL_INGREDIENTS);
        setIngredients(res.data.meals.slice(0, 30));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchIngredients();
  }, []);

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${URL_RECIPES_BY_INGREDIENT}${activeIngredient}`
        );
        setRecipes(res.data.meals.slice(0, 100));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    if (activeIngredient) {
      fetchRecipes();
    }
  }, [activeIngredient]);

  return (
    <div className="w-full pt-8 text-white bg-black min-h-[100vh] h-[100%]">
      <div className="h-full w-[90%] md:w-[85%] mx-auto">
        <div className="flex flex-col items-center gap-6 mb-10">
          <h1 className="text-3xl text-white tracking-wide text-center font-bold md:text-3xl">
            Choose your Ingredient for the meal
          </h1>
        </div>
        <div className="flex flex-wrap gap-3 mb-12 overflow-x-auto">
          {ingredients?.map((ingredient) => (
            <div
              onClick={() => setActiveIngredient(ingredient.strIngredient)}
              className={`px-3 py-1 border border-red-800 rounded-md cursor-pointer ${
                activeIngredient === ingredient.strIngredient
                  ? "bg-red-500"
                  : ""
              }`}
              key={ingredient.idIngredient}
            >
              {ingredient.strIngredient}
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
              <RecipeCard key={recipe.idMeal} recipe={recipe} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Ingredients;
