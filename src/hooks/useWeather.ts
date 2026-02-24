import { useState, useEffect } from "react";

interface WeatherData {
	temp: number;
	tempMin: number;
	tempMax: number;
	description: string;
	main: string; // e.g., "Clear", "Clouds", "Rain"
}

interface WeatherState {
	data: WeatherData | null;
	loading: boolean;
	error: string | null;
}

function getWeatherCacheKey(lang: string) {
	return `weather_data_${lang}`;
}
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutos

export function useWeather(
	city: string = "Quixadá",
	country: string = "BR",
	lang: string = "pt_br",
) {
	const [weather, setWeather] = useState<WeatherState>({
		data: null,
		loading: true,
		error: null,
	});

	useEffect(() => {
		const fetchWeather = async () => {
			const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

			console.log(
				"Weather API Key:",
				apiKey ? "Configurada" : "Não configurada",
			);

			if (!apiKey) {
				setWeather({
					data: null,
					loading: false,
					error: "API key não configurada",
				});
				return;
			}

			// Verificar cache
			try {
				const cacheKey = getWeatherCacheKey(lang);
				const cached = localStorage.getItem(cacheKey);
				if (cached) {
					const { data, timestamp } = JSON.parse(cached);
					if (Date.now() - timestamp < CACHE_DURATION) {
						setWeather({ data, loading: false, error: null });
						return;
					}
				}
			} catch {
				// Ignora erro de cache
			}

			// Buscar dados da API
			try {
				const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&lang=${lang}&appid=${apiKey}`;
				console.log("Fetching weather for:", city, country);

				const response = await fetch(url);

				if (!response.ok) {
					const errorData = await response.json();
					console.error("Weather API Error:", errorData);
					throw new Error(
						`Erro ao buscar dados do clima: ${errorData.message || response.statusText}`,
					);
				}

				const data = await response.json();
				console.log("Weather data received:", data);

				const weatherData: WeatherData = {
					temp: Math.round(data.main.temp),
					tempMin: Math.round(data.main.temp_min),
					tempMax: Math.round(data.main.temp_max),
					description: data.weather[0].description,
					main: data.weather[0].main,
				};

				// Salvar no cache
				try {
					const cacheKey = getWeatherCacheKey(lang);
					localStorage.setItem(
						cacheKey,
						JSON.stringify({
							data: weatherData,
							timestamp: Date.now(),
						}),
					);
				} catch {
					// Ignora erro de localStorage
				}

				setWeather({ data: weatherData, loading: false, error: null });
			} catch (error) {
				console.error("Weather fetch error:", error);
				setWeather({
					data: null,
					loading: false,
					error:
						error instanceof Error
							? error.message
							: "Erro desconhecido",
				});
			}
		};

		fetchWeather();
	}, [city, country, lang]);

	return weather;
}
