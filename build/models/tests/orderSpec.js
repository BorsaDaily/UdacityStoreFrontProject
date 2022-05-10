"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../order");
const database_1 = __importDefault(require("../../database"));
const product_1 = require("../../models/product");
const users_1 = require("../../models/users");
const orderData = new order_1.OrdersData();
const userData = new users_1.UsersData();
const productData = new product_1.ProductsData();
describe("Testing Orders methodes exsitance", () => {
    it("Testing Index method", () => {
        expect(orderData.index).toBeDefined();
    });
    it("Testing show method", () => {
        expect(orderData.show).toBeDefined();
    });
    it("Testing create method", () => {
        expect(orderData.create).toBeDefined();
    });
    it("Testing remove method", () => {
        expect(orderData.remove).toBeDefined();
    });
    it("Testing remove method", () => {
        expect(orderData.addProduct).toBeDefined();
    });
    describe("Testing Order model", () => {
        let userID;
        let productID;
        let orderID;
        const u = {
            firstname: "test",
            lastname: "user",
            username: "testuser1",
            password: "testuser1password",
        };
        const p = {
            name: "testProduct1",
            price: 200,
            category: "testcategory1",
        };
        let o = {
            user_id: 100,
            status: "approved",
        };
        let addedProduct = {
            order_id: 1,
            product_id: 1,
            user_id: 1,
            qty: 25,
        };
        beforeAll(async () => {
            await userData.create(u).then((result) => {
                userID = result.id;
            });
            await productData.create(p).then((result) => {
                productID = result.id;
            });
            await orderData
                .create({
                user_id: userID,
                status: "approved",
            })
                .then((result) => {
                orderID = result.id;
            });
        });
        afterAll(async () => {
            const conn = await database_1.default.connect();
            const sql1 = "DELETE FROM user_table;";
            const sql2 = "DELETE FROM product_table;";
            const sql3 = "DELETE FROM order_table;";
            const sql4 = "DELETE FROM order_product_table;";
            await conn
                .query(sql4)
                .then(async () => {
                conn.query(sql3);
            })
                .then(async () => {
                conn.query(sql2);
            })
                .then(async () => {
                conn.query(sql1);
            });
            conn.release();
        });
        it("create new order ", async () => {
            const createdorder = await orderData.create({
                user_id: userID,
                status: "delivered",
            });
            expect(parseInt(createdorder.user_id)).toEqual(userID);
            expect(createdorder.status).toEqual("delivered");
        });
        it("returning all Orders from database", async () => {
            const getAllOrder = await orderData.index();
            expect(getAllOrder.length).toEqual(2);
        });
        it("returning Order by id", async () => {
            const getOrder = await orderData.show(orderID);
            expect(parseInt(getOrder.id)).toEqual(orderID);
            expect(parseInt(getOrder.user_id)).toEqual(userID);
            expect(getOrder.status).toEqual("approved");
        });
        it("delete Order by id", async () => {
            const removeOrder = await orderData.remove(1);
            expect(removeOrder).toBe();
        });
        it("adding product to order", async () => {
            const orderedProduct = await orderData.addProduct({
                order_id: orderID,
                product_id: productID,
                user_id: userID,
                qty: 25,
            });
            expect(parseInt(orderedProduct.order_id)).toBe(orderID);
            expect(parseInt(orderedProduct.product_id)).toBe(productID);
            expect(parseInt(orderedProduct.qty)).toBe(25);
            expect(parseInt(orderedProduct.user_id)).toBe(userID);
        });
    });
});
