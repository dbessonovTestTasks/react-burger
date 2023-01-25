import { createAction } from '@reduxjs/toolkit';
import { withPayloadType } from '../../utils/utils';

export const ChangeActiveTabAction = createAction('CHANGE_ACTIVE_TAB', withPayloadType<string>());