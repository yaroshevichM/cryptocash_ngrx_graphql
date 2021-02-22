import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const userSchema = new Schema({
   firstName: {
      type: String,
      required: true
   },
   lastName: {
      type: String,
      required: true
   },
   email: {
      type: String,
      required: true
   },
   password: {
      type: String,
      required: true
   },
   accountType: {
      type: String,
      default: "Standard"
   },
   creationDate: {
      type: String,
   },
   birthDate: {
      type: String,
   },
   phonenumber: {
      type: String,
   }
})

export default mongoose.model('User', userSchema);