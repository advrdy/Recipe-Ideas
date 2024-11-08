import { useEffect, useState } from "react";
import { BiLoader } from "react-icons/bi";
import axios from "axios";
import RecipeCard from "./RecipeCard";

const Areas = () => {
  const URL_AREAS = "https://www.themealdb.com/api/json/v1/1/list.php?a=list";
  const URL_RECIPES_BY_AREA =
    "https://www.themealdb.com/api/json/v1/1/filter.php?a=";

  const [areas, setAreas] = useState([]);
  const [activeArea, setActiveArea] = useState("American");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAreas = async () => {
      setLoading(true);
      try {
        const res = await axios.get(URL_AREAS);
        setAreas(res.data.meals);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchAreas();
  }, []);

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${URL_RECIPES_BY_AREA}${activeArea}`);
        setRecipes(res.data.meals.slice(0, 100));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    activeArea && fetchRecipes();
  }, [activeArea]);

  return (
    <div className="w-full pt-8 text-white bg-black min-h-[100vh] h-[100%]">
      <div className="h-full w-[90%] md:w-[85%] mx-auto">
        <h2 className="text-3xl text-center mb-8 font-bold text-white">
          Select an Area
        </h2>
        <div className="flex flex-wrap gap-3 mb-12 overflow-x-auto">
          {areas?.map((area) => (
            <div
              onClick={() => setActiveArea(area.strArea)}
              className={`px-3 py-1 border border-red-800 rounded-md cursor-pointer ${
                activeArea === area.strArea ? "bg-red-500" : ""
              }`}
              key={area.strArea}
            >
              {area.strArea}
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

export default Areas;
