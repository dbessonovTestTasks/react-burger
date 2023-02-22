import { FC } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "../hooks/use-selector";

interface IProps {
    element: React.ReactElement
}

export const OnlyUnAuthRouteElement: FC<IProps> = (props) => {
    const isLogged = useSelector((store) => store.internalUser.isLogged);
    if (isLogged)
        return (<Navigate to='/' replace />);
    return props.element;
}