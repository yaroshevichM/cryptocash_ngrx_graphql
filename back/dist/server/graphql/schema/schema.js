"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const apollo_server_express_1 = require("apollo-server-express");
const rootResolver_1 = tslib_1.__importDefault(require("../resolvers/rootResolver"));
const typeDefs = apollo_server_express_1.gql `
   type Query {
      users: User
   }

   type User {
      id: Int,
      fullname: String
   }

   type Mutation {
      createUser(id: Int, fullname: String, text: String): User
   }
`;
const schema = {
    typeDefs,
    resolvers: rootResolver_1.default
};
exports.default = schema;
//# sourceMappingURL=schema.js.map