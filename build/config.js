"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
// enable us to get information from ENV
dotenv_1.default.config();
// destructing ENV information
const { ENV, BYCRYPT_PASSWORD, SALT_ROUND, TOKEN_SECRET } = process.env;
// expoting for further usage
exports.default = {
    env: ENV,
    pepper: BYCRYPT_PASSWORD,
    salt: SALT_ROUND,
    tokenSecret: TOKEN_SECRET,
};
