const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

/**
 * User Schema
 */
const userSchema = new Schema(
  {
    firstname: {
      type: String,
      required: [true, "first name is needed"],
      minlength: [2, "you need atleast 2 characters!"],
      maxlength: [24, "you need atleast maximum 24 characters!"],
    },
    lastname: {
      type: String,
      required: [true, "last name is needed"],
      minlength: [2, "you need atleast 2 characters!"],
      maxlength: [24, "you need atleast maximum 24 characters!"],
    },
    email: {
      type: String,
      required: [true, "user should have email!"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Invalid email"],
    },
    phone: {
      type: String,
      required: [true, "phone number is needed"],
      minlength: [10, "invalid phone, too short"],
      maxlength: [14, "invalid phone, too long"],
    },
    avatar: {
      type: String,
    },

     role: {
      type: String,
      enum: {
        values: ["user", "broker", "admin"],
        message: "{VALUE} you dont have a role",
      },
      default: "user",
    },

    password: {
      type: String,
      required: [true, "user should have password!"],
      minlength: 6,
      maxlength: 24,
      select: false,
    },
    passwordChangedAt: Date,
    createdAt: {
      type: Date,
      default: Date.now(),
      validate: [validator.isDate, "wrong date format"],
    },
    soldItems: {
      type: Number,
      default: 0,
    },
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
    following: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  if (!this.isNew) this.passwordChangedAt = Date.now() - 1000;

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

userSchema.methods.comparePassword = async (inputPassword, storedPassword) => {
  return bcrypt.compare(inputPassword, storedPassword);
};

userSchema.methods.checkPasswordChange = (jwtTimeStamp) => {
  if (this.passwordChangedAt) {
    const passChangeTime = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return jwtTimeStamp < passChangeTime;
  }
  return false;
};


userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

const User = model("User", userSchema);

module.exports = User;
