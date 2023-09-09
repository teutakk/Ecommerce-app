const mongoose = require("mongoose")

const LigaSchema = new mongoose.Schema(
    {        
        emri: { type: String, required: true, unique: true},
        shteti: { type: String, required: true},
        // ligaId : {type: String, required: true}
    },
    { timestamps: true }
);

module.exports = mongoose.model("Liga", LigaSchema)