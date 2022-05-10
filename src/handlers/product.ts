import express, { Request, Response } from "express";
import { ProductsData } from "../models/product";
import verifyAuthToken from "./verifyAuthToken";
// object from model class
const productData = new ProductsData();
// handler for index model
const index = async (req: Request, res: Response) => {
  try {
    const products = await productData.index();
    res.json(products);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
// handler for show model
const show = async (req: Request, res: Response) => {
  try {
    const product = await productData.show(req.body.id as number);
    res.json(product);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
// handler for create model
const create = async (req: Request, res: Response) => {
  const userInput = {
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
  };
  try {
    const newProduct = await productData.create(userInput);
    res.json(newProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
// handler for delete model
const remove = async (req: Request, res: Response) => {
  try {
    const product = await productData.remove(req.body.id);
    res.json(product);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
// product routes
const productsrouts = (app: express.Application) => {
  app.get("/products", index);
  app.post("/products", create);
  app.get("/products/:id", show);
  app.delete("/products/:id", verifyAuthToken, remove);
};

export default productsrouts;
