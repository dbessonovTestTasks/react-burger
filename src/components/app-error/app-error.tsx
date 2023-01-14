interface IProps {
    errorMessage: null|string;
}

function AppError(props :IProps){
    return (<section>
                <h1>Что-то пошло не так :(</h1>
                <p>В приложении произошла ошибка: {props.errorMessage}. Пожалуйста, перезагрузите страницу.</p>
            </section>
    );
}

export default AppError