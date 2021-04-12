import api from './fetchCountries.js';
import countryList from './templates/countriesList.hbs';
import countriesTemplates from './templates/countriesTemplates.hbs';
import { error, defaultModules } from '@pnotify/core';
import debounce from 'lodash.debounce'

const input = document.querySelector('input');

input.addEventListener('input',debounce(inputHeandler),500);

function inputHeandler(e){
    const inputValue = e.target.value;
    api.fetchCountries(inputValue)
        .then(dataFilter)
        .catch(errorHeandler);
    }
    

function dataFilter(data) {
    if (data.length === 1) { 
       return   renderCountries(data);
   } else if (data.length >= 2 && data.length <= 10) {
       
       renderList(data);
   } else if (data.length > 10) {
        error({
         text: 'Введите больше символов!'
        });   
   }
}
    
function renderCountries(data) {
    const countryMarkup = document.querySelector('.country').innerHTML=countriesTemplates(data)
}

function renderList(data) {
    const countryListMarkup = document.querySelector('.country').innerHTML=countryList(data)
}

function errorHeandler() {
    error({
     text: 'Неправильно введен адрес!'
     })
}