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

