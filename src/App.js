import "./App.css";
import React, { useState, useEffect } from "react";
import Recipe from "./Recipe";

const App = () => {
  const APP_ID = process.env.APP_ID;
  const APP_KEYS = process.env.APP_KEYS;

  const [recipes, setRecipe] = useState([]); //holds the array of recipe of search item
  const [search, setSearch] = useState(""); //state for the search
  //another state that submits after we click the button
  const [query, setQuery] = useState("");

  //interpolate the variable id and keys within the request
  const REQUEST = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEYS}`;

  // perform side effects based on the query being changed
  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    // Check if the query search is in the local storage cache first

    const cachedData = localStorage.getItem(query);

    // if cached exist used data from the local storage if not called the API call
    if (cachedData) {
      console.log("using the cached data");
      setRecipe(JSON.parse(cachedData));
    } else {
      console.log("calling API as not cached");
      const response = await fetch(REQUEST);
      const data = await response.json();
      console.log("show raw data");
      console.log(data);
      setRecipe(data.hits);
      localStorage.setItem(query, JSON.stringify(data.hits));
      console.log(data.hits);
    }
  };

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  const submit = (e) => {
    //stop page refresh
    e.preventDefault();
    setQuery(search);
    setSearch(""); //reset the search bar
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
