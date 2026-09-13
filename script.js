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

const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

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
        matchingCities.push(city);
      }
    });
  }

  if (matchingCities.length === 0) return;

  matchingCities.slice(0, 6).forEach(function (city) {
    const listItem = document.createElement('li');
    listItem.textContent = city;

    listItem.addEventListener('click', function () {
      searchInput.value = city;
      searchResults.innerHTML = '';
      searchResults.classList.remove('active');
    });

    searchResults.appendChild(listItem);
  });

  searchResults.classList.add('active');
}

searchInput.addEventListener('input', showSuggestions);

document.addEventListener('click', function (event) {
  if (!event.target.closest('.search-panel')) {
    searchResults.classList.remove('active');
    searchResults.innerHTML = '';
  }
});
