import { cityServiceSearch } from './modules/cityServiceSearch.js';
import { startWidget } from './modules/widgetService.js';

const app = document.getElementById('app');

const initWidget = async elem => {
  const city = 'Москва'; // первый запуск по умолч

  const widget = await startWidget(city);
  elem.append(widget);

  cityServiceSearch(widget);
};

initWidget(app);
