require('dotenv').config();
const mongoose = require("mongoose");

const dbString = process.env.DB_STRING;

mongoose.connect(dbString).catch(err => console.error(err));;

mongoose.connection.on("connected", function() {
    console.log(`Connected to database`);
});

mongoose.connection.on("error", function(error) {
    console.log(`[Connection failed: ${error}`);
});

mongoose.connection.on("disconnected", function() {
    console.log(`Disconnected from database`);
});

process.on("SIGINT", function() {
    mongoose.connection.close(function() {
        console.log(`Disconnected from through app termination`);
        process.exit(0);
    });
});