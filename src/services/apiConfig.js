// src/services/apiConfig.js
export const API_KEY = import.meta.env.VITE_API_KEY;
export const API_BASE = `https://api.openweathermap.org/data/2.5/weather?&units=Metric&appid=${API_KEY}`;

// export const API_LATEST = `https://api.freecurrencyapi.com/v1/latest?apikey=${API_KEY}`;
// export const API_CURRENCIES = `https://api.freecurrencyapi.com/v1/currencies?apikey=${API_KEY}`;
