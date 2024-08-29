const House_images = require("../models/imgmodel");
const uuid = require('uuid');
const catchAsync = require("../utils/catcherror");

exports.createOne = async (file) => {



    const imageID = uuid.v5(name, namespace)
        const namespace = uuid.parse('86044be7-fd2a-45d8-a091-988d63e74ab9')
    const name = `date${new Date().getTime().toString()}`

    const newobj = Object.assign({}, {

        imageID: imageID,
        mimetype: file.mimetype,
        originalname: file.originalname,
        encoding: file.encoding,
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
