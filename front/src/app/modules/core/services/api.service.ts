import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Apollo, gql, QueryRef } from 'apollo-angular';
import { IUserRegistrationPayload, IUserUpdate } from '../../../models/User';
import { ICreateCard } from '../../../models/Card';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private _apollo: Apollo) { }

  loginUser(email: string, password: string): Observable<any> {
    return this._apollo.query({
      query: gql`
        query($email: String!, $password: String!) {
          login(email: $email, password: $password) {
            userId
            token
            tokenExpiration
          }
        }
      `,
      variables: {
        email: email,
        password: password,
      },
    });
  }

  registerUser(userRegistrationData: IUserRegistrationPayload) {
    return this._apollo.mutate({
      mutation: gql`
        mutation($userInput: UserInput!) {
          createUser(userInput: $userInput) {
            message
          }
        }
      `,
      variables: {
        userInput: userRegistrationData,
      },
    });
  }

  getAllServices() {
    return this._apollo.query({
      query: gql`
        query {
          getAllServices {
            _id
            name
            cardNumber
          }
        }
      `,
    });
  }

  getUserBalance(userId: string) {
    return this._apollo.query({
      query: gql`
        query($userId: ID!) {
          getUserBalance(userId: $userId) {
            generalInUSD
            currencyList {
              type
              balance
            }
          }
        }
      `,
      variables: {
        userId: userId,
      },
    });
  }

  getExchangeRates() {
    return this._apollo.query({
      query: gql`
        query {
          exchangeRates {
            type
            name
            USD
          }
        }
      `,
    });
  }

  getAllTransactions(userId) {
    return this._apollo.query({
      query: gql`
        query($userId: ID!) {
          getAllTransactions(userId: $userId) {
            _id
            senderCardId
            receiverCardId
            currency
            senderId
            receiverId
            receiverCardNumber
            name
            description
            type
            transactionAmount
            creationDate
          }
        }
      `,
      variables: {
        userId: userId
      }
    });
  }

  getCardTransactions(cardId) {
    return this._apollo.query({
      query: gql`
        query($cardId: ID!) {
          getCardTransactions(cardId: $cardId) {
            _id
            senderCardId
            receiverCardId
            senderId
            currency
            receiverId
            receiverCardNumber
            name
            description
            type
            transactionAmount
            creationDate
          }
        }
      `,
      variables: {
        cardId: cardId
      },
    });
  }

  getUserData(userId: string) {
    return this._apollo.query({
      query: gql`
        query($userId: ID!) {
          user(id: $userId) {
            _id
            firstName
            lastName
            email
            password
            phonenumber
            accountType
            creationDate
            birthDate
          }
        }
      `,
      variables: {
        userId: userId,
      },
    });
  }

  getAllCards(userId: string) {
    return this._apollo.query({
      query: gql`
        query($userId: ID!) {
          userCards(userId: $userId) {
            _id
            name
            cardNumber
            currencyType
            cardType
            balance
            expirationDate
            cardHolder
            creationDate
            earnings
            spendings
          }
        }
      `,
      variables: {
        userId: userId,
      },
    });
  }

  createNewCard(createCardInput: ICreateCard) {
    return this._apollo.mutate({
      mutation: gql`
        mutation($cardInput: CardInput!) {
          createCard(cardInput: $cardInput) {
            _id
            name
            cardNumber
            currencyType
            cardType
            balance
            expirationDate
            cardHolder
            creationDate
            earnings
            spendings
          }
        }
      `,
      variables: {
        cardInput: createCardInput,
      },
      context: {
        headers: new HttpHeaders().set("Authorization", window.sessionStorage.getItem('currentUserToken'))
      }
    });
  }

  deleteCard(cardId: String) {
    return this._apollo.mutate({
      mutation: gql`
        mutation($cardId: ID!) {
          deleteCard(cardId: $cardId) {
            message
          }
        }
      `,
      variables: {
        cardId: cardId,
      },
      context: {
        headers: new HttpHeaders().set("Authorization", window.sessionStorage.getItem('currentUserToken'))
      }
    });
  }

  createTransaction(transactionData) {
    return this._apollo.mutate({
      mutation: gql`
        mutation($transactionInput: TransactionInput!) {
          createTransaction(transactionInput: $transactionInput) {
            _id
            senderCardId
            receiverCardId
            senderId
            receiverId
            receiverCardNumber
            name
            description
            type
            currency
            transactionAmount
            creationDate
          }
        }
      `,
      variables: {
        transactionInput: transactionData,
      },
      context: {
        headers: new HttpHeaders().set("Authorization", window.sessionStorage.getItem('currentUserToken'))
      }
    });
  }

  currentCard(cardId: String) {
    return this._apollo.query({
      query: gql`
        query($cardId: ID!) {
          cardById(cardId: $cardId) {
            _id
            name
            cardNumber
            currencyType
            cardType
            balance
            expirationDate
            cardHolder
            creationDate
            earnings
            spendings
          }
        }
      `,
      variables: {
        cardId: cardId,
      }
    });
  }

  getServiceById(serviceId: String) {
    return this._apollo.query({
      query: gql`
        query($serviceId: ID!) {
          getServiceById(serviceId: $serviceId) {
            _id
            name
            cardNumber
          }
        }
      `,
      variables: {
        serviceId: serviceId,
      }
    });
  }

  updateUser(userData: IUserUpdate) {
    return this._apollo.mutate({
      mutation: gql`
        mutation($changeUserInput: ChangeUserInput!) {
          changeUser(changeUserInput: $changeUserInput) {
            _id
            firstName
            lastName
            email
            password
            accountType
            phonenumber
            creationDate
            birthDate
          }
        }
      `,
      variables: {
        changeUserInput: userData
      },
      context: {
        headers: new HttpHeaders().set("Authorization", window.sessionStorage.getItem('currentUserToken'))
      }
    })
  }
}
