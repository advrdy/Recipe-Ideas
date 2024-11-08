import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Areas from "./components/Areas";
import Ingredients from "./components/Ingredients";
import RecipeDetails from "./components/RecipeDetails";
import Categories from "./components/Categories";
import SearchResults from "./components/SearchResults";
import SavedRecipes from "./components/SavedRecipes";

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/areas" element={<Areas />} />
          <Route path="/ingredients" element={<Ingredients />} />
          <Route path="/categories" element={<Categories />} />

          <Route path="/recipe/:id" element={<RecipeDetails />} />
          <Route path="/search/:query" element={<SearchResults />} />
          <Route path="/saved" element={<SavedRecipes />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
