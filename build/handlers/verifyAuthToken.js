"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// methode for verfiy token
const verifyAuthToken = (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader.split(" ")[1];
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.tokenSecret);
        next();
    }
    catch (error) {
        res.status(401).json("Data not valid : UnAuthorized User");
    }
};
exports.default = verifyAuthToken;
