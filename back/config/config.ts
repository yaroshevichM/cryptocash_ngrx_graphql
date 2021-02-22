import dotenv from 'dotenv'
dotenv.config()

export default {
   db: process.env.DB,
   port: process.env.PORT,
   allowedOrigins: ['http://localhost:3000', 'http://localhost:4200']
}