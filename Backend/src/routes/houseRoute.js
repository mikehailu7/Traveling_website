const express = require("express");
const multer = require('multer');
const reviewsRoute = require("./reviewRoute");
const housesController = require("../controllers/house/housesController");
const { isHouseOwner } = require("../middlewares/authorizeRoute");
const protectRoute = require("../controllers/auth/authController").protectRoute;


const PERMITED_IMAGE_FILES = ["png", "gif", "jpeg", "x-png", "bmp"];

const { createOne } = require("../services/add_image");

const houseRouter = express.Router();

const storage = multer.diskStorage({

  destination: function (req, file, cb) {
    cb(null, '../Backend/src/uploads')
  },

  filename: async function (req, file, cb) {

    try {

      const body = req.body;
      const newimg = await createOne(file);

      if (newimg.image) {
        body.imageCover = newimg.image.imageID;
        const uniqueSuffix = newimg.image.imageID;
        cb(null, uniqueSuffix);
      }
      else {
        cb(null, false);
      }

    } catch (error) {
      cb(null, false);
    }

  }

})


const fileFilter = async (req, file, cb) => {

  try {

    const path = req.path;

    if (path === '/') {

      const mimetype = file.mimetype.split("/");

      const find_file_type = PERMITED_IMAGE_FILES.find((row, index) => {

        if (mimetype[1] === row) {
          return row;
        }
        else {
          return null;
        }

      });


      if (find_file_type) {
        cb(null, true);
      }
      else {
        cb(null, false);
      }

    }
    else {
      cb(null, false);
    }

  } catch (error) {
    console.log({ error })
    console.log("Error happend happendhappend")
    cb(null, false);
  }

};



const upload_post = multer({ storage: storage, fileFilter });

houseRouter.use(upload_post.array('NewImageFile', 8));


// mount review router on this url
houseRouter.use("/:house/reviews", reviewsRoute);

houseRouter
  .route("/")
  .get(housesController.getAllHouses)
  .post(protectRoute, housesController.createHouse);

houseRouter.route("/category").get(housesController.getAllCategory);
houseRouter.route("/search").get(housesController.searchHouses);
houseRouter.route("/owner").get(protectRoute, housesController.getUserHouses);

houseRouter
  .route("/trending")
  .get(housesController.aliasForTreanding, housesController.getAllHouses);

houseRouter.route("/category/all").get(housesController.getAllCategoryFull);

houseRouter
  .route("/:id")
  .get(housesController.getHouse)
  .patch(
    protectRoute,
    isHouseOwner({ admin: true }),
    housesController.updateHouse
  )
  .delete(
    protectRoute,
    isHouseOwner({ admin: true }),
    housesController.deleteHouse
  );

module.exports = houseRouter;
