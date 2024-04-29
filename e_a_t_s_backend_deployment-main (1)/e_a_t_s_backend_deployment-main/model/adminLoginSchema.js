const mongoose = require('mongoose');

const adminLoginSchema = new mongoose.Schema({
    "adminname":{type:String},
    "adminage":{type:String},
    "adminemail":{type:String},
    "adminpassword":{type:String},
    "adminphone":{type:String},
},{
    collection:"adminlogin"
});

module.exports = mongoose.model("adminlogin",adminLoginSchema);