import { FC } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "../hooks/use-selector";

interface IProps {
    element: React.ReactElement<any>
}

export const ProtectedRouteElement: FC<IProps> = (props) => {
    const { pathname } = useLocation();
    const isLogged = useSelector((store) => store.internalUser.isLogged);
    if (!isLogged) 
        return (<Navigate state={{ redirectTo: pathname }} to='/login' replace />);
    return props.element;
}