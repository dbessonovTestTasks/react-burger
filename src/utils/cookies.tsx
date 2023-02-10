export function getCookie(name: string) {
    const matches = document.cookie.match(
        new RegExp('(?:^|; )' + name.replace(/([$?*|{}()[]\\\/+^])/g, '\\$1') + '=([^;]*)')
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function setCookie(name: string, value: string | number | boolean, props?: Record<string, any>) {
    props = props || {};
    let exp = props.expires;
    if (typeof exp == 'number' && exp) {
        const d = new Date();
        d.setTime(d.getTime() + exp * 1000);
        exp = props.expires = d;
    }
    if (exp && exp.toUTCString) {
        props.expires = exp.toUTCString();
    }
    value = encodeURIComponent(value);
    let updatedCookie = name + '=' + value;
    for (const propName in props) {
        updatedCookie += '; ' + propName;
        const propValue = props[propName];
        if (propValue !== true) {
            updatedCookie += '=' + propValue;
        }
    }
    document.cookie = updatedCookie;
}

export function deleteCookie(name: string) {
    setCookie(name, '', { expires: -1 });
}

//Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZTBjMTA5OTM2YjE3MDAxYmU1OWJhMSIsImlhdCI6MTY3NTk1MjM4MSwiZXhwIjoxNjc1OTUzNTgxfQ.FnWbqNSTeWRf7TfNXoM_6drpa-UjMeLV4yKpZJiL9Go
//787231a766374382784b24a29fbca3f9fbbe03ca41f59acb12fd62ecff94203146056ccb7f7b8ecf
export function setTokens(accessToken: string, refreshToken: string) {
    setCookie('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
}

export function deleteTokens() {
    deleteCookie('accessToken');
    localStorage.setItem('refreshToken', '');
}