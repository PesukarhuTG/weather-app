import { startWidget } from './modules/widgetService.js';

const app = document.getElementById('app');

const initWidget = async elem => {
  const widget = await startWidget();
  elem.append(widget);
};

initWidget(app);
