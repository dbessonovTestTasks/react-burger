import styles from './app.module.css';
import { AppHeader } from '../app-header/app-header';
import { AppError } from '../app-error/app-error';
import { useSelector } from '../hooks/use-selector';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { HomePage, NotFoundPage, LoginPage, RegisterPage, ForgotPasswordPage, ResetPasswordPage, ProfilePage } from '../../pages';
import { LogoutPage } from '../../pages/logout';
import { ProtectedRouteElement } from '../protected-route-element/protected-route-element';
import { OnlyUnAuthRouteElement } from '../only-unauth-route-element/only-unauth-route-element';
import { Modal } from '../modal/modal';
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { useEffect } from 'react';
import { loadIngredientsAction } from '../../services/api-actions-generation';
import { useDispatch } from '../hooks/use-dispatch';
import { UserProfileEdit } from '../user-profile-edit/user-profile-edit';

function App() {
  const { failed: ingredientsFailed, errorMessage: ingredientsErrorMessage } = useSelector(store => store.apiIngredients);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const background = location.state && location.state.background;

  useEffect(() => {
    dispatch(loadIngredientsAction());
  }, [dispatch]);

  return (
    <div className={styles.App}>
      <main>
        {ingredientsFailed
          ? (<AppError errorMessage={ingredientsErrorMessage} />)
          : (
            <>
              <AppHeader />
              <Routes location={background || location}>
                <Route path='/login' element={<LoginPage />} />
                <Route path='/register' element={<OnlyUnAuthRouteElement element={<RegisterPage />} />} />
                <Route path='/forgot-password' element={<OnlyUnAuthRouteElement element={<ForgotPasswordPage />} />} />
                <Route path='/reset-password' element={<OnlyUnAuthRouteElement element={<ResetPasswordPage />} />} />
                <Route path='/profile' element={<ProtectedRouteElement element={<ProfilePage />} />} >
                  <Route path='/profile' element={<ProtectedRouteElement element={<UserProfileEdit />} />} />
                  <Route path='/profile/orders' element={<ProtectedRouteElement element={<NotFoundPage />} />} />
                  <Route path='/profile/orders/:id' element={<ProtectedRouteElement element={<NotFoundPage />} />} />
                  <Route path='/profile/logout' element={<LogoutPage />} />
                </Route>
                <Route path='/ingredients/:id' element={<IngredientDetails />} />
                <Route path='/' element={<HomePage />} />

                <Route path='*' element={<NotFoundPage />} />
              </Routes>
              {background && (
                <Routes>
                  <Route path='/ingredients/:id' element={
                    <Modal title="Детали ингредиента" onClose={() => navigate(-1)}>
                      <IngredientDetails />
                    </Modal>
                  } />
                </Routes>)
              }
            </>
          )}
      </main>
    </div>
  );
}

export default App;
