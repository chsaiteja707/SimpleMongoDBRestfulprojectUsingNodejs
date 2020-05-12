const express=require('express');

const dataController=require('../controller/datacontroller');

const router=express.Router();

router.post('/addpost',dataController.addPost);

router.post('/addcomment',dataController.addComment);

module.exports=router;