
import { baseUrl } from './common-types/constants';

const parseResponse = async (res: Response) => {
  if (!res.ok) {
    if (!!res.text)
      throw new Error(await res.text());
    throw new Error(`Fetch error ${res.status}`);
  }
  return res.json();
}

// function sleep(time:number){
//   return new Promise((resolve)=>setTimeout(resolve,time)
// )}

const request = async (url: string, options?: RequestInit) => {
  const res = await fetch(url, options);
  const data = await parseResponse(res);
  if (!data.success)
    throw new Error("Backend unsuccess");
  return data;
}

export const getIngredientsDataApi = async () => {
  return await request(`${baseUrl}/ingredients`);
}

export const createOrderApi = async (ingredients: string[]) => {
  return await request(`${baseUrl}/orders`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ingredients: ingredients })
  });
}  