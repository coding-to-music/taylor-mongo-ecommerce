import express from "express";

//controllers
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
} from "../controllers/userController.js";

//middleware, protects the route from unauthorized access
import { protect } from "../middleware/authMiddleware.js";

//handles various incoming routes
const router = express.Router();

//if port 5000 receives a get request to '/api/users'
//the async handler will pass of errors to the master error handler
router.post("/login", authUser);

//if port 5000 receives a get request to '/api/'
//the async handler will pass of errors to the master error handler
router.route("/").post(registerUser);

//use route when you need to handle multiple types of requests, ie get, put, post
//in order to protect or limit access to a route, we wrap the middleware that we made called protect as the first argument
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default router;
