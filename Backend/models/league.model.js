import mongoose from "mongoose";
const { Schema } = mongoose;

const LeagueSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    maxPlayer: {
      type: Number,
      default: 0,
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
    },
    creators:{
        type:Array,
        required:true
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("League", LeagueSchema);