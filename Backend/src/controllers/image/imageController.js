const fs = require("fs");
var path = require("path");
const House_images = require("../../models/imageModel");
const House = require("../../models/houseModel");
const AppError = require("../../utils/appError");
const catchAsync = require("../../utils/catchAsyncError");
const { signJwtToken } = require("../../utils/processJWT");
const {
  sendResponse,
  sendResponseWithToken,
} = require("../../utils/successResponse");
// const constroller = require("../generalController");


exports.getImage = catchAsync(async (req, res, next) => {

  const { imageid } = req.params;

  const image = await House.findOne({ imageCover: imageid }, { _id: 0, __v: 0 });

  if (image) {
    const dest = path.join(__dirname, '..', '..', 'uploads');

    console.log({ dest });

    await fs.readdir(dest, (err, files) => {
      var found = 0;

      try {

        files.forEach(file => {

          if (file === image.imageCover) {
            found += 1;
            console.log({ file });
          }

        });

        console.log({ found });

        if (found === 1) {
          try {
            const videoSize = fs.statSync(dest + "\\" + image.imageCover).size;
            console.log({ videoSize });
            // const CHUNK_SIZE = 10 ** 6;

            // console.log({ CHUNK_SIZE });

            const headers = {
              "Accept-Ranges": "bytes",
              "Content-Length": videoSize,
              "Content-Type": "image/jpg",
            };
            res.writeHead(206, headers);
            const videoStream = fs.createReadStream(dest + "\\" + image.imageCover);
            videoStream.pipe(res);
          } catch (error) {
            console.log({ error });
          }
        }
        else {

        }

      } catch (error) {
        return res.status(400).json({ error: "Try Again", done: false });
      }

    });

    // sendResponse(204, null, res);
  }
  else {
    sendResponse(204, null, res);
  }

  // const filtedFields = filterBody(
  //   req.body,
  //   "firstname",
  //   "lastname",
  //   "phone",
  //   "email"
  // );

  // await User.findByIdAndUpdate(req.user.id, filtedFields, {
  //   new: true,
  //   runValidators: true,
  // });

  // req.user.password = undefined;
  // sendResponse(200, null, res);

});

// exports.deleteMe = catchAsync(async (req, res, next) => {
//   const { password } = req.body;

//   if (!password)
//     return next(new AppError("Password is required for this operation!", 401));
//   if (!(await req.user.comparePassword(password.toString(), req.user.password)))
//     return next(new AppError("Password is wrong!", 401));
//   await User.findByIdAndUpdate(req.user.id, { active: false });

//   sendResponse(204, null, res);
// });

// exports.follow = catchAsync(async (req, res, next) => {
//   const { targetId } = req.body;
//   const updatedUser = await User.findByIdAndUpdate(req.user.id, {
//     $addToSet: { following: targetId },
//   });
//   sendResponse(204, null, res);
// });

// exports.unFollow = catchAsync(async (req, res, next) => {
//   const { targetId } = req.body;
//   const updatedUser = await User.findByIdAndUpdate(req.user.id, {
//     $pull: { following: targetId },
//   });

//   sendResponse(204, null, res);
// });

// admin operations

// dont try to update user password through this
// exports.updateUser = constroller.updateOne(User);
// exports.getAllUsers = constroller.getAll(User);
// exports.getUser = constroller.getOne(User);
// exports.deleteUser = constroller.deleteOne(User);
