"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsData = void 0;
const database_1 = __importDefault(require("../database"));
// model class for CRUD at the database
class ProductsData {
    // methode for returning all Users Data
    async index() {
        try {
            // connceting to the database
            const dbConnection = await database_1.default.connect();
            const sql = "SELECT * FROM product_table";
            // Passing the sql Query to the database connection
            const result = dbConnection.query(sql);
            // release Connection
            dbConnection.release();
            return (await result).rows;
        }
        catch (error) {
            throw new Error(`can't get products data ${error}`);
        }
    }
    // methode for returning Product by ID
    async show(id) {
        try {
            const dbConnection = await database_1.default.connect();
            const sql = "SELECT * FROM product_table WHERE id=($1)";
            const result = dbConnection.query(sql, [id]);
            dbConnection.release();
            return (await result).rows[0];
        }
        catch (error) {
            throw new Error(`can't get product data ${error}`);
        }
    }
    // methode for Creating new Product
    async create(p) {
        try {
            const dbConnection = await database_1.default.connect();
            const sql = "INSERT INTO product_table (name,price,category) VALUES ($1, $2, $3) RETURNING * ";
            const result = dbConnection.query(sql, [p.name, p.price, p.category]);
            dbConnection.release();
            return (await result).rows[0];
        }
        catch (error) {
            throw new Error(`can't create new product  ${error}`);
        }
    }
    // methode for Removing Product by ID
    async remove(id) {
        try {
            const dbConnection = await database_1.default.connect();
            const sql = "DELETE FROM product_table WHERE id=($1)";
            const result = dbConnection.query(sql, [id]);
            dbConnection.release();
            return (await result).rows[0];
        }
        catch (error) {
            throw new Error(`can't get product data ${error}`);
        }
    }
}
exports.ProductsData = ProductsData;
