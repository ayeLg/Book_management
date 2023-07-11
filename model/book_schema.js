const {Schema, default:mongoose} = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var BookModel = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    
    releaseYear:{
        type:String,
        required:true,
    },
    status:{
        type:Number,
        required:true,
        default: 1
    },
    authorId:{
        type: Schema.Types.ObjectId,
        required:true,
        ref : 'Author'
    },

});

//Export the model
module.exports = mongoose.model('Book', BookModel);