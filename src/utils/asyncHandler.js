const asyncHandler=(requestHandler)=>{
    // here we may write return too but its not necessary, bina likhe bhi iska yehi matlab hai ki ham return kar rhe hai
    return (req,res,next)=>{
        Promise.resolve(requestHandler(req,res,next)).catch((err)=>next(err));
    }
}


export default asyncHandler;
// this is a wrapper function which makes code easy. 
// this was using try catch, but if we had to use promices, then the code is above.
// const asyncHandler=(fn)=>async(req,res,next)=>{
//     try{
//          await fn(req,res,next);
//     }
//     catch{
//        res.status(err.code||500).json({
//         success:false,
//         message:err.message||"Internal Server Error"
//        })
//     }
// }