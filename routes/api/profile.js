const express = require('express');
const config = require('config');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
// bring in normalize to give us a proper url, regardless of what user entered
const checkObjectId = require('../../middleware/checkObjectId');
const mongoose = require("mongoose")
const ObjectId = mongoose.Types.ObjectId;

const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post');

// @route    GET api/profile/me
// @desc     Get current users profile
// @access   Private
router.get('/me',auth,async(req,res)=>{
    try {
        const profile = await Profile.aggregate([
            {$match : {user : ObjectId(req.user.id)}},
            {$lookup :{
                "from" : "posts",
                "localField" : "user",
                "foreignField" : "user",
                "as"  : "posts"
            }}
        ])
        res.json(profile);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})


// @route    POST api/profile
// @desc     Create or update user profile
// @access   Private
router.post(
    '/',
    auth,
    [check('location', 'location is required').notEmpty(),
    check('contactNumber', 'contactNumber is required').notEmpty(),
    check('Birthdate', 'Birthdate is required ').notEmpty()],
    async (req, res) => {  
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      // destructure the request
      const {
        location,
        status,
        skills,
        bio,
        Birthdate,
        contactNumber,
        sex,
        youtube,
        twitter,
        instagram,
        linkedin,
        facebook,
        // spread the rest of the fields we don't need to check
        ...rest
      } = req.body;
  
      // build a profile
      const profileFields = {}
      profileFields.user = req.user.id ;
      if(location) profileFields.location = location;
      if(status) profileFields.status = status;
      if(bio) profileFields.bio = bio;
      if(Birthdate) profileFields.Birthdate = new Date(Birthdate);
      if(contactNumber) profileFields.contactNumber = contactNumber;
      if(sex) profileFields.sex=sex;

      if(skills){
          profileFields.skills=skills.split(',').map(skill=>skill.trim())
      }
      profileFields.social={}
      if(youtube) profileFields.social.youtube = youtube;
      if(facebook) profileFields.social.facebook = facebook;
      if(twitter) profileFields.social.twitter = twitter;
      if(instagram) profileFields.social.instagram = instagram
      if(linkedin) profileFields.social.linkedin = linkedin

      try{
        let profile = await Profile.findOneAndUpdate(
            { user: req.user.id },
            { $set: profileFields },
            { new: true, upsert: true, setDefaultsOnInsert: true }
          );
          return res.json(profile)
      }
      catch(err){
        console.error(err.message);
        return res.status(500).send('Server Error');
      }
    } 
);

// @route    post api/profile/pic
// @desc     change current users profile-pic
// @access   Private
router.put('/pic',auth,async(req,res)=>{
  try{
    const img = req.body.img
    console.log(img)
    console.log(req.user.id)
    const user = await User.findOneAndUpdate({_id:req.user.id},{avatar:img})
    console.log(user)
    await Post.updateMany({user:req.user.id},{avatar:img})
    res.status(200).json({msg:"successfully updated",img:img})
  }
  catch(err){
    console.log(err)
    res.status(402).json({msg:"server error"})
  }
})

// @route    GET api/profile
// @desc     Get all profiles
// @access   Public
router.get('/', async (req, res) => {
    try {
    const profiles = await User.aggregate([
      {$lookup:{
        "from" : "profiles",
        "localField" : "_id",
        "foreignField" : "user",
        "as" : "profile"
      }},
      {$project :{
        "password":0,
        "profile.skills":0,
        "profile.education":0,
        "profile.bio":0,
        "profile.sex":0,
        "profile.location":0,
        "profile.status":0,
        "profile.Birthdate":0,
        "profile.user":0,
        "profile._id":0,
        "profile.__v":0,
        "profile.social":0,
      }}
    ])
      res.json(profiles);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
});

// @route    GET api/profile/user/:user_id
// @desc     Get profile by user ID
// @access   Public
router.get(
    '/user/:user_id',
    checkObjectId('user_id'),
    async ({ params: { user_id } }, res) => {

      try {
        let profile = await User.aggregate([
            {$match : {"_id" : ObjectId(user_id)}},
            {$lookup :{
                "from" : "posts",
                "localField" : "_id",
                "foreignField" : "user",
                "as"  : "posts"
            }},
            {$lookup:{
                "from" : "follows",
                "localField" : "_id",
                "foreignField" : "user",
                "as" : "friends"
            }},
            {$lookup:{
                "from" : "profiles",
                "localField" : "_id",
                "foreignField" : "user",
                "as" : "profile"
            }},
            {$project :{
                "id" :0,
                "password":0
            }}
        ])
        

        if (profile.length===0) return res.status(400).json({ msg: 'Profile not found' });
  
        return res.json(profile);
      } 
      catch (err) {
        console.error(err.message);
        return res.status(500).json({ msg: 'Server error' });
      }
    }
);

// @route    DELETE api/profile
// @desc     Delete profile, user & posts
// @access   Private
router.delete('/', auth, async (req, res) => {
    try {
      // Remove user posts
      // Remove profile
      // Remove user

      await Promise.all([
        Post.deleteMany({ user: req.user.id }),
        Profile.findOneAndRemove({ user: req.user.id }),
        User.findOneAndRemove({ _id: req.user.id })
      ]);
  
      res.json({ msg: 'User deleted' }).status(201);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
})

router.put(
    '/education',
    auth,
    [check('school', 'School is required').notEmpty(),
    check('degree', 'Degree is required').notEmpty(),
    check('fieldofstudy', 'Field of study is required').notEmpty(),
    check('from', 'From date is required and needs to be from the past')
      .notEmpty()
      .custom((value, { req }) => (req.body.to ? value < req.body.to : true))],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      try {
        const profile = await Profile.findOne({ user: req.user.id });
  
        profile.education.unshift(req.body);
  
        await profile.save();
  
        res.json(profile);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    }
);
  
  // @route    DELETE api/profile/education/:edu_id
  // @desc     Delete education from profile
  // @access   Private
  
router.delete('/education/:edu_id', auth, async (req, res) => {
    try {
      const foundProfile = await Profile.findOne({ user: req.user.id });
      foundProfile.education = foundProfile.education.filter(
        (edu) => edu._id.toString() !== req.params.edu_id
      );
      await foundProfile.save();
      return res.status(200).json(foundProfile);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: 'Server error' });
    }
});

module.exports =router