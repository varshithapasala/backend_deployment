// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//     "username":{type:String},
//     "department":{type:String},
//     "email":{type:String},
//     "phoneNo":{type:String},
//     "password":{type:String},
//     "jan":{type:Array},
//     "feb":{type:Array},
//     "mar":{type:Array},
//     "apr":{type:Array},
//     "may":{type:Array},
//     "jun":{type:Array},
//     "jul":{type:Array},
//     "aug":{type:Array},
//     "sep":{type:Array},
//     "oct":{type:Array},
//     "nov":{type:Array},
//     "dec":{type:Array},
// },{
//     collection:"users"
// });

// module.exports = mongoose.model("users",userSchema);

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    department: String,
    email: String,
    phoneNo: String,
    password: String,
    jan: [
        {
            day: String,
            checkin: String,
            checkout: String
        }
    ],
    feb: [
        {
            day: String,
            checkin: String,
            checkout: String
        }
    ],
    mar: [
        {
            day: String,
            checkin: String,
            checkout: String
        }
    ],
    apr: [
        {
            day: String,
            checkin: String,
            checkout: String
        }
    ],
    may: [
        {
            day: String,
            checkin: String,
            checkout: String
        }
    ],
    jun: [
        {
            day: String,
            checkin: String,
            checkout: String
        }
    ],
    jul: [
        {
            day: String,
            checkin: String,
            checkout: String
        }
    ],
    aug: [
        {
            day: String,
            checkin: String,
            checkout: String
        }
    ],
    sep: [
        {
            day: String,
            checkin: String,
            checkout: String
        }
    ],
    oct: [
        {
            day: String,
            checkin: String,
            checkout: String
        }
    ],
    nov: [
        {
            day: String,
            checkin: String,
            checkout: String
        }
    ],
    dec: [
        {
            day: String,
            checkin: String,
            checkout: String
        }
    ],
}, { collection: "users" });

module.exports = mongoose.model("users", userSchema);