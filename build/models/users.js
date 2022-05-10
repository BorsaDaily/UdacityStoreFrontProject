"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersData = void 0;
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../config"));
// model class for CRUD at the database
class UsersData {
    // methode for returning all Users Data
    async index() {
        try {
            // connceting to the database
            const dbConnection = await database_1.default.connect();
            const sql = "SELECT * FROM user_table";
            // Passing the sql Query to the database connection
            const result = dbConnection.query(sql);
            // release Connection
            dbConnection.release();
            return (await result).rows;
        }
        catch (error) {
            throw new Error(`can't get users data ${error}`);
        }
    }
    // methode for returning User by ID
    async show(id) {
        try {
            // connceting to the database
            const dbConnection = await database_1.default.connect();
            const sql = "SELECT * FROM user_table WHERE id=($1)";
            // Passing the sql Query to the database connection
            const result = dbConnection.query(sql, [id]);
            // release Connection
            dbConnection.release();
            return (await result).rows[0];
        }
        catch (error) {
            throw new Error(`can't get user data ${error}`);
        }
    }
    // methode for Creating new User, Generating token, and hashing password
    async create(u) {
        try {
            const dbConnection = await database_1.default.connect();
            // connceting to the database
            const sql = "INSERT INTO user_table (firstname,lastname,username,password) VALUES ($1, $2, $3, $4) RETURNING * ";
            // hashing User Password
            const hash = bcrypt_1.default.hashSync(u.password + config_1.default.pepper, parseInt(config_1.default.salt, 2));
            // Passing the sql Query to the database connection
            const result = dbConnection.query(sql, [
                u.firstname,
                u.lastname,
                u.username,
                hash,
            ]);
            // release Connection
            dbConnection.release();
            return (await result).rows[0];
        }
        catch (error) {
            throw new Error(`can't create user  ${error}`);
        }
    }
    // methode for Removing  User by ID
    async remove(id) {
        try {
            // connceting to the database
            const dbConnection = await database_1.default.connect();
            const sql = "DELETE FROM user_table WHERE id=($1)";
            // Passing the sql Query to the database connection
            const result = dbConnection.query(sql, [id]);
            // release Connection
            dbConnection.release();
            return (await result).rows[0];
        }
        catch (error) {
            throw new Error(`can't get user data ${error}`);
        }
    }
    // methode for authentication process and generating token
    async authenticate(username, password) {
        try {
            const conn = await database_1.default.connect();
            const sqlpassword = "SELECT password FROM user_table WHERE username=($1)";
            const sqlUserData = "SELECT * FROM user_table WHERE username=($1)";
            const resultPassword = await conn.query(sqlpassword, [username]);
            const resultUserData = await conn.query(sqlUserData, [username]);
            if (resultPassword.rows.length) {
                const userPassword = await resultPassword.rows[0];
                const userData = await resultUserData.rows[0];
                if (bcrypt_1.default.compareSync(password + config_1.default.pepper, userPassword.password)) {
                    return userData;
                }
            }
        }
        catch (error) {
            throw new Error(`can't auth user data ${error}`);
        }
        return null;
    }
}
exports.UsersData = UsersData;
