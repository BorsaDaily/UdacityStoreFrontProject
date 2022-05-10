"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../models/users");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const verifyAuthToken_1 = __importDefault(require("./verifyAuthToken"));
// object from model class
const usersData = new users_1.UsersData();
// handler for index model
const index = async (req, res) => {
    try {
        const users = await usersData.index();
        res.json(users);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
// handler for show model
const show = async (req, res) => {
    try {
        const user = await usersData.show(req.body.id);
        res.json(user);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
// handler for create model
const create = async (req, res) => {
    const userInput = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: req.body.password,
        username: req.body.username,
    };
    try {
        const newUser = await usersData.create(userInput);
        var token = jsonwebtoken_1.default.sign({ user: newUser }, config_1.default.tokenSecret);
        res.json({ newUser, token });
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
// handler for delete model
const remove = async (req, res) => {
    try {
        const user = await usersData.remove(req.body.id);
        res.json(user);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
// handler for authentication model
const authenticate = async (req, res, next) => {
    try {
        const user = {
            username: req.body.username,
            password: req.body.password,
        };
        const userInput = await usersData
            .authenticate(user.username, user.password)
            .then((data) => {
            if (data === null) {
                res.json("error : kindly insert valid username and password");
            }
            else {
                var token = jsonwebtoken_1.default.sign({ userlogin: user }, config_1.default.tokenSecret);
                res.json({ data, token });
                // next();
            }
        });
    }
    catch (error) {
        res.status(401).json(error);
    }
};
// product routes
const usersrouts = (app) => {
    app.post("/users/auth", authenticate);
    app.get("/users", verifyAuthToken_1.default, index);
    app.post("/users", create);
    app.get("/users/:id", verifyAuthToken_1.default, show);
    app.delete("/users/:id", verifyAuthToken_1.default, remove);
};
exports.default = usersrouts;
