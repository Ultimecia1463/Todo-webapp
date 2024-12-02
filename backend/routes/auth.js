const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");

router.post("/register",async(req,res)=>{
    try {
        const {email,username,password}=req.body;
        const hashpassword = bcrypt.hashSync(password);
        const user =new User({email,username,password:hashpassword});
        await user.save().then(() => {res.status(200).json({user:user});} );
        console.log("user registered");
    } catch (error) {
        res.status(400).json({message:"user already exists"});
        console.log("user already exists");
    }
});

router.post("/signin",async(req,res)=>{
    try {

        const user = await User.findOne({email:req.body.email});
        if (!user) {
            res.status(400).json({message:"user does not  exist"});
            console.log("user does not  exist");
        }

        const isPasscorrect = bcrypt.compareSync(req.body.password,user.password);
        if (!isPasscorrect) {
            res.status(400).json({message:"password is not  correct"});
            console.log("password is not  correct");
        }

        const {password,...others}=user._doc;
        res.status(200).json({others});
        console.log("user logged in ");

    } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports=router;