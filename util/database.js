const mongodb=require('mongodb');
const mongoClient=mongodb.MongoClient;
const url='add your key';

var _db;
const mongoConnect=callback=>{
    mongoClient.connect(url,{ useNewUrlParser: true,useUnifiedTopology: true })
    .then(client=>{
        _db=client.db();
        console.log('connected to db')
        callback();
    })
    .catch(err=>{
        console.log(err);
        throw err;
    })
}

const getDb=()=>{
    if(_db){
        return _db;
    }else{
        throw('no db found');
    }
}

exports.mongoConnect=mongoConnect;
exports.getDb=getDb;
