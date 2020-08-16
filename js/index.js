// tabs
const tabsControl = document.querySelectorAll('.menu__item');

const hideTabs = () => {
  document.querySelectorAll('.tab').forEach( (item) => {
    item.classList.add('hide');
  });
};

tabsControl.forEach( (item) => {
  item.addEventListener('touchstart', (e) => {
    if(e.target.tagName == 'IMG') {
     hideTabs();
     document.querySelector(`.${e.target.id}`).classList.remove('hide');
     document.querySelector(`.${e.target.id}`).classList.add('active');
    }
  });
});

