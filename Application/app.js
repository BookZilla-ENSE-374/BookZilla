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
const { Collection } = require("mongodb");
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

app.get("/main", function (req, res) {
    res.render("main")
});

const userSchema = new mongoose.Schema ({
    _id: Number,
    username: String,
    password: String,
    favorites: [String],
});

//create Book schema
const bookSchema = new mongoose.Schema ({
    _id: Number,
    imgurl: String,
    bookTitle: String,
    author: String,
    genre: [String],
    summary: String,
    releaseDate: Date,
    reviews: [
        {
            username: String,
            _id: Number,
            rating: Number,
            review: String
        }
    ]
});

//users collection
const User = mongoose.model ( "User", userSchema );

//Books collection
const Book = mongoose.model ( "Book", bookSchema );

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


async function findInDatabaseBook() {
    try {
        const results = await Book.find();
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

findInDatabaseUser();
findInDatabaseBook();


app.post( "/login", ( req, res ) => {
    console.log( "User " + req.body.username + " is attempting to log in" );
    const user = new User ({
        username: req.body.username,
        password: req.body.password
    });
    console.log(user);
    req.login ( user, ( err ) => {
         if ( err ) {
             console.log( err );
             res.redirect( "/" );
         } else {
            passport.authenticate( 'local', { successRedirect:'/main',
            failureRedirect: '/' })( req, res, () => {
                res.redirect( "/main" ); 
            });
         }
    });
});

app.post("/register", (req, res) => {
    let success = false;
    let unique = true;
    let userList = readUser()["list"];

    for(var i = 0; i <userList.length; i++){
      if(req.body.signupuname == userList[i].username){
        unique = false;
        console.log("username taken.")
        res.redirect("/");
      };
    }

    if(req.body.signuppass && unique){
      success = true;
      users = readUser();
      users["list"].push({"username" : req.body.signupuname, "password" : req.body.signuppass})
      writeUser();
      res.render("todo", { username: req.body.signupuname, Books: readBook()});
    }
    
    if(!success){
      console.log("failed user login")
      res.redirect("/")
    }
});


app.get( "/bookInfo", async( req, res ) => {
    console.log( "A user is accessing the reviews route using get, and found the following:" );
    try {
        const results = await Book.find({_id: req.body});
        console.log( results );
        res.render( "bookInfo", { results: results });
    } catch ( error ) {
        console.log( error );
    }
});


