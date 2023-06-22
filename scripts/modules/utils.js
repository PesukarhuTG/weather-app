const addZero = n => (n < 10 ? `0${n}` : n);

export const getWindDirection = deg => {
  const directions = [
    '&#8593; С',
    '&#8598; СЗ',
    '&#8592; З',
    '&#8601; ЮЗ',
    '&#8595; Ю',
    '&#8600; ЮВ',
    '&#8594; В',
    '&#8599; СВ',
  ];

  const i = Math.round(deg / 45) % 8;
  return directions[i];
};

export const getDewPoint = (temp, humidity) => {
  const a = 17.27;
  const b = 237.7;
  const ft = (a * temp) / (b + temp) + Math.log(humidity / 100);
  const dewPoint = (b * ft) / (a - ft);
  return dewPoint.toFixed(1);
};

export const getCurrentDateTime = () => {
  const months = [
    'янв',
    'фев',
    'март',
    'апр',
    'май',
    'июнь',
    'июль',
    'авг',
    'сен',
    'окт',
    'ноя',
    'дек',
  ];

  const weekDays = [
    'воскресенье',
    'понедельник',
    'вторник',
    'среда',
    'четверг',
    'пятница',
    'суббота',
  ];

  const date = new Date();

  const dayOfMonth = date.getDate();
  const month = months[date.getMonth()];
  const dayOfWeek = weekDays[date.getDay()];
  const year = date.getFullYear();
  const hours = addZero(date.getHours());
  const minutes = addZero(date.getMinutes());

  return { dayOfMonth, month, year, dayOfWeek, hours, minutes };
};
