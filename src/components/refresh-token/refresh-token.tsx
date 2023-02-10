import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { SyntheticEvent, useEffect, useRef, useState } from 'react';
import { useSelector } from '../hooks/use-selector';
import { useDispatch } from '../hooks/use-dispatch';
import LoaderButton from '../loader-button/loader-button';
import { refreshTokensAction } from '../../services/api-actions-generation';

interface IProps { repeatableAction: () => void }

function RefreshToken(props: IProps) {
    const dispatch = useDispatch();

    const refreshTokensStore = useSelector(store => store.refreshTokens);
    const refreshTokens = () => dispatch(refreshTokensAction());
    
    useEffect(() => {
        if (refreshTokensStore.answer?.success)
            props.repeatableAction();
    }, [refreshTokensStore.answer?.success]);

    useEffect(() => refreshTokens, []);
    return (<LoaderButton htmlType='button' isDisabled={refreshTokensStore.request} onClick={refreshTokens}
        loaderText={'Обновление токенов доступа...'} text={'Обновить токены доступа'}
        errorText={refreshTokensStore.failed ? refreshTokensStore.errorMessage : ''} />);
}

export default RefreshToken;