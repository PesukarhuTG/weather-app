export const translateCityName = async cityName => {
  const res = await fetch('https://translate.argosopentech.com/translate', {
    method: 'POST',
    body: JSON.stringify({
      q: cityName,
      source: 'en',
      target: 'ru',
    }),
    headers: { 'Content-Type': 'application/json' },
  });

  const data = await res.json();
  return data;
};
