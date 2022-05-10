"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../models/order");
const verifyAuthToken_1 = __importDefault(require("./verifyAuthToken"));
// object from model class
const orderData = new order_1.OrdersData();
// handler for index model
const index = async (req, res) => {
    try {
        const orders = await orderData.index();
        res.json(orders);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
// handler for show model
const show = async (req, res) => {
    try {
        const order = await orderData.show(parseInt(req.body.id));
        res.json(order);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
// handler for create model
const create = async (req, res) => {
    const userID = parseInt(req.body.user_id);
    const userInput = {
        user_id: userID,
        status: req.body.status,
    };
    try {
        const neworder = await orderData.create(userInput);
        res.json(neworder);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
// handler for delete model
const remove = async (req, res) => {
    try {
        const order = await orderData.remove(req.body.id);
        res.json(order);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
// handler for delete model
const addProduct = async (_req, res) => {
    const userId = parseInt(_req.params.userID);
    const orderId = parseInt(_req.params.orderID);
    const productId = parseInt(_req.body.productId);
    const quantity = parseInt(_req.body.quantity);
    const order = {
        order_id: orderId,
        product_id: productId,
        user_id: userId,
        qty: quantity,
    };
    try {
        const addedProduct = await orderData.addProduct(order);
        res.json(addedProduct);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
// order routes
const ordersrouts = (app) => {
    app.get("/orders", verifyAuthToken_1.default, index);
    app.post("/orders", verifyAuthToken_1.default, create);
    app.get("/orders/:id", verifyAuthToken_1.default, show);
    app.delete("/orders/:id", verifyAuthToken_1.default, remove);
    // add product
    app.post("/users/:userID/orders/:orderID/products", addProduct);
};
exports.default = ordersrouts;
