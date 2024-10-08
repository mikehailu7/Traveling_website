const { Schema, model } = require("mongoose");
const House = require("./placeModel");

const reviewSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Customer review must have title"],
    },
    comment: {
      type: String,
      required: [true, "Customer review must have comment"],
    },
    likes: Number,
    dislikes: Number,
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    rating: {
      type: Number,
      min: [1, "Customer review needs to have rating!"],
      max: [5, "Customer review needs to have rating!"],
      required: [true, "Customer review needs to have rating!"],
    },
    place: {
      type: Schema.Types.ObjectId,
      ref: "place",
      required: [true, "Customer review needs to have House id"],
    },
    Customer: {
      type: Schema.Types.ObjectId,
      ref: "customer",
      required: [true, "Customer review needs to have user id"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//created index for houseId and userId on review for faster query
reviewSchema.index({ house: 1, user: 1 }, { unique: true });

// fetch associated users on review query
reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "firstname lastname avatar",
  });

  next();
});

/**
 * @static
 * static method on the schema
 * to calculate average rating
 * on all models.
 */
reviewSchema.statics.calcAvarageRating = async function (houseId) {
  const stat = await this.aggregate([
    {
      $match: { houseId },
    },
    {
      $group: {
        _id: "$houseId",
        ratingNum: { $sum: 1 },
        avgRating: { $avg: "$rating" },
      },
    },
  ]);

  await House.findByIdAndUpdate(houseId, {
    ratingQuantity: stat[0].ratingNum,
    averageRating: stat[0].avgRating,
  });
};

reviewSchema.post("save", function () {
  this.constructor.calcAvarageRating(this.house);
});

reviewSchema.pre(/^findOneAnd/, async function (next) {
  this.rvw_doc = await this.findOne();
  next();
});

reviewSchema.post(/^findOneAnd/, async function () {
  this.rvw_doc.constructor.calcAvarageRating(this.rvw_doc.house);
});

const Review = model("Review", reviewSchema);

module.exports = Review;
