import { searchInput } from './index';

export const fetchCountries = name => {
  const countries = fetch(
    'https://restcountries.com/v3.1/name/' +
      searchInput.value.trim() +
      '?fields=name,capital,population,flags,languages'
  );

  return countries;
};
