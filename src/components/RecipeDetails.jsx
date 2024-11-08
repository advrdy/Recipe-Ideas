import { useEffect, useState } from "react";
import { BiLoader } from "react-icons/bi";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import axios from "axios";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";

const RecipeDetails = () => {
  const [recipe, setRecipe] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false); // State for checking bookmark status
  const URL_DETAILS = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";
  const { id } = useParams();

  // Function to get bookmarked recipes from cookies
  const getBookmarkedRecipes = () => {
    const bookmarkedRecipes = Cookies.get("bookmarkedRecipes");
    return bookmarkedRecipes ? JSON.parse(bookmarkedRecipes) : [];
  };

  // Handle bookmarking functionality
  const handleBookmark = () => {
    let bookmarkedRecipes = getBookmarkedRecipes();

    if (isBookmarked) {
      // Remove from bookmark
      bookmarkedRecipes = bookmarkedRecipes.filter(
        (recipeId) => recipeId !== id
      );
    } else {
      // Add to bookmark
      bookmarkedRecipes.push(id);
    }

    // Update cookie with the new list
    Cookies.set("bookmarkedRecipes", JSON.stringify(bookmarkedRecipes), {
      expires: 365,
    });
    setIsBookmarked(!isBookmarked);
  };

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${URL_DETAILS}${id}`);
        const meal = res.data.meals[0];
        setRecipe(meal);

        const tempIngredients = [];
        const tempMeasures = [];

        for (let i = 1; i <= 20; i++) {
          const ingredient = meal[`strIngredient${i}`];
          const measure = meal[`strMeasure${i}`];
          if (ingredient && ingredient.trim() !== "") {
            tempIngredients.push(ingredient);
            tempMeasures.push(measure ? measure : "");
          }
        }
        setIngredients(tempIngredients);
        setMeasures(tempMeasures);

        // Check if the recipe is bookmarked
        const bookmarkedRecipes = getBookmarkedRecipes();
        setIsBookmarked(bookmarkedRecipes.includes(id));
      } catch (error) {
        console.error("Error fetching recipe details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [id]);

  return (
    <div className="w-full px-4 bg-black min-h-[100vh] pt-8 text-white md:px-8">
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <button type="button" className="inline-flex" disabled>
            <svg className="animate-spin h-5 w-5 mr-3 mt-1">
              <BiLoader />
            </svg>
            Loading...
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center pb-10">
          <h2 className="text-2xl md:text-4xl font-semibold mb-6 md:mb-10">
            Recipe Details
          </h2>

          <div className="w-full flex flex-col md:flex-row justify-center items-center gap-6">
            <img
              src={recipe?.strMealThumb}
              alt={recipe?.strMeal}
              className="object-cover rounded-lg w-72 h-72 md:w-96 md:h-96"
            />
            <div className="flex flex-col items-center md:items-start md:ml-10 text-center md:text-left">
              <div className="flex flex-row items-center text-lg md:text-xl text-white px-4 py-2 bg-red-500 rounded-lg mb-4 md:mb-8 w-max">
                <span>Title: {recipe?.strMeal}</span>
                <button
                  onClick={handleBookmark}
                  className="top-5 right-5 p-2 rounded-full bg-red-500 text-white shadow-lg transition-colors ml-4"
                >
                  {isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
                </button>
              </div>

              <h3 className="text-xl md:text-2xl font-medium text-white mb-4 underline">
                Ingredients and Measures
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-white">
                {ingredients.map((ingredient, i) => (
                  <div key={ingredient} className="text-base">
                    <span className="font-semibold text-red-500">
                      {ingredient}
                    </span>{" "}
                    - <span>{measures[i]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {recipe.strYoutube && (
            <div className="mt-6 md:mt-10 text-center">
              <a
                href={recipe.strYoutube}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline text-lg"
              >
                Watch the Recipe on YouTube
              </a>
            </div>
          )}

          {recipe.strInstructions && (
            <div className="mt-8 md:mt-10 w-full">
              <h3 className="text-xl md:text-2xl font-medium text-red-700 mb-4">
                Cooking Instructions
              </h3>
              <p className="text-sm text-white md:text-base leading-relaxed">
                {recipe.strInstructions}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RecipeDetails;
