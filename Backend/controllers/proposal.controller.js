import axios from 'axios'
import proposalModel from '../models/proposal.model.js';
export const create = async (req, res) => {
    let category;
    console.log(req.body.text)
    const options = {
        method: 'POST',
        url: 'https://textprobe.p.rapidapi.com/topics',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': '166a2ea0damsha558f4687cfabedp1f2e96jsnf9e38b55de6f',
            'X-RapidAPI-Host': 'textprobe.p.rapidapi.com'
        },
        data: {
            text: req.body.text
        }
    };

    try {
        const response = await axios.request(options);
        category= Object.keys(response.data.categories)[0];
        console.log(category); // Output: "foo"
    } catch (error) {
        console.error(error);
    }

    try {
        const newProposal = new proposalModel({
            category:category,
            username:"change",
            org:req.body.org,
            contact:req.body.contact,
            budget:req.body.budget,
            text:req.body.text
        })
        await newProposal.save();
    
        res.status(200).send("proposal saved")

    } catch (err) {
        res.status(500).send("Something went wrong")

    }
}

export const fetch=async(req,res)=>{
    try {
        const proposals= await proposalModel.find().sort();
        res.status(200).send(proposals);
      } catch (err) {
        console.log(err);
      }
}