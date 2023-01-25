import './App.css';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import AppError from '../app-error/app-error';
import { useSelector } from '../hooks/use-selector';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
  const {ingredientsFailed, ingredientsErrorMessage} = useSelector(store => store.apiIngredients);
  const {orderFailed, orderErrorMessage} = useSelector(store => store.apiOrder);
  
  return (
    <div className="App">
      <AppHeader/>
      {ingredientsFailed || orderFailed
        ?(<AppError errorMessage={ingredientsErrorMessage + orderErrorMessage}/>)
        :(<div className="appContent">
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients/>
            <BurgerConstructor/>
          </DndProvider>      
        </div>)}    
    </div>
  );
}

export default App;
