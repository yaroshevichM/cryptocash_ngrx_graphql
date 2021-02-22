"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const express_1 = tslib_1.__importDefault(require("./config/express"));
const config_1 = tslib_1.__importDefault(require("./config/config"));
mongoose_1.default.connect(config_1.default.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose_1.default.connection.on('error', () => {
    throw new Error(`unable to connect to database: ${config_1.default.db}`);
});
const ExpressServer = new express_1.default();
ExpressServer.init();
ExpressServer.httpServer.listen(process.env.PORT || config_1.default.port, () => {
    console.log(`🚀  Server ready at ${config_1.default.port}`);
});
//# sourceMappingURL=index.js.map