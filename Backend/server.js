const mongoose = require('mongoose');
const dotenv = require("dotenv");
const app = require('./src/app');

dotenv.config({ path: './.env' });

const { isDev } = require('./src/utils/environment');
const { seedDB } = require('./importData');

/** connection to mongo db database */
mongoose.connect(isDev() ? process.env.LOCAL_DB_URI: process.env.REMOTE_DB_URI,
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,

    }).then(conn => {
        console.log("Database connected!")
    }).catch(e => {
        console.log(isDev() ? process.env.LOCAL_DB_URI: process.env.REMOTE_DB_URI)
        console.log("Database connection error!\n", e)
    });

if(!isDev()){
    seedDB(true);
}

const PORT = !isDev() ? process.env.PORT : 5440;

app.listen(PORT, () => {
    console.log(`server listening on port : ${PORT}`);
});
