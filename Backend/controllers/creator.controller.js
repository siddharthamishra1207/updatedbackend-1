import User from "../models/user.model.js";

export const getCreator=async(req,res)=>{
    const q=req.query;
    const filters={
        cat:q.cat
    }
    try {
        const gigs = await User.find(filters).sort({ [q.sort]: -1 });
        res.status(200).send(gigs);
      } catch (err) {
        next(err);
      }
}