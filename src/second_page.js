import './scss/main.scss'
import './scss/mixin.scss'
import './scss/reset.scss'
import './scss/header.scss'
import './scss/content.scss'
import './scss/second_page_content.scss'
import './scss/footer.scss'

// Об'єкт з деталями квартир
const apartmentDetails = {
  1: {
    title: '$50,000 - Київ, вулиця Магістральна', // Назва та адреса квартири 1
    general_desc: 'Загальна площа: 100 м2; Поверх: 5; Поверховість: 10; Опалення: центральне;', // Загальний опис квартири 1
    description: 'Опис квартири 1...', // Додатковий опис квартири 1
    accommodation: 'Умови проживання:', // Умови проживання у квартирі 1
    district_rating: 'Рейтинг району: 8/10', // Рейтинг району для квартири 1
    contacts: 'Контактні дані орендодавця', // Контактна інформація орендодавця для квартири 1
  },
  2: {
    title: '$20,000 - Київ, вулиця Магістральна', // Назва та адреса квартири 2
    general_desc: 'Загальна площа: 50 м2; Поверх: 3; Поверховість: 10; Опалення: центральне;', // Загальний опис квартири 2
    description: 'Опис квартири 2...', // Додатковий опис квартири 2
    accommodation: 'Умови проживання:', // Умови проживання у квартирі 2
    district_rating: 'Рейтинг району: 7/10', // Рейтинг району для квартири 2
    contacts: 'Контактні дані орендодавця', // Контактна інформація орендодавця для квартири 2
  },
  3: {
    title: '$10,000 - Київ, вулиця Магістральна', // Назва та адреса квартири 3
    general_desc: 'Загальна площа: 30 м2; Поверх: 2; Поверховість: 5; Опалення: центральне;', // Загальний опис квартири 3
    description: 'Опис квартири 3...', // Додатковий опис квартири 3
    accommodation: 'Умови проживання:', // Умови проживання у квартирі 3
    district_rating: 'Рейтинг району: 6/10', // Рейтинг району для квартири 3
    contacts: 'Контактні дані орендодавця', // Контактна інформація орендодавця для квартири 3
  },
  4: {
    title: '$35,000 - Одеса, вулиця Семена Палія', // Назва та адреса квартири 4
    general_desc: 'Загальна площа: 70 м2; Поверх: 4; Поверховість: 9; Опалення: автономне;', // Загальний опис квартири 4
    description: 'Опис квартири 4...', // Додатковий опис квартири 4
    accommodation: 'Умови проживання:', // Умови проживання у квартирі 4
    district_rating: 'Рейтинг району: 9/10', // Рейтинг району для квартири 4
    contacts: 'Контактні дані орендодавця', // Контактна інформація орендодавця для квартири 4
  },
};

// Ініціалізація об'єкта formData
const formData = {
  price: { from: null, to: null },
  rooms: null,
  area: { from: null, to: null },
  city: null,
};


// Додаємо слухач подій, який спрацює після завантаження DOM
document.addEventListener('DOMContentLoaded', () => {
  // Знаходимо всі елементи з класом 'dropdown'
  const dropdowns = document.querySelectorAll('.dropdown');

  // Додаємо обробники подій для кожного dropdown
  dropdowns.forEach(dropdown => {
    // Знаходимо елементи select, caret, menu, options та selected всередині кожного dropdown
    const select = dropdown.querySelector('.select');
    const caret = dropdown.querySelector('.caret');
    const menu = dropdown.querySelector('.menu');
    const options = dropdown.querySelectorAll('.menu li');
    const selected = dropdown.querySelector('.selected');

    // Додаємо обробник подій для відкриття/закриття меню
    select.addEventListener('click', (event) => {
      select.classList.toggle('select-clicked');
      caret.classList.toggle('caret-rotate');
      menu.classList.toggle('menu-open');
      event.stopPropagation();
    });

    // Додаємо обробник подій для кожної опції в меню
    options.forEach(option => {
      option.addEventListener('click', (event) => {
        // Перевіряємо, чи обрана опція не містить input елемента
        if (!option.querySelector('input')) {
          // Змінюємо текст обраного елемента на текст опції
          selected.innerText = option.innerText;
          select.classList.remove('select-clicked');
          caret.classList.remove('caret-rotate');
          menu.classList.remove('menu-open');
          options.forEach(option => {
            option.classList.remove('active');
          });
          option.classList.add('active');
          
          // Оновлюємо formData залежно від типу dropdown
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
        event.stopPropagation();
      });
    });

    // Додаємо обробник подій для input елементів в dropdown
    const inputs = dropdown.querySelectorAll('input');
    inputs.forEach(input => {
      // Запобігаємо закриттю меню при кліку на input
      input.addEventListener('click', (event) => {
        event.stopPropagation();
      });

      // Оновлюємо formData при зміні значення input
      input.addEventListener('input', () => {
        const value = input.value;
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
        console.log('formData після зміни:', formData);
      });
    });
  });

  // Закриваємо меню при кліку за межами dropdown
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

  // Додаємо обробник подій для кнопки застосування фільтрів
  const applyFiltersButton = document.querySelector('.apply-filters');
  applyFiltersButton.addEventListener('click', () => {
    console.log('formData при натисканні apply-filters:', formData);
    const isValidPrice = formData.price.from === null || formData.price.to === null || (formData.price.from < formData.price.to && formData.price.from > 0);
    const isValidArea = formData.area.from === null || formData.area.to === null || (formData.area.from < formData.area.to && formData.area.from > 0);
    const isValidRooms = formData.rooms !== null;
    const isValidCity = formData.city !== null;

    console.log('Результати валідації:', { isValidPrice, isValidArea, isValidRooms, isValidCity });

    if (isValidPrice && isValidArea && (isValidRooms || isValidCity)) {
      console.log('Всі значення валідні. Дані для відправки:', formData);
      filterApartments(formData);
    } else {
      alert('Заповніть всі поля коректно.');
    }
    // Оновлюємо значення середньої вартості на сторінці
    displayAveragePrice();
  });

  // Знаходимо всі елементи з класом 'cards_template_box'
  const apartments = document.querySelectorAll('.cards_template_box');
  
  // Функція фільтрації квартир за заданими фільтрами
  const filterApartments = (filters) => {
    let apartmentsFound = false;
    apartments.forEach(apartment => {
      const price = parseInt(apartment.querySelector('h3').innerText.replace('$', '').replace(',', ''));
      const city = apartment.querySelector('p:nth-of-type(1)').innerText.split(',')[0];
      const rooms = parseInt(apartment.querySelector('p:nth-of-type(2)').innerText.split(' ')[0]);
      const area = parseInt(apartment.querySelector('p:nth-of-type(3)').innerText.replace('Площа: ', '').replace(' м2', ''));

      let matchesPrice = true;
      let matchesCity = true;
      let matchesRooms = true;
      let matchesArea = true;

      if (filters.price.from !== null && filters.price.to !== null) {
        matchesPrice = price >= filters.price.from && price <= filters.price.to;
      }
      if (filters.city !== null) {
        matchesCity = filters.city === city;
      }
      if (filters.rooms !== null) {
        matchesRooms = filters.rooms == rooms;
      }
      if (filters.area.from !== null && filters.area.to !== null) {
        matchesArea = area >= filters.area.from && area <= filters.area.to;
      }

      if (matchesPrice && matchesCity && matchesRooms && matchesArea) {
        apartment.style.display = 'flex';
        apartmentsFound = true;
      } else {
        apartment.style.display = 'none';
      }
    });
    if (!apartmentsFound) {
      document.querySelector('.cards').innerHTML = "<p>Квартири не знайдено.</p>";
    }
  };

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
  const detailButtons = document.querySelectorAll('.button_accent[data-apartment]');
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
      modal.style.display = 'block';
    });
  });

  // Додаємо обробник подій для кнопки скидання фільтрів
  const resetFiltersButton = document.querySelector('.reset-filters');
  resetFiltersButton.addEventListener('click', () => {
    if(formData.price.from != null || formData.price.to != null || formData.rooms != null || formData.area.from != null || formData.area.to != null || formData.city != null)
    {
      formData.price = { from: null, to: null };
      formData.rooms = null;
      formData.area = { from: null, to: null };
      formData.city = null;

      // Очищення тексту в обраних елементах
      dropdowns.forEach(dropdown => {
        const selected = dropdown.querySelector('.selected');
        if (dropdown.classList.contains('price')) {
          selected.innerText = 'Ціновий діапазон';
        } else if (dropdown.classList.contains('rooms')) {
          selected.innerText = 'Кількість кімнат';
        } else if (dropdown.classList.contains('area')) {
          selected.innerText = 'Площа';
        } else if (dropdown.classList.contains('city')) {
          selected.innerText = 'Місто';
        }
      });

      // Очищення значень input полів
      document.querySelectorAll('.menu input').forEach(input => {
        input.value = '';
      });

      // Відображення всіх карток квартир
      apartments.forEach(apartment => {
        apartment.style.display = 'flex';
      });
      // Викликаємо функцію для обчислення середньої вартості після скидання фільтрів
      displayAveragePrice();
    }
    else {
      alert('Нічого скидувати.');
    }
  });
  // Функція для виведення середньої вартості на сторінці
  const displayAveragePrice = () => {
    // Викликаємо функцію для обчислення середньої вартості
    const averagePrice = calculateAveragePrice();
    // Оновлюємо значення середньої вартості на сторінці
    document.querySelector('p').innerText = `Середня вартість: ${averagePrice}`;
  };
  // Функція для обчислення середньої вартості квартир на сторінці
  const calculateAveragePrice = () => {
    // Знаходимо всі елементи з класом 'cards_template_box'
    const apartmentElements = document.querySelectorAll('.cards_template_box:not([style*="display: none"])');

    // Масив для зберігання вартостей усіх квартир
    const prices = [];

    // Знаходимо вартість кожної квартири і додаємо її до масиву prices
    apartmentElements.forEach(apartment => {
      const priceElement = apartment.querySelector('h3');
      const priceText = priceElement.innerText.replace('$', '').replace(',', '');
      const price = parseInt(priceText);
      prices.push(price);
    });

    // Обчислюємо середню вартість квартир на сторінці
    const averagePrice = calculateAverage(prices);

    return averagePrice;
};

  // Функція для обчислення середнього значення масиву чисел
  const calculateAverage = (numbers) => {
    if (numbers.length === 0) return 0;
    const sum = numbers.reduce((acc, curr) => acc + curr, 0);
    const average = sum / numbers.length;
    return Math.round(average * 100) / 100; // Округлення до двох знаків після коми
};
  displayAveragePrice();
});
