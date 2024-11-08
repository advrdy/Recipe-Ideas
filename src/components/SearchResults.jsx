import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const SearchResults = () => {
  const { query } = useParams();
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
        );
        setRecipes(res.data.meals || []); // Set to empty array if no meals found
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, [query]);

  const handleRecipeClick = (idMeal) => {
    navigate(`/recipe/${idMeal}`);
  };

  return (
    <div className="bg-black min-h-[100vh] pt-8 text-white">
      <h1 className="text-3xl text-center mb-10 font-bold">
        {`Search Results for ${query}`}
      </h1>
      {recipes.length > 0 ? (
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
      ) : (
        <div className="text-center mt-20">
          <p className="text-2xl font-semibold">
            {`No results found for ${query}`}
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
