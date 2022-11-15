import express from "express";
import { verifyUser } from "../middleware/AuthUserMiddleware.js";
import{
    getGpsData,
    getGpsDataById,
    addGpsData
} from "../controllers/GpsDataController.js"
const router=express.Router();
router.get('/getGpsData',verifyUser,getGpsData);
router.get('/getGpsDataById/:DeviceId',verifyUser,getGpsDataById);
router.post('/addGpsData',verifyUser,addGpsData);
export default router;