//Вызывает всплывающее окно 18+ при загрузке страницы и актуализирует дату информации, не будет показываться до новой сессии браузера

$(document).ready(function(){
    let visited = sessionStorage.visited;
    if (visited){
      console.log('Действие уже выполнялось, и не возобновиться до начала следующей сессии');
    }
    else {
        $('.modal-window, .modal-window__wrapper--age18').fadeIn().css('display', 'flex');
          (function(){
            let date = new Date();

            function zero(t){
              return (t < 10) ? '0' + t : t;
            }

            $('.modal-window__info-time').html(zero(date.getHours()) + ':' + zero(date.getMinutes()) + ' от ' + zero(date.getDate()) + '.' + zero(date.getMonth() + 1) + '.' + zero(date.getFullYear()));
          })
        ();

      //Закрывает всплывающее окно 18+ при нажатии на кнопку "Да"

      $('.modal-window__wrapper--age18').find('.btn:eq(0)').click(function(){
        $('.modal-window, .modal-window__wrapper--age18').fadeOut();
        sessionStorage.visited = true;
      })
    }
})


//Обратный звонок
$('.btn-callback').click(function(){
  $('.modal-window, .modal-window__bg, .modal-window__wrapper--callback').fadeIn(200).css('display', 'flex');
})

//Закрытие модального окна
$('.modal-window__bg').click(function(){
  $('.modal-window, .modal-window__bg, .modal-window__wrapper').fadeOut();
})


//Управление раскрывающимся списком локаций

$('.locations__dropdown').find('.locations__group-title').click(function(){
  $(this).parent().toggleClass('locations__dropdown--active').find('.locations__group').slideToggle();
})


//Скрыть/показать карту

$('a.geo-position__item, .citymap__close-btn').click(function(){
  if ($(window).width() > '765') {
    $('.citymap').slideToggle('slow').css('display', 'flex');
  }
  else {
    $('.citymap').fadeToggle(1).css('display', 'flex');
  }
  $('.citymap__sidebar').show().css('display', 'flex');
})

$(' .sidebar__close-btn, .citymap__accept-btn').click(function(){
  $('.citymap').hide();
  $('.citymap__sidebar').show().css('display', 'flex');
})


//Вызывает всплывающую панель при выборе региона из списка и подставляет его значение в заголовок окна

$('.locations__link').click(function(){
  let region = $(this).html();
  $('.popup-panel').fadeIn('fast').find('.popup-panel__title').html(region);
})


//Закоывает всплывающую панель при нажатии на крестик

$('.popup-panel').find('.close-btn').click(function(){
  $('.popup-panel').fadeOut('fast');
})

$('a.geo-position__item, .citymap__close-btn, .citymap__accept-btn').click(function(){
  $('.popup-panel').fadeOut('fast');
})



//Делает активным выбраный элемент списка и деактивирует остальные

$('.popup-panel__item').click(function(){
  $('.popup-panel__item').addClass('popup-panel__item--disabled').removeClass('popup-panel__item--active');
  $(this).removeClass('popup-panel__item--disabled').addClass('popup-panel__item--active');

  //Меняет местоположение в шапке сайта в зависимости от выбранного в списке
  let geoPosition = $('.popup-panel__title').find('span').html() +", " + $(this).find('.popup-panel__adress').html();
  $('.geo-position__item').html(geoPosition).attr('title', geoPosition);
  //Управляет поведением карты на мобильной версии
  if ($(window).width() < '768') {
    // $('.citymap__sidebar').fadeOut('fast'); //Если нужно показать карту, то откоментить эту строку и закоментить следующую, в CSS у сitymap__map убрать display: none
    $('.citymap, .popup-panel').fadeOut('fast');
  }
})

$('.citymap__back-btn').click(function(){
  $('.citymap__sidebar').fadeIn('fast').css('display', 'flex');
})


//Открывает мобильное меню при клике на кнопку бургера

$('.trigger-ctrl').click(function(){
  $('.trigger-ctrl__inner').toggleClass('trigger-ctrl__inner--active')
  $('.topnav').toggleClass('topnav--active');
  $('.navbar__inner').toggleClass('navbar__inner--active');
  $('.top-shadow-layer').fadeToggle(400);
})


//Закрывает мобильное меню при клике на затемненную область за пределами меню

$('.top-shadow-layer').click(function(){
  $('.trigger-ctrl__inner').removeClass('trigger-ctrl__inner--active')
  $('.topnav').removeClass('topnav--active');
  $('.navbar__inner').removeClass('navbar__inner--active');
  $('.site-search').fadeOut(400);
  $('.top-shadow-layer').fadeToggle(400);
})

$('a.geo-position__item').click(function(){
  $('.trigger-ctrl__inner').removeClass('trigger-ctrl__inner--active')
  $('.topnav').removeClass('topnav--active');
  $('.navbar__inner').removeClass('navbar__inner--active');
  $('.top-shadow-layer').fadeOut(400);
})


//Отвечает за сворачивание / разворачивание панели фильтров в каталоге

$('.filter').find('.filter__ctrl-btn').click(function(){
  $(this).parent().find('.filter__wrapper').slideToggle();
})



//Управляет списком городов на странице контактов (*временно)

$('.contacts__region-name').click(function(){
  $('.contacts__city-list').slideUp(400);
  $(this).parent().find('.contacts__city-list').slideDown(400);
})


//Отвечает за скрытие / раскрытие и ограничение списка тегов (адресов) на странице продукта.

$('.product__tags--more').click(function(){
  $(this).closest('.product__adress-list').toggleClass('product__adress-list--all');
  if ($(this).html() == 'еще...') $(this).html('скрыть...')
    else $(this).html('еще...');
})

if ($('.product__adress-list').find('li').length <= 6) {
  $('.product__tags--more').parent().css('display', 'none');
}


//Удаляет элемент .reviews__empty, если отзывов (.reviews__item) в списке больше чем 0.

$('.reviews').ready(function(){
  reviewsCount = $(this).find('.reviews__list > .reviews__item').length;
  if (reviewsCount > 0) $(this).find('.reviews__empty').remove();
})


//Пример поведения выбора фильтров в каталоге (извиняюсь за корявость, я только хотел передать суть), кстати строка <i class="filter__check">&#10004;</i><span class="filter__checked-title">' + checkValue + '</span>' является обязательной чтобы все работало как надо

$('.filter__checkbox').change(function(){
  let checkValue = $(this).attr('value');
  let filterTitle = '<i class="filter__check">&#10004;</i><span class="filter__checked-title">' + checkValue + '</span>';

  if ($(this).is(':checked')) {
    $(this).closest('.filter__select-wrapper').find('.filter__title > b').before('<span>' + filterTitle + '</span>');
  }
  else {
    $(this).closest('.filter__select-wrapper').find('.filter__title > span:contains("' + checkValue + '")').remove();
  }
})


//Управление фидьтрами на странице контактов

$('.filter__radio').change(function(){
  let checkValue = $(this).attr('value');
  let filterTitle = '<span>' + checkValue + '</span>';
  $(this).closest('.filter__select-wrapper').find('.filter__title').html(filterTitle).removeClass('filter__title--active').next().slideToggle(200);
})


//Управление отображением строки поиска

$('.navbar__search').click(function(){
  $('.top-shadow-layer, .site-search').fadeIn(300);
})

$('.site-search').find('.close-btn').click(function(){
  $('.site-search').fadeOut(200);
  if ($(window).width() > '992') $('.top-shadow-layer').fadeOut(200);
})



//Отображает сообщение если товаров в каталоге не найдено.

$('.catalog').ready(function(){
  if ($(this).find('.catalog__item').length >= 1) {
    $(this).find('.catalog__empty').hide();
  }
  else {
    $(this).find('.catalog__empty').show();
    $(this).find('.btn-show-more').hide();
  }
})
