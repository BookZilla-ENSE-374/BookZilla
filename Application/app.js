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

let userLogedin = null;

app.get("/", (req, res)=>{
    res.sendFile(__dirname + "/Application/index.html");
})

app.get("/login", function (req, res) {
    userLogedin = null;
    res.render("login")
});

app.get("/requestBook", function (req, res) {
    res.render("requestBook")
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


app.post( "/login", async( req, res ) => {
    try {
        const { username, password } = req.body; // Assuming you have form fields named 'username' and 'password'

        // Find the user by username in the database
        const user = await User.findOne({ username });

        if (!user) {
            console.log("User not found");
            return res.status(401).send("Invalid username or password");
        }
        userLogedin = username;
        // Check if the provided password matches the stored password
        const isPasswordValid = user.password === password;

        if (!isPasswordValid) {
            console.log("Invalid password");
            return res.status(401).send("Invalid username or password");
        }

        // If both username and password are valid, you can consider the user as logged in
        console.log("User successfully logged in");
        res.redirect("/main");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

app.post("/register", async(req, res) => {
    try {
        const { username, password } = req.body;

        // Check if the username is already taken
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            console.log("Username already taken");
            return res.status(409).send("Username already taken");
        }

        // Create a new user
        const newUser = new User({ username, password });

        // Save the user to the database
        await newUser.save();

        console.log("User registered successfully");
        res.redirect("/login"); // Redirect to the login page after successful registration
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
        // res.render("login");
    }
});


app.post( "/bookInfo", async( req, res ) => {
    console.log( "A user is the bookInfo route using post, and found the following:" );
    try {
        const bookId = req.body.submitbutton; // Assuming submitbutton contains the book ID
        const result = await Book.findById(bookId);

        if (!result) {
            // Handle the case where the book with the specified ID is not found
            console.log("Book not found");
            return res.status(404).send("Book not found");
        }

        const reviews = result.reviews || [];
        const ratedReviews = reviews.filter(review => review.rating !== undefined && review.rating !== null);
        const totalRatings = ratedReviews.reduce((sum, review) => sum + review.rating, 0);
        const averageRating = ratedReviews.length > 0 ? totalRatings / ratedReviews.length : 0;
        const numRatings = ratedReviews.length;

        console.log(result);
        console.log(`Average Rating: ${averageRating}`);
        res.render("bookInfo", { result, averageRating, numRatings, username: userLogedin });
    } catch ( error ) {
        console.log( error );
    }
});


app.get("/main", async (req, res) => {
    try {
        const results = await Book.find();
        // Need to a query for finding the most popular books
        console.log( results );
        console.log(userLogedin);
        res.render( "main", { results: results, username: userLogedin });
    } catch ( error ) {
        console.log( error );
    }
});

app.get("/rate", async (req, res) => {
    try {
        const bookId = req.params.bookId;
        const rating = req.body.rating; // Assuming you have a form field named 'rating'

        // You might want to add validation for the rating here

        const book = await Book.findById(bookId);

        if (!book) {
            console.log("Book not found");
            return res.status(404).send("Book not found");
        }

        // Add the new rating to the reviews list
        book.reviews.push({ username: "currentUser", rating: parseInt(rating) });

        // Update the book in the database
        const updatedBook = await book.save();

        console.log("Rating added successfully");
        res.redirect(`/bookInfo/${bookId}`); // Redirect to the bookInfo page for the updated book
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

