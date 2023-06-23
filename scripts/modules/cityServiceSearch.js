import { startWidget } from './widgetService.js';

export const cityServiceSearch = elem => {
  const button = document.querySelector('.widget__change-city');

  button.addEventListener('click', () => {
    const form = document.createElement('form');
    form.classList.add('widget__form');

    const inputCity = document.createElement('input');
    inputCity.classList.add('widget__input');
    inputCity.name = 'city';
    inputCity.type = 'search';
    inputCity.placeholder = 'Введите город';

    form.append(inputCity);
    elem.append(form);

    inputCity.focus();

    form.addEventListener('submit', async e => {
      e.preventDefault();

      elem.textContent = '';
      await startWidget(inputCity.value, elem);
      cityServiceSearch(elem); //тк после очистки наша кнопка пропадет. СОздаем заново
    });
  });
};
