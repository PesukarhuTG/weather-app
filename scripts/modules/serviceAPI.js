import { translateCityName } from './translateAPI.js';

const API_URL = 'https://api.openweathermap.org/data/2.5/';
const API_KEY = 'feb3dd1355be0a527049c3b2e8ae206f';

export const fetchWeather = async city => {
  try {
    const res = await fetch(
      `${API_URL}weather?q=${city}&appid=${API_KEY}&lang=ru`,
    );

    if (!res.ok) {
      throw new Error('Ошибка запроса');
    }

    const data = await res.json();
    return { success: true, data };
  } catch (error) {
    return { success: false, error };
  }
};

export const fetchForecast = async city => {
  try {
    const res = await fetch(
      `${API_URL}forecast?q=${city}&appid=${API_KEY}&lang=ru`,
    );

    if (!res.ok) {
      throw new Error('Ошибка запроса');
    }

    const data = await res.json();
    return { success: true, data };
  } catch (error) {
    return { success: false, error };
  }
};

export const getCity = async () => {
  const url = 'https://ipapi.co/city/';

  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error('Ошибка получения города');
    }

    const city = await res.text();

    /*на процесс перевода уходит время (издержки API), поэтому не использую этот лишний этап
    просто для себя, для галочки, пусть фоном запишет в LS*/
    const { translatedText: cityRU } = await translateCityName(city);
    localStorage.setItem('weatherCity', cityRU);

    return { success: true, city };
  } catch (error) {
    console.error(error);
    return { success: false, error };
  }
};
