const express = require('express');
const userRoute = express.Router();
const userSchema = require('../model/userSchema');
const adminLoginSchema = require('../model/adminLoginSchema');
const mongoose = require('mongoose');

userRoute.post("/signup-user",(req,res)=>{
    userSchema.findOne({email:req.body.email},(err,data)=>{
        if(err){
            return err;
        }
        else if(data){
            res.json("user already exists");
        }
        else{
            userSchema.create(req.body,(err,data)=>{
                if(err){
                    return err;
                }else{
                    res.json(data);
                }
            })
        }})
})



//dummy
userRoute.get("/",(req,res)=>{
    userSchema.find((err,data)=>{
        if(err){
            return err;
        }else{
            res.json(data);
        }
    })
})

userRoute.get("/account/:id",(req,res)=>{
    userSchema.findById(mongoose.Types.ObjectId(req.params.id),(err,data)=>{
        if(err){
            return err;
        }else{
            res.json(data);
        }
    })
})

userRoute.post('/login-user', (req, res) => {
    const { email, password } = req.body;
    userSchema.findOne({ email: email })
        .then((user) => {
            if (user) {
                if (user.password === password) {
                    res.json(user._id);
                    // res.json("user logged in");
                }   
                else {
                    res.json("password incorrect");
                }
            }
            else {
                res.json("user not registered");
            }
        }).catch((err) => {
            console.log(err);
    })
});

userRoute.route("/update-user/:id")
.get((req,res)=>{
    userSchema.find(mongoose.Types.ObjectId(req.params.id),(err,data)=>{
        if(err){
            return err;
        }else{
            res.json(data);
        }
    })

}).put((req,res)=>{
    userSchema.findByIdAndUpdate(mongoose.Types.ObjectId(req.params.id),{
        $set:req.body
    },(err,data)=>{
        if(err){
            return err;
        }else{
            res.json(data);
        } 
    })
})

userRoute.route("/checkIn/:id")
    .get((req, res) => {
        userSchema.findById(mongoose.Types.ObjectId(req.params.id), (err, data) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json(data);
        });
    })
    .put((req, res) => {

        try{
        const userId = req.params.id;
        // console.log(req.body);
        const { day, month, checkin } = req.body;

        let currday = day;
        currday = currday.toString()


        const monthToUpdate = month.toLowerCase(); // Convert month to lowercase

        // Find the user by ID
        userSchema.findById(userId, (err, user) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            // Check if the specified month exists in the user's document
            if (!user[monthToUpdate]) {
                return res.status(404).json({ error: 'Month not found' });
            }

            // Find the record for the specified day in the month's array
            const dayRecord = user[monthToUpdate].find(record => record.day === currday);

            if (!dayRecord) {
                return res.status(404).json({ error: 'Day not found' });
            }

            if(dayRecord.checkin !== "00:00:00"){
                return res.json("already checked in");
            }
            // Update the check-in time for the specified day
            dayRecord.checkin = checkin;

            // Save the updated user data
            user.save((saveErr, savedUser) => {
                if (saveErr) {
                    return res.status(500).json({ error: saveErr.message });
                }
                res.json(savedUser);
            });
        });
    }catch(err){
        console.log(err);
    }});


userRoute.route("/checkOut/:id")
.get((req, res) => {
    userSchema.findById(mongoose.Types.ObjectId(req.params.id), (err, data) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(data);
    });
})
.put((req, res) => {

    try{
    const userId = req.params.id;
    // console.log(req.body);
    const { day, month, checkout } = req.body;

    let currday = day;
    currday = currday.toString()


    const monthToUpdate = month.toLowerCase(); // Convert month to lowercase

    // Find the user by ID
    userSchema.findById(userId, (err, user) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        // Check if the specified month exists in the user's document
        if (!user[monthToUpdate]) {
            return res.status(404).json({ error: 'Month not found' });
        }

        // Find the record for the specified day in the month's array
        const dayRecord = user[monthToUpdate].find(record => record.day === currday);

        if (!dayRecord) {
            return res.status(404).json({ error: 'Day not found' });
        }

        if(dayRecord.checkout !== "00:00:00"){
            return res.json("already checked out");
        }
        // Update the check-in time for the specified day
        dayRecord.checkout = checkout;

        // Save the updated user data
        user.save((saveErr, savedUser) => {
            if (saveErr) {
                return res.status(500).json({ error: saveErr.message });
            }
            res.json(savedUser);
        });
    });
}catch(err){
    console.log(err);
}});


userRoute.delete("/delete-user/:id",(req,res)=>{
    userSchema.findByIdAndRemove(mongoose.Types.ObjectId(req.params.id),(err,data)=>{
        if(err){
            return err;

        }else{
            res.json(data);
        }
    })
})



//admin page

userRoute.post('/login-admin', (req, res) => {
    const { adminemail, adminpassword } = req.body;
    adminLoginSchema.findOne({ adminemail: adminemail })
        .then((user) => {
            if (user) {
                if (user.adminpassword === adminpassword) {
                    res.json(user._id);
                    // res.json("user logged in");
                }   
                else {
                    res.json("password incorrect");
                }
            }
            else {
                res.json("Your not the admin");
            }
        }).catch((err) => {
            console.log(err);
    })
});

userRoute.get("/adminaccount/:id",(req,res)=>{
    adminLoginSchema.findById(mongoose.Types.ObjectId(req.params.id),(err,data)=>{
        if(err){
            return err;
        }else{
            res.json(data);
        }
    })
})





module.exports = userRoute;