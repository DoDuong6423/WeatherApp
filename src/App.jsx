import { useEffect, useRef, useState, useCallback } from "react";
import { weatherCodes } from "./constants";
import SearchSection from "./components/SearchSection.jsx";
import CurrentWeather from "./components/CurrentWeather.jsx";
import HourlyWeatherItem from "./components/HourlyWeatherItem.jsx";
import NoResultsDiv from "./components/NoResultsDiv.jsx";

function App() {
  const API_KEY = import.meta.env.VITE_API_KEY;

  const [currentWeather, setCurrentWeather] = useState({});
  const [hourlyForecasts, setHourlyForecasts] = useState([]);
  const [hasNoResults, setHasNoResults] = useState(false);
  const searchInputRef = useRef(null);

  const filterHourlyForecast = useCallback((hourlyData) => {
    const currentHour = new Date().setMinutes(0, 0, 0);
    const next24Hours = currentHour + 24 * 60 * 60 * 1000;

    const next24HoursData = hourlyData.filter(({ time }) => {
      const forecastTime = new Date(time).getTime();
      return forecastTime >= currentHour && forecastTime <= next24Hours;
    });

    setHourlyForecasts(next24HoursData);
  }, []);

  // Dùng useCallback để tránh ESLint báo loop vô hạn
  const getWeatherDetails = useCallback(
    async (API_URL) => {
      setHasNoResults(false);
      window.innerWidth <= 768 && searchInputRef.current.focus();

      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error();
        const data = await response.json();

        const temperature = Math.floor(data.current.temp_c);
        const description = data.current.condition.text;
        const weatherIcon = Object.keys(weatherCodes).find((icon) =>
          weatherCodes[icon].includes(data.current.condition.code)
        );

        setCurrentWeather({ temperature, description, weatherIcon });

        const combinedHourlyData = [
          ...data.forecast.forecastday[0].hour,
          ...data.forecast.forecastday[1].hour,
        ];

        searchInputRef.current.value = data.location.name;

        filterHourlyForecast(combinedHourlyData);
      } catch {
        setHasNoResults(true);
      }
    },
    [filterHourlyForecast]
  );

  // Lấy dữ liệu thời tiết của thành phố mặc định (Hà Nội) khi render lần đầu
  useEffect(() => {
    const defaultCity = "Hanoi";
    const API_URL = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${defaultCity}&days=2`;
    getWeatherDetails(API_URL);
  }, [API_KEY, getWeatherDetails]);

  return (
    <div className="container">
      {/* Search section */}
      <SearchSection
        getWeatherDetails={getWeatherDetails}
        searchInputRef={searchInputRef}
      />

      {/* Render có điều kiện dựa trên trạng thái hasNoResults */}
      {hasNoResults ? (
        <NoResultsDiv />
      ) : (
        <div className="weather-section">
          <CurrentWeather currentWeather={currentWeather} />
          {/* Danh sách dự báo thời tiết theo giờ */}
          <div className="hourly-forecast">
            <ul className="weather-list">
              {hourlyForecasts.map((hourlyWeather) => (
                <HourlyWeatherItem
                  key={hourlyWeather.time_epoch}
                  hourlyWeather={hourlyWeather}
                />
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
