const mongoose = require('mongoose')

mongoose.set('useCreateIndex',true)

let DataSchema = new mongoose.Schema(
{
    username:{type:String,require:true},
    password:{type:String,require:true},
    Data: [
    {
        Country     :{
                        type: String,
                        required: true
                     },
        Temperature :{ type: String }
    }
        ],
    updatedOn:{type:String, required:true},
})

DataSchema.set('autoIndex',false);

module.exports = mongoose.model('Data', DataSchema)