export const CHANGE_ACTIVE_TAB = 'CHANGE_ACTIVE_TAB';
export type TChangeActiveTabAction = {
    readonly type: typeof CHANGE_ACTIVE_TAB;
    readonly payload: string;
};