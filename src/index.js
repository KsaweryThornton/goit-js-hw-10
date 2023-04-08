import { fetchCountries } from './fetchCountries';
import Notiflix from 'notiflix';
import _ from 'lodash';

const DEBOUNCE_DELAY = 300;
export const searchInput = document.querySelector('#search-box');
const countriesList = document.querySelector('.country-list');
countriesList.style.listStyle = 'none';

const handler = _.debounce(() => {
  fetchCountries()
    .then(response => {
      return response.json();
    })
    .then(response => {
      if (response.length > 10) {
        return Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      }
      response.map(resp => {
        let countryName = resp.name.official;
        let countryCapital = resp.capital;
        let countryPopulation = resp.population;
        let countryFlag = resp.flags.svg;
        let countryLanguages = Object.values(resp.languages);

        if (response.length === 1) {
          countriesList.innerHTML = `<div class="box"><li>
              <img src='${countryFlag}' width="50" height="30" >
              </li>
              <li class="name">${countryName}</li></div>
              <li><p><b>Capital:</b> ${countryCapital}</p></li>
              <li><p><b>Population:</b> ${countryPopulation}</p></li>
              <li><p><b>Languages:</b> ${countryLanguages}</p></li>
              `;

          const name = document.querySelector('.name');
          const box = document.querySelector('.box');
          box.style.display = 'flex';
          name.style.fontSize = '20px';
          name.style.marginLeft = '10px';
        } else if (response.length > 1) {
          searchInput.addEventListener('input', () => {
            countriesList.innerHTML = '';
          });
          countriesList.innerHTML += `<div class="box"><li>
          <img src='${countryFlag}' width="50" height="30" >
          </li>
          <li class="name">${countryName}</li></div>`;
          const names = document.querySelectorAll('.name');
          const boxes = document.querySelectorAll('.box');
          for (let i = 0; i < names.length; i++) {
            boxes[i].style.display = 'flex';
            names[i].style.fontSize = '20px';
            names[i].style.marginLeft = '10px';
          }
        }
      });
    })
    .catch(error => {
      return Notiflix.Notify.failure(
        'Oops, there is no country with that name'
      );
    });
}, DEBOUNCE_DELAY);

searchInput.addEventListener('input', handler);
