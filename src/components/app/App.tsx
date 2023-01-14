import './App.css';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import {useEffect, useState} from 'react';
import AppError from '../app-error/app-error';
import {getIngredientsData} from '../../utils/api-requests';

function App() {

  const [state, setState] = useState({ ingredientsData:[], loading: false, hasError: false, errorMessage: null });

  const getData = async () => {
    try {
      setState({...state, loading: true});
      const data = await getIngredientsData();        
      setState({...state, ingredientsData: data.data, loading: false });
    } catch (error: any) {
      setState({ingredientsData: [], loading: false, hasError: true, errorMessage: error.message});
    }
  }  
  
  useEffect(() => {getData();},
  // eslint-disable-next-line
  []);
  
  return (
    <div className="App">
      <AppHeader/>
      {state.hasError
        ?(<AppError errorMessage={state.errorMessage}/>)
        :(<div className="appContent">
          <BurgerIngredients ingredients={state.ingredientsData}/>
          <BurgerConstructor ingredients={state.ingredientsData}/>        
        </div>)}   
    </div>
  );
}

export default App;
