// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express  = require("express");

// Start up an instance of app
const app = express();

/* Middleware*/
const cors = require("cors");
const bodyParser = require("body-parser");

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance.
app.use(cors());

// Initialize the main project folder.
app.use(express.static('website'));


const port = 3000;
// Spin up the server.
const server = app.listen(port , listening);

//call the debug function
function listening(){
    console.log(`Running on localhost : ${port}`);
}

// GET Route.
app.get('/all' , getAll)


// Callback function to complete GET '/all'.

function getAll (request, response){
    response.send(projectData)
}

// post Route.
app.post('/add' , postData)

// Callback function to complete POST '/add'.
function postData (request, response)  {

    newEntry = {
        date:request.body.date,
        temp:request.body.temp,
        content:request.body.content,
        city:request.body.city,
        description:request.body.description
    }
    projectData = newEntry ;
    console.log(projectData);
}


