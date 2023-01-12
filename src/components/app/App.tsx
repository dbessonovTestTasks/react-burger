import './App.css';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import {useEffect, useState} from 'react';
import AppError from '../app-error/app-error';
function App() {

  const [state, setState] = useState({ ingredientsData:[], loading: false, hasError: false });
  
  const getIngredientListUrl = `https://norma.nomoreparties.space/api/ingredients`;
  useEffect(() => {    
    const getData = async () => {
      try {
        setState({...state, loading: true});
        const res = await fetch(getIngredientListUrl);
        const data = await res.json();  
        if(!data.success)
          throw new Error("Backend unsuccess");
          
        setState({...state, ingredientsData: data.data, loading: false });
      } catch (error) {
        console.log(error);
        setState({ingredientsData: [], loading: false, hasError: true});
      }
    }

    getData();  
  // eslint-disable-next-line 
  }, []);
  
  return (
    <div className="App">
      <AppHeader/>
      {state.hasError
        ?(<AppError/>)
        :(<div className="appContent">
          <BurgerIngredients ingredients={state.ingredientsData}/>
          <BurgerConstructor ingredients={state.ingredientsData}/>        
        </div>)}
      <div id="react-modals"></div>
    </div>
  );
}

export default App;
