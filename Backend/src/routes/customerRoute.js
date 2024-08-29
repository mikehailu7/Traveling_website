const express = require("express");
const usersController = require("../controllers/user/customer_controller");
const protectRoute = require("../controllers/auth/authenticatecont").protectRoute;
const { restrictRole } = require("../middlewares/credentialroute");

const userRouter = express.Router({ mergeParams: true });

userRouter
  .route("/")
  .get(protectRoute, restrictRole(["admin"]), usersController.getAllUsers); //not ideal unless for the admin

// users access
userRouter.use(protectRoute);
userRouter.get("/me", usersController.getMe, usersController.getUser);

userRouter.post("/follow", usersController.getMe, usersController.follow);
userRouter.delete("/follow", usersController.getMe, usersController.unFollow);

userRouter.patch("/me/update", usersController.updateMe);

userRouter.patch("/me/changePassword", usersController.updateMyPassword);

userRouter.delete("/me/delete", usersController.deleteMe);

userRouter.use(restrictRole(["admin"]));
userRouter
  .route("/:id")
  .get(restrictRole("admin"), usersController.getUser)
  .patch(usersController.updateUser)
  .delete(usersController.deleteUser);

module.exports = userRouter;
