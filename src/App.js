import "./App.css";
import React, { useState, useEffect } from "react";
import Recipe from "./Recipe";

// remind to keep react hooks not a top level but within a function component

function App() {
  /* My custom keys so remidner to use environment tools */
  const APP_ID = "7e85eb37";
  const APP_KEY = "2d0f4b31031aa9cd87c8a0eaa8fcff16";

  const Request = `https://api.edamam.com/search?q=chicken&app_id=${APP_ID}&app_key=${APP_KEY}`;

  //good practice to use className for good practice

  //use effect function that runs
  //takes arrow functio nas paramter

  //use effect

  //we do not know how long the ifnormation comes back so use await everytime you have a promise . external

  //promise : is .then

  //exampel shown in the video is nicer and simple than the promose did in weather app

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getRecipes();
  }, []);

  const getRecipes = async () => {
    const response = await fetch(Request);

    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  };

  function updateSearch(e) {
    setSearch(e.target.value);
  }

  return (
    <div className="App">
      <form className="search-form">
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
      {recipes.map((recipe) => (
        //now we need to add props
        <Recipe
          key={recipe.recipe.label}
          title={recipe.recipe.label}
          calories={recipe.recipe.calories}
          image={recipe.recipe.image}
        />
      ))}
    </div>
  );
}

export default App;
