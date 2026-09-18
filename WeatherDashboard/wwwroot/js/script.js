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
        favoriteToggle.textContent = '★ Bookmarked';
        favoriteToggle.classList.add('active');
    } else {
        favoriteToggle.textContent = '☆ Bookmark';
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

// Ülkelerin şehir menülerini (sağa doğru) pürüzsüz hover ile açma mantığı
let closeMenuTimeout = null;

countryItems.forEach(function (item) {
    item.addEventListener('mouseenter', function () {
        if (closeMenuTimeout) {
            clearTimeout(closeMenuTimeout);
            closeMenuTimeout = null;
        }

        countryItems.forEach(function (innerItem) {
            if (innerItem !== item) {
                innerItem.classList.remove('open');
            }
        });
        item.classList.add('open');
    });

    item.addEventListener('mouseleave', function (event) {
        // Eğer fare alt menüye (şehirlere) veya öğe içine geçtiyse kapatma
        if (item.contains(event.relatedTarget)) {
            return;
        }

        // 150ms hoşgörü süresi: kullanıcı imleci sağa kaydırırken menü anında kaybolmaz
        closeMenuTimeout = setTimeout(function () {
            item.classList.remove('open');
        }, 150);
    });
});

countryArea.addEventListener('mouseenter', function () {
    if (closeMenuTimeout) {
        clearTimeout(closeMenuTimeout);
        closeMenuTimeout = null;
    }
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

function getWeatherDetails(data) {
    const iconCode = data.weather && data.weather[0] ? data.weather[0].icon : '';
    const mainCondition = data.weather && data.weather[0] ? data.weather[0].main.toLowerCase() : '';
    const desc = data.weather && data.weather[0] ? data.weather[0].description : '';

    // Night detection via icon code ('n' suffix) or sunrise/sunset timestamps
    const isIconNight = iconCode.endsWith('n');
    const now = data.dt || Math.floor(Date.now() / 1000);
    const isSunNight = data.sys && (now < data.sys.sunrise || now > data.sys.sunset);
    const isNight = isIconNight || isSunNight;

    let emoji = isNight ? '🌙' : '☀️';
    let theme = isNight ? 'theme-night' : 'theme-day';
    let timeBadge = isNight ? '🌙 Night' : '☀️ Day';

    if (mainCondition.includes('clear')) {
        emoji = isNight ? '🌙' : '☀️';
        theme = isNight ? 'theme-night' : 'theme-sunny';
    } else if (mainCondition.includes('cloud')) {
        if (iconCode === '02d') {
            emoji = '🌤️';
            theme = 'theme-day';
        } else if (iconCode === '02n') {
            emoji = '☁️🌙';
            theme = 'theme-night';
        } else {
            emoji = isNight ? '☁️🌙' : '☁️';
            theme = isNight ? 'theme-night' : 'theme-cloudy';
        }
    } else if (mainCondition.includes('rain') || mainCondition.includes('drizzle')) {
        emoji = isNight ? '🌧️' : '🌦️';
        theme = 'theme-rain';
    } else if (mainCondition.includes('thunder')) {
        emoji = '⛈️';
        theme = 'theme-storm';
    } else if (mainCondition.includes('snow')) {
        emoji = '❄️';
        theme = 'theme-snow';
    } else if (mainCondition.includes('mist') || mainCondition.includes('fog') || mainCondition.includes('haze') || mainCondition.includes('smoke')) {
        emoji = '🌫️';
        theme = 'theme-fog';
    }

    return {
        emoji,
        theme,
        timeBadge,
        desc: desc || mainCondition || '--',
        isNight
    };
}

async function fetchWeather(cityName) {
    try {
        const response = await fetch(`/api/weather?city=${encodeURIComponent(cityName)}`);

        if (!response.ok) {
            console.error('Hava durumu alınamadı');
            return;
        }

        const data = await response.json();
        const details = getWeatherDetails(data);

        const cardElement = document.getElementById('weatherCard');
        const badgeElement = document.getElementById('dayNightBadge');
        const tempElement = document.getElementById('weatherTemp');
        const descElement = document.getElementById('weatherDesc');
        const emojiElement = document.getElementById('weatherEmoji');
        const feelsLikeEl = document.getElementById('feelsLike');
        const humidityEl = document.getElementById('humidity');
        const windSpeedEl = document.getElementById('windSpeed');
        const pressureEl = document.getElementById('pressure');

        // Apply theme classes
        if (cardElement) {
            cardElement.className = `weather-card ${details.theme}`;
        }
        document.body.dataset.theme = details.isNight ? 'night' : 'day';

        if (badgeElement) {
            badgeElement.textContent = details.timeBadge;
        }

        if (tempElement && data.main) {
            tempElement.textContent = Math.round(data.main.temp);
        }

        if (descElement) {
            descElement.textContent = details.desc;
        }

        if (emojiElement) {
            emojiElement.textContent = details.emoji;
            emojiElement.classList.remove('emoji-pop');
            void emojiElement.offsetWidth;
            emojiElement.classList.add('emoji-pop');
        }

        if (feelsLikeEl && data.main) {
            feelsLikeEl.textContent = `${Math.round(data.main.feels_like)}°C`;
        }

        if (humidityEl && data.main) {
            humidityEl.textContent = `${data.main.humidity}%`;
        }

        if (windSpeedEl && data.wind) {
            const speedKmh = Math.round(data.wind.speed * 3.6);
            windSpeedEl.textContent = `${speedKmh} km/h`;
        }

        if (pressureEl && data.main) {
            pressureEl.textContent = `${data.main.pressure} hPa`;
        }
    } catch (err) {
        console.error('Hava durumu isteğinde hata:', err);
    }
}

// Live Realtime Clock
function updateClock() {
    const clockEl = document.getElementById('liveClock');
    if (!clockEl) return;
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    clockEl.textContent = `${hours}:${minutes}:${seconds}`;
}
setInterval(updateClock, 1000);
updateClock();

// Quick search '/' shortcut
document.addEventListener('keydown', function (e) {
    if (e.key === '/' && document.activeElement !== searchInput) {
        e.preventDefault();
        searchInput.focus();
    }
});