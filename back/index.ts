import mongoose from 'mongoose'
import Express from './config/express'
import config from './config/config'


mongoose.connect(config.db, {
   useNewUrlParser: true,
   useUnifiedTopology: true
});

mongoose.connection.on('error', () => {
   throw new Error(`unable to connect to database: ${config.db}`);
})

const ExpressServer = new Express();

ExpressServer.init();

ExpressServer.httpServer.listen(process.env.PORT || config.port, () => {
   console.log(`🚀  Server ready at ${config.port}`);
 });