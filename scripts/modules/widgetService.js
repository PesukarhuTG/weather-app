import {
  renderWidgetToday,
  renderWidgetOther,
  renderWidgetForecast,
} from './render.js';

const startWidget = () => {
  const widget = document.createElement('div');
  widget.className = 'widget';

  renderWidgetToday(widget);
  renderWidgetOther(widget);
  renderWidgetForecast(widget);

  return widget;
};

export { startWidget };
