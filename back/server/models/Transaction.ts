import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const transactionSchema = new Schema({
   senderCardId: {
      type: Schema.Types.ObjectId,
      ref: 'Card'
   },
   receiverCardId: {
      type: Schema.Types.ObjectId,
      ref: 'Card'
   },
   receiverId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
   },
   senderId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
   },
   receiverCardNumber: {
      type: String,
   },
   name: {
      type: String,
   },
   description: {
      type: String,
   },
   type: {
      type: String,
   },
   currency: {
      type: String,
   },
   creationDate: {
      type: String
   },
   transactionAmount: {
      type: Number,
      required: true
   }
})

export default mongoose.model('Transaction', transactionSchema);