import express, { Request, Response } from "express";
import cors from "cors";
import storeDB from "./database";
import usersrouts from "./handlers/users";
import productrouts from "./handlers/product";
import orderrouts from "./handlers/order";
// installing Server
const app: express.Application = express();
const address: string = "0.0.0.0:3000";
// installing middlewares
app.use(cors());
app.use(express.json()); 
// startup function
app.get("/", function (req: Request, res: Response) {
    res.send("Hello World!");
});
//listening to server
app.listen(3000, function () {
    console.log(`starting app on: ${address}`);
});
// connecting to database instance and handling connection error if any
storeDB.connect().then(async (Client) => {
    const res = await Client.query("SELECT NOW()");
    Client.release();
    console.log(res.rows);
});
storeDB.on("error", (err: Error) => {
    console.error(err.message);
});
// to enable us to use models and handelers methodes
usersrouts(app);
productrouts(app);
orderrouts(app);
export default app;
