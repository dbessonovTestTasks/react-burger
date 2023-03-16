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

export interface IBurgerGroupIngredient {
  id: string;
  count: number;
  ingredientDefinition?: IBurgerIngredient;
}

export type TBurgerIngredient = IBurgerIngredient & {
  count: number;
}

export type TConstructorIngredient = IBurgerIngredient & {
  key: string;
}

export interface IExchangeElements {
  dragIndex: number;
  hoverIndex: number;
}

export interface IBurgerOrder {
  name: string;
  order: { number: string };
  success: boolean;
}

export interface IMessageAnswer {
  message: string;
  success: boolean;
}

export interface IRequest {
  request: boolean;
  failed: boolean;
  errorMessage: string;
}

export interface IPasswordRecovery extends IRequest {
  answer: IMessageAnswer | null;
}

export interface IResetPasswordParams {
  password: string;
  token: string;
}

export interface IRegisterUserParams {
  email: string;
  password: string;
  name: string;
}

export interface IUserInfo {
  success: boolean;
  user: {
    email: string;
    name: string;
  }
}

export interface IUserAuthInfo extends IUserInfo {
  accessToken: string;
  refreshToken: string;
}

export interface IRefreshTokensInfo {
  success: boolean;
  accessToken: string;
  refreshToken: string;
}

export interface ILoginUserParams {
  email: string;
  password: string;
}

export interface IOrder {
  ingredients: string[];
  _id: string;
  status: string;
  name: string;
  number: number;
  createdAt: string;
  updatedAt: string;
}

export interface IOrders {
  success: boolean;
  orders: IOrder[];
  total: number;
  totalToday: number;
}