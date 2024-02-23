const mongoose = require("mongoose")

const notesSchema = mongoose.Schema({
    title:{
        type:String,
        required: true

    },
    desc:{
        type:String,
        required: true

    },
    category:{
        type:String,
        required: true

    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required: true

    },

}
,
{
    timestamps:true
})

const Notes = mongoose.model("Notes" , notesSchema)
module.exports = Notes