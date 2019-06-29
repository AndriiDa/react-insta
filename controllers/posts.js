const Post = require('../modules/Posts')

exports.getPosts = (req, res) => {
  res.json(
    {
      psts:[
      {
        id: 1,
        title: "first post",
        body: "description"
      },
      {
        id: 2,
        title: "second post",
        body: "description"
      },
    ]
    }
  )
} 

exports.createPost = (req, res) =>{
  const post = new Post(req.body)

  post.save(
    (err, result) =>{
      if(err){
        return res.status(400).json(
          {err}
        )
      }else{
        return res.status(200).json({
          post: result
        })
      }
    }
  )

}