
import { json } from 'stream/consumers';
import { GetIngredientListUrl, CreateOrderUrl } from './common-types/constants';

const parseResponse = async (res: Response) => {
  if (!res.ok) {
    if (!!res.text)
      throw new Error(await res.text());
    throw new Error(`Fetch error ${res.status}`);
  }
  return res.json();
}

export const getIngredientsDataApi = async () => {
  const res = await fetch(GetIngredientListUrl);
  const data = await parseResponse(res);
  if (!data.success)
    throw new Error("Backend unsuccess");
  return data;
}

export const createOrderApi = async (ingredients: string[]) => {
  const res = await fetch(CreateOrderUrl, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    
    body: JSON.stringify({ ingredients: ingredients })
    //body: JSON.stringify({ ingredients: ["609646e4dc916e00276b286e","609646e4dc916e00276b2870"] } )
  });
  const data = await parseResponse(res);
  if (!data.success)
    throw new Error("Backend unsuccess");
  return data;
}  