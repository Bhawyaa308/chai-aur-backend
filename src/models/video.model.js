import mongoose ,{Schema} from "mongoose";
 import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema=new Schema({
    videoFile:{
        type: String,//cloudnary url string
        required:true
    },
    thumbnail:{
        type: String,//cloudnary url string
        required:true
    },
    title:{
        type:String,    
        required:true,
    },
    description:{
        type:String,
        required:true
    },
    duration:{
        type:Number, // in seconds
        required:true
    },
    views:{
        type:Number,
        default:0
    },
    isPublished:{
        type:Boolean,
        default:false
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
},
{timestamps:true})
// we will use aggregation pipeline here
videoSchema.plugin(mongooseAggregatePaginate);
export const Video=mongoose.model("Video",videoSchema)