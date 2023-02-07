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

export interface IUserAuthInfo {
  success: boolean,
  user: {
    email: string,
    name: string
  },
  accessToken: string,
  refreshToken: string
}

export interface ILoginUserParams {
  email: string;
  password: string;
}