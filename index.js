const btn = document.getElementById("searchBtn");
const cityName = document.getElementById("cityName");
const API_KEY = "5f1a0c872764aea770b9259584b8ae63";

async function fetchData(city) {
     try{    
     cityName.value=''
    
    let res = await fetch (`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
   
    let result = await res.json();
    console.log(result);
    if(result.message) {
        
        document.getElementById('secondDiv').innerHTML = `<h1>${result.message}</h1>`
        return;
    }
    displayWeather(result);
     } catch(err) {
        console.log(err.message);
        
     }
    }
btn.addEventListener('click',() => {
   fetchData(cityName.value)
                             
   
})

function displayWeather({name,main,wind,weather}) {
    
    div = ` <div class="weatherInfo">

                <p id="temp">${main.temp}</p>
                <img src="https://openweathermap.org/img/w/${weather[0].icon}.png">
                <p id="desc">${weather[0].description}</p>
                <p id="city">${name}</p>
                <div class="otherInfo">
                    <div class="wind">
                        <p>Wind</p>
                        <p>${wind.speed}m/s</p>
                    </div>
                    <div class="wind">
                        <p>Pressure</p>
                        <p>${main.pressure}</p>
                     </div>
                    <div class="wind">
                        <p>Humidity</p>
                        <p>${main.humidity}</p>
                    </div>
                </div>

            </div>`
     document.getElementById('secondDiv').innerHTML = div


}
document.getElementById('cloc').addEventListener('click',()=> {
    navigator.geolocation.getCurrentPosition((position)=>{
        let letii = position.coords.latitude;
        let longi = position.coords.longitude
        fetchDataByCoordinates(letii,longi)
        

    })
})
async function fetchDataByCoordinates(letii,longi) {
     try{    
    
    let res = await fetch (`https://api.openweathermap.org/data/2.5/weather?lat=${letii}&lon=${longi}&appid=${API_KEY}`)
   
    let result = await res.json();
    if(result.message) {
        
        document.getElementById('secondDiv').innerHTML = `<h1>${result.message}</h1>`
        return;
    }
    displayWeather(result);
     } catch(err) {
        console.log(err.message);
        
     }
    }