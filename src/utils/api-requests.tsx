
import {GetIngredientListUrl} from './common-types/constants';

const parseResponse = async(res: Response) => {
  if(!res.ok){
    if (!!res.text)
      throw new Error(await res.text());
    throw new Error(`Fetch error ${res.status}`);
  }
  return res.json();
}

export const getIngredientsData = async () => {  
  const res = await fetch(GetIngredientListUrl);  
  const data = await parseResponse(res);  
  if(!data.success)
    throw new Error("Backend unsuccess");
  return data;
}  