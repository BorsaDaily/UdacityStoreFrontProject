"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const database_1 = __importDefault(require("../../database"));
const request = (0, supertest_1.default)(server_1.default);
let tokentest = "";
let productID = 5;
describe("Test product handeler endpoints responses", () => {
    beforeAll(async () => {
        const response = await request.post("/users").send({
            firstname: "test2",
            lastname: "user",
            password: "testuser2password",
            username: "testuser2",
        });
        const { token } = response.body;
        tokentest = token;
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
    it("test creat product endpoint", async () => {
        const response = await request
            .post("/products")
            .set("Accept", "application/json")
            .set("authorization", `Bearer ${tokentest}`)
            .send({
            name: "testproduct2",
            price: 330,
            category: "testcategory2",
        });
        expect(response.status).toBe(200);
        expect(response.body.name).toBe("testproduct2");
        productID = response.body.id;
    });
    it("test Get All products endpoint", async () => {
        const response = await request
            .get("/products")
            .set("authorization", `Bearer ${tokentest}`);
        expect(response.status).toBe(200);
        expect(response.body.length).toEqual(1);
    });
    it("test Get product endpoint", async () => {
        const prouductresponse = await request
            .get("/products/:id")
            .send({ id: productID });
        expect(prouductresponse.status).toBe(200);
        expect(prouductresponse.body.name).toEqual("testproduct2");
    });
});
