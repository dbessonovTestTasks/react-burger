import React from 'react';
import logo from './logo.svg';
import './App.css';
import AppHeader from './components/app-header/app-header';
import BurgerConstructor from './components/burger-constructor/burger-constructor';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';
import {IngredientsData} from './utils/data';

function App() {
  return (
    <div className="App">
      <AppHeader/>
      <div className="appContent">
        <BurgerIngredients ingredients={IngredientsData}/>
        <BurgerConstructor ingredients={IngredientsData}/>        
      </div>     
    </div>
  );
}

export default App;
