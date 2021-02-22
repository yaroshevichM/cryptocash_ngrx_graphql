import { initialExchangeRatesState } from "../states/exchange-rates.state";
import { EExchangeRates, ExchangeRatesAction } from "../actions/exchange-rates.action";

export const exchangeRatesReducer = (state = initialExchangeRatesState, action: ExchangeRatesAction) => {
   switch (action.type) {
      case EExchangeRates.EXCHANGE_RATES_COMPLETED:
         return { ...state, exchangeRates: action.payload }
      default:
         return { ...state }
   }
}