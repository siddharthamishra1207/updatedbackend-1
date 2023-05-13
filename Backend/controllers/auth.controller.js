import userModel from "../models/user.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { MongoClient } from 'mongodb';

export const register=async (req,res)=>{
    try{
        const hash=bcrypt.hashSync(req.body.pwd,4)
        const newUser=new userModel({
            
            ...req.body,
            pwd:hash,
        })
        await newUser.save();
        res.status(200).send("user has been created")

    }catch(err){
        res.status(500).send("Something went wrong")

    }
}
export const update=async(req,res)=>{
  let collection;
  await MongoClient.connect(process.env.MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(client => {
     collection = client.db('beCreator').collection('users');
  })
  .catch(err => {
    console.error(err);
  });
  const user=req.body.username;
  try {
    const query = { username:user };
    const update = { $set: { country:req.body.country,phone:req.body.phone,desc:req.body.desc,isSeller:req.body.isSeller,cover:req.body.img } };

    const result = await collection.updateOne(query, update);

    console.log(result.modifiedCount + " document updated");
  } catch (err) {
    console.log(err);
  }
}
export const login=async(req,res,next)=>{
    try {
        const user = await userModel.findOne({ username: req.body.username });
    
        if (!user) return next(createError(404, "User not found!"));
    
        const isCorrect = bcrypt.compareSync(req.body.pwd, user.pwd);
        if (!isCorrect)
          return next(createError(400, "Wrong password or username!"));
    
        const token = jwt.sign(
          {
            id: user._id,
            isSeller: user.isSeller,
          },
          process.env.JWT_KEY
        );
    
        const { pwd, ...info } = user._doc;
        res
          .cookie("accessToken", token, {
            httpOnly: true,
          })
          .status(200)
          .send(info);
      } catch (err) {
        next(err);
      }

}
export const logout=async (req,res)=>{
    res
    .clearCookie("accessToken", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .send("User has been logged out.");
}