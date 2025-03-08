import "./App.css";
import React, { useState, useEffect } from "react";
import Recipe from "./Recipe";
import style from "./recipe.module.css";
//require("dotenv").config();

const App = () => {
  const APP_ID = "7e85eb37";
  const APP_KEYS = "2d0f4b31031aa9cd87c8a0eaa8fcff16";

  const [recipes, setRecipe] = useState([]); //holds the array of recipe of search item
  const [search, setSearch] = useState(""); //state for the search
  //another state that submits after we click the button
  const [query, setQuery] = useState("");

  //interpolate the variable id and keys within the request
  const REQUEST = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEYS}`;

  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(REQUEST);
    const data = await response.json();
    setRecipe(data.hits);
    console.log(data.hits);
  };

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  const submit = (e) => {
    //stop page refresh
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };

  return (
    <div className="App">
      <form className="search-form" onSubmit={submit}>
        <input
          className="search-bar"
          type="text"
          value={search}
          onChange={updateSearch}
        ></input>
        <button className="search-button" type="submit">
          search
        </button>
      </form>

      <div className="recipes">
        {recipes.map((recipe) => {
          return (
            <Recipe
              key={recipe.recipe.label}
              title={recipe.recipe.label}
              calories={recipe.recipe.calories}
              image={recipe.recipe.image}
              ingred={recipe.recipe.ingredients}
            />
          );
        })}
      </div>
    </div>
  );
};

export default App;
