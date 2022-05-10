import express, { Request, Response, NextFunction } from "express";
import { userlogin, UsersData } from "../models/users";
import jwt from "jsonwebtoken";
import config from "../config";
import verifyAuthToken from "./verifyAuthToken";
// object from model class
const usersData = new UsersData();
// handler for index model
const index = async (req: Request, res: Response) => {
  try {
    const users = await usersData.index();
    res.json(users);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
// handler for show model
const show = async (req: Request, res: Response) => {
  try {
    const user = await usersData.show(req.body.id as number);
    res.json(user);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
// handler for create model
const create = async (req: Request, res: Response) => {
  const userInput = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    password: req.body.password,
    username: req.body.username,
  };
  try {
    const newUser = await usersData.create(userInput);
    var token = jwt.sign({ user: newUser }, config.tokenSecret as string);
    res.json({ newUser, token });
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
// handler for delete model
const remove = async (req: Request, res: Response) => {
  try {
    const user = await usersData.remove(req.body.id);
    res.json(user);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
// handler for authentication model
const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user: userlogin = {
      username: req.body.username,
      password: req.body.password,
    };
    const userInput = await usersData
      .authenticate(user.username, user.password)
      .then((data) => {
        if (data === null) {
          res.json("error : kindly insert valid username and password");
        } else {
          var token = jwt.sign(
            { userlogin: user },
            config.tokenSecret as string
          );
          res.json({ data, token });
          // next();
        }
      });
  } catch (error) {
    res.status(401).json(error);
  }
};
// product routes
const usersrouts = (app: express.Application) => {
  app.post("/users/auth", authenticate);
  app.get("/users", verifyAuthToken, index);
  app.post("/users", create);
  app.get("/users/:id", verifyAuthToken, show);
  app.delete("/users/:id", verifyAuthToken, remove);
};

export default usersrouts;
