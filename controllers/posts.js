const Post = require('../models/Posts')
const formidable = require('formidable')
const fs = require('fs')

exports.getPosts = (req, res) => {
  const posts = Post.find()
    .populate("postedByUser", "_id name")
    .select(" _id title body postedByUser ")
    .then(
      posts => {
        res.status(200).json({
          posts: posts
        })
      })
    .catch(
      err => {
        console.log(err);
      }
    )

}

exports.createPost = (req, res) => {
  const post = new Post(req.body)
  post.postedByUser = req.profile
  post.save().then(
    result => {
      res.json({
        post: result
      })
    }
  )
}

//ls 52
// exports.createPost = (req, res, next) => {
//   let  form  = new formidable.IncomingForm()
//   form.keepExtensions = true

//   form.parse(req, (err, fields, files) => {
//     if(err){
//       return res.status(400).json({
//         err: "image couldn be uploaded"
//       })
//     }

//     let post = new Post(fields)
//     post.postedByUser = req.profile

//     if(files.photo){
//       post.photo.data = fs.readFileSync(files.photo.path)
//       post.photo.contentType =  files.photo.type
//     }

//     post.save(
//       (err, result) => {
//         if(err){
//           return res.status(400).json({
//             error: err
//           })
//         }
//         res.json({
//           result
//         })
//       }
//     )
//   })
// }

exports.postsByUser = (req, res) => {
  Post.find(
    {postedByUser: req.profile._id}
    )
      .populate("postedBuUser", "_id name")      
      .exec(
        (err, posts) => {
          if(err){
            return res.status(400).json({
              err
            })
          }
          res.json(posts)
        }
      )
}