const UserModel = require('../model/user_schema');


const getAllUser = async (req, res) => {
    var collection = await UserModel.find({});
    console.log(collection);

 
    res.json({
     user: collection
    })
 }

 const user_register = async (req, res) => {
    const data = req.body;
    const auth_token = jwt.sign({email: data.email},'12345', { expiresIn: '1h'});

    const saltRounds = 10;

    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(data.password, salt);
    var user_data;

    if(auth_token) {
        user_data = await UserModel.create({
            username: data.username,
            email: data.email,
            password: hash,
            authToken: auth_token
          })
    }

    res.json({
        user: user_data
       })
 }

 const user_login = async(req,res) => {
    const data = req.body;
    try {
        const user = await UserModel.findOne({ email: data.email });
        
        let password_check = bcrypt.compareSync(data.password, user.password);
        let update_user;
        if(password_check){
            const auth_token = jwt.sign({email: data.email},'12345', { expiresIn: '1h'});
            update_user = await UserModel.findOneAndUpdate(
                { email: user.email },
                { $set: { authToken: auth_token } },
                { new: true }
              );
        }
        res.json({
            user: update_user
           })
    }
    catch (error) {
        console.log(error);
        throw new Error('Unable to login');
    }
 }



 
 module.exports = {getAllUser,user_register,user_login}