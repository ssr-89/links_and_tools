"use strict"
document.addEventListener('DOMContentLoaded', () => {

  /*плавный скрол*/
  const anchors = document.querySelectorAll('a[href*="#"]')

  for (let anchor of anchors) {
    anchor.addEventListener('click', function (e) {
      e.preventDefault()

      const blockID = anchor.getAttribute('href').substr(1)

      document.getElementById(blockID).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  };
  /*HEADER*/
  // burger
  var burger = document.querySelector(".header-menu__burger");
  var menu = document.querySelector(".header-menu__list");
  var menuLinks = menu.querySelectorAll(".header-menu__link");

  burger.addEventListener("click", function () {
    burger.classList.toggle("active");
    menu.classList.toggle("active");
  });
  /*закрытие menu при клике на элемент menuLinks*/
  menuLinks.forEach(function (el) {
    el.addEventListener("click", function () {
      burger.classList.remove("active");
      menu.classList.remove("active");
    });
  });
  /*закрытие menu при клике вне menu*/
  document.addEventListener("click", function (e) {
    const target = e.target;
    if (!target.closest('.header-menu__list') && !target.closest(".header-menu__burger")) {
      burger.classList.remove("active");
      menu.classList.remove("active");
    }
  });

  /*DATA-TYPES*/
  // accordion
  const spollersArray = document.querySelectorAll('[data-spollers]');
  if (spollersArray.length > 0) {
    // массив обычных спойлеров
    const spollersRegular = Array.from(spollersArray).filter(function (item, index, self) {
      return !item.dataset.spollers.split(",")[0];
    });
    // инициализация обычных спойлеров
    if (spollersRegular.length > 0) {
      initSpollers(spollersRegular);
    }
    // массив спойлеров с медиа-запросами
    const spollersMedia = Array.from(spollersArray).filter(function (item, index, self) {
      return item.dataset.spollers.split(",")[0];
    });

    // инициализация спойлеров с медиа-запросами
    if (spollersMedia.length > 0) { // проверка на существование таких блоков
      const breakpointsArray = []; // пустой массив для заполнения
      spollersMedia.forEach(item => {
        const params = item.dataset.spollers; // получаем параметры, обращаясь к data-spollers
        const breakpoint = {}; // пустой объект для заполнения
        const paramsArray = params.split(","); // преобразование строки params в массив ("650,min")
        breakpoint.value = paramsArray[0]; // для пустого объекта breakpoint присваиваем значение (пример: 650) нулевую ячейку массива
        breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max"; // также для breakpoint присваиваем значение (пример: min). max по умолчанию, если не присвоили в HTML-разметке
        breakpoint.item = item; // сюда присваиваем сам объект breakpoint
        breakpointsArray.push(breakpoint); // добавляем объект breakpoint в массив breakpointsArray
      });

      // Получаем уникальные брейкпоинты
      let mediaQueries = breakpointsArray.map(function (item) {
        return '(' + item.type + "-width: " + item.value + "px)," + item.value + ',' + item.type;
      }); // В СКОБКАХ УКАЗЫВАЕМ МИНИМАЛЬНОЕ ЗНАЧЕНИЕ: + item.type - добавляем тип пример: min. К min прибавляем -width.
      // Прибавляем значение, которое указывали ранее, пример: 650 и также прибавялем единциу измерения пример: px.
      // После скобок добавляем числовое значение и тип, т.е. ("650,min")

      mediaQueries = mediaQueries.filter(function (item, index, self) {
        return self.indexOf(item) === index;
      }); // отфильтровываем и указываем, чтобы все блоки работали с одинаковыми параметрами

      // Работаем с каждым брейкпоинтом
      mediaQueries.forEach(breakpoint => {
        const paramsArray = breakpoint.split(","); // преобразование строки в массив
        const mediaBreakpoint = paramsArray[1]; // получает первый параметр (пример: 650)
        const mediaType = paramsArray[2]; // получает второй параметр (пример: min)
        const matchMedia = window.matchMedia(paramsArray[0]); // метод слушает ширину экрана обрабатывать, если сработал нужный брейкпоинт

        // Объекты с нужными условиями
        const spollersArray = breakpointsArray.filter(function (item) { // фильтрация главного массива
          if (item.value === mediaBreakpoint && item.type === mediaType) { // сбор объектов, которые соответствуют нужным условиям
            return true;
          }
        });
        // Событие
        // открытие самого спойлера
        matchMedia.addListener(function () {
          initSpollers(spollersArray, matchMedia); // собираем две константы
        });
        initSpollers(spollersArray, matchMedia); // чтобы заработало сразу при загрузке страницы
      });
    }
    // Инициализация
    function initSpollers(spollersArray, matchMedia = false) { // массив объектов и константа
      spollersArray.forEach(spollersBlock => { // spollersBlock каждый элемент массива
        spollersBlock = matchMedia ? spollersBlock.item : spollersBlock; // если matchMedia чему то равно тогда присваиваем имя объекта spollersBlock
        if (matchMedia.matches || !matchMedia) { // matchMedia.matches вернёт true, если ширина экрана больше или равен пример: 650px
          spollersBlock.classList.add('_init'); // присваиваем технический класс
          initSpollerBody(spollersBlock);
          spollersBlock.addEventListener("click", setSpollerAction); // событие клик
        }
        else {
          spollersBlock.classList.remove('_init');
          initSpollerBody(spollersBlock, false); // передаём в spollersBlock объект
          spollersBlock.removeEventListener("click", setSpollerAction); // убираем событие клик
        }
      });
    }
    // Работа с контентом
    function initSpollerBody(spollersBlock, hideSpollerBody = true) {
      const spollerTitles = spollersBlock.querySelectorAll('[data-spoller]'); // получаем все загловки спойлеров
      if (spollerTitles.length > 0) {
        spollerTitles.forEach(spollerTitle => {
          if (hideSpollerBody) { // если hideSpollerBody true, тогда у заголовка убираем tabindex
            spollerTitle.removeAttribute('tabindex');
            if (!spollerTitle.classList.contains('_active')) { // если нет класса _active
              spollerTitle.nextElementSibling.hidden = true; // тогда скрываем контентную часть с помощью nextElementSibling (т.е., следующий элемент после заголовка)
            }
          } else {
            spollerTitle.setAttribute('tabindex', '-1'); // tabindex добавляем, чтобы спойлеры были обычными блоками при недостижения нужного брейкпоинта
            spollerTitle.nextElementSibling.hidden = false;
          }
        });
      }
    }
    function setSpollerAction(e) { // клик по кнопке
      const el = e.target; // нажатый объект
      if (el.hasAttribute('data-spoller') || el.closest('[data-spoller]')) { // если у объекта есть data-spoller || у ближайшего родителя
        const spollerTitle = el.hasAttribute('data-spoller') ? el : el.closest('[data-spoller]'); // элемент с data-spoller || ближайший родитель
        const spollersBlock = spollerTitle.closest('[data-spollers]'); // получаем родительский блок выбранного спойлера
        const oneSpoller = spollersBlock.hasAttribute('data-one-spoller') ? true : false; // если у оболочки есть data-one-spoller, то true
        if (!spollersBlock.querySelectorAll('._slide').length) { // проверка родителей спойлера на наличие класса _slide
          if (oneSpoller && !spollerTitle.classList.contains('_active')) { // если у гл блока есть data-one-spoller и у нажатой кнопки нет класс _active
            hideSpollersBody(spollersBlock); // все остальные спойлеры скрыть
          }
          spollerTitle.classList.toggle('_active'); // спойлеру добавляем или убираем класс _active
          _slideToggle(spollerTitle.nextElementSibling, 500);
        }
        e.preventDefault();
      }
    }
    function hideSpollersBody(spollersBlock) {
      const spollerActiveTitle = spollersBlock.querySelector('[data-spoller]._active'); // у активного и открытого спойлера
      if (spollerActiveTitle) {
        spollerActiveTitle.classList.remove('_active'); // убираем класс _active
        _slideUp(spollerActiveTitle.nextElementSibling, 500);
      }
    }
  }
  /*===============================================================*/
  // SlideToggle
  let _slideUp = (target, duration = 500) => {
    if (!target.classList.contains('_slide')) { // если у объекта нет тех. класса _slide
      target.classList.add('_slide'); // добавляет класс _slide
      target.style.transitionProperty = 'height, margin, padding';
      target.style.transitionDuration = duration + 'ms';
      target.style.height = target.offsetHeight + 'px';
      target.offsetHeight;
      target.style.overflow = 'hidden';
      target.style.height = 0;
      target.style.paddingTop = 0;
      target.style.paddingBottom = 0;
      target.style.marginTop = 0;
      target.style.marginBottom = 0;
      window.setTimeout(() => {
        target.hidden = true;
        target.style.removeProperty('height');
        target.style.removeProperty('padding-top');
        target.style.removeProperty('padding-bottom');
        target.style.removeProperty('margin-top');
        target.style.removeProperty('margin-bottom');
        target.style.removeProperty('overflow');
        target.style.removeProperty('transition-duration');
        target.style.removeProperty('transition-property');
        target.classList.remove('_slide');
      }, duration);
    }
  }
  let _slideDown = (target, duration = 500) => {
    if (!target.classList.contains('_slide')) {
      target.classList.add('_slide');
      if (target.hidden) {
        target.hidden = false;
      }
      let height = target.offsetHeight;
      target.style.overflow = 'hidden';
      target.style.height = 0;
      target.style.paddingTop = 0;
      target.style.paddingBottom = 0;
      target.style.marginTop = 0;
      target.style.marginBottom = 0;
      target.offsetHeight;
      target.style.transitionProperty = 'height, margin, padding';
      target.style.transitionDuration = duration + 'ms';
      target.style.height = height + 'px';
      target.style.removeProperty('padding-top');
      target.style.removeProperty('padding-bottom');
      target.style.removeProperty('margin-top');
      target.style.removeProperty('margin-bottom');
      window.setTimeout(() => {
        target.style.removeProperty('height');
        target.style.removeProperty('overflow');
        target.style.removeProperty('transition-duration');
        target.style.removeProperty('transition-property');
        target.classList.remove('_slide');
      }, duration);
    }
  }
  let _slideToggle = (target, duration = 500) => {
    if (target.hidden) {
      return _slideDown(target, duration); // открыто - скрыть
    } else {
      return _slideUp(target, duration); // закрыто - показать
    }
  }

});