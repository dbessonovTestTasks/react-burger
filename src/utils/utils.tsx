import { OrderStatusTypes } from "./common-types/constants";

export function decodeOrderState(name: string): string {
    switch (name) {
        case OrderStatusTypes.Created:
            return 'Создан';
        case OrderStatusTypes.Done:
            return 'Выполнен';
        case OrderStatusTypes.Pending:
            return 'Готовится';
        default:
            return 'Не определен';
    }
}