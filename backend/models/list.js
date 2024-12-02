const mongoose = require("mongoose");
const listschema = new mongoose.Schema(
    {
        task: {
            type: String,
            required: true,
        },
        user: [
            {
                type: mongoose.Types.ObjectId,
                ref: "user",
            },
        ],
    },
    { timestamps: true }
);

module.exports = mongoose.model("list", listschema);
