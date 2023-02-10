import { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch } from '../components/hooks/use-dispatch';
import { useSelector } from '../components/hooks/use-selector';
import LoaderButton from '../components/loader-button/loader-button';
import { logoutAction } from '../services/api-actions-generation';

export function LogoutPage() {
    const navigate = useNavigate();

    const logoutStore = useSelector(o => o.logout);
    const userIsLogged = useSelector(store => store.internalUser.isLogged);
    const dispatch = useDispatch();

    const exit = () => dispatch(logoutAction());
    useEffect(() => exit, [dispatch]);

    useEffect(() => {
        if (!userIsLogged) {
            navigate('/login');
        }
    }, [userIsLogged, navigate]);

    return (<LoaderButton htmlType='button' onClick={exit}
        isDisabled={logoutStore.request} text='Выход' loaderText='Выход...'
        errorText={logoutStore.failed ? logoutStore.errorMessage : ''} />);
}