import { baseUrl } from './common-types/constants';
import { ILoginUserParams, IRegisterUserParams, IResetPasswordParams } from './common-types/interfaces';
import { getCookie } from './cookies';

// function sleep(time:number){
//   return new Promise((resolve)=>setTimeout(resolve,time)
// )}

const parseResponse = async (res: Response) => {
  if (!res.ok) {
    if (!!res.text) {
      let errorText = await res.text();
      try {
        const jsonAnswer = JSON.parse(errorText);
        if (!!jsonAnswer?.message)
          errorText = jsonAnswer.message;
      }
      catch {
        //нет так нет
      }
      throw new Error(errorText);
    }
    throw new Error(`Fetch error ${res.status}`);
  }
  return res.json();
}

const request = async (url: string, options?: RequestInit, useToken?: boolean) => {
  if (!!useToken && getCookie('accessToken') == null)
    throw new Error('Token not found in local storage');

  const res = await fetch(url, !!useToken ? { ...options, headers: { ...options?.headers, Authorization: getCookie('accessToken')! } } : options);
  const data = await parseResponse(res);
  if (!data.success)
    throw new Error('Backend unsuccess');
  return data;
}

const postRequest = (body: any) => {
  return {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  };
}

export const getIngredientsDataApi = async () => {
  return await request(`${baseUrl}/ingredients`);
}

export const createOrderApi = async (ingredients: string[]) => {
  return await request(`${baseUrl}/orders`, postRequest({ ingredients: ingredients }));
}

export const forgorPasswordApi = async (email: string) => {
  return await request(`${baseUrl}/password-reset`, postRequest({ email: email }));
}

export const resetPasswordApi = async (params: IResetPasswordParams) => {
  return await request(`${baseUrl}/password-reset/reset`, postRequest(params));
}

export const registerUserApi = async (params: IRegisterUserParams) => {
  return await request(`${baseUrl}/auth/register`, postRequest(params));
}

export const loginApi = async (params: ILoginUserParams) => {
  return await request(`${baseUrl}/auth/login`, postRequest(params));
}

export const logoutApi = async () => {
  return await request(`${baseUrl}/auth/logout`, postRequest({ token: localStorage.getItem('refreshToken') }));
}

export const refreshTokensApi = async () => {
  return await request(`${baseUrl}/auth/token`, postRequest({ token: localStorage.getItem('refreshToken') }));
}

export const getUserApi = async () => {
  return await request(`${baseUrl}/auth/user`, undefined, true);
}

export const patchUserApi = async (params: IRegisterUserParams) => {
  return await request(`${baseUrl}/auth/user`, { ...postRequest(params), method: 'PATCH', }, true);
}