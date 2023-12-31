import { fetchForecast, fetchWeather, getCity } from './serviceAPI.js';
import {
  renderWidgetToday,
  renderWidgetOther,
  renderWidgetForecast,
  showError,
} from './render.js';

const startWidget = async (city, widget) => {
  if (!city) {
    const dataCity = await getCity();

    if (dataCity.success) {
      city = dataCity.city;
    } else {
      showError(widget, dataCity.error);
    }
  }

  if (!widget) {
    widget = document.createElement('div');
    widget.className = 'widget';
  }

  const dataWeather = await fetchWeather(city);
  const dataForecast = await fetchForecast(city);

  if (dataWeather.success) {
    widget.textContent = '';
    renderWidgetToday(widget, dataWeather.data);
    renderWidgetOther(widget, dataWeather.data);
  } else {
    showError(widget, dataWeather.error);
  }

  if (dataForecast.success) {
    renderWidgetForecast(widget, dataForecast.data);
  } else {
    showError(widget, dataForecast.error);
  }

  return widget;
};

export { startWidget };
