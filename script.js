const countries = {
  USA: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'],
  Canada: ['Toronto', 'Vancouver', 'Montreal', 'Calgary', 'Ottawa'],
  UK: ['London', 'Manchester', 'Birmingham', 'Leeds', 'Glasgow'],
  Australia: ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide'],
  Germany: ['Berlin', 'Hamburg', 'Munich', 'Cologne', 'Frankfurt'],
  France: ['Paris', 'Marseille', 'Lyon', 'Toulouse', 'Nice'],
  Japan: ['Tokyo', 'Osaka', 'Kyoto', 'Hiroshima', 'Sapporo'],
  India: ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai'],
  Brazil: ['São Paulo', 'Rio de Janeiro', 'Brasília', 'Salvador', 'Fortaleza'],
  SouthAfrica: ['Johannesburg', 'Cape Town', 'Durban', 'Pretoria', 'Port Elizabeth'],
  Turkey: ['Istanbul', 'Ankara', 'Izmir', 'Bursa', 'Adana', 'Antalya']
};

const countryCodes = {
  USA: 'US',
  Canada: 'CA',
  UK: 'GB',
  Australia: 'AU',
  Germany: 'DE',
  France: 'FR',
  Japan: 'JP',
  India: 'IN',
  Brazil: 'BR',
  SouthAfrica: 'ZA',
  Turkey: 'TR'
};

function countryCodeToFlag(code) {
  const normalized = code.toUpperCase();
  const codePoints = normalized.split('').map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const cityButtons = document.querySelectorAll('.city-btn');
const favoriteButtons = document.querySelectorAll('.favorite-city');
const countryArea = document.querySelector('.country-area');
const countryTrigger = document.querySelector('.country-trigger');
const countryItems = document.querySelectorAll('.country-item');

function selectCity(cityName) {
  searchInput.value = cityName;
  searchResults.innerHTML = '';
  searchResults.classList.remove('active');
  countryArea.classList.remove('open');
  countryItems.forEach(function (item) {
    item.classList.remove('open');
  });
}

function toggleCountryMenu() {
  const isOpen = countryArea.classList.contains('open');
  countryArea.classList.toggle('open', !isOpen);
  countryTrigger.setAttribute('aria-expanded', String(!isOpen));
}

function showSuggestions() {
  const value = searchInput.value.trim().toLowerCase();
  searchResults.innerHTML = '';
  searchResults.classList.remove('active');

  if (!value) return;

  const matchingCities = [];

  for (const country in countries) {
    const cities = countries[country];

    cities.forEach(function (city) {
      if (city.toLowerCase().includes(value)) {
        matchingCities.push({
          city: city,
          country: country,
          flag: countryCodeToFlag(countryCodes[country] || 'GL')
        });
      }
    });
  }

  if (matchingCities.length === 0) return;

  matchingCities.slice(0, 6).forEach(function (item) {
    const listItem = document.createElement('li');
    const cityText = document.createElement('span');
    const flagText = document.createElement('span');

    cityText.textContent = `${item.city}, ${item.country}`;
    flagText.textContent = item.flag;
    flagText.className = 'flag';

    listItem.appendChild(cityText);
    listItem.appendChild(flagText);

    listItem.addEventListener('click', function () {
      selectCity(item.city);
    });

    searchResults.appendChild(listItem);
  });

  searchResults.classList.add('active');
}

countryTrigger.addEventListener('click', function (event) {
  event.stopPropagation();
  toggleCountryMenu();
});

countryItems.forEach(function (item) {
  const countryName = item.querySelector('.country-name');

  countryName.addEventListener('click', function (event) {
    event.stopPropagation();
    countryItems.forEach(function (innerItem) {
      if (innerItem !== item) {
        innerItem.classList.remove('open');
      }
    });
    item.classList.toggle('open');
  });
});

searchInput.addEventListener('input', showSuggestions);

cityButtons.forEach(function (button) {
  button.addEventListener('click', function () {
    selectCity(button.textContent);
  });
});

favoriteButtons.forEach(function (button) {
  button.addEventListener('click', function () {
    selectCity(button.textContent);
  });
});

document.addEventListener('click', function (event) {
  const clickedInsideSearch = event.target.closest('.search-panel');
  const clickedInsideCountryArea = event.target.closest('.country-area');

  if (!clickedInsideSearch && !clickedInsideCountryArea) {
    searchResults.classList.remove('active');
    searchResults.innerHTML = '';
    countryArea.classList.remove('open');
    countryItems.forEach(function (item) {
      item.classList.remove('open');
    });
  }
});
