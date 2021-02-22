export interface IExchangeRates {
   type: string,
   name: string,
   USD: number
}

export interface IExchangeRatesState {
   exchangeRates: Array<IExchangeRates>
}

export const initialExchangeRatesState = {
   exchangeRates: null,
}