import { startWidget } from './modules/widgetService.js';

const app = document.getElementById('app');

const init = elem => {
  const widget = startWidget();
  elem.append(widget);
};

init(app);
