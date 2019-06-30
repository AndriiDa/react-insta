const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {
  ObjectId
} = mongoose.Schema

// Create Schema
const PostShema = new Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  photo: {
    data: Buffer,
    contentType: String
  },
  postedByUser: {
    type: ObjectId,
    ref: 'users'
  },
  likes: {
    user: {
      type: ObjectId,
      ref: 'users'
    }
  },
  comments: {
    user: {
      type: ObjectId,
      ref: 'users'
    },
    text: {
      type: String
    },
    name: {
      type: String
    }
  }
});

//'users' - collection, UserShema - model
module.exports = User = mongoose.model('posts', PostShema);