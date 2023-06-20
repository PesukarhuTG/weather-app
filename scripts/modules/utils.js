const addZero = n => (n < 10 ? '0' + n : n);

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
