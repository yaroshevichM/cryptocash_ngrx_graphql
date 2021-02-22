"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const schema_1 = tslib_1.__importDefault(require("../server/graphql/schema/schema"));
const http = tslib_1.__importStar(require("http"));
class Express {
    constructor() {
        this.appoloServer = new apollo_server_express_1.ApolloServer(schema_1.default); // need to add schema
        this.init = () => {
            this.express = express_1.default();
            this.appoloServer.applyMiddleware({ app: this.express });
            this.httpServer = http.createServer(this.express);
        };
    }
}
exports.default = Express;
//# sourceMappingURL=express.js.map