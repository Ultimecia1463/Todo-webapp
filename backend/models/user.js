const mongoose = require("mongoose");
const userschema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    list: [
        {
            type: mongoose.Types.ObjectId,
            ref: "list",
        },
    ],
});

module.exports = mongoose.model("user", userschema);
