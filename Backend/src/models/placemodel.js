//Author: Mikias Hailu and yared tsgie
const { Schema, model, SchemaTypes } = require("mongoose");

const placeSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "place needs to have title"],
    },
    description: {
      type: String,
      required: [true, "place needs to have description"],
    },
    price: {
      type: Number,
      required: [true, "place needs to have price"],
    },
    postedBy: {
      type: SchemaTypes.ObjectId,
      ref: "User",
      required: [true, "place needs to have postedBy user id"],
    },
    postDate: {
      type: Date,
      default: Date.now(),
    },
    imageCover: {
      type: String,
      required: [true, "place should have a cover image"],
    },
    images: [String],
    isSold: {
      type: Boolean,
      default: false,
    },
    isRented: {
      type: Boolean,
      default: false,
    },
    category: {
      type: String,
      required: [true, "place should have category"],
    },
    location: {
      //geo json location
      type: {
        type: String,
        default: "Point",
        enum: ["Point"],
      },
      coordinates: [Number],
      address: String,
    },
    averageRating: {
      type: Number,
      default: 2.5,
      required: false,
      min: [1, "place rating"],
      max: [5, "place rating"],
      set: (val) => Math.round(val * 10) / 10,
    },
    ratingQuantity: {
      type: Number,
      default: 0,
    },
    totalLike: {
      type: Number,
      default: 0,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// index
placeSchema.index({ averageRating: 1, price: -1 });

//populate reviews
placeSchema.virtual("reviews", {
  ref: "Review",
  foreignField: "place",
  localField: "_id",
});

// placeschema
placeSchema.pre(/^find/, function (next) {
  this.populate({
    path: "postedBy",
    select: "firstname",
  });

  next();
});

const place = model("place", placeSchema);

module.exports = place;
