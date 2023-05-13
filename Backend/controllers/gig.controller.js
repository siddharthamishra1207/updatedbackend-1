import { connect } from "mongoose";
import Gig from "../models/gig.model.js";
import createError from "../utils/createError.js";
import { MongoClient } from 'mongodb';

export const createGig = async (req, res, next) => {
  // if (!req.isSeller)
  //   return next(createError(403, "Only sellers can create a gig!"));
 console.log(req.body.username)
  const newGig = new Gig({
    userId: req.userId,
    username:req.body.username,
    ...req.body,
  });

  try {
    const savedGig = await newGig.save();
    res.status(201).json(savedGig);
  } catch (err) {
    next(err);
  }
};
export const deleteGig = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (gig.userId !== req.userId)
      return next(createError(403, "You can delete only your gig!"));

    await Gig.findByIdAndDelete(req.params.id);
    res.status(200).send("Gig has been deleted!");
  } catch (err) {
    next(err);
  }
};
export const getGig = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.query.id);
    if (!gig) next(createError(404, "Gig not found!"));
    res.status(200).send(gig);
  } catch (err) {
    next(err);
  }
};
export const getGigs = async (req, res, next) => {
  const q = req.query;
  const filters = {
    ...(q.userId && { userId: q.userId }),
    ...(q.cat && { cat: q.cat }),
    ...((q.min || q.max) && {
      price: {
        ...(q.min && { $gt: q.min }),
        ...(q.max && { $lt: q.max }),
      },
    }),
    ...(q.search && { title: { $regex: q.search, $options: "i" } }),
  };
  try {
    const gigs = await Gig.find(filters).sort({ [q.sort]: -1 });
    res.status(200).send(gigs);
  } catch (err) {
    next(err);
  }
};

export const fetchGigs = async (req, res) => {
  let collection;
  await MongoClient.connect(process.env.MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(client => {
      collection = client.db('beCreator').collection('gigs');
    })
    .catch(err => {
      console.error(err);
    });

  collection.find().sort({ _id: -1 }).limit(5).toArray()
    .then(docs => {
      res.json(docs);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Error retrieving last 5 data from database');
    });
}

export const updateGig = async (req, res) => {
  let collection;
  await MongoClient.connect(process.env.MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(client => {
      collection = client.db('beCreator').collection('gigs');
    })
    .catch(err => {
      console.error(err);
    });

  try {
    // Add a new element to the array field
    const result = await collection.updateOne(
      { title: req.body.title },
      { $push: { investors: req.body.username } }
    ).then(doc => res.json(doc));
  } catch (err) {
    console.error(err);
  }
}

export const mygigs=async(req,res)=>{
  let collection;
  await MongoClient.connect(process.env.MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(client => {
      collection = client.db('beCreator').collection('gigs');
    })
    .catch(err => {
      console.error(err);
    });

    const filters={
      username:req.query.username
    }

    try {
      const gigs = await Gig.find(filters);
      res.status(200).send(gigs);
    } catch (err) {
      next(err);
    }
}