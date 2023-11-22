const mongoose = require("mongoose");
const express = require("express");
const uri = "mongodb+srv://taiwoakinwale:testing1234@cluster0.s1ydylt.mongodb.net/?retryWrites=true&w=majority";

const app = express(); 

async function connect() {
    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB")
    } catch (error) {
        console.error(error);
    }
}

connect();
// host static resources
app.use(express.static("public"));
// body-parser is now built into express!
app.use(express.urlencoded({ extended: true})); 


// a common localhost test port
const port = 3000; 
const fs = require( "fs" );
app.set("view engine", "ejs");
// Simple server operation
app.listen (port, () => {
    // template literal
    console.log (`Server is running on http://localhost:${port}`);
});


app.get("/", (req, res)=>{
    res.sendFile(__dirname + "/Application/index.html");
})

app.get("/login", function (req, res) {
    res.render("login")
});

app.get("/requestBook", function (req, res) {
    res.render("requestBook")
});

app.get("/bookInfo", function (req, res) {
    res.render("bookInfo")
});

app.get("/main", function (req, res) {
    res.render("main")
});
