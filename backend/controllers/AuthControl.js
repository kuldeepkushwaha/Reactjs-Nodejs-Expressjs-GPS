import User from "../models/UsersModel.js";
import argon2 from "argon2";
export const Login = async(req, res) => {
    try {
        const user = await User.findOne({
            where:{
                email: req.body.email
            }
        });
        if(!user)return res.status(404).json({msg: "Incorrect Email"});
        const match = await argon2.verify(user.password,req.body.password);
        if(!match) return res.status(400).json({msg: "Incorrect Password"});
        req.session.userId=user.email;
        const name = user.name;
        const email = user.email;
        res.status(200).json({name,email});
    } catch (error) {

        res.status(404).json({msg:error.message});
    }
}

export const Me=async(req,res)=>{
if(!req.session.userId){
    return res.status(401).json({msg:"Please Login"})
}
    const user=await User.findOne({
        attributes:['name','email'],
        where:{
            email:req.session.userId
        }
    })
    if(!user)return res.status(404).json({msg: "Incorrect Email"});
    res.status(200).json(user);
}

export const Logout=async(req,res)=>{
    
    req.session.destroy();
        try{
            req.session=null;
        }
        catch(err){}
        res.status(200).json({msg:"Logout success"});
}