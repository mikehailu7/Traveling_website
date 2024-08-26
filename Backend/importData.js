const fs = require('fs');
const mongoose = require('mongoose');
const House = require('./src/models/houseModel');
const House_images = require('./src/models/imageModel');
const dotenv = require("dotenv");

dotenv.config({ path: './.env' });

const { isDev } = require('./src/utils/environment');

exports.seedDB = (isImport = true) => {
    const file = JSON.parse(fs.readFileSync(`${__dirname}/dummyJson.json`, 'utf-8'));

    const populateHouse = async () => {
        try {
            await House.deleteMany();
            await House.create(file);
            console.log("house data inserted!");
            // process.exit();
        } catch (err) {
            console.log(err)
        }
    }

    const deleteHouse = async () => {
        try {
            await House.deleteMany();
            console.log("house data deleted!");
            // process.exit();
        } catch (err) {
            console.log(err)
        }
    }

    if (isImport) {
        populateHouse();
    } else {
        deleteHouse();
    }
}

exports.seedImageDB = (isImport = true) => {
    const file = JSON.parse(fs.readFileSync(`${__dirname}/image.json`, 'utf-8'));

    const populateHouse = async () => {
        try {
            await House_images.deleteMany();
            await House_images.create(file);
            console.log("Image data inserted!");
            // process.exit();
        } catch (err) {
            console.log(err)
        }
    }

    const deleteHouse = async () => {
        try {
            await House_images.deleteMany();
            console.log("Image data deleted!");
            // process.exit();
        } catch (err) {
            console.log(err)
        }
    }

    if (isImport) {
        populateHouse();
    } else {
        deleteHouse();
    }
}

if (require.main === module && process.argv.length >= 3) {

    mongoose.connect(isDev() ? process.env.LOCAL_DB_URI : process.env.REMOTE_DB_URI,
        {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true,

        }).then(conn => {
            console.log("Database connected!")
        }).catch(e => console.log("Database connection error!"));


    if (process.argv[2] == "--import") {
        seedDB();
    } else if (process.argv[2] == "--delete") {
        seedDB(false);
    }

    process.exit();

} else if (require.main === module) {
    console.log("Unknown arguments given! check [ importData.js ] file")
}