export async function getData(source, callback) {
  try {
    const response = await fetch(source);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = callback(await response.json());
    return data;
  } catch (error) {
    alert(error);
    return;
  }
}

export function normalizeCityName(cityName) {
  if (typeof cityName !== 'string') {
    throw new Error('Input must be a string');
  }
  if (/^\d+$/.test(cityName)) {
    throw new Error('Input cannot be number');
  }
  if (/^[a-zA-Z\s]*$/.test(cityName) === false) {
    throw new Error('Input must be letters only');
  }
  const formattedCityName = cityName.trim().toLowerCase();
  return formattedCityName;
}

export function parseCityData(data) {
  const cities = data.map((city) => ({
    city: city.name,
    country: city.country,
  }));
  return cities;
}

export function parseWeatherData(data) {
  const weather = {
    city: data.location.name,
    country: data.location.country,
    weather: data.current.condition.text,
    temperatureC: data.current.temp_c,
    temperatureF: data.current.temp_f,
    feelsLike: data.current.feelslike_c,
    icon: data.current.condition.icon,
    code: data.current.condition.code,
    localTime: data.location.localtime,
    humidity: data.current.humidity,
  };
  return weather;
}
