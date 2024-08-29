const express = require("express");
const imageController = require("../controllers/image/phonecontroller");
const protectRoute = require("../controllers/auth/authenticatecont").protectRoute;
const { restrictRole } = require("../middlewares/credentialroute");

const imageRouter = express.Router({ mergeParams: true });

imageRouter.get("/get/:imageid", imageController.getImage);





module.exports = imageRouter;
