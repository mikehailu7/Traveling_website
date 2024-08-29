//author: mikias hailu and yared tsgie
const validator = require("validator");
const bcrypt = require("bcrypt");
const { Schema, model } = require("mongoose");


const imageSchema = new Schema(
  {

    // imageid
    imageID: {
      type: String,
      required: [true, "imgID is required"],
      minlength: [2, "imgID to contain 2 characters!"],
    },

    mimetype: {
      type: String,
      required: [true, "place id is required"],
      minlength: [2, "place id contain 2 characters!"],
    },

    encoding: {
      type: String,
      required: [true, "encoding is req"],
      minlength: [2, "encoding atleast 2 char!"],
    },

    originalname: {
      type: String,
      required: [true, "originalname is required"],
      minlength: [2, "originalname atleast 2 char"],
    },

    createdAt: {
      type: Date,
      default: Date.now(),
      validate: [validator.isDate, "wrong date format"],
    },

    active: {
      type: Boolean,
      default: true,
      select: false,
    },

  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const House_images = model("House_images", imageSchema, "house_images");

module.exports = House_images;
