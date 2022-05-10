"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const database_1 = __importDefault(require("./database"));
const users_1 = __importDefault(require("./handlers/users"));
const product_1 = __importDefault(require("./handlers/product"));
const order_1 = __importDefault(require("./handlers/order"));
// installing Server
const app = (0, express_1.default)();
const address = "0.0.0.0:3000";
// installing middlewares
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// startup function
app.get("/", function (req, res) {
    res.send("Hello World!");
});
//listening to server
app.listen(3000, function () {
    console.log(`starting app on: ${address}`);
});
// connecting to database instance and handling connection error if any
database_1.default.connect().then(async (Client) => {
    const res = await Client.query("SELECT NOW()");
    Client.release();
    console.log(res.rows);
});
database_1.default.on("error", (err) => {
    console.error(err.message);
});
// to enable us to use models and handelers methodes
(0, users_1.default)(app);
(0, product_1.default)(app);
(0, order_1.default)(app);
exports.default = app;
