const router =  require("express").Router();
const user = require("../models/user");
const List = require("../models/list");

router.post("/addtask",async (req,res) => {
    try {
        const {task,email}=req.body;
        const existinguser = await user.findOne({email});
        if(existinguser){
            const list = new List({task,user:existinguser});
            await list.save();
            existinguser.list.push(list._id);
            await existinguser.save();
            res.status(200).json({list});
        }else{
            res.status(404).json({message:"user not found"})
        }
        console.log("new task added");
    } catch (error) {
        console.log(error);
    }
});

//update

router.put("/updatetask/:id",async (req,res) => {
    try {
        const {task,email}=req.body;
        const existinguser = await user.findOne({email});

        if(existinguser){

            const list = await List.findByIdAndUpdate(req.params.id,{task});
            await list.save();
            res.status(200).json({message:"task updated"});

        }else{
            res.status(404).json({message:"user not found"});
        }
        console.log("task updated");
    } catch (error) {
        console.log(error);
    }
});

//delete

router.delete("/deltask/:id",async (req,res) => {
    try {
        const {email}=req.body;
        const existinguser = await user.findOneAndUpdate({email},{$pull:{list:req.params.id}});

        if(existinguser){

            await List.findByIdAndDelete(req.params.id);
            res.status(200).json({message:"task deleted"});

        }else{
            res.status(404).json({message:"user not found"});
        }
        console.log("task deleted");
    } catch (error) {
        console.log(error);
    }
});

router.get("/gettask/:id",async(req,res)=>{
    const list =await List.find({user:req.params.id}).sort({createdAt:-1});
    if(list.length!==0){
        res.status(200).json({list:list});
    }else{
        res.status(200).json({message:"No tasks"});
    }
});

module.exports = router;