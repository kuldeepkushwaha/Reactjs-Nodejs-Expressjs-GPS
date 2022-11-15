import express from "express";
import { verifyUser } from "../middleware/AuthUserMiddleware.js";
import{
    getUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} from "../controllers/UsersControl.js"
const router=express.Router();
router.get('/users',verifyUser,getUser);
router.get('/users/:id',verifyUser,getUserById);
router.post('/users',createUser);
router.patch('/users/:id',verifyUser,updateUser);
router.delete('/users/:id',verifyUser,deleteUser);
export default router;