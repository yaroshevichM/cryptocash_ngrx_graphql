import { IAppState } from "../appState";
import {createSelector} from "@ngrx/store"
import { IExchangeRatesState } from "../states/exchange-rates.state";

const selectExchangeRates = (state: IAppState) => state.exchangeRates;

export const selectExchangeRatesInner = createSelector(
   selectExchangeRates,
   (state: IExchangeRatesState) => state.exchangeRates
);