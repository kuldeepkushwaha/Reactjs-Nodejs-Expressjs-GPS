import gpsdata from "../models/GpsModel.js";

export const getGpsData=async(req,res)=>{
    try{
        const response =await gpsdata.findAll({
            attributes:['DeviceId','DeviceType','Timestamp','location']
        });
      
        res.status(200).json({response});
    }
    catch(error){
        res.status(500).json({msg:error.message});
    }
}
export const getGpsDataById=async(req,res)=>{
    try{
        console.log(req.params.DeviceId)
        const response =await gpsdata.findAll({
            attributes:['DeviceId','DeviceType','Timestamp','location'],
            where:{
                DeviceId:req.params.DeviceId
            }
        });
      
        res.status(200).json({response});
    }
    catch(error){
        res.status(500).json({msg:error.message});
    }
}
export const addGpsData=async(req,res)=>{
    const {DeviceId,DeviceType,Timestamp,location}=req.body;
    //validation
    try{
        await gpsdata.create({
            DeviceId:DeviceId,
            DeviceType:DeviceType,
            Timestamp:Timestamp,
            location:location,
        
        });
        res.status(201).json({msg:"Gps Data Added Successfully"});
    }
    catch(error){
        res.status(500).json({msg:error.message});
    }

}

export default gpsdata;