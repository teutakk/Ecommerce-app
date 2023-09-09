const mongoose = require("mongoose")
const Liga = require("./Liga")

const EkipaSchema = new mongoose.Schema(
    {        
        emri: { type: String, required: true },
        qyteti: { type: String, required: true},
        // ligaId : {type: String, required: true},
        liga: { type: mongoose.Schema.Types.ObjectId, ref: Liga, required: true }
        
    },
    { timestamps: true }
);

module.exports = mongoose.model("Ekipa", EkipaSchema)