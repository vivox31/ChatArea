const express = require('express')
const User = require('../Models/userModel')
const jwt = require('jsonwebtoken')
const CryptoJS = require('crypto-js')
const router = express.Router();
const verify = require('./verifyToken')

router.post('/login', async (req,res)=>{
    const user = await User.findOne({email:req.body.email});

    // checking for user in DB
    if(!user) return res.json(401,'user not found!');
    
    // decrypting and checking correct password
    var bytes  = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
    var originalPass = bytes.toString(CryptoJS.enc.Utf8);

    if(originalPass !== req.body.password) return res.status(400).json('incorrect password');

    //creating jwt token
    const accesstoken = jwt.sign({id:user._id},
        process.env.SECRET_KEY,
        {
            expiresIn:'20d'
        })
        const {password , ...info} = user._doc;
        return res.status(200).json({...info , accesstoken});
});

router.post('/ragister',async (req,res)=>{
    const {name, email,password} = req.body
    // check for any incomplete information
    if(!name || !email || !password){
       return res.status(400).json('incomplete info')
    }
    
    const user = await User.findOne({email});
    if(user){
       return res.status(400).json('user already exists');
        
    }else{
        const newuser = new User({
            email:email,
            name:name,
            password: CryptoJS.AES.encrypt(password, process.env.SECRET_KEY).toString()
        })
        newuser.save();
       return res.status(201).json(newuser)
    }  
});



router.get('/fetchUsers',verify, async (req, res) => {
    const keyword = req.query.search
      ? {
          $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};
  
    const users = await User.find(keyword).find({
      _id: { $ne: req.user.id },
    });
    res.send(users);
  });

    module.exports = router
    