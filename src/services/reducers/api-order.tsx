import { IBurgerOrder } from '../../utils/common-types/interfaces';
import {
    API_ORDER_REQUEST,
    API_ORDER_SUCCESS,
    API_ORDER_FAILED,
    TApiOrderActions
} from '../actions/api-order';


interface IOrderStore {
    order: IBurgerOrder|null;
    orderRequest: boolean;
    orderFailed: boolean;
    orderErrorMessage: string;
  }

const initOrderStore: IOrderStore = {
    order: null,
    orderRequest: false,
    orderFailed: false, 
    orderErrorMessage: ''  
};

export const apiOrderReducer = (state = initOrderStore, action: TApiOrderActions): IOrderStore => {
    switch (action.type) {
        case API_ORDER_REQUEST: {
            return { ...state, orderRequest: true };
        }
        case API_ORDER_SUCCESS: {
            return { ...state, orderFailed: false, order: action.payload, orderRequest: false };
        }
        case API_ORDER_FAILED: {
            return { ...state, orderFailed: true, orderRequest: false, orderErrorMessage: action.payload };
        }

        default: {
            return state;
        }
    }
};