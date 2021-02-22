
export interface IGeneralBalance {
   generalInUSD: Number,
   currencyList: {
      type: String,
      balance: Number
   },
}

export interface IUserBalanceState {
   userBalance: IGeneralBalance
   loading: boolean
}

export const initialUserBalanceState = {
   userBalance: null,
   loading: null
}