import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import AppError from '../app-error/app-error';
import { useSelector } from '../hooks/use-selector';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage, NotFoundPage, LoginPage, RegisterPage, ForgotPasswordPage, ResetPasswordPage, ProfilePage, IngredientsDetailsPage } from '../../pages';


function App() {
  const { failed: ingredientsFailed, errorMessage: ingredientsErrorMessage } = useSelector(store => store.apiIngredients);
  const { failed: orderFailed, errorMessage: orderErrorMessage } = useSelector(store => store.apiOrder);

  return (
    <div className={styles.App}>
      <main>
        {ingredientsFailed || orderFailed
          ? (<AppError errorMessage={ingredientsErrorMessage + orderErrorMessage} />)
          : (
            <BrowserRouter>
              <AppHeader />
              <Routes>                
                <Route path='/login' element={<LoginPage />} />
                <Route path='/register' element={<RegisterPage />} />
                <Route path='/forgot-password' element={<ForgotPasswordPage />} />
                <Route path='/reset-password' element={<ResetPasswordPage />} />
                <Route path='/profile' element={<ProfilePage />} />
                <Route path='/ingredients/:id' element={<IngredientsDetailsPage />} />
                <Route path='/' element={<HomePage />} />
                <Route path='*' element={<NotFoundPage />} />
              </Routes>
            </BrowserRouter>
          )}
      </main>
    </div>
  );
}

export default App;
