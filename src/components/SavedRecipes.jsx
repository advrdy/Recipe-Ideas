import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const SavedRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  // Function to get bookmarked recipes from cookies
  const getBookmarkedRecipes = () => {
    const bookmarkedRecipes = Cookies.get("bookmarkedRecipes");
    return bookmarkedRecipes ? JSON.parse(bookmarkedRecipes) : [];
  };

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      const bookmarkedRecipes = getBookmarkedRecipes();

      // If there are no saved recipes, return early
      if (bookmarkedRecipes.length === 0) {
        setRecipes([]);
        return;
      }

      try {
        // Fetch details for each bookmarked recipe using the API
        const fetchPromises = bookmarkedRecipes.map((id) =>
          axios.get(
            `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
          )
        );
        const responses = await Promise.all(fetchPromises);

        // Extract the meal data from the responses
        const savedMeals = responses.map((response) => response.data.meals[0]);
        setRecipes(savedMeals);
      } catch (error) {
        console.error("Error fetching saved recipes:", error);
      }
    };

    fetchSavedRecipes();
  }, []);

  const handleRecipeClick = (idMeal) => {
    navigate(`/recipe/${idMeal}`);
  };

  return (
    <div className="bg-black min-h-[100vh]  pt-8 text-white">
      <h1 className="text-3xl text-center mb-10 font-bold">Saved Recipes</h1>
      {recipes.length === 0 ? (
        <p className="text-center">You have no saved recipes.</p>
      ) : (
        <div className="flex flex-wrap justify-center gap-10 mt-5">
          {recipes.map((recipe) => (
            <div
              key={recipe.idMeal}
              className="border p-4 rounded-md shadow-lg cursor-pointer"
              onClick={() => handleRecipeClick(recipe.idMeal)}
            >
              <img
                src={recipe.strMealThumb}
                alt={recipe.strMeal}
                className="w-full h-40 object-cover mb-2 rounded-md transition-transform duration-150 transform hover:scale-150"
              />
              <h2 className="text-xl font-bold">{recipe.strMeal}</h2>
              <p>{recipe.strCategory}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedRecipes;
