const mongoDb=require('mongodb');
const getDb=require('../util/database').getDb;

const User=require('./user');

const ObjectId=mongoDb.ObjectId;

class Post{
    constructor(user_id,postName){
        this.user_id=user_id;
        this.postName=postName;
        this.createDate=Post.createDate();
        this.comments=[];
    }

    static createDate(){
        var date=new Date;
        return date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear()+'--'+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()+':'+date.getMilliseconds();
    }

    addPostInPostDb(user_id){
        const db=getDb();
        return db.collection('post')
        .insertOne(this)
        .then((post)=>{
            if(!post){
                return null;
            } else {
                console.log(this._id);
               return User.addPost(this._id,user_id)
               .then(user=>{
                    if(!user){
                        return null;
                    } else {
                        return user;
                    }
               }) 
            }
        })
        .catch(err=>{
            console.log(err);
        })
    }

    static addComment(post_id,comment_id,commented_by_user){
        const db=getDb();
        return db.collection('post')
        .updateOne({_id:new ObjectId(post_id)},{$push:{comments:{comment_id:new ObjectId(comment_id),commented_by_user_id:new ObjectId(commented_by_user)}}})
        .then(post=>{
            if(!post){
                console.log('post is failed');
                return null;
            } else {
                //  console.log(post);
                console.log('success in post=========')
                return post;
            }
        })
        .catch(err=>{
            console.log(err)            
        })
    }
}

module.exports=Post;