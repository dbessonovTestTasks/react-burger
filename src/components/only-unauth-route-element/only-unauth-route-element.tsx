import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "../hooks/use-selector";

interface IProps {
    element: React.ReactElement<any>
}

export default function OnlyUnAuthRouteElement(props: IProps) {
    const isLogged = useSelector((store) => store.internalUser.isLogged);
    if (isLogged)
        return (<Navigate to='/' replace />);
    return props.element;
}