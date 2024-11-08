/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const RecipeCard = ({ recipe }) => {
  return (
    <div className="flex flex-col items-center h-[250px] sm:h-[300px] text-center">
      <Link
        to={`/recipe/${recipe.idMeal}`}
        className="h-[70%] w-[80%] overflow-hidden transition-transform duration-150 transform hover:scale-150"
      >
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="w-full h-full object-cover rounded-md"
        />
      </Link>
      <h3 className="text-white mt-3 text-lg sm:text-base">{recipe.strMeal}</h3>
    </div>
  );
};

export default RecipeCard;
