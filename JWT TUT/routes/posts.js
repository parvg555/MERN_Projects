import Router from "express";
import { Authorizer } from "./verifyToken.js";
import User from "../model/User.js";

const Posts = Router();

Posts.get('/',Authorizer, async (req,res) => {
    const user = await User.findOne({
        _id:req.user._id
    })
    // const user = User.findOne({"_id":req.user});
    console.log(user);
    return res.status(200).send(user)
})

export default Posts