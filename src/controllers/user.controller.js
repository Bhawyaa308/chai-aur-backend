import asyncHandler from '../utils/asyncHandler.js';
import apiError from '../utils/apiError.js';
import { User } from '../models/user.model.js';
import{ uploadOnCloudinary } from '../utils/cloudinary.js';
import { ApiResponse } from '../utils/apiResponse.js';

const registerUser = asyncHandler(async (req, res) => {
    // the logic algo will be as follows:
    // get user details from frontend
    // validation of user details
    // check if user already exists:username, email
    // check for images, check,for avatar
    // upload on cloudinary, avatar(ki usse aage error to ni aagya avatar mein)
    // create user object- create entry in db
    // remove password and refresh token from response
    // check for user creation
    // return response to frontend

// data goes in req.body
    const{fullName,email,username,password}=req.body
    console.log("email: ", email);
    //  ham aese bhi ek ek karke sabhi ke liye check kar sakte hai but we do do it one go too
    // if(fullName===""){
    //     throw new apiError("Full name is required",400);
    // }

    if(
        [fullName,email,username,password].some((field)=>field?.trim()=== "")
    ){
        throw new apiError("All fields are required",400);
    }
    // findOne phle user ko return karega
    // $ laga ke aage operators use lar sakte hai
    // $or ya to email match karega ya to username match karega, dono me se koi bhi match kar jaye to user return ho jayega
    const existedUser= User.findOne({$or:[{email},{username}]})
    if(existedUser){
        throw new apiError("User already exists",409);
    }
    // ham iska 1st attribute lenge, cuz vo hame path lake dega
    // local path isliye cuz ye abhi local machine pe saved hai , cloudinary pe nhi gya hai
    const avatarLocalPath= req.files?.avatar[0]?.path;
    const coverImageLocalPath= req.files?.coverImage[0]?.path;
    if(!avatarLocalPath){
        throw new apiError("Avatar is required",400);
    }

    //upload avatar and cover image on cloudinary
    const avtar= await uploadOnCloudinary(avatarLocalPath)
    const coverImage= await uploadOnCloudinary(coverImageLocalPath)

    if(!avtar){
        throw new apiError("Avatar upload failed",400);
    }

    const user = await User.create({
        fullName,avtar:avtar.url,coverImage:coverImage?.url || "",
        email,username:username.toLowerCase(),password
    })
// ye _id field mongodb apne aap create kar deta hai
    const createdUser= await User.findById(user._id).select(
        // select ka ye wierd syntax hai ki hame jo nhi chahiye hota, vo likhte hai(-) laga ke
        // remove password and refresh token from response
        "-password -refreshToken"
    )

     // check for user creation
    if(!createdUser){
        throw new apiError("User creation failed",500);
    }

    // return response to frontend. for this we need api reponse
    return res.status(201).json(
        new ApiResponse(201,createdUser,"User registered successfully"))

})

export { registerUser };