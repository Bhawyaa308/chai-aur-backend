import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema=new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        // trim removed unwanted spaces from the beginning and end of the string, it is a good practice to use it for fields like username and email
        trim:true,
        // agar hame kisi field ko searchable banana hai to ham usme index:true kar dete hai, isse hamare queries fast ho jati hai
        index:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    fullname:{
        type: String,
        required:true,
        trim:true,
        index:true
    },
    avatar:{
        type:String, //we will use cloudinary for storing images, so it will be a url string
        required:true
    },
    coverImage:{
        type:String, //we will use cloudinary for storing images, so it will be a url string 
    },
    watchHistory:[
        {
            type:Schema.Types.ObjectId,
            ref:"Video"
        }
    ],
    password:{
        type:String,
        // true field ke sath ham ek custom error message bhi de sakte hai, jo ki hamare frontend me show hoga, agar user ne password field ko empty choda to ye message show hoga
        required:[true,"Password is required"],
    },
    refreshToken:{
        type:String
    }

},
{timestamps:true}
)

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        return next();
    }
    this.password= bcrypt.hash(this.password,10);
    next()
 })
userSchema.methods.isPasswordCorrect= async function(password){
    return await bcrypt.compare(password,this.password) 
}
userSchema.methods.generateAccessToken=function(){
    return jwt.sign(
        {
            _id:this._id,
            username:this.username,
            email:this.email,
            fullname:this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,{expiresIn:process.env.ACCESS_TOKEN_EXPIRY})
}
userSchema.methods.generateRefreshToken=function(){
    return jwt.sign(
        {userId:this._id},
        process.env.REFRESH_TOKEN_SECRET,{expiresIn:process.env.REFRESH_TOKEN_EXPIRY})
} 

export const User=mongoose.model("User",userSchema)