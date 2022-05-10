"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../../models/product");
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const database_1 = __importDefault(require("../../database"));
const users_1 = require("../../models/users");
const order_1 = require("../../models/order");
const request = (0, supertest_1.default)(server_1.default);
const productData = new product_1.ProductsData();
let tokentest = "";
let productID = 1;
let userId = 1;
let orderID = 1;
const p = {
    name: "testproduct1",
    price: 100,
    category: "testcategory1",
};
const userData = new users_1.UsersData();
const u = {
    firstname: "test1",
    lastname: "user",
    password: "testuser1password",
    username: "testuser1",
};
const ordersData = new order_1.OrdersData();
const o = {
    user_id: 1,
    status: "active",
};
describe("Test order handeler endpoints responses", () => {
    beforeAll(async () => {
        const response = await request
            .post("/users")
            .send(u)
            .then((response) => {
            const { newUser, token } = response.body;
            userId = parseInt(newUser.id);
            tokentest = token;
        })
            .then(async () => {
            const response = await request
                .post("/products")
                .set("Accept", "application/json")
                .set("authorization", `Bearer ${tokentest}`)
                .send(p);
            productID = parseInt(response.body.id);
        })
            .then(async () => {
            const response = await request
                .post("/orders")
                .set("Accept", "application/json")
                .set("authorization", `Bearer ${tokentest}`)
                .send({
                user_id: userId,
                status: "active",
            });
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
    it("test Get order endpoint", async () => {
        console.log(orderID, userId, productID);
        const OrderResponse = await request
            .get("/orders/:id")
            .set("authorization", `Bearer ${tokentest}`)
            .send({ id: orderID.toString() });
        expect(OrderResponse.status).toBe(200);
        expect(parseInt(OrderResponse.body.id)).toEqual(orderID);
        expect(parseInt(OrderResponse.body.user_id)).toEqual(userId);
    });
});
