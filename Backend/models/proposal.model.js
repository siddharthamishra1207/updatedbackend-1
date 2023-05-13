import mongoose from 'mongoose';
const { Schema } = mongoose;

const proposalSchema = new Schema({
    username: {
        type:String,
    },
    category: {
        type:String,
    },
    org:{
        type:String
    },
    budget:{
        type:String
    },
    contact:{
        type:String
    },
    text:{
        type:String
    }
},{
    timestamps:true
});

export default mongoose.model("BrandProposal",proposalSchema);