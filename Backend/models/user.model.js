import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type:String,
        required: true,
        unique: true,
    },
    email: {
        type:String,
        required: true,
    },
    pwd:{
        type:String,
        required:true
    },
    cover:{
        type:String,
        required:false
    },
    country:{
        type:String,
        required:false
    },
    phone:{
        type:String,
        required:false
    },
    desc:{
        type:String,
        required:false
    },
    isSeller:{
        type:Boolean,
        default:false
    },
    cat:{
        type:String,
    },
},{
    timestamps:true
});

export default mongoose.model("User",userSchema);