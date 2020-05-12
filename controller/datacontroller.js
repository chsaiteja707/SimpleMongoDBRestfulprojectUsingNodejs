// const Post=require('../models/posts');
// const User=require('../models/user');
const Post=require('../models/post');
const Comment=require('../models/comment');

exports.addPost=((req,res,next)=>{
    const postName=req.body.postName;
    const userId=req.body.userId;
    const post=new Post(userId,postName);
    post.addPostInPostDb(userId)
    .then(post=>{
        if(!post){
            res.status(404)
            .json({
                message:"user not found"
            })
        } else {
            res.status(200)
            .json({
                message:"post has been added to user queue"
            })
        }
    })
    .catch(err=>{
        console.log(err);
    })
})

exports.addComment=((req,res,next)=>{
    const postId=req.body.postId;
    const commentdata=req.body.comment;
    const userId=req.body.userId;
    const comment=new Comment(userId,commentdata,postId);
    console.log(comment);
    comment.addComment()
    .then((comment)=>{
        if(!comment){
            res.status(404)
            .json({
                message:"comment not found"
            })
        } else {
            res.status(200)
            .json({
                message:"comment has been added to user queue"
            })
        }
    })
})
