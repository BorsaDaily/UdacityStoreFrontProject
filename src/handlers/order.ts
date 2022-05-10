import express, { Request, Response } from "express";
import { orderProduct, OrdersData } from "../models/order";
import verifyAuthToken from "./verifyAuthToken";
// object from model class
const orderData = new OrdersData();
// handler for index model
const index = async (req: Request, res: Response) => {
  try {
    const orders = await orderData.index();
    res.json(orders);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
// handler for show model
const show = async (req: Request, res: Response) => {
  try {
    const order = await orderData.show(
      parseInt(req.body.id as unknown as string)
    );
    res.json(order);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
// handler for create model
const create = async (req: Request, res: Response) => {
  const userID: number = parseInt(req.body.user_id as string);
  const userInput = {
    user_id: userID,
    status: req.body.status,
  };
  try {
    const neworder = await orderData.create(userInput);
    res.json(neworder);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
// handler for delete model
const remove = async (req: Request, res: Response) => {
  try {
    const order = await orderData.remove(req.body.id);
    res.json(order);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

// handler for delete model
const addProduct = async (_req: Request, res: Response) => {
  const userId: number = parseInt(_req.params.userID as string);
  const orderId: number = parseInt(_req.params.orderID as string);
  const productId: number = parseInt(_req.body.productId as string);
  const quantity: number = parseInt(_req.body.quantity as string);
  const order: orderProduct = {
    order_id: orderId,
    product_id: productId,
    user_id: userId,
    qty: quantity,
  };
  try {
    const addedProduct = await orderData.addProduct(order);
    res.json(addedProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
// order routes
const ordersrouts = (app: express.Application) => {
  app.get("/orders", verifyAuthToken, index);
  app.post("/orders", verifyAuthToken, create);
  app.get("/orders/:id", verifyAuthToken, show);
  app.delete("/orders/:id", verifyAuthToken, remove);
  // add product
  app.post("/users/:userID/orders/:orderID/products", addProduct);
};

export default ordersrouts;
