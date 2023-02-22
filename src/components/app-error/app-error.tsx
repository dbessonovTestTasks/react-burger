import { FC } from "react";

interface IProps {
    errorMessage: null | string;
}

export const AppError: FC<IProps> = (props) => {
    return (<section>
        <h1>Что-то пошло не так :(</h1>
        <p>В приложении произошла ошибка: {props.errorMessage}. Пожалуйста, перезагрузите страницу.</p>
    </section>
    );
}