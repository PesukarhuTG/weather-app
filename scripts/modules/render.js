import { cityServiceSearch } from './cityServiceSearch.js';
import {
  getDewPoint,
  getCurrentDateTime,
  getWindDirection,
  getWeatherForecastData,
} from './utils.js';
import { startWidget } from './widgetService.js';

const renderWidgetToday = async (widget, data) => {
  const { dayOfMonth, month, year, dayOfWeek, hours, minutes } =
    getCurrentDateTime();

  const { weather, name, main } = data;

  await widget.insertAdjacentHTML(
    'beforeend',
    `<div class="widget__today">
        <div class="widget__date-block">
          <p class="widget__date">${dayOfMonth} ${month} ${year}</p>
          <p class="widget__time">${hours}:${minutes}</p>
          <p class="widget__day">${dayOfWeek}</p>
        </div>
        <div class="widget__icon">
          <img class="widget__img" src="./icon/${
            weather[0].icon
          }.svg" alt="Погода">
        </div>
        <div class="widget__wheather">
          <div class="widget__city">
            <p>${name}</p>
            <button class="widget__change-city" aria-label="Изменить город"></button>
          </div>
          <p class="widget__temp-big">${(main.temp - 273.15).toFixed(1)}°C</p>
          <p class="widget__felt">ощущается</p>
          <p class="widget__temp-small">${(main.feels_like - 273.15).toFixed(
            1,
          )}°C</p>
        </div>
    </div>
    `,
  );

  cityServiceSearch(widget);
};

const renderWidgetOther = (widget, data) => {
  const { wind, main } = data;

  widget.insertAdjacentHTML(
    'beforeend',
    `<div class="widget__other">
      <div class="widget__wind">
        <p class="widget__wind-title">Ветер</p>
        <p class="widget__wind-speed">${wind.speed} м/с</p>
        <p class="widget__wind-text">${getWindDirection(wind.deg)}</p>

      </div>
      <div class="widget__humidity">
        <p class="widget__humidity-title">Влажность</p>
        <p class="widget__humidity-value">${main.humidity}%</p>
        <p class="widget__humidity-text">Т.Р: ${getDewPoint(
          main.temp - 273.15,
          main.humidity,
        )} °C</p>
      </div>
      <div class="widget__pressure">
        <p class="widget__pressure-title">Давление</p>
        <p class="widget__pressure-value">${(
          (main.pressure / 133.3) *
          100
        ).toFixed(2)}</p>
        <p class="widget__pressure-text">мм рт.ст.</p>
      </div>
    </div>
  `,
  );
};

const renderWidgetForecast = async (widget, data) => {
  const widgetForecast = document.createElement('ul');
  widgetForecast.className = 'widget__forecast';
  widget.append(widgetForecast);

  const forecastData = await getWeatherForecastData(data);

  const items = forecastData.map(item => {
    const widgetDayItem = document.createElement('li');
    widgetDayItem.className = 'widget__day-item';

    widgetDayItem.insertAdjacentHTML(
      'beforeend',
      `
        <p class="widget__day-text">${item.dayOfWeek}</p>
        <img class="widget__day-img" src="./icon/${
          item.weatherIcon
        }.svg" alt="Погода">
        <p class="widget__day-temp">${(item.minTemp - 273.15).toFixed(1)}°/${(
        item.maxTemp - 273.15
      ).toFixed(1)}°</p>
    `,
    );
    return widgetDayItem;
  });

  widgetForecast.append(...items);
};

const showError = (widget, err) => {
  widget.textContent = err.toString();
  widget.classList.add('widget_error');

  setTimeout(() => {
    const userCity = localStorage.getItem('weatherCity');
    widget.textContent = '';
    startWidget(userCity, widget);
  }, 2000);
};

export {
  renderWidgetToday,
  renderWidgetOther,
  renderWidgetForecast,
  showError,
};
