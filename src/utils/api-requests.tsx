
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
    body: JSON.stringify({ ingredient: ingredients })
  });
  const data = await parseResponse(res);
  if (!data.success)
    throw new Error("Backend unsuccess");
  return data;
}  