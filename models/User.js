const mongoose=require('mongoose');

mongoose.connect('');

const userSchema=mongoose.Schema({
    username:String,
    email:String,
    password:String,
    age:Number
})

module.exports=mongoose.model("User",userSchema);