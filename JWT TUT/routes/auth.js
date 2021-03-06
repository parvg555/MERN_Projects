import Router from "express";
import User from "../model/User.js";
import { loginValidation, registerValidation } from "../validation.js";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";

const Authrouter = Router();

Authrouter.post('/register', async (req,res) => {
    //validation
    const {error} = registerValidation(req.body);
    if (error) return res.status(400).send({
        "status":"failed",
        "message":error.details[0].message
    });

    //check if user exists
    const usernameExists = await User.findOne({username: req.body.username})
    if(usernameExists) return res.status(403).send({
        "status":"failed",
        "message":"Username Already Exists"
    })
    const emailExists = await User.findOne({email:req.body.email})

    if(emailExists) return res.status(403).send({
        "status":"failed",
        "message":"Email Already Exists"
    })

    //Hashing The password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password,salt);

    const user = new User({
        name:req.body.name,
        username:req.body.username,
        email:req.body.email,
        password:hashPassword
    });

    try{
        const savedUser = await user.save();
        res.status(201).send({
            "status":"success",
            "user":user.id
        });
    }catch(err){
        res.status(400).send(err);
    }
});

Authrouter.post('/login',async (req,res) => {
    //valiation
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    //Checking if email exists
    const user = await User.findOne({username: req.body.username})
    if(!user) return res.status(403).send({
        "status":"failed",
        "message":"Username does not exist"
    })

    //checking if password is correct
    const validPass = await bcrypt.compare(req.body.password,user.password);

    if(!validPass) return res.status(401).send({
        "status":"failed",
        "message":"Invalid Password"
    })

    //create and assign a token
    const token = jsonwebtoken.sign({
        _id:user._id
    },process.env.TOKEN_SECRET)

    res.header('auth-token',token).send({
        "status":"success",
        "message":"login successful",
        "token":token
    });
})


export default Authrouter
