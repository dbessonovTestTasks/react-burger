import { IOrders } from "../utils/common-types/interfaces";
import { wsSliceCreator } from "../utils/ws-slice-creator";

export const [wsCommonOrdersActions, wsCommonOrdersReducer] = wsSliceCreator<IOrders>('COMMON_ORDERS');
export const [wsUserOrdersActions, wsUserOrdersReducer] = wsSliceCreator<IOrders>('USER_ORDERS');