import { fetchWeather } from './serviceAPI.js';
import {
  renderWidgetToday,
  renderWidgetOther,
  renderWidgetForecast,
} from './render.js';

const startWidget = async () => {
  const widget = document.createElement('div');
  widget.className = 'widget';

  const dataWeather = await fetchWeather('Калининград');

  if (dataWeather.success) {
    renderWidgetToday(widget, dataWeather.data);
    renderWidgetOther(widget, dataWeather.data);
  } else {
    showError();
  }
  renderWidgetForecast(widget);

  return widget;
};

export { startWidget };
