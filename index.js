const express=require('express');
const path = require('path');
const cookieparser=require('cookie-parser');
const User=require('./models/User')
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken')
const app=express();

app.use(express.json());
app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));
app.use(cookieparser());

app.get('/',(req,res)=>{
    res.render('index');
})
app.post('/create', (req,res)=>{
    let {username,email,password,age}=req.body;
        bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(password,salt, async(err,hash)=>{  
            console.log(hash);
        let createUser=await User.create({
        username,
        email,
        password:hash,  
        age
    })
    
        let token=jwt.sign({email},"secrate-key");
        res.cookie("token",token);
        res.send(createUser)
            
        })
       
    })

});

app.get("/login",function(req,res){
    res.render('Login');
})

app.post("/login",async function(req,res){
  let user=await User.findOne({email:req.body.email});
  console.log(user);
    if(!user){
        res.send("Something went wrong");
    }
    //compare password db and user input
    bcrypt.compare(req.body.password,user.password,function (error,result){
        if(result){
            let token=jwt.sign({email:user.email},'secrate-key');
            res.cookie("token",token);
            
        res.send("Yes You Can login");
        }
        else
         res.send("Something went wrong plse check email password");
    })
    
})

app.post('/logout',function(req,res){
    res.cookie("token",'');
});

app.listen(3000,()=>{
    console.log(`server Runing on PORT ${3000}`);
});