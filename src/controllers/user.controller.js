import {asyncHandler} from '../utils/asynchandler.js';
const register=asyncHandler(async(req,res,next)=>{
    res.status(200).json({
        message:"User Registered Successfully"
    })
})