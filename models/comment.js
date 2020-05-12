const mongoDb=require('mongodb');
const getDb=require('../util/database').getDb;

const Post=require('./post');


class Comment{

    constructor(commented_by_user_id,commentName,commented_on_post_id){
        this.commented_by_user_id=commented_by_user_id;
        this.commentName=commentName;
        this.commented_on_post_id=commented_on_post_id;
    }

    addComment(){
        const db=getDb();
        return db.collection('comment')
        .insertOne(this)
        .then((comment)=>{
            if(!comment){
                console.log('comment not found in add comment');
                return null;
            } else {
                console.log('comment created in comment collection');
                console.log(this._id);
                return Post.addComment(this.commented_on_post_id,this._id,this.commented_by_user_id);
            }
        })
        .catch(err=>{
            console.log(err);
        })
    }
}

module.exports=Comment;