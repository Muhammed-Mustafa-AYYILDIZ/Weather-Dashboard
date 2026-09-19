export default {
    async fetch(request, env) {
        const url = new URL(request.url);

        // Eğer istek /api/weather ise hava durumu API proxy'si çalışır
        if (url.pathname === "/api/weather" || url.pathname.endsWith("/api/weather")) {
            const city = url.searchParams.get("city");

            if (!city) {
                return new Response(JSON.stringify({ error: "Şehir adı gerekli" }), {
                    status: 400,
                    headers: { 
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*"
                    }
                });
            }

            // Cloudflare Settings -> Variables altındaki OPENWEATHER_API_KEY
            const apiKey = env.OPENWEATHER_API_KEY;

            if (!apiKey) {
                return new Response(JSON.stringify({ error: "API anahtarı yapılandırılmamış" }), {
                    status: 500,
                    headers: { 
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*"
                    }
                });
            }

            const targetUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric&lang=tr`;

            try {
                const apiResponse = await fetch(targetUrl);
                const data = await apiResponse.text();

                return new Response(data, {
                    status: apiResponse.status,
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*"
                    }
                });
            } catch (err) {
                return new Response(JSON.stringify({ error: "Hava durumu servisine ulaşılamadı" }), {
                    status: 500,
                    headers: { 
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*"
                    }
                });
            }
        }

        // Diğer tüm istekler için statik assetleri (HTML, CSS, JS) getir
        if (env.ASSETS && typeof env.ASSETS.fetch === "function") {
            return env.ASSETS.fetch(request);
        }

        return fetch(request);
    }
};
