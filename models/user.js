const mongoDb=require('mongodb');
const getDb=require('../util/database').getDb;

const ObjectId=mongoDb.ObjectId;

class User{
    constructor(username,emailId,password){
        this.username=username;
        this.emailId=emailId;
        this.password=password;
        this.createdTime=User.createDate();
        this.posts=[];
    }   

    static createDate(){
        var date=new Date;
        return date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear()+'--'+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()+':'+date.getMilliseconds();
    }

    addUser(){
        const db=getDb();
        db.collection('user').insertOne(this)
        .then((success)=>{
            console.log(this.emailId+' : user is inserted successfully');
        })
        .catch(err=>{
            console.log(err);
        })
    }

    static findUser(email){
        const db=getDb()
        return db.collection('user')
            .findOne({emailId:email})
            .then((user)=>{
                if(!user){
                    return false;
                } else {
                    return true;
                }
            })
            .catch(err=>{
                console.log(err);
            })
    }

    static addPost(post_id,userId){
        const db=getDb();
        return db.collection('user')
        .findOneAndUpdate({_id:new ObjectId(userId)},{$push:{posts:{post_id:post_id}}})
        .then((user)=>{
            if(!user){
                return null;
            } else {
                console.log('post is added successfully');
                return user;
            }
        })
        .catch(err=>{
            console.log(err);
        })
    }
}

module.exports=User;