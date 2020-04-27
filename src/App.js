import React,{useState, useEffect} from 'react';
import './App.css';
import Recipe from './Recipe'

const App = () => {
  const APP_ID = '82a867e7';
  const APP_KEY = 'e28f94ebb7f6a51343792af6345bc23f';
  const [recipes , setRecipes] = useState([]);
  const [search , setSearch] = useState('');
  const [query,setQuery] = useState('Chicken');

  useEffect(() => {
    getRecipes();
  },[query]); //[] -> data is fetched only once when page loads 

  const getRecipes = async () => {
  const response = await  fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
  const data = await response.json(); // formatting data to work easily with it. Await as it is an external request
  setRecipes(data.hits);
  console.log(data.hits);
};

const updateSearch = e =>{
  setSearch (e.target.value);
}

const getSearch = e =>{
  e.preventDefault();
  setQuery(search);
  setSearch('');
}


  return(
    <div className='App'>
      <h1 className='header'>Recipe Search</h1>
      <form onSubmit={getSearch} className='search-form'>
        <input className='search-bar' type = 'text' value={search} onChange={updateSearch}/>
        <button className='search-button' type = 'submit' ca>Search</button>
      </form>
      <div className='recipes'>
      {recipes.map(recipe => (
        <Recipe key={recipe.recipe.label} 
        title={recipe.recipe.label} 
        calories={recipe.recipe.calories} 
        image={recipe.recipe.image}
        ingredients={recipe.recipe.ingredients}
        url={recipe.recipe.url}/>
      ))}
      </div>
    </div>
  )

}

export default App;