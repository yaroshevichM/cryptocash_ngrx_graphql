import express from 'express'
import { ApolloServer } from 'apollo-server-express';
import schema from '../server/graphql/schema/schema'
import * as http from 'http'
// import { isAuth } from '../server/middlewares/is-auth';

class Express {
   public express: express.Application
   public httpServer: http.Server
   public appoloServer: ApolloServer = new ApolloServer(schema); // need to add schema
   public init = () => {
      this.express = express();

      // this.express.use(isAuth)

      this.appoloServer.applyMiddleware({app: this.express})
      this.httpServer = http.createServer(this.express)
   }
}

export default Express