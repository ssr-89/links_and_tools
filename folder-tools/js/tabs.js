'use strict'

document.querySelectorAll('.tabs-item').forEach(function (tabsItem) {
  tabsItem.classList.remove('tabs-item--active') // удаление класса активности у элементов табов
});

document.querySelectorAll('.tabs-nav__btn').forEach(function (tabsBtn) {
  tabsBtn.classList.remove('tabs-nav__btn--active'); // удаляет класс активности у кнопки
  tabsBtn.addEventListener('click', function (e) {
    const path = e.currentTarget.dataset.path;
    document.querySelectorAll('.tabs-nav__btn').forEach(function (btn) {
      btn.classList.remove('tabs-nav__btn--active');
    });
    e.currentTarget.classList.add('tabs-nav__btn--active');
    document.querySelectorAll('.tabs-item').forEach(function (tabsItem) {
      tabsItem.classList.remove('tabs-item--active')
    });
    document.querySelector(`[data-target="${path}"]`).classList.add('tabs-item--active'); // находим нужный элемент таба и присваиваем класс актива, т.е. открываем
  });
});

/*
tabsBtn === .tabs-nav__btn

tabsItem === .tabs-item

e.currentTarget - выделяет конкретный нажатый элемент

dataset.path - позволяет получить значения атрибута data-path у табов (кнопок)

tabsBtn.classList.remove('tabs-item--active'); - возможно пригодится
*/
