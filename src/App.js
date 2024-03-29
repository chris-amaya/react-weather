import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'weather-icons/css/weather-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Weather from './components/weather.component'
// import Form from './components/weather.component';
import Form from "./components/form.component";

const API_key = 'f0743ad870fa4ea63fefca34caea76fc';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      city: undefined,
      country: undefined,
      icon: undefined,
      main: undefined,
      celsius: undefined,
      temp_max: undefined,
      temp_min: undefined,
      description: "",
      error: false
    };
    // this.getWeather();
    this.weatherIcon = {
      Thunderstorm: "wi-thunderstorm",
      Drizzle: "wi-sleet",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Atmosphere: "wi-flog",
      Clear: "wi-day-sunny",
      Clouds: "wi-day-fog"
    };
  }

  calCelsius(temp) {
    let cell = Math.floor(temp - 273.15);
    return cell;
  }

  get_weatherIcon(icons, rangeID) {
    switch(rangeID) {
      case rangeID >= 200 && rangeID <= 232:
        this.setState({icon: this.weatherIcon.Thunderstorm})
        break;
      case rangeID >= 300 && rangeID <= 321:
        this.setState({icon: this.weatherIcon.Drizzle})
        break;
      case rangeID >= 500 && rangeID <= 531:
        this.setState({icon: this.weatherIcon.Rain})
        break;
      case rangeID >= 600 && rangeID <= 622:
        this.setState({icon: this.weatherIcon.Snow})
        break;
      case rangeID >= 700 && rangeID <= 781:
        this.setState({icon: this.weatherIcon.Atmosphere})
        break;
      case rangeID === 800:
      this.setState({icon: this.weatherIcon.Clear})
        break;
        case rangeID >= 800 && rangeID <= 804:
        this.setState({icon: this.weatherIcon.Clouds})
        break;
        default: 
        this.setState({icon: this.weatherIcon.Clouds})
    }
  }

  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;

    // if(city && country) {

    // }

    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_key}`);
    const resp = await api_call.json();
    console.log(resp);
    // console.log(this.weatherIcon)
    this.setState({
      city: resp.name,
      country: resp.sys.country,
      celsius: this.calCelsius(resp.main.temp),
      temp_max: this.calCelsius(resp.main.temp_max),
      temp_min: this.calCelsius(resp.main.temp_min),
      description: resp.weather[0].description,
    })
    this.get_weatherIcon(this.weatherIcon, resp.weather[0].id);
  }

  render() {
    return (
      <div className="App">
      <Form loadWeather={this.getWeather} />
        <Weather 
        city={this.state.city} 
        country={this.state.country} 
        temp_celsius={this.state.celsius}
        temp_max={this.state.temp_max}
        temp_min={this.state.temp_min}
        description={this.state.description}
        weatherIcon={this.state.icon}
        />
      </div>
    );
  }
}

export default App;
