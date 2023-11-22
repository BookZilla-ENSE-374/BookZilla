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


async function findInDatabaseUser() {
    try {
        const results = await User.find();
        //console.log(results);
        if ( results.length === 0 ) {
            console.log( "no results found 1" );
            return;
        }
        // this is where we have access to our results
        console.log(results);
    } catch ( error ) {
        console.log( error );
    }
}


// //create user schema
// const userSchema = {
//     name: 'user',
//     properties: {
//       _id: 'objectId',
//       favorites: 'string[]',
//       password: 'string',
//       username: 'string',
//     },
//     primaryKey: '_id',
// };


app.get("/", (req, res)=>{
    res.sendFile(__dirname + "/Application/index.html");
})

app.get("/login", function (req, res) {
    res.render("login")
});

app.get("/requestBook", function (req, res) {
    res.render("requestBook")
});

//users collection
// const User = mongoose.model ( "User", userSchema );

//tasks collection
// const Task = mongoose.model ( "Task", taskSchema );

async function findInDatabaseUser() {
    try {
        const results = await User.find();
        //console.log(results);
        if ( results.length === 0 ) {
            console.log( "no results found 1" );
            return;
        }
        // this is where we have access to our results
        console.log(results);
    } catch ( error ) {
        console.log( error );
    }
}


async function findInDatabaseTask() {
    try {
        const results = await Task.find();
        //console.log(results);
        if ( results.length === 0 ) {
            console.log( "no results found 2" );
            return;
        }
        // this is where we have access to our results
        console.log(results);
    } catch ( error ) {
        console.log( error );
    }
}

// findInDatabaseUser();
// findInDatabaseTask();
