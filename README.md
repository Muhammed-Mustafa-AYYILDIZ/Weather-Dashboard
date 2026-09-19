# ✦ ATMOS — Weather Intelligence Dashboard

<p align="center">
  <img src="https://img.shields.io/badge/.NET-9.0-512BD4?style=for-the-badge&logo=dotnet&logoColor=white" alt=".NET 9" />
  <img src="https://img.shields.io/badge/ASP.NET_Core-Web_API-512BD4?style=for-the-badge&logo=dotnet&logoColor=white" alt="ASP.NET Core" />
  <img src="https://img.shields.io/badge/Cloudflare_Workers-F38020?style=for-the-badge&logo=cloudflare&logoColor=white" alt="Cloudflare" />
  <img src="https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
  <img src="https://img.shields.io/badge/CSS3-Modern_Bento-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
  <img src="https://img.shields.io/badge/OpenWeather-API-EB6E4B?style=for-the-badge&logo=openweathermap&logoColor=white" alt="OpenWeather" />
</p>

<p align="center">
  A sleek, high-precision weather dashboard built with <b>ASP.NET Core (.NET 9)</b>, <b>Cloudflare Serverless</b> and modern frontend design principles. Features an editorial <b>Bento Grid</b> layout, dynamic celestial night/day modes, realtime telemetry metrics, and zero-friction navigation.
</p>

<p align="center">
  <a href="https://weather-dashboard.muhammedmustafaayyildiz.workers.dev" target="_blank">
    <img src="https://img.shields.io/badge/🚀_LIVE_DEMO-TIKLA_VE_CANLI_DENE-00C853?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Live Demo" height="42" />
  </a>
</p>

<p align="center">
  👉 <b>Canlı Sürüm:</b> <a href="https://weather-dashboard.muhammedmustafaayyildiz.workers.dev"><b>weather-dashboard.muhammedmustafaayyildiz.workers.dev</b></a>
</p>

---

## 🌟 Key Features

- 🌙 **Smart Day/Night Celestial Mode:** Automatically analyzes solar cycles (sunrise/sunset timestamps) and OpenWeather icon codes to display moon phases (`🌙`, `☁️🌙`) during nighttime and sun/cloud variations during daytime.
- 🎨 **Editorial Bento Grid Design:** Modern, human-crafted UI breaking away from generic templates — powered by **Space Grotesk** (headlines), **Plus Jakarta Sans** (interface), and **JetBrains Mono** (telemetry figures).
- ⚡ **Live Meteorological Telemetry:** Real-time metrics presented as clean telemetry chips:
  - **Feels Like (°C):** Perceived heat index.
  - **Humidity (%):** Relative moisture level.
  - **Wind Velocity (km/h):** Surface airflow speed.
  - **Barometric Pressure (hPa):** Atmospheric pressure.
- 🌐 **Seamless Multi-Country Explorer:** Multi-level dropdown featuring Turkey, USA, Germany, France, UK, Japan, Italy, Spain, Brazil, and Australia with a custom hover-bridge algorithm that guarantees smooth cursor transitions without menu clipping.
- ⚡ **Instant Search & Keyboard Shortcut:** Quick search filter with country flag tags and keyboard quick-focus shortcut (`/`).
- 🕒 **Live Station Clock:** Real-time second-by-second digital clock indicator.
- ★ **Pinned Destinations:** Bookmark favorite cities with instant one-click switching.
- 🛡️ **Secure Backend Proxy:** API requests are routed securely through ASP.NET Core controllers, protecting private API credentials from client exposure.

---

## 🛠️ Tech Stack

- **Backend:** C# / .NET 9.0 (ASP.NET Core Web API)
- **Frontend:** Vanilla JavaScript (ES6+ Async/Await, DOM manipulation)
- **Styling:** Vanilla CSS (CSS Grid, Flexbox, Glassmorphism `backdrop-filter`, Custom Properties)
- **Typography:** Google Fonts (*Space Grotesk*, *Plus Jakarta Sans*, *JetBrains Mono*)
- **Data Source:** [OpenWeatherMap Current Weather Data API](https://openweathermap.org/current)

---

## 📁 Project Structure

```text
WeatherDashboard/
├── Controllers/
│   └── WeatherController.cs      # Backend proxy controller for OpenWeather API
├── Properties/
│   └── launchSettings.json       # Local server and port configurations
├── wwwroot/
│   ├── css/
│   │   └── style.css             # Bento design system, animations & atmospheric themes
│   ├── js/
│   │   └── script.js             # Data binding, day/night logic & event listeners
│   └── index.html                # Semantic HTML5 application structure
├── appsettings.json              # Local configuration & API key (Git-ignored)
├── Program.cs                    # Web application entry point & middleware setup
├── WeatherDashboard.csproj       # .NET 9 project manifest
└── README.md                     # Documentation
```

---

## 🚀 Quick Access (Hemen Dene)

Herhangi bir kurulum yapmadan doğrudan tarayıcınızdan deneyebilirsiniz:
👉 **[weather-dashboard.muhammedmustafaayyildiz.workers.dev](https://weather-dashboard.muhammedmustafaayyildiz.workers.dev)**

---

## 💻 Local Development (Geliştiriciler İçin)

Projeyi kendi bilgisayarınızda (.NET 9 ile) çalıştırmak isterseniz:

### Prerequisites

- [.NET 9.0 SDK](https://dotnet.microsoft.com/download/dotnet/9.0) installed on your machine.
- A free API key from [OpenWeatherMap](https://home.openweathermap.org/api_keys).

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Muhammed-Mustafa-AYYILDIZ/Weather-Dashboard.git
   cd Weather-Dashboard/WeatherDashboard
   ```

2. **Configure your API Key:**
   Create an `appsettings.json` file inside the `WeatherDashboard` project folder:
   ```json
   {
     "Logging": {
       "LogLevel": {
         "Default": "Information",
         "Microsoft.AspNetCore": "Warning"
       }
     },
     "AllowedHosts": "*",
     "WeatherSettings": {
       "ApiKey": "YOUR_OPENWEATHERMAP_API_KEY_HERE"
     }
   }
   ```

3. **Run the project:**
   ```bash
   dotnet run
   ```

4. **Launch the application:**
   Open your browser and navigate to:
   ```text
   http://localhost:5121
   ```
   *(or `https://localhost:7047`)*

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
| :---: | :--- |
| <kbd>/</kbd> | Instantly focus the city search input from anywhere on the page |

---

## 👤 Author

- **Muhammed Mustafa Ayyıldız** — [@Muhammed-Mustafa-AYYILDIZ](https://github.com/Muhammed-Mustafa-AYYILDIZ)

---

## 📄 License

This project is licensed under the MIT License. Feel free to use and customize it!

