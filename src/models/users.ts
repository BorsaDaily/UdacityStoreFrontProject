import storeDB from "../database";
import bcrypt from "bcrypt";
import config from "../config";
// declare the user type
export type user = {
  firstname: string;
  lastname: string;
  username: string;
  password: string;
};
export type userRetrunedData = {
  id: number;
  firstname: string;
  lastname: string;
  username: string;
  password: string;
};
// declare user login information type
export type userlogin = {
  username: string;
  password: string;
};
// model class for CRUD at the database
export class UsersData {
  // methode for returning all Users Data
  async index(): Promise<userRetrunedData[]> {
    try {
      // connceting to the database
      const dbConnection = await storeDB.connect();
      const sql = "SELECT * FROM user_table";
      // Passing the sql Query to the database connection
      const result = dbConnection.query(sql);
      // release Connection
      dbConnection.release();
      return (await result).rows;
    } catch (error) {
      throw new Error(`can't get users data ${error}`);
    }
  }
  // methode for returning User by ID
  async show(id: number): Promise<userRetrunedData> {
    try {
      // connceting to the database
      const dbConnection = await storeDB.connect();
      const sql = "SELECT * FROM user_table WHERE id=($1)";
      // Passing the sql Query to the database connection
      const result = dbConnection.query(sql, [id]);
      // release Connection
      dbConnection.release();
      return (await result).rows[0];
    } catch (error) {
      throw new Error(`can't get user data ${error}`);
    }
  }
  // methode for Creating new User, Generating token, and hashing password
  async create(u: user): Promise<userRetrunedData> {
    try {
      const dbConnection = await storeDB.connect();
      // connceting to the database
      const sql =
        "INSERT INTO user_table (firstname,lastname,username,password) VALUES ($1, $2, $3, $4) RETURNING * ";
      // hashing User Password
      const hash = bcrypt.hashSync(
        u.password + config.pepper,
        parseInt(config.salt as string, 2)
      );
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
    } catch (error) {
      throw new Error(`can't create user  ${error}`);
    }
  }
  // methode for Removing  User by ID
  async remove(id: number): Promise<void> {
    try {
      // connceting to the database
      const dbConnection = await storeDB.connect();
      const sql = "DELETE FROM user_table WHERE id=($1)";
      // Passing the sql Query to the database connection
      const result = dbConnection.query(sql, [id]);
      // release Connection
      dbConnection.release();
      return (await result).rows[0];
    } catch (error) {
      throw new Error(`can't get user data ${error}`);
    }
  }
  // methode for authentication process and generating token
  async authenticate(username: string, password: string): Promise<user | null> {
    try {
      const conn = await storeDB.connect();
      const sqlpassword = "SELECT password FROM user_table WHERE username=($1)";
      const sqlUserData = "SELECT * FROM user_table WHERE username=($1)";
      const resultPassword = await conn.query(sqlpassword, [username]);
      const resultUserData = await conn.query(sqlUserData, [username]);
      if (resultPassword.rows.length) {
        const userPassword = await resultPassword.rows[0];
        const userData = await resultUserData.rows[0];
        if (
          bcrypt.compareSync(password + config.pepper, userPassword.password)
        ) {
          return userData;
        }
      }
    } catch (error) {
      throw new Error(`can't auth user data ${error}`);
    }
    return null;
  }
}
