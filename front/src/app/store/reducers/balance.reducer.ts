import { initialUserBalanceState } from '../states/balance.state';
import { EBalanceActions, BalanceActions } from '../actions/balance.actions';

export const balanceReducer = (
  state = initialUserBalanceState,
  action: BalanceActions
) => {
  switch (action.type) {
    case EBalanceActions.BALANCE_COMPLETED:
      return { ...state, userBalance: action.payload };
    default:
      return { ...state };
  }
};
