export interface IBurgerIngredient {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
}

export type TBurgerIngredient = IBurgerIngredient & {
  count: number;
}

export type TConstructorIngredient = IBurgerIngredient & {
  key: string;
}

export interface IBurgerOrder {
  name: string;
  order: { number: string };
  success: boolean;
}