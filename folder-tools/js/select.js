'use strict'
const element = document.querySelector('select');
const choices = new Choices(element, {
  searchEnabled: true, // добавление строки поиска
});
