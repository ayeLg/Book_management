const express = require('express')


const dbConnect = require('./db/db_connect');
const app = express();
var cors = require('cors')
const helmet = require('helmet');
var morgan = require('morgan')
var compression = require('compression')
const bcrypt = require('bcrypt');
// const bodyParser = require('body-parser');
const UserRouter = require('./router/userRouter');



const jwt = require('jsonwebtoken');



// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
app.use(express.json())
app.use(helmet());
app.use(morgan('dev')) 
app.use(compression())


dbConnect();






app.use('/api/user', UserRouter);

const UserModel = require('./model/user_schema');
const BookModel = require('./model/book_schema');
const AuthorSchema = require('./model/autho_schema');
const { Mongoose, default: mongoose } = require('mongoose');




app.use('/author', async (req, res) => {
    // var collection = await AuthorSchema.create({
    //     name: 'U Aung',
    // })

    // var collection = await BookModel.create({
    //     title: "Love",
    //     releaseYear : "2015",
    //     authorId: "64a51d8f7a4257c931848568"
    // })

    //$lookup = join 
    // unwint = for one to one / only reterive object not array 
    var books = await BookModel.aggregate([
        // {$match: {title: 'Love'}}, 
        {$match: {_id: new mongoose.Types.ObjectId("64a51e3363b7f4db03fa1dde"), $or: [{},{}], $and: []}}, 
        // $or: [{releaseYear: { 
        //     $gt: 2021, 
        // }},{resleaseYear: {
        //     $lt: 2020,
        // }},{resleaseYear: {
        //     $eq: 2020,
        // }}

        // ]
        {$lookup : {from : 'authors', localField: 'authorId', foreignField : '_id', as: 'author'}}, 
        {$unwind : {path: '$author', preserveNullAndEmptyArrays: true}}
    ]) 

    // var books = await BookModel.find({}).populate('authorId');
    res.json({
        user: books
       })

    
})


app.listen(4000, () => console.log(`Server is running ${4000}`))