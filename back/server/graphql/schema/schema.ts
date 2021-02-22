import { ApolloServerExpressConfig, gql } from 'apollo-server-express'
import { isAuth } from '../../middlewares/is-auth'
import resolvers from '../resolvers/rootResolver'

const typeDefs = gql`

   type Card {
      _id: ID!
      name: String!
      cardNumber: String
      currencyType: String!
      cardType: String!
      balance: Int
      expirationDate: String!
      cardHolder: String
      transactions: [Transaction]
      creationDate: String
      earnings: Int
      spendings: Int
   }

   type Transaction {
      _id: ID!
      senderId: ID!
      receiverId: ID!
      senderCardId: ID!
      receiverCardId: ID
      receiverCardNumber: String!
      name: String
      description: String
      type: String
      currency: String
      transactionAmount: Int
      creationDate: String
   }

   type User {
      _id: ID
      firstName: String
      lastName: String
      email: String
      password: String
      accountType: String
      creationDate: String
      birthDate: String
      phonenumber: String
   }

   type Service {
      _id: ID!
      name: String!
      cardNumber: String
   }

   input ServiceInput {
      name: String!
      cardNumber: String!
   }

   input CardInput {
      name: String!
      currencyType: String!
      cardType: String!
      cardHolderId: ID!
   }

   input UserInput {
      firstName: String!
      lastName: String!
      email: String!
      password: String!
      phonenumber: String!
      birthDate: String!
   }


   input ChangeUserInput {
      _id: ID!
      email: String
      phonenumber: String
      accountType: String
   }

   input TransactionInput {
      senderCardId: ID!
      receiverCardNumber: String!
      transactionAmount: Int!
      type: String!
      currency: String!,
      description: String,
   }

   type AuthData {
      userId: ID!
      token: String!
      tokenExpiration: Int!
   }

   type ExchangePair {
      type: String!
      name: String!
      USD: Float!
   }

   type CryptoCurrencyBalance {
      type: String!
      isCard: Boolean!
      balance: Float!
   }

   type userBalance {
      generalInUSD: Float!
      currencyList: [CryptoCurrencyBalance]
   }

   type Query {
      userCards(userId: ID!): [Card!]
      user(id: ID!): User
      cardById(cardId: ID!): Card!
      getAllTransactions(userId: ID!): [Transaction!]!
      getCardTransactions(cardId: ID!): [Transaction!]
      getAllServices: [Service]
      login(email: String!, password: String!): AuthData!
      exchangeRates: [ExchangePair]!
      getUserBalance(userId: ID!): userBalance!
      getServiceById(serviceId: ID!): Service!
   }

   type Message {
      message: String!
   }

   type Mutation {
      createCard(cardInput: CardInput): Card
      deleteCard(cardId: ID!): Message!
      createUser(userInput: UserInput): Message!
      createTransaction(transactionInput: TransactionInput): Transaction!
      createService(serviceInput: ServiceInput): Service!
      changeUser(changeUserInput: ChangeUserInput): User!
   }
`


const schema: ApolloServerExpressConfig = {
   typeDefs,
   resolvers,
   context: isAuth
}

export default schema