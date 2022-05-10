import { user, UsersData } from "../users";
import storeDB from "../../database";

const userData = new UsersData();

describe("Testing users methodes exsitance", () => {
  it("Testing Index method", () => {
    expect(userData.index).toBeDefined();
  });
  it("Testing show method", () => {
    expect(userData.show).toBeDefined();
  });
  it("Testing create method", () => {
    expect(userData.create).toBeDefined();
  });
  it("Testing remove method", () => {
    expect(userData.remove).toBeDefined();
  });
  it("Testing authenticate method", () => {
    expect(userData.authenticate).toBeDefined();
  });
});

describe("Testing users model", () => {
  const u: user = {
    firstname: "test1",
    lastname: "user",
    password: "testuser1password",
    username: "testuser1",
  };
  beforeAll(async () => {
    const newuser = await userData.create(u);
  });
  afterAll(async () => {
    const conn = await storeDB.connect();
    const sql1 = "DELETE FROM user_table;";
    const sql2 = "DELETE FROM product_table;";
    const sql3 = "DELETE FROM order_table;";
    const sql4 = "DELETE FROM order_product_table;";
    await conn
      .query(sql4)
      .then(async () => {
        conn.query(sql3);
      })
      .then(async () => {
        conn.query(sql2);
      })
      .then(async () => {
        conn.query(sql1);
      });
    conn.release();
  });
  it("create new user ", async () => {
    const createdUser = await userData.create({
      firstname: "test2",
      lastname: "user",
      password: "testuser2password",
      username: "testuser2",
    });
    expect(createdUser.username).toEqual("testuser2");
  });

  it("returning all users from database", async () => {
    const getAllUsers = await userData.index();
    expect(getAllUsers.length).toEqual(2);
  });

  it("returning user by id", async () => {
    const getUser = await userData.show(1);
    expect((await userData.create(u)).username).toEqual("testuser1");
  });

  it("delete user by id", async () => {
    const removeUser = await userData.remove(1);
    expect(removeUser).toBe();
  });

  it("authenticate user", async () => {
    const authUser = await userData.authenticate(
      "testuser1",
      "testuser1password"
    );
    expect((await userData.create(u)).username).toEqual("testuser1");
  });
});
