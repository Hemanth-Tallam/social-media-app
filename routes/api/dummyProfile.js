const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post');
const mongoose = require("mongoose")
const ObjectId = mongoose.Types.ObjectId;

// @route    GET api/profile/me
// @desc     Get current users profile
// @access   Private
router.get('/',async(req,res)=>{
    try {
        // const profile = await Profile.findOne({
        //   user: req.user.id
        // }).populate('user', ['name', 'avatar' , 'email']);
       
        let profile = await Profile.aggregate([
            // {$match : {user : ObjectId(req.user.id)}},
            {$lookup :{
                "from" : "posts",
                "localField" : "user",
                "foreignField" : "user",
                "as"  : "posts"
            }},
            {$lookup:{
                "from" : "users",
                "localField" : "user",
                "foreignField" : "_id",
                "as" : "user"
            }},
            {$project :{
                "user.id" :0,
                "user.password":0
            }},
            {$lookup:{
                "from" : "follows",
                "localField" : "user",
                "foreignField" : "user",
                "as" : "request"
            }}
        ])

        // console.log(profile)
        // console.log(req.user.id)
        // profile = await Profile.aggregate([{$match : {user : req.user.id}}])

        // console.log(profile)
        // profile = await Profile.find( {user : req.user.id })
        // console.log(profile)

        // let profile = await User.aggregate([
        //     {
        //         $lookup:{
        //             from : "posts",
        //             localField : "_id",
        //             foreignField : "user",
        //             as  : "posts"
        //         }
        //     }
        // ])
        // console.log(profile)
    
        if (!profile) {
          return res.status(400).json({ msg: 'There is no profile for this user' });
        }
    
        res.json(profile);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

module.exports = router 