import { getDewPoint, getCurrentDateTime, getWindDirection } from './utils.js';

const renderWidgetToday = (widget, data) => {
  const { dayOfMonth, month, year, dayOfWeek, hours, minutes } =
    getCurrentDateTime();

  const { weather, name, main } = data;

  widget.insertAdjacentHTML(
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
};

const renderWidgetOther = (widget, data) => {
  const { wind, main } = data;
  console.log(data);

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

const renderWidgetForecast = widget => {
  widget.insertAdjacentHTML(
    'beforeend',
    `<ul class="widget__forecast">
      <li class="widget__day-item">
        <p class="widget__day-text">ср</p>
        <img class="widget__day-img" src="./icon/02d.svg" alt="Погода">
        <p class="widget__day-temp">18.4°/13.7°</p>
      </li>
      <li class="widget__day-item">
        <p class="widget__day-text">чт</p>
        <img class="widget__day-img" src="./icon/03d.svg" alt="Погода">
        <p class="widget__day-temp">17.3°/11.3°</p>
      </li>
      <li class="widget__day-item">
        <p class="widget__day-text">пт</p>
        <img class="widget__day-img" src="./icon/04d.svg" alt="Погода">
        <p class="widget__day-temp">16.5°/10.9°</p>
      </li>
      <li class="widget__day-item">
        <p class="widget__day-text">сб</p>
        <img class="widget__day-img" src="./icon/01d.svg" alt="Погода">
        <p class="widget__day-temp">18.6°/12.5°</p>
      </li>
      <li class="widget__day-item">
        <p class="widget__day-text">вс</p>
        <img class="widget__day-img" src="./icon/03d.svg" alt="Погода">
        <p class="widget__day-temp">17.3°/11.2°</p>
      </li>
</ul>
  `,
  );
};

const showError = (widget, err) => {
  widget.textContent = err.toString();
  widget.classList.add('widget_error');
};

export {
  renderWidgetToday,
  renderWidgetOther,
  renderWidgetForecast,
  showError,
};
