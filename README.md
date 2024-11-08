InstaCook
InstaCook is a React-based recipe finder application that helps users explore meals by categories, areas, ingredients, or search queries. Users can view detailed recipes, browse through random meals, and save their favorite recipes for easy access later. This app is built using the MealDB API to fetch and display a vast variety of meal options, along with ingredient details and instructions.

Table of Contents
Features
Technologies Used
Usage
Future Enhancements

Features
Category, Ingredient, and Area-Based Search: Browse meals by categories, ingredients, or region.
Recipe Search: Search for recipes by keywords.
Random Meal: Feeling lucky? Discover random recipes with a single click.
Recipe Details: Detailed view for each recipe, showing ingredients, instructions, and images.
Saved Recipes: Bookmark your favorite recipes and view them anytime.
Technologies Used
Frontend: React, React Router, Axios, Tailwind CSS
Backend API: TheMealDB API for fetching recipes and meal categories
Usage
Core Components
Navbar:

Provides navigation to different sections like Areas, Ingredients, Categories, and Saved Recipes.
Includes a search bar to find specific recipes and a "Feeling Lucky" button for a random recipe.
Home:

Displays categories for users to explore and a grid of recipes within the selected category.
Categories:

Displays a list of categories and their respective meals.
Allows users to select a category, which triggers a fetch for recipes in that category.
Recipe Details:

Displays detailed information about a selected recipe, including ingredients and measures.
Includes a bookmark feature to save recipes for later access.
Search Results:

Shows the results of the user’s search query.
Saved Recipes:

Displays the user’s saved recipes using cookies to store bookmarked recipe IDs.
Routes
/ - Home page displaying categories.
/areas - Browse recipes by different geographical areas.
/ingredients - Browse recipes by ingredients.
/categories - Browse recipes by different categories.
/recipe/:id - View detailed information about a recipe.
/search/:query - Display search results.
/saved - Display saved recipes.
Future Enhancements
User Authentication: Enable user accounts for personalized recipe storage and recommendations.
Recipe Rating and Comments: Allow users to rate and comment on recipes.
Advanced Filters: Add filters based on dietary restrictions, cooking time, and difficulty level.
