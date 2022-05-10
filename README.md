# Storefront Backend Project

## Technologies

the application structured by the following libraries:

- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing

## Setup and Configrations

#### Prepare ENV

1. ENV=dev
2. PGHOST=localhost
3. PGUSER=postgres
4. PGDATABASE=store_db
   PGDATABASETEST=store_db_test
   PGPASSWORD=password123
   PGPORT=5432
   BYCRYPT_PASSWORD=UDACITY220322
   SALT_ROUND=10
   TOKEN_SECRET=UDACITYtoken220322

#### scripts

- npm run test : Testing Script
- npm run watch : start project with nodemon
- DataBase Port :5432
- Epress Port : 3000
- Project root : [local host link](http://localhost:3000/)

## Project branches

### 1. DB Creation and Migrations

#### Database Setup

- psql -U postgres ( all privileges granted)
- CREATE DATABASE store_db
- CREATE DATABASE store_db_test --> testing dataBase
- db-migrate up --> to run migrations
- Env Variables allocated at database.json file

#### Data Shapes

##### Product

- id with Data type:SERIAL PRIMARY KEY,
- name with Data type: VARCHAR(50),
- price with Data type: INTEGER,
- category with Data type: VARCHAR(50)

##### User

- id with Data type:SERIAL PRIMARY KEY,
- firstName with Data type: VARCHAR(50),
- lastName with Data type: VARCHAR(50),
- password with Data type: TEXT,

##### Orders

- id with Data type:SERIAL PRIMARY KEY,
- user_id : Foreign KEY REFERENCE from user_table
- status with Data type: VARCHAR(20),

##### OrderProduct (many to many)

- id with Data type:SERIAL PRIMARY KEY,
- Product_id : Foreign KEY REFERENCE from Product_table
- user_id : Foreign KEY REFERENCE from user_table
- order_id : Foreign KEY REFERENCE from order_table
- qty with Data type: INTEGER,
- status with Data type: VARCHAR(20),

### 2. Models

The methods in each model for implementing CRUD operations

#### User

- authenticate-->(tested) : authentication process and generating token
- index-->(tested) : returning all Users
- create-->(tested) : Creating new User, Generating token, and hashing password
- show-->(tested) : returning User by ID
- remove-->(tested) : Removing User by ID

#### Product

- index-->(tested) : returning all product
- create-->(tested) : Creating new product
- show-->(tested) : returning product by ID
- remove-->(tested): Removing product by ID

#### Order

- index-->(tested) : returning all order
- create-->(tested) : Creating new order
- show-->(tested) : returning order by ID
- remove-->(tested): Removing order by ID
- addProduct-->(tested): add new Product to a particular order

### 3. Express Handlers

handeler routes for each model

#### User

- app.post('/users/auth',authenticate)-->(tested) : authentication route
- app.get('/users',verifyAuthToken,index)-->(tested) : returning all Users
- app.post('/users',create)-->(tested) : Creating new User
- app.get('/users/:id',verifyAuthToken,show)-->(tested) : returning User by ID
- app.delete('/users/:id',verifyAuthToken,remove)-->(not tested as not used): Removing User by ID

#### Product

- app.get('/products',index)-->(tested) : returning all product
- app.post('/products',verifyAuthToken,create)-->(tested) : Creating new product
- app.get('/products/:id',show)-->(tested) : returning product by ID
- app.delete('/products/:id',verifyAuthToken,remove)-->(not tested as not used): Removing product by ID

#### Order

- app.get('/orders',verifyAuthToken,index)-->(not tested as not used) : returning all order
- app.post('/orders',verifyAuthToken,create)-->(not tested as not used) : Creating new order
- app.get('/orders/:id',verifyAuthToken,show)-->(tested) : returning order by ID
- app.delete('/orders/:id',verifyAuthToken,remove)-->(not tested as not used): Removing order by ID
- app.post("/users/:userID/orders/:orderID/products", addProduct) : add new product to order and user by ID

### 4. JWTs

JWT functionality required for the routes listed above as verifyAuthToken.
