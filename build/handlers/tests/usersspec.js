"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../../models/users");
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const database_1 = __importDefault(require("../../database"));
const request = (0, supertest_1.default)(server_1.default);
const userData = new users_1.UsersData();
let tokentest = "";
let userId = "";
const u = {
    firstname: "test1",
    lastname: "user",
    password: "testuser1password",
    username: "testuser1",
};
const loginData = {
    username: "testuser1",
    password: "testuser1password",
};
describe("Test User handeler endpoints responses", () => {
    beforeAll(async () => {
        const newuser = await userData.create(u);
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
    it("test authentication user endpoint", async () => {
        const response = await request.post("/users/auth").send(loginData);
        const { username, token } = response.body.data;
        expect(response.status).toBe(200);
        expect(username).toBe(loginData.username);
    });
    it("test creat user endpoint", async () => {
        const response = await request.post("/users").send({
            firstname: "test2",
            lastname: "user",
            password: "testuser2password",
            username: "testuser2",
        });
        const { newUser, token } = response.body;
        expect(response.status).toBe(200);
        expect(newUser.username).toBe("testuser2");
        tokentest = token;
        userId = newUser.id;
    });
    it("test Get All Users endpoint", async () => {
        const response = await request
            .get("/users")
            .set("authorization", `Bearer ${tokentest}`);
        expect(response.status).toBe(200);
        expect(response.body.length).toEqual(2);
    });
    it("test Get User endpoint", async () => {
        const response = await request
            .get(`/users/:id`)
            .set("authorization", `Bearer ${tokentest}`)
            .send({ id: userId });
        expect(response.status).toBe(200);
        expect(response.body.username).toEqual("testuser2");
    });
});
exports.default = tokentest;
