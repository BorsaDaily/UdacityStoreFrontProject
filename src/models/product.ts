import storeDB from "../database";
// declare the product type
export type product = {
    name: string;
    price: number;
    category: string;
};
export type productReturnedData = {
    id:number;
    name: string;
    price: number;
    category: string;
};
// model class for CRUD at the database
export class ProductsData {
    // methode for returning all Users Data
    async index(): Promise<productReturnedData[]> {
        try {
            // connceting to the database
            const dbConnection = await storeDB.connect();
            const sql = "SELECT * FROM product_table";
            // Passing the sql Query to the database connection
            const result = dbConnection.query(sql);
            // release Connection
            dbConnection.release();
            return (await result).rows;
        } catch (error) {
            throw new Error(`can't get products data ${error}`);
        }
    }
    // methode for returning Product by ID
    async show(id: number): Promise<productReturnedData> {
        try {
            const dbConnection = await storeDB.connect();
            const sql = "SELECT * FROM product_table WHERE id=($1)";
            const result = dbConnection.query(sql, [id]);
            dbConnection.release();
            return (await result).rows[0];
        } catch (error) {
            throw new Error(`can't get product data ${error}`);
        }
    }
    // methode for Creating new Product
    async create(p: product): Promise<productReturnedData> {
        try {
            const dbConnection = await storeDB.connect();
            const sql =
                "INSERT INTO product_table (name,price,category) VALUES ($1, $2, $3) RETURNING * ";
            const result = dbConnection.query(sql, [p.name, p.price, p.category]);
            dbConnection.release();
            return (await result).rows[0];
        } catch (error) {
            throw new Error(`can't create new product  ${error}`);
        }
    }
    // methode for Removing Product by ID
    async remove(id: number): Promise<void> {
        try {
            const dbConnection = await storeDB.connect();
            const sql = "DELETE FROM product_table WHERE id=($1)";
            const result = dbConnection.query(sql, [id]);
            dbConnection.release();
            return (await result).rows[0];
        } catch (error) {
            throw new Error(`can't get product data ${error}`);
        }
    }
}
