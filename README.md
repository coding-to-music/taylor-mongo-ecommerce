# Taylor ECommerce with MongoDB, load sample data, product inventory, and user accounts, cart

https://github.com/coding-to-music/taylor-mongo-ecommerce

https://taylor-mongo-ecommerce.herokuapp.com/

By Michael Barry https://github.com/MB13534

https://taylor-ecommerce.herokuapp.com/

https://github.com/MB13534/taylor-ecommerce

## About

This is a functional and responsive e-commerce website to support my girlfriend Taylor's clothing reselling business. In addition to the MERN stack, this project features Redux for state management, the PayPal API for payment, bcrypt for encryption and authentication, and separate CRUD operations that follow RESTful conventions for viewers, acco…

react redux nodejs ecommerce scraper express state-management mongodb authentication responsive stripe-api mongoose react-bootstrap localstorage modals axios bcrypt ebay-api selenium-python

## Setup

Modify .env

```java
MONGO_URI="mongodb+srv://<userid>:<password>@cluster0.zadqe.mongodb.net/TaylorEcommerce?retryWrites=true&w=majority"
JWT_SECRET="somethingComplicated"
```

```java
  "scripts": {
    "start": "node backend/server",
    "server": "nodemon backend/server",
    "client": "npm start --prefix frontend",
    "dev": "concurrently \"npm run server\" \"npm run client\"",
    "data:import": "node backend/seeder",
    "data:destroy": "node backend/seeder -d",
    "heroku-postbuild": "NPM_CONFIG_PRODUCTION=false npm install --prefix frontend && npm run build --prefix frontend"
```

## Import data

```java
npm run data:destroy
npm run data:import
```

Output:

```java
> taylor-ecommerce@1.0.0 data:import
> node backend/seeder

(node:41162) Warning: Accessing non-existent property 'MongoError' of module exports inside circular dependency
(Use `node --trace-warnings ...` to show where the warning was created)
MongoDB connected: cluster0-shard-00-00.zadqe.mongodb.net
Data has been imported!
```

## Deploy to Heroku

```java
heroku create taylor-mongo-ecommerce

heroku config:set MONGO_URI="mongodb+srv://<userid>:<password>@cluster0.zadqe.mongodb.net/TaylorEcommerce?retryWrites=true&w=majority"
heroku config:set JWT_SECRET="somethingComplicated"

heroku logs --tail
```

## Users and Logins

sample users are created as part of the data seeding process

View the users and passwords in

```java
/backend/data/user.js
```
