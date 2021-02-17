const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FollowSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required:true,
        unique:true
    },
    followers:[
        {
          user: {
            type: Schema.Types.ObjectId
          }
        }
    ],
    following:[
        {
            user: {
            type: Schema.Types.ObjectId
            }
        }
    ]
})

module.exports = mongoose.model('follow',FollowSchema)