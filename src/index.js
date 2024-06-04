import './scss/main.scss';
import './scss/mixin.scss';
import './scss/reset.scss';
import './scss/header.scss';
import './scss/content.scss';
import './scss/footer.scss';

const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach(dropdown => {
  const select = dropdown.querySelector('.select');
  const caret = dropdown.querySelector('.caret');
  const menu = dropdown.querySelector('.menu');
  const options = dropdown.querySelectorAll('.menu li');
  const selected = dropdown.querySelector('.selected');

  // Додаємо обробник кліку на елемент select
  select.addEventListener('click', () => {
    select.classList.toggle('select-clicked');
    caret.classList.toggle('caret-rotate');
    menu.classList.toggle('menu-open');
  });

  // Додаємо обробник кліку на кожну опцію
  options.forEach(option => {
    option.addEventListener('click', () => {
      selected.innerText = option.innerText;
      select.classList.remove('select-clicked');
      caret.classList.remove('caret-rotate');
      menu.classList.remove('menu-open');
      options.forEach(option => {
        option.classList.remove('active');
      });
      option.classList.add('active');
    });
  });
});

const searchButton = document.querySelector('.button_accent');

// Додаємо обробник кліку на кнопку "Пошук"
searchButton.addEventListener('click', () => {
  const selectedOptions = document.querySelectorAll('.dropdown .selected');
  const selectedValues = Array.from(selectedOptions).map(option => option.innerText.trim());

  // Масив з обраними значеннями
  const requiredValues = ["Орендувати квартиру", "Новобудови", "Київ"];
  // Перевірка, чи всі необхідні значення були обрані
  const found = requiredValues.every(value => selectedValues.includes(value));

  if (found) {
    // Перенаправлення на другу сторінку з необхідними даними
    window.location.href = 'second_page.html';
  } else {
    // Виведення повідомлення про помилку
    alert('Нерухомість не знайдено');
  }
});
