# Cats and Dogs

## Description

A responsive Weather App using Weather API Data to display several features such as forecasting and location based weather.

<!-- > [!NOTE]
> Tutorial initiated project, sourced from The Ultimate React Course -->

## Tech Stack

- React
- Vite for build tool
- React Router for Routing x and y
- Create a "useFetchData" hook to handle axios API calls to weather API
  - Using Try/Catch to gracefully set loading and errors states
  - Return object back to component to conditionally display components in case of error and loading scenarios
- Context API and useReducer for Global State
- [Open Weather][1] for API data

## What I learnt

- Using Thunder Client extension to review and learn the API data from Open Weather
- Using Hooks (useFetch and useDebounce) to create a flexible location search input

## Todo list

- [ ] Default view on load is current location (lang, long)
- [ ] Action to get current location (lang, long)
- [ ] Implement Framer animations
- [ ] Refactor CSS into variables and separate files
- [ ] Utilise responsive debounce search dropdown for location search
- [ ] Save multiple locations

[1]: https://openweathermap.org/
