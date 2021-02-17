const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const checkObjectId = require('../../middleware/checkObjectId')
const Follow = require('../../models/Follow')

// @route    POST api/friends/follow/:id
// @desc     Follow a user
// @access   Private

router.post('/follow/:id', auth, checkObjectId('id'),async(req,res)=>{
    if(req.user.id===req.params.id){
        return res.status(401).json({msg:"you cant self follow"})
    }
    try{
        let current_user =await Follow.findOne({user:req.user.id})
        let another_user =await Follow.findOne({user:req.params.id})
        if(!current_user || current_user===[]){
            current_user = new Follow({
                user : req.user.id,
                followers : [],
                following : []
            })
            current_user.following.unshift({user:req.params.id});
            await current_user.save()
        }
        else{
            if(current_user.following.some((follow) => follow.user.toString()===req.params.id)){
                return res.status(400).json({msg : "you are already following this user"})
            }
            current_user.following.unshift({user:req.params.id})
            await current_user.save()
        }
        if(!another_user || another_user===[]){
            another_user= new Follow({
                user : req.params.id,
                followers : [],
                following : []
            })
            another_user.followers.unshift({user:req.user.id})
            await another_user.save()
        }
        else{
            another_user.followers.unshift({user:req.user.id})
            await another_user.save()
        }
        return res.status(200).json({current_user})
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

// @route    POST api/friends/unfollow/:id
// @desc     unfollow a user
// @access   Private

router.post('/unfollow/:id', auth, checkObjectId('id'),async(req,res)=>{
    if(req.user.id===req.params.id){
        return res.status(401).json({msg:"you cant self follow"})
    }
    try{
        let current_user =await Follow.findOne({user:req.user.id})
        let another_user =await Follow.findOne({user:req.params.id})
        if(!current_user || current_user.following===[] || !another_user || another_user.followers===[]){
            return res.status(401).json({msg: "you are not currently following to unfollow"})
        }
        
        //check if user is currently following him or not
        if(current_user.following.some(follow => follow.user.id === req.params.id)){
            return res.status(401).json({msg: "you are not currently following to unfollow in some method"})
        }
        
        //remove from following
        current_user.following = current_user.following.filter(
            ({ user }) => user.toString() !== req.params.id
        )

        //remove from followers
        another_user.followers = another_user.followers.filter(
            ({ user }) => user.toString() !== req.user.id
        )
        
        await current_user.save()
        await another_user.save()
        return res.status(200).json({current_user})
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

module.exports = router
