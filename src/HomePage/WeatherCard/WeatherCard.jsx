import styles from './WeatherCard.module.css'
import BlueHoodie from './images/BlueHoodie.png'
import Coat from './images/Coat.png'
import HeavySweatPants from './images/HeavySweatPants.png'
import LongSleeveShirt from './images/LongSleeveShirt.png'
import Shirt from './images/Shirt.png'
import Shorts from './images/Shorts.png'
import React, { useEffect, useState } from "react";

function WeatherCard() {
    const [lat,setLat] = useState()
    const [lon,setLon] = useState()
    const [add,setAdd] = useState('')
    const [time, setTime] = useState(new Date());
    const [temp, setTemp] = useState()
    const [weatherData, setWeatherData] = useState(null)

    const getClothingSuggestions = (temp, weather) => {
        let suggestions = [];
        if (temp < 70) {
            suggestions.push(HeavySweatPants); 
        } else {
            suggestions.push(Shorts); 
        }
        if (temp < 45) {
            suggestions.push(Coat); 
            suggestions.push(LongSleeveShirt);
        } else if (temp < 60) {
            suggestions.push(BlueHoodie); 
        } else if (temp < 75) {
            suggestions.push(LongSleeveShirt); 
        } else {
            suggestions.push(Shirt);
        }
        if (weather?.toLowerCase().includes('rain')) {
            suggestions.push(BlueHoodie); 
        }
        return suggestions;
    }

    useEffect(()=>{
        navigator.geolocation.getCurrentPosition(pos=>{
            const {latitude,longitude} = pos.coords;
            setLat(pos.coords.latitude)
            setLon(pos.coords.longitude)
            const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
            fetch(url).then(res=>res.json()).then(data=>setAdd(data.address))
        })
    },[])

    useEffect(() => {
        if (lat && lon) {
            getWeatherData(lon, lat);
        }
    }, [lat, lon]);

    async function getWeatherData(lon, lat) {
        try {
            const apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=d3dea4785aa13ed971af500c82152c15`;
            const response = await fetch(apiURL);
            const data = await response.json();
            setWeatherData(data);
            setTemp(Math.round(data.main.temp));
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    }

    const clothingSuggestions = weatherData ? 
        getClothingSuggestions(temp, weatherData.weather[0].main) : [];

    return(
        <div className={styles.card}>
            <h2 className={styles.time}>{add.city} {time.toLocaleTimeString([], { 
                hour: 'numeric', 
                minute: '2-digit' 
            })}</h2>
            <h2 className={styles.temp}>
                {temp}°F {weatherData && weatherData.weather[0].main}
            </h2>
            <h3 className={styles.summary}>Suggested Clothing:</h3>
            <div className={styles.clothingBoxes}>
                {clothingSuggestions.map((clothing, index) => (
                    <div key={index} className={styles.clothingBox}>
                        <img src={clothing} alt="Clothing item" className={styles.clothingImage} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default WeatherCard