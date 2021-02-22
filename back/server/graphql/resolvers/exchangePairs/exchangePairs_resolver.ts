import { getExchangedRates } from "../merge";

export const exchangePairQueries = {
  exchangeRates: () => {
    const exchangePairs = getExchangedRates()
    return exchangePairs;
  },
};
