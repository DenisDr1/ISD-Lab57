import './scss/main.scss';
import './scss/mixin.scss';
import './scss/reset.scss';
import './scss/header.scss';
import './scss/content.scss';
import './scss/footer.scss';

// Об'єкт з деталями квартир
const apartmentDetails = {
  1: {
    title: '$50,000 - Київ, вулиця Магістральна', // Назва та адреса квартири 1
    general_desc: 'Загальна площа: 100 м2; Поверх: 5; Поверховість: 10; Опалення: центральне;', // Загальний опис квартири 1
    description: 'Опис квартири 1...', // Додатковий опис квартири 1
    accommodation: 'Умови проживання: умови', // Умови проживання у квартирі 1
    district_rating: 'Рейтинг району: 8/10', // Рейтинг району для квартири 1
    contacts: 'Контактні дані орендодавця: +380', // Контактна інформація орендодавця для квартири 1
  },
  2: {
    title: '$20,000 - Одеса, вулиця Палія', // Назва та адреса квартири 2
    general_desc: 'Загальна площа: 50 м2; Поверх: 3; Поверховість: 10; Опалення: центральне;', // Загальний опис квартири 2
    description: 'Опис квартири 2...', // Додатковий опис квартири 2
    accommodation: 'Умови проживання: умови', // Умови проживання у квартирі 2
    district_rating: 'Рейтинг району: 7/10', // Рейтинг району для квартири 2
    contacts: 'Контактні дані орендодавця: +380', // Контактна інформація орендодавця для квартири 2
  },
  3: {
    title: '$30,000 - Київ, вулиця Магістральна', // Назва та адреса квартири 3
    general_desc: 'Загальна площа: 30 м2; Поверх: 2; Поверховість: 5; Опалення: центральне;', // Загальний опис квартири 3
    description: 'Опис квартири 3...', // Додатковий опис квартири 3
    accommodation: 'Умови проживання: умови', // Умови проживання у квартирі 3
    district_rating: 'Рейтинг району: 6/10', // Рейтинг району для квартири 3
    contacts: 'Контактні дані орендодавця: +380', // Контактна інформація орендодавця для квартири 3
  },
};

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

// Знаходимо елементи модального вікна
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalGeneralDesc = document.getElementById('modal-general-desc');
const modalDescription = document.getElementById('modal-description');
const modalAccommodation = document.getElementById('modal-accommodation');
const modalDistrictRating = document.getElementById('modal-district-rating');
const modalContacts = document.getElementById('modal-contacts');
const closeModal = document.querySelector('.close');

// Додаємо обробник подій для кнопки закриття модального вікна
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Закриваємо модальне вікно при кліку за його межами
window.addEventListener('click', (event) => {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
});

// Додаємо обробник подій для кнопок перегляду деталей квартир
const detailButtons = document.querySelectorAll('.button_details[data-apartment]');
detailButtons.forEach(button => {
    button.addEventListener('click', () => {
        const apartmentId = button.getAttribute('data-apartment');
        const details = apartmentDetails[apartmentId];

        // Заповнюємо дані модального вікна деталями квартири
        modalTitle.innerText = details.title;
        modalGeneralDesc.innerText = details.general_desc;
        modalDescription.innerText = details.description;
        modalAccommodation.innerText = details.accommodation;
        modalDistrictRating.innerText = details.district_rating;
        modalContacts.innerText = details.contacts;

        // Відображаємо модальне вікно
        modal.style.display = 'flex';
    });
});