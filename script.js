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
const favoriteList = document.querySelector('.favorite-list');
const countryArea = document.querySelector('.country-area');
const mainCountryBtn = document.getElementById('mainCountryBtn');
const countryItems = document.querySelectorAll('.country-item');
const cityNameElement = document.getElementById('cityName');
const favoriteToggle = document.getElementById('favoriteToggle');

const favoriteCitySet = new Set();

const weatherData = {
  Antalya: { condition: 'Sunny', emoji: '☀️', temperature: 30 },
  Istanbul: { condition: 'Cloudy', emoji: '☁️', temperature: 24 },
  Ankara: { condition: 'Windy', emoji: '🌬️', temperature: 19 },
  Izmir: { condition: 'Clear', emoji: '🌤️', temperature: 28 },
  Bursa: { condition: 'Rainy', emoji: '🌧️', temperature: 20 },
  'New York': { condition: 'Snowy', emoji: '❄️', temperature: 2 },
  'Los Angeles': { condition: 'Sunny', emoji: '☀️', temperature: 27 },
  Chicago: { condition: 'Rainy', emoji: '🌧️', temperature: 14 },
  Houston: { condition: 'Stormy', emoji: '⛈️', temperature: 31 },
  Miami: { condition: 'Warm', emoji: '🌤️', temperature: 29 },
  Berlin: { condition: 'Cloudy', emoji: '☁️', temperature: 17 },
  Munich: { condition: 'Rainy', emoji: '🌧️', temperature: 15 },
  Hamburg: { condition: 'Windy', emoji: '🌬️', temperature: 16 },
  Frankfurt: { condition: 'Clear', emoji: '🌤️', temperature: 20 },
  Cologne: { condition: 'Rainy', emoji: '🌧️', temperature: 18 },
  Paris: { condition: 'Cloudy', emoji: '☁️', temperature: 19 },
  Lyon: { condition: 'Sunny', emoji: '☀️', temperature: 25 },
  Marseille: { condition: 'Warm', emoji: '🌤️', temperature: 26 },
  Nice: { condition: 'Sunny', emoji: '☀️', temperature: 27 },
  Toulouse: { condition: 'Rainy', emoji: '🌧️', temperature: 18 },
  London: { condition: 'Rainy', emoji: '🌧️', temperature: 17 },
  Manchester: { condition: 'Cloudy', emoji: '☁️', temperature: 16 },
  Birmingham: { condition: 'Windy', emoji: '🌬️', temperature: 18 },
  Leeds: { condition: 'Rainy', emoji: '🌧️', temperature: 14 },
  Glasgow: { condition: 'Snowy', emoji: '❄️', temperature: 5 },
  'Tokyo': { condition: 'Clear', emoji: '🌤️', temperature: 22 },
  Osaka: { condition: 'Rainy', emoji: '🌧️', temperature: 23 },
  Kyoto: { condition: 'Cloudy', emoji: '☁️', temperature: 21 },
  Hiroshima: { condition: 'Sunny', emoji: '☀️', temperature: 26 },
  Sapporo: { condition: 'Snowy', emoji: '❄️', temperature: 4 },
  Mumbai: { condition: 'Stormy', emoji: '⛈️', temperature: 30 },
  Delhi: { condition: 'Sunny', emoji: '☀️', temperature: 33 },
  Bangalore: { condition: 'Cloudy', emoji: '☁️', temperature: 26 },
  Hyderabad: { condition: 'Warm', emoji: '🌤️', temperature: 29 },
  Chennai: { condition: 'Sunny', emoji: '☀️', temperature: 32 },
  'São Paulo': { condition: 'Rainy', emoji: '🌧️', temperature: 24 },
  'Rio de Janeiro': { condition: 'Cloudy', emoji: '☁️', temperature: 27 },
  'Brasília': { condition: 'Clear', emoji: '🌤️', temperature: 22 },
  Salvador: { condition: 'Sunny', emoji: '☀️', temperature: 29 },
  Fortaleza: { condition: 'Warm', emoji: '🌤️', temperature: 30 },
  Johannesburg: { condition: 'Clear', emoji: '🌤️', temperature: 23 },
  'Cape Town': { condition: 'Windy', emoji: '🌬️', temperature: 18 },
  Durban: { condition: 'Rainy', emoji: '🌧️', temperature: 25 },
  Pretoria: { condition: 'Sunny', emoji: '☀️', temperature: 24 },
  'Port Elizabeth': { condition: 'Clear', emoji: '🌤️', temperature: 21 }
};

function updateCityName(cityName) {
  cityNameElement.textContent = cityName;

  if (favoriteCitySet.has(cityName)) {
    favoriteToggle.textContent = '★ Remove from Favorites';
    favoriteToggle.classList.add('active');
  } else {
    favoriteToggle.textContent = '☆ Add to Favorites';
    favoriteToggle.classList.remove('active');
  }
}

function updateWeather(cityName) {
  const weatherEmoji = document.getElementById('weatherEmoji');
  const weatherText = document.getElementById('weatherText');
  const temperatureText = document.getElementById('temperatureText');

  if (cityName === 'City Name') {
    weatherEmoji.textContent = '—';
    weatherEmoji.setAttribute('aria-label', 'No weather data');
    weatherText.textContent = 'Weather: --';
    temperatureText.textContent = 'Temperature: --°C';
    return;
  }

  const weather = weatherData[cityName] || {
    condition: 'Clear',
    emoji: '🌤️',
    temperature: 22
  };

  weatherEmoji.textContent = weather.emoji;
  weatherEmoji.setAttribute('aria-label', `${weather.condition} weather`);
  weatherText.textContent = `Weather: ${weather.condition}`;
  temperatureText.textContent = `Temperature: ${weather.temperature}°C`;
}

function renderFavoriteList() {
  favoriteList.innerHTML = '';

  favoriteCitySet.forEach(function (cityName) {
    const favoriteButton = document.createElement('button');
    favoriteButton.type = 'button';
    favoriteButton.className = 'favorite-city active';
    favoriteButton.textContent = cityName;

    favoriteButton.addEventListener('click', function () {
      searchInput.value = cityName;
      updateCityName(cityName);
    });

    favoriteList.appendChild(favoriteButton);
  });
}

function addFavorite(cityName) {
  favoriteCitySet.add(cityName);
  renderFavoriteList();
  updateCityName(cityName);
}

function removeFavorite(cityName) {
  favoriteCitySet.delete(cityName);
  renderFavoriteList();
  updateCityName(cityName);
}

function toggleFavoriteForSelectedCity() {
  const cityName = cityNameElement.textContent.trim();

  if (cityName === 'City Name') return;

  if (favoriteCitySet.has(cityName)) {
    removeFavorite(cityName);
  } else {
    addFavorite(cityName);
  }
}

function selectCity(cityName) {
  searchInput.value = cityName;
  updateCityName(cityName);
  updateWeather(cityName);
  searchResults.innerHTML = '';
  searchResults.classList.remove('active');
  countryArea.classList.remove('open');
  mainCountryBtn.setAttribute('aria-expanded', 'false');
  countryItems.forEach(function (item) {
    item.classList.remove('open');
  });
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

// Yalnızca Ana Buton için Tıklama Eventi
mainCountryBtn.addEventListener('click', function (event) {
  event.preventDefault();
  event.stopPropagation();
  countryArea.classList.toggle('open');
  const isOpen = countryArea.classList.contains('open');
  mainCountryBtn.setAttribute('aria-expanded', isOpen);
});

// Ülkelerin şehir menülerini (sağa doğru) hover ile açma mantığı devam ediyor
countryItems.forEach(function (item) {
  item.addEventListener('mouseenter', function () {
    countryItems.forEach(function (innerItem) {
      if (innerItem !== item) {
        innerItem.classList.remove('open');
      }
    });
    item.classList.add('open');
  });

  item.addEventListener('mouseleave', function (event) {
    if (!item.contains(event.relatedTarget)) {
      item.classList.remove('open');
    }
  });
});

searchInput.addEventListener('input', showSuggestions);

cityButtons.forEach(function (button) {
  button.addEventListener('click', function () {
    selectCity(button.textContent.trim());
  });
});

favoriteToggle.addEventListener('click', function () {
  toggleFavoriteForSelectedCity();
});

// Dışarıya tıklanıldığında her şeyi kapatma
document.addEventListener('click', function (event) {
  const clickedInsideSearch = event.target.closest('.search-panel');
  const clickedInsideCountryArea = event.target.closest('.country-area');

  if (!clickedInsideSearch && !clickedInsideCountryArea) {
    searchResults.classList.remove('active');
    searchResults.innerHTML = '';
    countryArea.classList.remove('open');
    mainCountryBtn.setAttribute('aria-expanded', 'false');
    countryItems.forEach(function (item) {
      item.classList.remove('open');
    });
  }
});

renderFavoriteList();
updateCityName('City Name');