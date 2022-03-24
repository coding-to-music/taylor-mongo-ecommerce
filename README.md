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

## Deploy to Heroku

```java
heroku create taylor-mongo-ecommerce

heroku config:set MONGO_URI="mongodb+srv://<userid>:<password>@cluster0.zadqe.mongodb.net/TaylorEcommerce?retryWrites=true&w=majority"
```
