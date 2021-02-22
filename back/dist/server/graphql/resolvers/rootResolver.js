"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rootResolver = {
    Query: {
        users: () => {
            return {
                id: 5,
                fullname: "Maxim Yaroshevich"
            };
        }
    },
    Mutation: {
        createUser: (id, fullname, text) => {
            console.log(id, fullname, text);
            const user = new User(id, fullname);
            console.log(user);
            users.push(user);
            return user;
        }
    }
};
const users = [];
class User {
    constructor(id, fullname) {
        this.id = id;
        this.fullname = fullname;
    }
}
exports.default = rootResolver;
//# sourceMappingURL=rootResolver.js.map