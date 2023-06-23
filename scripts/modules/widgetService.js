import { fetchForecast, fetchWeather } from './serviceAPI.js';
import {
  renderWidgetToday,
  renderWidgetOther,
  renderWidgetForecast,
} from './render.js';

const startWidget = async (city, widget) => {
  if (!widget) {
    widget = document.createElement('div');
    widget.className = 'widget';
  }

  const dataWeather = await fetchWeather(city);
  const dataForecast = await fetchForecast(city);

  if (dataWeather.success) {
    renderWidgetToday(widget, dataWeather.data);
    renderWidgetOther(widget, dataWeather.data);
  } else {
    showError(dataWeather.error);
  }

  if (dataForecast.success) {
    renderWidgetForecast(widget, dataForecast.data);
  } else {
    showError(dataForecast.error);
  }

  return widget;
};

export { startWidget };
