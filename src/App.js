import React, { useEffect, useState } from 'react';
import Recipe from './Recipe';
import './App.css';

const App = () => {

  const APP_ID = "675e29ed";
  const APP_KEY = "df521867517c126cbf691daf83724b9b";

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chicken");

  //on load effect which is similar to "componenetDidMount" etc
  useEffect(() => {
    getRecipes();
    }, [query]);

    // request from the external api
    const getRecipes = async () => {
      const response = await fetch(
        `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
        );
      const data = await response.json();
      setRecipes(data.hits);
      
    };

const updateSearch = e => {
  setSearch(e.target.value);
}

//prevent page reload on search & reset search field to empty
const getSearch = e => {
  e.preventDefault();
  setQuery(search);
  setSearch("");
}

  return(
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" 
        type="text" value={search} 
        onChange={updateSearch}
        />
        <button className="search-button" type="submit">
        Search
        </button>       
      </form>
      <div className="recipes">
      {recipes.map(recipe => (
        <Recipe  
        key={recipe.recipe.label}
        title={recipe.recipe.label} 
        calories={recipe.recipe.calories} 
        image={recipe.recipe.image}
        ingredients={recipe.recipe.ingredients}
        />
      ))}
      </div>
    </div>
  );
};

export default App;
