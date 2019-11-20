const http = require('http');
const bodyParser = require('body-parser');
const path = require('path');
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const googleAPI = require('./googleAPI');

// Making an express application
const app = express();

// Render HTML files (from 'views' directory) using the EJS view engine
app.set('views', `${__dirname}/views`)
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// Accessing css and js files
app.use(express.static(`${__dirname}/public`));

// To extract form data from the POST request body
app.use(express.urlencoded());

// Finishing up the body-parser set up
app.use(bodyParser.urlencoded({extended: true})); //find out more....

// Entering 'localhost:8080' into the url presents the homepage

app.get('/', (req, res) => res.status(200).render('index.html'));

app.post("/search", (req, res) => {
    console.log(req.body)
    let query = JSON.stringify(req.body);
    googleAPI.search(query)
    .then(res.sendFile(path.join(__dirname, "./search.json"))).then(res.redirect("results"))
    .catch((error) => console.log(error.message));

});

app.get("/search.json", (req, res) => res.sendFile(path.join(__dirname, "search.json")));

app.get("/results", (req, res) => {

    res.sendFile(path.join(__dirname, "views/results.html"));
});

//  This route presents the mail page
 app.get("/mail", (req, res) => res.status(200).render('mail'));
 
    
// Listening to the server on port 8080
app.listen(8080, '127.0.0.1', () => console.log('Listening to port 8080..'));
