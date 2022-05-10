"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../models/product");
const verifyAuthToken_1 = __importDefault(require("./verifyAuthToken"));
// object from model class
const productData = new product_1.ProductsData();
// handler for index model
const index = async (req, res) => {
    try {
        const products = await productData.index();
        res.json(products);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
// handler for show model
const show = async (req, res) => {
    try {
        const product = await productData.show(req.body.id);
        res.json(product);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
// handler for create model
const create = async (req, res) => {
    const userInput = {
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
    };
    try {
        const newProduct = await productData.create(userInput);
        res.json(newProduct);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
// handler for delete model
const remove = async (req, res) => {
    try {
        const product = await productData.remove(req.body.id);
        res.json(product);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
// product routes
const productsrouts = (app) => {
    app.get("/products", index);
    app.post("/products", create);
    app.get("/products/:id", show);
    app.delete("/products/:id", verifyAuthToken_1.default, remove);
};
exports.default = productsrouts;
