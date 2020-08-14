import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './weather.css';

function Weather() {
    //These are the hooks that are used to set API values into the DOM
    const [country, setCountry] = useState();
    const [skyIcon, setSkyIcon] = useState();
    const [cityName, setCityName] = useState("Rajshahi");
    const [latitude, setLatitude] = useState();
    const [longitude, setLongitude] = useState();
    const [temperature, setTemperature] = useState();
    const [sky, setSky] = useState();
    const [visibility, setVisibility] = useState();
    const [feels, setFeels] = useState();
    const [maxTemp, setMaxTemp] = useState();
    const [minTemp, setMinTemp] = useState();
    const [humidity, setHumidity] = useState();
    const [windSpeed, setWindSpeed] = useState();
    const [windDirection, setWindDirection] = useState();
    const [sunrise, setSunrise] = useState();
    const [sunset, setSunset] = useState();
    const [day, setDay] = useState();
    const [time, setTime] = useState();
    const [date, setDate] = useState();


    //When writing in the input box, this function storing the writings in a hook
    function getCityName(event) {
        setCityName(event.target.value);
    }

    //This is a auto call function. On load this function loads API data for Rajshahi city first
    (function showCityName() {
        fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=metric&appid=3e180048c37d3b667b4bab8de4c27e68')
            .then(response => response.json())
            .then(json => showWeather(json));
    })();

    //This function loads data from API as user enters name of city or country and hits the Enter or Search button
    function showCityName(event) {
        event.preventDefault();
        // console.log(cityName);

        fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=metric&appid=3e180048c37d3b667b4bab8de4c27e68')
            .then(response => response.json())
            .then(json => showWeather(json));
    }

    //This function gets fetched data of API and shows on different DOM location using hooks.
    function showWeather(info) {
        // console.log(info);
        const dateAndTime = new Date();
        const weeklyDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        setDay(weeklyDays[dateAndTime.getDay()]);
        setDate(dateAndTime.toLocaleDateString());
        setTime(dateAndTime.toLocaleTimeString());


        const getSunRise = new Date((info.sys.sunrise * 1000)).toLocaleTimeString();
        const getSunSet = new Date((info.sys.sunset) * 1000).toLocaleTimeString();

        //Gets city/country name from API and shows flag of the country
        setCountry("https://flagpedia.net/data/flags/h80/" + info.sys.country.toLowerCase() + ".webp");

        //Gets weather situation from API and shows a weather picture.
        setSkyIcon("http://openweathermap.org/img/wn/" + info.weather[0].icon + ".png")


        setLatitude(info.coord.lat);
        setLongitude(info.coord.lon);
        setTemperature(info.main.temp);
        setSky(info.weather[0].description);
        setVisibility(info.visibility);
        setFeels(info.main.feels_like);
        setMaxTemp(info.main.temp_max);
        setMinTemp(info.main.temp_min);
        setHumidity(info.main.humidity);
        setWindSpeed(info.wind.speed);
        setWindDirection(info.wind.deg);
        setSunrise(getSunRise);
        setSunset(getSunSet)


        let htmlTag = document.querySelector('.partialWidth');
        ReactDOM.findDOMNode(htmlTag).style.width = info.main.humidity + "%";
    }


    return (
        <>
            <form className="d-flex justify-content-center" onSubmit={showCityName}>
                <input type="text" placeholder="Enter Your City Name Here" className="takeCityName mx-2 my-4" onChange={getCityName} />
                <input type="button" value="Search" className="citySearchBtn my-4" onClick={showCityName} />
            </form>

            <section className="my-location w-75 mx-auto">
                <div className="row">
                    <div className="col-sm-6 d-flex flex-column align-items-center">
                        <img className="ml-sm-auto" src={country} alt="Country Flag" />
                    </div>
                    <div className="col-sm-6 d-flex flex-column align-items-center py-sm-0 py-3">
                        <h1 className="mr-sm-auto">{cityName}</h1>
                        <h5 className="mr-sm-auto">Latitude: {latitude}</h5>
                        <h5 className="mr-sm-auto">Longitude: {longitude}</h5>
                    </div>
                </div>
            </section>

            <section className="temperature d-flex flex-column align-items-center my-3">
                <h1>{temperature}&#8451;</h1>
                <div className="d-flex align-items-center">
                    <img className="mr-4" src={skyIcon} alt="Weather Condition" />
                    <div className="ml-4">
                        <h3 style={{ textTransform: 'capitalize' }}>{sky}</h3>
                        <h6>Visibility {visibility}</h6>
                    </div>
                </div>
                <div className="row w-75 mt-4">
                    <div className="col-sm-4 d-flex flex-column align-items-center justify-content-center pb-sm-0 pb-3">
                        <h3>{day}</h3>
                        <h5>{date}</h5>
                        <h5>{time}</h5>
                    </div>
                    <div className="col-sm-4 d-flex flex-column align-items-center justify-content-center pb-sm-0 pb-3">
                        <h4>Sunrise</h4>
                        <p>{sunrise}</p>
                        <h4>Sunset</h4>
                        <p>{sunset}</p>
                    </div>
                    <div className="col-sm-4 d-flex flex-column align-items-center justify-content-center pb-sm-0 pb-3">
                        <h5>Feels Like {feels}&#8451;</h5>
                        <h5>Maximum: {maxTemp}&#8451;</h5>
                        <h5>Minimum: {minTemp}&#8451;</h5>
                    </div>
                </div>
            </section>

            <section className="humidity mx-auto">
                <div className="row">
                    <div className="col-sm-6 d-flex flex-column align-items-center justify-content-center pb-sm-0 pb-4">
                        <h5>Humidity</h5>
                        <div className="fullWidth">
                            <div className="partialWidth"></div>
                            <span>{humidity}%</span>
                        </div>
                    </div>
                    <div className="col-sm-6 d-flex flex-column align-items-center justify-content-center pb-sm-0 pb-4">
                        <h6 className="mt-2">Wind Speed: {windSpeed} km/h</h6>
                        <h6 className="mb-0">Direction: {windDirection} &#730;</h6>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Weather;