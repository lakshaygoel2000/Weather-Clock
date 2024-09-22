const API_KEY="c85fadde00fb46a8be7165521241609";
const loc = document.getElementById("location");
const title = document.getElementsByClassName("title");
const input = document.getElementById("location-input");
const button = document.getElementById("search");

function showTime(){
    const currentTime = new Date();
    const time = `${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()}`
    document.getElementById("time").innerText = time; 
    changeBg(currentTime.getHours());
}
showTime();

// Function to fetch current location of user
function area(){
    const zone = navigator.geolocation.getCurrentPosition(showpos);
}
area();


async function getData(lat, long){
    const promise = await
    fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${lat}+${long}&aqi=no`
    );
    return await promise.json()
}

async function showpos(position) {
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    const value = await getData(lat,long);
    loc.innerText = `${value.location.name}, ${value.location.country}`;
     document.getElementById("user-loc").innerHTML = `
     <h4>${value.location.name}, ${value.location.country} </h4>
     <p>${value.location.localtime}</p>
     <p>Temperature: ${value.current.temp_c}°C</p>
     `;
     
};
let count=1;

async function getcityData(cityName){
    const promise = await
    fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${cityName}&aqi=no`
    );
    return await promise.json()
};

// Event Listener that shows the current weather of the city

button.addEventListener('click', async ()=>{
    const value = input.value;
    const result = await getcityData(value);
    console.log(result)
    const el = document.createElement("div");

    el.innerHTML = `
     <h4>${result.location.name}, ${result.location.country} </h4>
     <p>${result.location.localtime}</p>
     <p>Temperature: ${result.current.temp_c}°C</p>
     `;
    document.getElementById('extra').appendChild(el);
    count++;
    if(count === 9){
        input.disabled = true;
        button.disabled = true;
    }    
    input.value = '';
    input.focus();
});

// Function that changes background color based on time of day
function changeBg(val){

    let bg = document.querySelector("body");
    if(val>21 || val<5){
        bg.style.backgroundImage = "url('./img/night.jpg')";
    }
    else if(val>16){
        bg.style.backgroundImage = "url('./img/sunset.jpg')";
    }
}   


const interval = setInterval(showTime,1000);


