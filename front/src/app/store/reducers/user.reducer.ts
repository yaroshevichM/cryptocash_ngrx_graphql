import { UserAction, EUserActions } from '../actions/user.action';
import { initialUserState, IUserState } from '../states/user.state';

export const userReducer = (
  state = initialUserState,
  action: UserAction
): IUserState => {
  switch (action.type) {
    case EUserActions.USER_DATA_COMPLETED:
      return {
        ...state,
        ...action.payload,
      };

    case EUserActions.USER_LOGIN_COMPLETED:
      return {
        ...state,
        ...action.payload,
      };

    case EUserActions.USER_UPDATE_COMPLETED:
      return {
        ...state,
        ...action.payload,
      };


    default:
      return state;
  }
};
