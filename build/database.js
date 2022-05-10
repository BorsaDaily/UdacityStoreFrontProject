"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const pg_1 = require("pg");
// enable us to get information from ENV
dotenv_1.default.config();
// destructing ENV information
const { ENV, PGHOST, PGUSER, PGDATABASE, PGDATABASETEST, PGPASSWORD, PGPORT } = process.env;
// instance for database
let storeDB;
// DataBase ENV conditions for development and test
if (ENV === "dev") {
    storeDB = new pg_1.Pool({
        user: PGUSER,
        host: PGHOST,
        database: PGDATABASE,
        password: PGPASSWORD,
        port: parseInt(PGPORT, 10),
    });
}
if (ENV === "test") {
    storeDB = new pg_1.Pool({
        user: PGUSER,
        host: PGHOST,
        database: PGDATABASETEST,
        password: PGPASSWORD,
        port: parseInt(PGPORT, 10),
    });
}
// exporting the Database instance
exports.default = storeDB;
