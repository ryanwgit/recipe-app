import React, { useEffect, useState } from 'react';
import Recipe from './Recipe';
import './App.css';

const App = () => {

  const APP_ID = "675e29ed";
  const APP_KEY = "df521867517c126cbf691daf83724b9b";

  const [recipes, setRecipes] = useState([]);

  //on load effect which is similar to "componenetDidMount" etc
  useEffect(() => {
    getRecipes();
    }, 
    []);

    // request from the external api
    const getRecipes = async () => {
      const response = await fetch(`https://api.edamam.com/search?q=chicken&app_id=${APP_ID}&app_key=${APP_KEY}`);
      const data = await response.json();
      setRecipes(data.hits);
    };

  return(
    <div className="App">
      <form className="search-form">
        <input className="search-bar" type="text"/>
        <button className="search-button" type="submit">Search</button>       
      </form>
      { recipes.map(recipe => (
        <Recipe />
      ))}
    </div>
  );
};

export default App;
