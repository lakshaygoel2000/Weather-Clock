// const button = document.getElementById("stop");
const loc = document.getElementById("location");
const title = document.getElementsByClassName("title");
const input = document.getElementById("location-input");
const button = document.getElementById("search");

function showTime(){
    const currentTime = new Date();
    const time = `${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()}`
    // console.log(time);
    document.getElementById("time").innerText = time; 
    // document.getElementsByClassName("title-name").innerText = `Clock ${currentTime.getHours()}:${currentTime.getMinutes()}`
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
        `http://api.weatherapi.com/v1/current.json?key=c85fadde00fb46a8be7165521241609&q=${lat}+${long}&aqi=yes`
    );
    return await promise.json()
}

async function showpos(position) {
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    const value = await getData(lat,long);
    // console.log(value);
    loc.innerText = `${value.location.name}, ${value.location.country}`;
     document.getElementById("user-loc").innerHTML = `
     <h4>${value.location.name}, ${value.location.country} </h4>
     <p>${value.location.localtime}</p>
     <p>Temperature: ${value.current.temp_c}°C</p>
     `;
};

async function getcityData(cityName){
    const promise = await
    fetch(
        `http://api.weatherapi.com/v1/current.json?key=c85fadde00fb46a8be7165521241609&q=${cityName}&aqi=yes`
    );
    return await promise.json()
};

// Event Listener that shows the current weather of the city

let count=1;
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
    //  count++;

});

// Function that changes background color based on time of day
function changeBg(val){

    let bg = document.querySelector("body");
    if(val>20){
        bg.style.backgroundImage = "url('./night.jpg')";
        bg.style.color= "white";
    }
    else if(val>16){
        bg.style.backgroundImage = "url('./morning_wallpaper.jpg')";
    }
    else if(val>8) {
        bg.style.backgroundImage = "url('./landscape-wallpaper.jpg')";
    }

}   


// setTimeout(()=> console.log('hi'),6000) // gives output only ones
const interval = setInterval(showTime,1000);
// button.addEventListener('click', ()=>{
//     clearInterval(interval);
// });

// `http://api.weatherapi.com/v1/current.json?key=c85fadde00fb46a8be7165521241609&q=${cityname}&aqi=yes`
