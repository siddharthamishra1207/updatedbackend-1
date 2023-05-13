
import leagueModel from "../models/league.model.js";
import createError from "../utils/createError.js";
export const createLeague = async (req, res) => {
    console.log(req.body)
    try {
        const league = new leagueModel({
            userId:req.body.userId,
            name:req.body.name,
            type:req.body.type,
            maxPlayer:parseInt(req.body.maxPlayer),
            startDate:req.body.startDate,
            endDate:req.body.endDate,
            creators:req.body.creators
        })
        console.log(league)
        await league.save();
        res.status(200).send("league saved")

    } catch (err) {
        res.status(500).send("Something went wrong")

    }
}

export const getLeague=async(req,res)=>{
    try {
        const leagues = await leagueModel.find().sort();
        res.status(200).send(leagues);
      } catch (err) {
        console.log(err);
      }
}