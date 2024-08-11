# 🛒| Market - REST API

This project is a market REST API that allows the management of purchases, workers, and product stock.

## ⚙| Technologies Used

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- JWT & bcrypt for authentication
- Postman

## 📝| Features

- User/worker authentication and authorization
- Batch product creation and management
- Easy addition of products to stock through batch creation
- Stock management
- Sales profit and expected profit management
- Worker management
- Purchase creation

## 💻| Installation

1. Clone the repository or download the `.zip` file.
2. Import the application Postman collection using the file `market-API.postman_collection.json`.
3. Install the required dependencies using `npm install`.
4. Rename the file `.envExample` to `.env`.
5. Set up the database and configure the connection in the `.env` file.
6. Run the application through the console using `npm start`.
7. Use the application routes through **Postman**.

## 🕸| Application main URL:

This application main url is `localhost:3000/api-market/`.

## 📦| Usage

1. Use the application through _Postman_.
2. Create an _admin_ user first to use the application(use the route `/user/register/admin` for this).
3. After creating an admin you can access the route `/user/register/worker` to create workers.
4. Log in with the created user by using the route `/user/login`
5. Remember to always provide the Bearer token when accessing a route. Also, remember that the token expires in 1 hour.

For a better first experience with the application, I recommend creating an Admin user and explore all the routes using this user.

## 📋| Roles Access

- **_Admins:_** Can access all routes.
- **_Managers:_** Can access the following routes:
  - **Create User/Worker -** /user/register/worker
  - **Update User/Worker -** /user/update/:id
  - **Update User/Worker Role -** /user/update/role/:id
  - **Delete User/Worker -** /user/delete/:id
  - **Get All Stockers -** /user/all/stocker
  - **Get All Cashiers -** /user/all/cashier
  - **Get Stocker by ID -** /user/stocker/:id
  - **Get Cashier by ID -** /user/cashier/:id
  - **Get User/Worker by Name -** /user/name
  - **Get Stock Total Profit (estimated value) -** /stock/total-profit
  - **All routes related to batch management**
  - **Almost all routes related to purchase management, except the route to create a purchase**
- **_Stockers:_**
  - **All routes related to stock management**
  - **All routes related to product management**
- **_Cashiers:_**
  - **Can only access the route to create a purchase**

## ✏| License

This project is licensed under the [MIT License](LICENSE).

## 📃| To-do:

- [ ] Document this API using Swagger
- [ ] Add description to the folders of the Postman Collection
