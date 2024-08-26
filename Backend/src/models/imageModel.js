const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

/**
 * User Schema
 */
const imageSchema = new Schema(
  {

    imageID: {
      type: String,
      required: [true, "imageID is required"],
      minlength: [2, "imageID should contain atleast 2 characters!"],
    },

    mimetype: {
      type: String,
      required: [true, "house Id is required"],
      minlength: [2, "house Id should contain atleast 2 characters!"],
    },

    encoding: {
      type: String,
      required: [true, "encoding is required"],
      minlength: [2, "encoding should contain atleast 2 characters!"],
    },

    originalname: {
      type: String,
      required: [true, "originalname is required"],
      minlength: [2, "originalname should contain atleast 2 characters!"],
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
