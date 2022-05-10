"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersData = void 0;
const database_1 = __importDefault(require("../database"));
// model class for CRUD at the database
class OrdersData {
    async index() {
        try {
            const dbConnection = await database_1.default.connect();
            const sql = "SELECT * FROM order_table";
            const result = dbConnection.query(sql);
            dbConnection.release();
            return (await result).rows;
        }
        catch (error) {
            throw new Error(`can't get orders data ${error}`);
        }
    }
    // methode for returning order by ID
    async show(id) {
        try {
            const dbConnection = await database_1.default.connect();
            const sql = "SELECT * FROM order_table WHERE id=($1) ";
            const result = dbConnection.query(sql, [id]);
            dbConnection.release();
            return (await result).rows[0];
        }
        catch (error) {
            throw new Error(`can't get order data ${error}`);
        }
    }
    async create(o) {
        try {
            const dbConnection = await database_1.default.connect();
            const sql = "INSERT INTO order_table (user_id,status) VALUES ($1, $2) RETURNING * ";
            const result = dbConnection.query(sql, [o.user_id, o.status]);
            dbConnection.release();
            return (await result).rows[0];
        }
        catch (error) {
            throw new Error(`can't create new order  ${error}`);
        }
    }
    async remove(id) {
        try {
            const dbConnection = await database_1.default.connect();
            const sql = "DELETE FROM order_table WHERE id=($1)";
            const result = dbConnection.query(sql, [id]);
            dbConnection.release();
            return (await result).rows[0];
        }
        catch (error) {
            throw new Error(`can't get order data ${error}`);
        }
    }
    async addProduct(op) {
        try {
            const sql = "INSERT INTO order_product_table (order_id,product_id,user_id,qty) VALUES($1, $2, $3,$4) RETURNING *";
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [
                op.order_id,
                op.product_id,
                op.user_id,
                op.qty,
            ]);
            const orderProduct = result.rows[0];
            conn.release();
            return orderProduct;
        }
        catch (err) {
            throw new Error(`Could not add product ${op.product_id} to order ${op.order_id}: ${err}`);
        }
    }
}
exports.OrdersData = OrdersData;
