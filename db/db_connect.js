const { default: mongoose } = require("mongoose");


const dbConnect = () => {
    mongoose.connect('mongodb://node:password@127.0.0.1:27017/node').then((result) => {
        // console.log(result);
        console.log("Database connectd");
    }).catch((err) => {
        // console.log(err);
        console.log("Database connection failed");
    })

}

module.exports = dbConnect; 