//Author: mikias hailu and yared tsgie
const express = require("express");
const usersController = require("../controllers/user/customer_controller");
const protectRoute = require("../controllers/auth/authenticatecont").protectRoute;
const { restrictRole } = require("../middlewares/credentialroute");

const userRouter = express.Router({ mergeParams: true });
//customer router
customerRouter
  .route("/")
  .get(protectRoute, restrictRole(["admin"]), usersController.getAllUsers); 

customerRouter.use(protectRoute);
//get
customerRouter.get("/me", usersController.getMe, usersController.getUser);

//delete
customerRouter.delete("/follow", usersController.getMe, usersController.unFollow);
//post
customerRouter.post("/follow", usersController.getMe, usersController.follow);
//delete
customerRouter.delete("/me/delete", usersController.deleteMe);
//patch
customerRouter.patch("/me/update", usersController.updateMe);

userRouter.patch("/me/changePassword", usersController.updateMyPassword);

customerRouter.use(restrictRole(["admin"]));
customerRouter
  .route("/:id")
  .get(restrictRole("admin"), usersController.getUser)
  .patch(usersController.updateUser)
  .delete(usersController.deleteUser);

module.exports = userRouter;
