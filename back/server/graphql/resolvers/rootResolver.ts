import { authQueries } from "./auth/auth_resolver"
import { cardQueries, cardsMutations } from "./card/card_resolver"
import { exchangePairQueries } from "./exchangePairs/exchangePairs_resolver"
import { serviceMutations, serviceQueries } from "./service/service_resolver"
import { transactionMutations, transactionQueries } from "./transaction/transaction_resoliver"
import { userMutations, userQueries } from "./user/user_resolver"

const rootResolver = {
   Query: {
      
      ...cardQueries,
      ...transactionQueries,
      ...userQueries,
      ...serviceQueries,
      ...authQueries,
      ...exchangePairQueries
      
   },

   Mutation: {
      
      ...cardsMutations,
      ...transactionMutations,
      ...userMutations,
      ...serviceMutations

   }
}




export default rootResolver