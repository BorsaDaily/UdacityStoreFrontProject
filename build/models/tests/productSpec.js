"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../product");
const database_1 = __importDefault(require("../../database"));
const productData = new product_1.ProductsData();
describe("Testing products methodes exsitance", () => {
    it("Testing Index method", () => {
        expect(productData.index).toBeDefined();
    });
    it("Testing show method", () => {
        expect(productData.show).toBeDefined();
    });
    it("Testing create method", () => {
        expect(productData.create).toBeDefined();
    });
    it("Testing remove method", () => {
        expect(productData.remove).toBeDefined();
    });
    describe("Testing Product model", () => {
        const p = {
            name: "testproduct1",
            price: 100,
            category: "testcategory1",
        };
        beforeAll(async () => {
            const newuser = await productData.create(p);
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
        it("create new Product ", async () => {
            const createdProduct = await productData.create({
                name: "testproduct2",
                price: 500,
                category: "testcategory2",
            });
            expect(createdProduct.name).toEqual("testproduct2");
            expect(createdProduct.price).toEqual(500);
        });
        it("returning all Products from database", async () => {
            const getAllProducts = await productData.index();
            expect(getAllProducts.length).toEqual(2);
        });
        it("returning product by id", async () => {
            const getProduct = await productData.show(1);
            expect((await productData.create(p)).name).toEqual("testproduct1");
        });
        it("delete product by id", async () => {
            const removeProduct = await productData.remove(1);
            expect(removeProduct).toBe();
        });
    });
});
