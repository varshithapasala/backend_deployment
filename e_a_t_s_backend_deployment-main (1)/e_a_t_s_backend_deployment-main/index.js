const mongoose = require('mongoose');
const express = require('express');
const app = express();
const eats = require('./controler/eats');
const bodyParser = require('body-parser');
const cors = require('cors');

mongoose.set("strictQuery", true);
mongoose.connect("mongodb+srv://usha:usha@cluster0.ycub0q5.mongodb.net/crudeats");

var db = mongoose.connection;
db.on('open',()=>console.log("connected to db"));
db.on('error',()=>console.log("error connecting to db"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.use("/eats",eats);

app.listen(4000,()=>console.log("server started on port 4000"));

//http://localhost:4000/eats