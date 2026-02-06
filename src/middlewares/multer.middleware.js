import multer from "multer";
const storage=multer.memoryStorage({
    destination:function(req,file,cb){
        // jo hamne public folder banaya tha, uske andar ye file rakhenge taki sabko ye file avail ho jaye
        cb(null,"./public/temp")
    },
    filename:function(req,file,cb){
        cb(null,file.originalname);
    }
})
export const upload=multer({storage});