import mongoose from "mongoose";
const { Schema } = mongoose;

const GigSchema = new Schema(
  {
    userId: {
      type: String,
    },
    username:{
      type:String,
    
    },
    title: {
      type: String,
    
    },
    desc: {
      type: String,
    },
    totalStars: {
      type: Number,
      default: 0,
    },
    starNumber: {
      type: Number,
      default: 0,
    },
    cat: {
      type: String,

    },
    price: {
      type: Number,

    },
    cover: {
      type: String,

    },
    images: {
      type: [String],
      required: false,
    },
    channel: {
      type: String,
    },
    vestingTime: {
      type: Number,
    },
    revenue: {
      type: Number,
     
    },
    features: {
      type: [String],
      required: false,
    },
    max: {
      type: Number,
      default: 0,
    },
    investors:{
      type:Array,
      default:[]
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Gig", GigSchema);
