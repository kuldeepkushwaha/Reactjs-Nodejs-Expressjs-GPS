import User from "../models/UsersModel.js"
export const verifyUser=async(req,res,next)=>{
    if(!req.session.userId){
        return res.status(401).json({msg:"Please login"});
    }
    const user =await User.findOne({
        where:{
            email:req.session.userId
        }
    });
    if(!user)return req.status(404).json({msg:"User Not Found"});
    req.userId=user.email;
    next();
}