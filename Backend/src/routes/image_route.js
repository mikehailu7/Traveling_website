const express = require("express");
const imageController = require("../controllers/image/imageController");
const protectRoute = require("../controllers/auth/authController").protectRoute;
const { restrictRole } = require("../middlewares/credentialroute");

const imageRouter = express.Router({ mergeParams: true });

// users access
// imageRouter.use(protectRoute);
// imageRouter.use(restrictRole(["admin"]));


imageRouter.get("/get/:imageid", imageController.getImage);





module.exports = imageRouter;
