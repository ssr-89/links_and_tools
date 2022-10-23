'use strict'
// маска для инпута телефона
var selector = document.querySelector("input[type='tel']");
var im = new Inputmask("+7 (999)-999-99-99"); // здесь указывается вариант порядка ввода телефона

im.mask(selector);

// валидация инпутов
new JustValidate('.form', {
  rules: {
    name: {
      required: true,
      minLength: 2,
      maxLength: 10
    },
    tel: {
      required: true,
      function: (name, value) => {
        const phone = selector.inputmask.unmaskedvalue()
        return Number(phone) && phone.length === 10
      }
    },
    mail: {
      required: true,
      email: true
    },
  },
  messages: {
    name: {
      required: 'Введите Ваше имя',
      minLength: 'Минимальное значение 2 символа',
      maxLength: 'Максимальное значение 10 символов'
    },
    tel: {
      required: 'Введите Ваш телефон',
      function: 'Минимальное значение 10 символов'
    },
    mail: {
      required: 'Введите Ваш E-mail',
      email: 'Ути! Хулиган!'
    },
  },
});
