import storeDB from "../database";
// declare the order type

export type orderProduct = {
  order_id: number;
  product_id: number;
  user_id: number;
  qty: number;
};
export type order = {
  user_id: number;
  status: string;
};
export type orderReturnedData = {
  id: number;
  user_id: number;
  status: string;
};
// model class for CRUD at the database
export class OrdersData {
  async index(): Promise<orderReturnedData[]> {
    try {
      const dbConnection = await storeDB.connect();
      const sql = "SELECT * FROM order_table";
      const result = dbConnection.query(sql);
      dbConnection.release();
      return (await result).rows;
    } catch (error) {
      throw new Error(`can't get orders data ${error}`);
    }
  }
  // methode for returning order by ID
  async show(id: number): Promise<orderReturnedData> {
    try {
      const dbConnection = await storeDB.connect();
      const sql = "SELECT * FROM order_table WHERE id=($1) ";
      const result = dbConnection.query(sql, [id]);
      dbConnection.release();
      return (await result).rows[0];
    } catch (error) {
      throw new Error(`can't get order data ${error}`);
    }
  }
  async create(o: order): Promise<orderReturnedData> {
    try {
      const dbConnection = await storeDB.connect();
      const sql =
        "INSERT INTO order_table (user_id,status) VALUES ($1, $2) RETURNING * ";
      const result = dbConnection.query(sql, [o.user_id, o.status]);
      dbConnection.release();
      return (await result).rows[0];
    } catch (error) {
      throw new Error(`can't create new order  ${error}`);
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const dbConnection = await storeDB.connect();
      const sql = "DELETE FROM order_table WHERE id=($1)";
      const result = dbConnection.query(sql, [id]);
      dbConnection.release();
      return (await result).rows[0];
    } catch (error) {
      throw new Error(`can't get order data ${error}`);
    }
  }

  async addProduct(op: orderProduct): Promise<orderProduct> {
    try {
      const sql =
        "INSERT INTO order_product_table (order_id,product_id,user_id,qty) VALUES($1, $2, $3,$4) RETURNING *";
      const conn = await storeDB.connect();
      const result = await conn.query(sql, [
        op.order_id,
        op.product_id,
        op.user_id,
        op.qty,
      ]);
      const orderProduct = result.rows[0];
      conn.release();
      return orderProduct;
    } catch (err) {
      throw new Error(
        `Could not add product ${op.product_id} to order ${op.order_id}: ${err}`
      );
    }
  }
}
