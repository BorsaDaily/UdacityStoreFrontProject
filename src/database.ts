import dotenv from "dotenv";
import { Pool } from "pg";
// enable us to get information from ENV
dotenv.config();
// destructing ENV information
const { ENV, PGHOST, PGUSER, PGDATABASE, PGDATABASETEST, PGPASSWORD, PGPORT } =
    process.env;
// instance for database
let storeDB;
// DataBase ENV conditions for development and test
if (ENV === "dev") {
    (storeDB as unknown as Pool) = new Pool({
        user: PGUSER,
        host: PGHOST,
        database: PGDATABASE,
        password: PGPASSWORD,
        port: parseInt(PGPORT as string, 10),
    });
}
if (ENV === "test") {
    (storeDB as unknown as Pool) = new Pool({
        user: PGUSER,
        host: PGHOST,
        database: PGDATABASETEST,
        password: PGPASSWORD,
        port: parseInt(PGPORT as string, 10),
    });
}
// exporting the Database instance
export default storeDB as unknown as Pool;
