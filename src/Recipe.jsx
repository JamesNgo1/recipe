import React from "react";
import style from "./recipe.module.css";

//important reminder : to always have return keyword for function to appear on browser

const Recipe = (props) => {
  const formattedCalorie = Math.round(props.calories);

  return (
    <div className={style.recipe}>
      <h1>{props.title}</h1>
      <p>{formattedCalorie} calories</p>
      <img src={props.image}></img>
      <h2>Ingredients</h2>
      <ul>
        {props.ingred.map((each) => {
          return <li>{each.text}</li>;
        })}
      </ul>
    </div>
  );
};

export default Recipe;
