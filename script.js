function displayResults() {
    document.getElementById('results').style.visibility = "visible";
}


document.querySelector('.search-bar').addEventListener("keypress", function(event){ /* THIS FUNCTION WILL DISPLAY RESULTS WHEN YOU PRESS 'ENTER' */ 
    if(event.key == "Enter"){
        displayResults();
    }
});

let weather = {
    "apiKey": "318fcee66cfedaddd04d16c4980e7f37",
    fetchWeather: function(city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q="
         + city 
         + "&units=metric&appid=" 
         + this.apiKey
        )
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp } = data.main;
        console.log(name, icon, description, temp);
        document.querySelector(".city").innerHTML = "Weather in " + name;
        document.querySelector(".icon").src = 
        "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerHTML = description;
        document.querySelector(".temp").innerHTML = temp + "°C";
    },
    search: function(){
        this.fetchWeather(document.querySelector(".search-bar").value);
    } 
}

document.querySelector(".submit-button").addEventListener("click", function() {
    weather.search();
    displayResults();
})

document.querySelector(".search-bar").addEventListener("keyup", function(event) {
    if(event.key == "Enter") {
        weather.search();
    }
})