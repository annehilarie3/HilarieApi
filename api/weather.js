export const fetchWeatherData = async (city) => {
    try {
      const apiKey = "6b0f8e0e06a446518ce6a060073a6f17";
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
   };