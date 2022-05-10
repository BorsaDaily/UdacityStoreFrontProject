import config from "../config";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
// methode for verfiy token
const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorizationHeader = req.headers.authorization as string;
        const token = authorizationHeader.split(" ")[1];
        const decoded = jwt.verify(token, config.tokenSecret as string);
        next();
    } catch (error) {
        res.status(401).json("Data not valid : UnAuthorized User");
    }
};
export default verifyAuthToken;
