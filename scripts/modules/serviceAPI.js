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
  } catch (err) {
    return { success: false, err };
  }
};
