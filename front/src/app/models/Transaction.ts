export interface ITransaction {
   senderCardId: string,
   receiverCardId: string,
   senderId: string,
   receiverId: string,
   receiverCardNumber: string,
   name: string,
   description: string,
   type:string,
   transactionAmount: number,
   creationDate: string
}

export interface ITransactionReq {
   senderCardId: string,
   receiverCardNumber: string,
   description: string,
   type:string,
   transactionAmount: number,
}