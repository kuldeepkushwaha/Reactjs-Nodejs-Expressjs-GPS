import Users from "../models/UsersModel.js";
import argon2 from "argon2";
export const getUser=async(req,res)=>{
    try{
        const response =await Users.findAll({
            attributes:['name','email','password']
        });
      
        res.status(200).json({response});
    }
    catch(error){
        res.status(500).json({msg:error.message});
    }
}
export const getUserById=async(req,res)=>{
    try{
        const response =await Users.findOne({
            attributes:['name','email','password'],
            where:{
                email:req.params.id
            }
        });
      
        res.status(200).json({response});
    }
    catch(error){
        res.status(500).json({msg:error.message});
    }
}
export const createUser=async(req,res)=>{
    const {name,email,password,confPassword}=req.body;

    if(password!==confPassword)return res.status(400).json({msg:"Password doesn't match"});
    const hashPassword=await argon2.hash(password);
    try{
        await Users.create({
            name:name,
            email:email,
            password:hashPassword,
        
        });
        res.status(201).json({msg:"Register Success"});
    }
    catch(error){
        res.status(500).json({msg:error.message});
    }

}
export const updateUser=async(req,res)=>{
    const user= await Users.findOne({
        where:{
            email: req.params.id
        }
    });
    if(!user) return res.status(404).json({msg:"User not found"});
    const {name,email,password,confPassword}=req.body;
    let hashPassword;
    if(password === "" || password === null){
        hashPassword=user.password
    }
    else{
        hashPassword=await argon2.hash(password);
    }
    if(password!==confPassword)return res.status(400).json({msg:"Password doesn't match"});
    try{
        await Users.update({
            name:name,
            email:email,
            password:hashPassword,
        
        },{
            where:{
                id:user.id
            }
        });
        res.status(201).json({msg:"User Updated Success"});
    }
    catch(error){
        res.status(500).json({msg:error.message});
    }


}
export const deleteUser=async(req,res)=>{
    const user=await Users.findOne({
            email: req.params.id
    });
    if(!user)res.status(404).json({msg:"User Not Found"});
    try{
        await Users.destroy({
            where:{
                id:user.id
            }
        });
        res.status(200).json({msg:"Deleted Success"})
    }
    catch(error){
        res.status(400).json({msg:error.message});
    }
}
export default Users;