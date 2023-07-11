const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var UserModel = new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    authToken:{
        type:String,
        required:true,
    },

},{timestamps: true , versionKey: false });

//Export the model
module.exports = mongoose.model('User', UserModel);