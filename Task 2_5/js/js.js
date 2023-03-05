const weatherBlock = document.querySelector('#weather');

const initialCity = document.getElementById('input').value;

const showPreloader = () => (
	weatherBlock.innerHTML = `
		<div class="weather__loading">
			<img src="https://i.gifer.com/VAyR.gif" alt="Loading">
		</div>
	`
)
document.getElementById('input').addEventListener('change', (e) => {
	loadWeather(e.currentTarget.value);
});

const loadWeather = async (selectedCity) => {
	showPreloader();
	const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${selectedCity}&units=metric&appid=cd825d5ea3dbc725678d0fd479cb45f2`;
	const response = await fetch(forecastURL, {
		method: 'GET',
	});
	const responseResult = await response.json();

	if (response.ok) {
		getWeather(responseResult);
	} else {
		weatherBlock.innerHTML = responseResult.massage;
	}
}
const getWeather = (data) => {
	console.log(data);
	const getСurrentDay = (count) => {

		const days = ["SAN", "MON", "TUE", "WEN", "THU", "FRI", "SAT"];
		const now = new Date();
		const numbofDay = now.getDay();
		if (numbofDay + count > 6) {
			return (days[count - 1]);
		}
		return (days[numbofDay + count]);
	}
	const temp = (counter) => Math.round(data.list[0 + counter].main.temp);
	const feelsLike = (counter) => Math.round(data.list[0 + counter].main.feels_like);
	const wather = (counter) => data.list[0 + counter].weather[0].main;
	const name = data.city.name;
	const pict = (counter) => data.list[0 + counter].weather[0].icon;
	const selectedDay = (counter) => {
		const today = new Date();
		let addDay = (today.setDate(today.getDate() + counter))
		let nextDay = new Date(addDay)
		return ((nextDay.toISOString()).slice(0, 10));
	}
	const selectedValidDay = (counter) => {
		const days = selectedDay(counter)
		let validDay = [];
		const list = Array.from(data.list)
		list.forEach(element => {
			if ((element.dt_txt).slice(0, 10) === days) {
				validDay.push(element)
			}
		})
		return validDay;
	}
	const maxTemp = (counter) => {
		let validList = selectedValidDay(counter);
		let maxTemp = validList[0].main.temp_max
		validList.forEach(element => {
			if (maxTemp < element.main.temp_max) {
				maxTemp = element.main.temp_max;
			}
		})
		return Math.ceil(maxTemp);
	}
	const minTemp = (counter) => {
		let validList = selectedValidDay(counter);
		let minTemp = validList[0].main.temp_min
		validList.forEach(element => {
			if (minTemp > element.main.temp_mix) {
				minTemp = element.main.temp_mix;
			}
		})
		return Math.floor(minTemp);

	}
	const timpleit = `
	<div class="weather__main">
				<div class="weather__header header">
					<div class="header__colum">
						<div class="header__temp">${temp(0)}℃
						</div>
						<div class="header__feelsLake">Feels Lake ${feelsLike(0)}℃
						</div>
					</div>
					<div class="header__colum">
						<div class="header__condition">${wather(0)}</div>
						<div class="header__lokation">${name}</div>
					</div>
					<div class="header__pic">
						<img src="https://openweathermap.org/img/w/${pict(0)}.png" alt="cloud">
					</div>
				</div>
				<div class="weather__column">
					<div class="weather__row">
						<div class="weather__day">${getСurrentDay(1)}</div>
						<div class="weather__pic">
							<img src="https://openweathermap.org/img/w/${pict(8)}.png" alt="cloud">
						</div>
						<div class="weather__condition">${wather(8)}</div>
						<div class="weather__temp">
							<div class="weather__temp__hi ">${maxTemp(1)}℃</div>
							<div class=" weather__temp__low">${minTemp(1)}℃</div>
						</div>
					</div>
					<div class="weather__row">
						<div class="weather__day">${getСurrentDay(2)}</div>
						<div class="weather__pic">
							<img src="https://openweathermap.org/img/w/${pict(16)}.png" alt="cloud">
						</div>
						<div class="weather__condition">${wather(16)}</div>
						<div class="weather__temp">
							<div class="weather__temp__hi ">${maxTemp(2)}℃</div>
							<div class=" weather__temp__low">${minTemp(2)}℃</div>
						</div>
					</div>
					<div class="weather__row">
						<div class="weather__day">${getСurrentDay(3)}</div>
						<div class="weather__pic">
							<img src="https://openweathermap.org/img/w/${pict(24)}.png" alt="cloud">
						</div>
						<div class="weather__condition">${wather(24)}</div>
						<div class="weather__temp">
							<div class="weather__temp__hi ">${maxTemp(3)}℃</div>
							<div class=" weather__temp__low">${minTemp(3)}℃</div>
						</div>
					</div>
					<div class="weather__row">
						<div class="weather__day">${getСurrentDay(4)}</div>
						<div class="weather__pic">
							<img src="https://openweathermap.org/img/w/${pict(32)}.png" alt="cloud">
						</div>
						<div class="weather__condition">${wather(32)}</div>
						<div class="weather__temp">
							<div class="weather__temp__hi ">${maxTemp(4)}℃</div>
							<div class=" weather__temp__low">${minTemp(4)}℃</div>
						</div>
					</div>
					<div class="weather__row">
						<div class="weather__day">${getСurrentDay(5)}</div>
						<div class="weather__pic">
							<img src="https://openweathermap.org/img/w/${pict(39)}.png" alt="cloud">
						</div>
						<div class="weather__condition">${wather(39)}</div>
						<div class="weather__temp">
							<div class="weather__temp__hi ">${maxTemp(5)}℃</div>
							<div class=" weather__temp__low">${minTemp(5)}℃</div>
						</div>
					</div>
				</div>
			</div>`
	weatherBlock.innerHTML = timpleit;
}
if (weatherBlock) {
	loadWeather(initialCity);
}
