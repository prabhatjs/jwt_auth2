const express=require('express');
const path = require('path');
const cookieparser=require('cookie-parser');
const User=require('./models/User')
const app=express();

app.use(express.json());
app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));
app.use(cookieparser());

app.get('/',(req,res)=>{
    res.render('index');
})
app.post('/create',async (req,res)=>{
    let {username,email,password,age}=req.body;
    let createUser=await User.create({
        username,
        email,
        password,
        age
    })
    res.send(createUser)
})

app.listen(3000,()=>{
    console.log(`server Runing on PORT ${3000}`);
});