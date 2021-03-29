const bigTabletSize = window.matchMedia('(max-width: 959px)');
const middleTabletSize = window.matchMedia('(max-width: 768px');
const smallTabletSize = window.matchMedia('(max-width: 659px');
const upperSmallTabletSize = window.matchMedia('(min-width: 660px');

const handleBigTabletChange = (e) => {
  if (e.matches) {
    document.querySelector('.strengths').classList.add('strengths_disabled');
    document.querySelectorAll('.phone-number').forEach((x) => x.classList.add('phone-number_disabled'));
  } else {
    document.querySelector('.strengths').classList.remove('strengths_disabled');
    document.querySelectorAll('.phone-number').forEach((x) => x.classList.remove('phone-number_disabled'));
  }
};

const handleMiddleTabletChange = (e) => {
  if (e.matches) {
    document.querySelector('.mainContent__secondaryFoto').classList.add('mainContent__secondaryFoto_disabled');
    document.querySelector('.mainContent__button-phone').classList.add('button__phone_disabled');
  } else {
    document.querySelector('.mainContent__secondaryFoto').classList.remove('mainContent__secondaryFoto_disabled');
    document.querySelector('.mainContent__button-phone').classList.remove('button__phone_disabled');
  }
};

const handleSmallTabletChange = (e) => {
  const removeClassesForCarButtons = ['button_vsm_size', 'button_border_gold'];
  const removeClassesForCarTextDesktop = ['button_hover_white-theme', 'button__text_sm_size_active'];
  const addClassesForCarButtonsEffectMobile = ['menu__item_hover', 'menu__item_active', 'menu__item_hover_main-color'];
  if (e.matches) {
    document.querySelector('.hamburger').classList.add('hamburger_active');
    document.querySelector('.nav-ul').classList.add('menu_vertical_mobile');
    document.querySelector('.mainContent__button-border').classList.add('button__border_disabled');
    document.querySelectorAll('.cars__button').forEach((x) => x.classList.remove(...removeClassesForCarButtons));
    document.querySelectorAll('.cars__button-text').forEach((x) => x.classList.remove(...removeClassesForCarTextDesktop));
    document.querySelectorAll('.cars__button-text').forEach((x) => x.classList.add(...addClassesForCarButtonsEffectMobile));
  } else {
    document.querySelector('.hamburger').classList.remove('hamburger_active');
    document.querySelector('.mainContent__button-border').classList.remove('button__border_disabled');
    document.querySelector('.nav-ul').classList.remove('menu_vertical_mobile');
    document.querySelectorAll('.cars__button').forEach((x) => x.classList.add(...removeClassesForCarButtons));
    document.querySelectorAll('.cars__button-text').forEach((x) => x.classList.add(...removeClassesForCarTextDesktop));
    document.querySelectorAll('.cars__button-text').forEach((x) => x.classList.remove(...addClassesForCarButtonsEffectMobile));
  }
};

// bigTabletSize.addEventListener('change', handleTabletChange);
bigTabletSize.addListener(handleBigTabletChange);
middleTabletSize.addListener(handleMiddleTabletChange);
smallTabletSize.addListener(handleSmallTabletChange);
handleBigTabletChange(bigTabletSize);
handleMiddleTabletChange(middleTabletSize);
handleSmallTabletChange(smallTabletSize);
