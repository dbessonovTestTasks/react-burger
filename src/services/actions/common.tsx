import {TApiIngredientsActions} from './api-ingredients';
import {TApiOrderActions} from './api-order';
import {TConstructorIngredientsActions} from './constructor-ingredients';
import {TPopupIngredientsActions} from './popuped-ingredient';
import { TChangeActiveTabAction } from './tabs-ingredients';

export type TApplicationActions  =
    | TApiIngredientsActions
    | TApiOrderActions
    | TConstructorIngredientsActions
    | TPopupIngredientsActions
    | TChangeActiveTabAction;