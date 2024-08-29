const uuid = require('uuid');
const catchAsync = require("../utils/catchAsyncError");
const House_images = require("../models/imgmodel");


exports.createOne = async (file) => {

    const namespace = uuid.parse('86044be7-fd2a-45d8-a091-988d63e74ab9')
    const name = `date${new Date().getTime().toString()}`;

    const imageID = uuid.v5(name, namespace);

    const newobj = Object.assign({}, {

        imageID: imageID,
        mimetype: file.mimetype,
        encoding: file.encoding,
        originalname: file.originalname,
        active: true

    });

    const newDoc = await House_images.create(newobj);

    if (newDoc) {
        return { image: newDoc };
    }
    else {
        return { image: null };
    }

}
