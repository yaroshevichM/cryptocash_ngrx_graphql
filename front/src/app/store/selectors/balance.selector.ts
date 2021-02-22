import { IUserBalanceState } from "../states/balance.state";
import { IAppState } from "../appState";
import {createSelector} from "@ngrx/store"

const selectUserBalance = (state: IAppState) => state.userBalance;

export const selectUserBalanceInner = createSelector(
   selectUserBalance,
   (state: IUserBalanceState) => state.userBalance
);

export const selectUserBalanceLoader = createSelector(
   selectUserBalance,
   (state: IUserBalanceState) => state.loading
);