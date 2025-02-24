// src/services/apiConfig.js
export const API_KEY = import.meta.env.VITE_API_KEY;
export const API_SEARCH = `https://api.openweathermap.org/data/2.5/find?&units=Metric&appid=${API_KEY}&q=`;
export const API_LOCATION = `https://api.openweathermap.org/data/2.5/weather?&units=Metric&appid=${API_KEY}&q=`;

// export const API_LATEST = `https://api.freecurrencyapi.com/v1/latest?apikey=${API_KEY}`;
// export const API_CURRENCIES = `https://api.freecurrencyapi.com/v1/currencies?apikey=${API_KEY}`;
