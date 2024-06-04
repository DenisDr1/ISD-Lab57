import './scss/main.scss'
import './scss/mixin.scss'
import './scss/reset.scss'
import './scss/header.scss'
import './scss/content.scss'
import './scss/second_page_content.scss'
import './scss/footer.scss'

const dropdowns = document.querySelectorAll('.dropdown');

const formData = {
  price: { from: null, to: null },
  rooms: null,
  area: { from: null, to: null },
  city: null,
};

dropdowns.forEach(dropdown => {
  const select = dropdown.querySelector('.select');
  const caret = dropdown.querySelector('.caret');
  const menu = dropdown.querySelector('.menu');
  const options = dropdown.querySelectorAll('.menu li');
  const selected = dropdown.querySelector('.selected');

  // Додаємо обробник кліку на елемент select
  select.addEventListener('click', (event) => {
    select.classList.toggle('select-clicked');
    caret.classList.toggle('caret-rotate');
    menu.classList.toggle('menu-open');
    event.stopPropagation(); // Запобігання закриттю меню при кліку на select
  });

  // Додаємо обробник кліку на кожну опцію
  options.forEach(option => {
    option.addEventListener('click', (event) => {
      if (!option.querySelector('input')) { // Перевірка, чи опція не містить інпут
        selected.innerText = option.innerText;
        select.classList.remove('select-clicked');
        caret.classList.remove('caret-rotate');
        menu.classList.remove('menu-open');
        options.forEach(option => {
          option.classList.remove('active');
        });
        option.classList.add('active');
        // Зберігаємо значення в об'єкт formData
        if (dropdown.classList.contains('price')) {
          formData.price = { from: formData.price.from, to: formData.price.to };
        } else if (dropdown.classList.contains('rooms')) {
          formData.rooms = option.innerText;
        } else if (dropdown.classList.contains('area')) {
          formData.area = { from: formData.area.from, to: formData.area.to };
        } else if (dropdown.classList.contains('city')) {
          formData.city = option.innerText;
        }
      }
      event.stopPropagation(); // Запобігання закриттю меню при кліку на опцію
    });
  });

  // Додаємо обробник кліку на інпут
  const inputs = dropdown.querySelectorAll('input');
  inputs.forEach(input => {
    input.addEventListener('click', (event) => {
      event.stopPropagation(); // Запобігання закриттю меню при кліку на інпут
    });

    input.addEventListener('input', () => {
      const value = input.value;

      // Зберігаємо введені значення в об'єкт formData
      if (dropdown.classList.contains('price')) {
        if (input.placeholder === 'Від') {
          formData.price.from = value;
        } else if (input.placeholder === 'До') {
          formData.price.to = value;
        }
      } else if (dropdown.classList.contains('area')) {
        if (input.placeholder === 'Від') {
          formData.area.from = value;
        } else if (input.placeholder === 'До') {
          formData.area.to = value;
        }
      }
      // Логування введених значень
      console.log('formData after input change:', formData);
    });
  });
});

// Закриваємо всі випадаючі меню при кліку поза ними
document.addEventListener('click', () => {
  dropdowns.forEach(dropdown => {
    const select = dropdown.querySelector('.select');
    const caret = dropdown.querySelector('.caret');
    const menu = dropdown.querySelector('.menu');

    if (menu.classList.contains('menu-open')) {
      select.classList.remove('select-clicked');
      caret.classList.remove('caret-rotate');
      menu.classList.remove('menu-open');
    }
  });
});

const applyFiltersButton = document.querySelector('.apply-filters');

// Додаємо обробник кліку на кнопку "Застосувати фільтри"
applyFiltersButton.addEventListener('click', () => {
  // Логування перед перевіркою значень
  console.log('formData on apply-filters click:', formData);

  const isValidPrice = formData.price.from && formData.price.to && formData.price.from < formData.price.to && formData.price.from > 0;
  const isValidArea = formData.area.from && formData.area.to && formData.area.from < formData.area.to && formData.area.from > 0;
  const isValidRooms = formData.rooms !== null;
  const isValidCity = formData.city !== null;

  // Логування результатів валідації
  console.log('Validation results:', { isValidPrice, isValidArea, isValidRooms, isValidCity });

  if (isValidPrice && isValidArea && isValidRooms && isValidCity) {
    console.log('All values are valid. Data to be sent:', formData);
    
  } else {
    // Виведення повідомлення про помилку
    alert('Будь ласка, заповніть всі поля коректно.');
  }
});


const apartmentDetails = {
    1: {
      title: '$50,000 - Київ, вулиця Магістральна',
      general_desc: 'Загальна площа: ; Поверх: ; Поверховість: ; Опалення: ;',
      description: 'Опис квартири 1...',
      accommodation: 'Умови проживання',
      district_rating: 'Рейтинг району:',
      contacts: 'Контактні дані орендодавця',
    },
    2: {
      title: '$20,000 - Київ, вулиця Магістральна',
      general_desc: 'Загальна площа: ; Поверх: ; Поверховість: ; Опалення: ;',
      description: 'Опис квартири 1...',
      accommodation: 'Умови проживання',
      district_rating: 'Рейтинг району:',
      contacts: 'Контактні дані орендодавця',
    },
    3: {
      title: '$10,000 - Київ, вулиця Магістральна',
      general_desc: 'Загальна площа: ; Поверх: ; Поверховість: ; Опалення: ;',
      description: 'Опис квартири 1...',
      accommodation: 'Умови проживання',
      district_rating: 'Рейтинг району:',
      contacts: 'Контактні дані орендодавця',
    },
    4: {
      title: '$35,000 - Одеса, вулиця Семена Палія',
      general_desc: 'Загальна площа: ; Поверх: ; Поверховість: ; Опалення: ;',
      description: 'Опис квартири 1...',
      accommodation: 'Умови проживання',
      district_rating: 'Рейтинг району:',
      contacts: 'Контактні дані орендодавця',
    },
  };
