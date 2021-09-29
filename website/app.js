

/* Global Variables */
let generate = document.querySelector("#generate");



// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.toDateString();

// personal api key for OpenWeatherMap API
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "&appid=fe84400e6fe3cc31c145db32744cc32a&units=metric";

//Adding function by event listener for 'generate button'
generate.addEventListener('click' , getData);
function getData (e){
    let zip = document.querySelector("#zip").value ;
    let feeling = document.querySelector("#feeling").value ;
    if (zip.trim() == "") { alert("Please Enter A valid zip code"); }
    getWeatherApi(baseUrl,zip,apiKey)
        
        .then(function(data){
        
        postData('/add', {date: newDate , temp: Math.round(data.main.temp) , content: feeling , city: data.name , description: data.weather[0].description});     // Add data to post request
        updateUi();
        document.getElementById('entry').style.opacity = 1;
    });

};


// function to get web api data 
const getWeatherApi = async(baseUrl, zip , apiKey) => {
    const res = await fetch(baseUrl+zip+apiKey);
    try{
        const data = await res.json();
        console.log(data)
        return data ;
    }
    catch(error){
        console.log(error);
    }
}


// function to post data 
const postData = async ( url = '', data = {}) => {
    console.log(data)
    const response = await fetch(url, {
        method: 'POST', 
        credentials: 'same-origin', 
        headers: {
        'Content-Type': 'application/json',
        },
      body: JSON.stringify(data), // body data type must match "Content-Type" header        
    });

    try {
        const newData = await response.json();
        console.log(newData);
        return newData ;
    }
    catch(error) {
        console.log("error", error);
      // appropriately handle the error
    }
}

// function to get project data 
const updateUi = async () =>{
    const request = await fetch ('/all');
    try{
        const allData = await request.json();
        document.querySelector("#date").innerHTML = `Date : ${allData.date}`;
        document.querySelector("#temp").innerHTML = `Temperature : ${allData.temp} C`;
        document.querySelector("#content").innerHTML = `my status is  : ${allData.content}`;
        document.querySelector("#description").innerHTML = `  ${allData.city}`;
        document.querySelector("#city").innerHTML = `  ${allData.description}`;

    }
    catch(error){
        console.log("error" , error)
    }
}
