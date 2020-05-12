const express=require('express');
const bodyParser=require('body-parser');
const mongoConnect=require('./util/database').mongoConnect;

const dataRoutes=require('./routes/dataroutes');
const userRoutes=require('./routes/userroutes');

const app=express();

app.use(bodyParser.json());

//routes
app.use(dataRoutes);
app.use(userRoutes);

mongoConnect(()=>{
  app.listen(3000);
})