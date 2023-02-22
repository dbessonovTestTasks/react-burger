import { FC, useEffect } from 'react';
import { useSelector } from '../hooks/use-selector';
import { useDispatch } from '../hooks/use-dispatch';
import { LoaderButton } from '../loader-button/loader-button';
import { refreshTokensAction } from '../../services/api-actions-generation';

interface IProps { repeatableAction: () => void }

export const RefreshToken: FC<IProps> = ({repeatableAction}) => {
    const dispatch = useDispatch();

    const refreshTokensStore = useSelector(store => store.refreshTokens);
    const refreshTokens = () => dispatch(refreshTokensAction());
    
    useEffect(() => {
        if (refreshTokensStore.answer?.success)
            repeatableAction();
    }, [refreshTokensStore.answer?.success, repeatableAction]);

    useEffect(() => refreshTokens 
    // eslint-disable-next-line
    ,[]);//при монтировании

    return (<LoaderButton htmlType='button' isDisabled={refreshTokensStore.request} onClick={refreshTokens}
        loaderText={'Обновление токенов доступа...'} text={'Обновить токены доступа'}
        errorText={refreshTokensStore.failed ? refreshTokensStore.errorMessage : ''} />);
}