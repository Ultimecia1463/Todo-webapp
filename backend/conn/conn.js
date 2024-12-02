const mongoose = require("mongoose");
require("dotenv").config();

const conn = async (req, res) => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log("connected!");
        });
    } catch (error) {
        console.log(" not connected!");
        console.log(error);
    }
};
conn();
