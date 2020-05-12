const User=require('../models/user');

const bcrypt=require('bcryptjs');

exports.addUser=((req,res,next)=>{
    const name=req.body.name;
    const password=req.body.password;
    const email=req.body.email;
    User.findUser(email)
    .then((isExist)=>{
        if(isExist){
            res.status(403)
            .json({
                message:'user with same email exist'
            })
        } else {
            bcrypt.hash(password,12)
            .then(hashedPassword=>{
                const user=new User(name,email,hashedPassword);
                return user.addUser();
            })
            .then(result=>{
                res.status(200)
                .json({
                    message:"user saved successfully"
                })
            })
        }
    })
    .catch(err=>{
        console.log(err);
    })
})