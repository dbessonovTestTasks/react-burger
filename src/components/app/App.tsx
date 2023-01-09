import './App.css';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import {IngredientsData} from '../../utils/data';

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
