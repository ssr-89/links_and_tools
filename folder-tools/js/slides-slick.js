'use srtict'
// swiper
const swiper = new Swiper('.swiper-container', {
  // кол-во слайдов для показа
  slidesPerView: 1,


  // кол-во перелистываемых слайдов
  slidesPerGroup: 1,


  // бесконечный цикл прокрутки
  loop: true,


  // автопрокрутка
  autoplay: {
    // Пауза между прокруткой (миллисекунды)
    delay: 1000,

    // Закончить на последнем слайде
    stopOnLastSlide: true,

    // Отключить после ручного переключения
    disableOnInteraction: false,
  },


  // эффект переключения слайдов сменой прозрачности
  effect: "fade",

  // Дополнение к fade
  fadeEffect: {
    // параллельная смена прозрачности
    crossFade: true,
  },


  // пагинация (ТОЧКИ)
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },


  // навигация (КНОПКИ)
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

