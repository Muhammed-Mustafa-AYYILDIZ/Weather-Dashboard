using Microsoft.AspNetCore.Mvc;

namespace WeatherDashboard.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WeatherController : ControllerBase
    {
        private readonly IConfiguration _config;

        public WeatherController(IConfiguration config)
        {
            _config = config;
        }

        [HttpGet]
        public async Task<IActionResult> GetWeather([FromQuery] string city)
        {
            if (string.IsNullOrEmpty(city))
            {
                return BadRequest("Şehir adı gerekli");
            }

            var apiKey = _config["WeatherSettings:ApiKey"];

            var url = $"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={apiKey}&units=metric&lang=tr";

            using var client = new HttpClient();

            var response = await client.GetAsync(url);

            if (!response.IsSuccessStatusCode)
            {
                return NotFound("Şehir bulunamadı");
            }

            var data = await response.Content.ReadAsStringAsync();

            return Ok(data);
        }
    }
}