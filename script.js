const citiesByCountry = {
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
    Turkey: ['Istanbul', 'Ankara', 'Izmir', 'Bursa', 'Adana','Antalya'],
};
const countryButtons = document.querySelectorAll('.country-btn');
const cityList = document.getElementById('cityList');
const searchResults = document.getElementById('searchResults');
const searchInput = document.getElementById('searchInput');

function clickCountryButton() {
    const clikkedButton = event.currentTarget;
    const country = clikkedButton.textContent;
    const cities = citiesByCountry[country];

    displayCities(cities);
}
countryButtons.forEach(function(button) {
    button.addEventListener('click', clickCountryButton);//addEventListener ile clickCountryButton fonksiyonunu çağırıyor
    console.log("Country button clicked");
});
function displayCities(cities){
    cityList.innerHTML = ''; // önceki şehirleri temizliyormuş
    cities.forEach(function(city){
        const cityButton = document.createElement('button');
        cityButton.textContent = city; //burası cityButton.textContent = city; //burası cityButton'un textContent'ini ayarlıyor
        cityList.appendChild(cityButton); //burası cityList.appendChild(cityButton); //burası cityList'e ekliyor
    });
}
searchInput.addEventListener('input', function(event){
    const searchText = event.target.value.toLowerCase();
    const matchingCities = [];
    searchResults.innerHTML = ''; // önceki arama sonuçlarını temizliyor
    for (const country in citiesByCountry){
        const cities = citiesByCountry[country];
        cities.forEach(function(city){
            if (city.toLowerCase().includes(searchText)){
                matchingCities.push(city);
            }
        });
    }
    displayCities(matchingCities);
});
