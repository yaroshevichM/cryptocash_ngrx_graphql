import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const cardSchema = new Schema({
   name: {
      type: String,
      required: true
   },
   cardNumber: {
      type: String,
      length: 8
   },
   currencyType: {
      type: String,
      required: true
   },
   cardType: {
      type: String,
      required: true
   },
   balance: {
      type: Number,
      default: 100
   },
   expirationDate: {
      type: String,
      required: true
   },
   cardHolder: {
      type: Schema.Types.ObjectId,
      ref: 'User'
   },
   transactions: [
      {
         type: Schema.Types.ObjectId,
         ref: 'Transaction'
      }
   ],
   creationDate: {
      type: String
   },
   earnings: {
      type: Number,
      default: 0
   },
   spendings: {
      type: Number,
      default: 0
   }
})

export default mongoose.model('Card', cardSchema);