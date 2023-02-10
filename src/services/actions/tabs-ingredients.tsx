import { createAction } from '@reduxjs/toolkit';
import { withPayloadType } from '../../utils/api-action-creator';

export const ChangeActiveTabAction = createAction('CHANGE_ACTIVE_TAB', withPayloadType<string>());