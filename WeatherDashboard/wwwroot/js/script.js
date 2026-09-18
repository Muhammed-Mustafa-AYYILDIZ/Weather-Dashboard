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
    fetchWeather(cityName);
    searchInput.value = cityName;
    updateCityName(cityName);
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
updateCityName('City Name');

async function fetchWeather(cityName) {
    try {
        const response = await fetch(`/api/weather?city=${encodeURIComponent(cityName)}`);

        if (!response.ok) {
            console.error('Hava durumu alınamadı');
            return;
        }

        const data = await response.json();

        const tempElement = document.getElementById('weatherTemp');
        const descElement = document.getElementById('weatherDesc');
        const emojiElement = document.getElementById('weatherEmoji');

        if (tempElement && data.main) {
            tempElement.textContent = `${Math.round(data.main.temp)}°C`;
        }

        if (descElement && data.weather && data.weather[0]) {
            descElement.textContent = data.weather[0].description;
        }

        if (emojiElement && data.weather && data.weather[0]) {
            const main = data.weather[0].main.toLowerCase();
            if (main.includes('clear')) emojiElement.textContent = '☀️';
            else if (main.includes('cloud')) emojiElement.textContent = '☁️';
            else if (main.includes('rain')) emojiElement.textContent = '🌧️';
            else if (main.includes('thunder')) emojiElement.textContent = '⛈️';
            else if (main.includes('snow')) emojiElement.textContent = '❄️';
            else if (main.includes('mist') || main.includes('fog')) emojiElement.textContent = '🌫️';
            else emojiElement.textContent = '🌤️';
        }
    } catch (err) {
        console.error('Hava durumu isteğinde hata:', err);
    }
}