const express = require("express");
const path = require("path");
require("dotenv").config();
const cors = require("cors");

var userRoutes = require('./routes/users.js');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use(express.static(__dirname + "/static/public"));

app.use("/", userRoutes.midl);

app.get("/", (req, res) => {
res.sendFile(path.join(__dirname + "/static", "index.html"));
});
app.get("/add", (req, res) => {
    res.send("temu add coder");
});
app.all("*", (req, res) => res.send("4014"));
app.listen(5000, () => console.log("Listening at 5000"));