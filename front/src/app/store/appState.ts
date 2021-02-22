import { ActionReducerMap } from "@ngrx/store";
import { servicesReducer } from "./reducers/services.reducer";
import { balanceReducer } from "./reducers/balance.reducer";
import { transactionReducer } from "./reducers/transaction.reducer";
import { cardReducer } from "./reducers/card.reducer";
import { exchangeRatesReducer } from "./reducers/exchange-rates.reducer";
import { IServicesState } from "./states/services.state";
import { IUserBalanceState } from "./states/balance.state";
import { IExchangeRatesState } from "./states/exchange-rates.state";
import { ITransactionState } from "./states/transaction.state";
import { ICardsState } from "./states/card.state";
import { IUserState } from "./states/user.state";
import { userReducer } from "./reducers/user.reducer";

export interface IAppState {
   // router: RouterState,
   user: IUserState,
   services: IServicesState,
   userBalance: IUserBalanceState,
   exchangeRates: IExchangeRatesState,
   transactions: ITransactionState,
   cards: ICardsState,
}

export const initialAppState: IAppState = {
   // router: RouterReducerState,
   user: null,
   services: null,
   userBalance: null,
   exchangeRates: null,
   transactions: null,
   cards: null,
}

export const appReducers: ActionReducerMap<IAppState, any> = {
   user: userReducer,
   services: servicesReducer,
   userBalance: balanceReducer,
   exchangeRates: exchangeRatesReducer,
   transactions: transactionReducer,
   cards: cardReducer,
} 