"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = {
    db: process.env.DB,
    port: process.env.PORT,
    allowedOrigins: ['http://localhost:3000', 'http://localhost:4200']
};
//# sourceMappingURL=config.js.map