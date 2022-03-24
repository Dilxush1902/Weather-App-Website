import axios from "axios";
const key = "c26477967c649c6b52fa90c441698f96";
const url ="https://api.openweathermap.org/data/2.5/weather";
export const fetchWeather = async (query) => {
	const { data } = await axios.get(url ,{
		params: {
			q: query,
			units: 'metric',
			APPID: key,
		}
	})

	return data;
}