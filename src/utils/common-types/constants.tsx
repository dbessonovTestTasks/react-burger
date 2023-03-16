export const ingridientTypes = Object.freeze({ Bun: 'bun', Sauce: 'sauce', Main: 'main' });//OK, раз есть замечание - поправил, но перечисления не именуются со строчной буквы.
export const tabList = Object.freeze({ BunTab: 'bunTab', SauceTab: 'sauceTab', MainTab: 'mainTab' });
export const baseUrl = `https://norma.nomoreparties.space/api`;
export const wsBaseUrl = `wss://norma.nomoreparties.space`;

export const MAX_ICONS_COUNT_IN_ORDER_LIST_ELEMENT = 6;
export enum OrderStatusTypes {    
    Created = 'created',
    Pending = 'pending',
    Done = 'done'
}