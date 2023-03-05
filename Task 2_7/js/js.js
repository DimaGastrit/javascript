
const cartBlock = document.querySelector('.card__main');
const region = document.querySelector('#regions');
const searchVal = document.querySelector('.search__search');
const darkMod = document.querySelector('.header__darkMod');
const addHtmlClass = () => {
	try {
		if (localStorage.getItem('theme') === 'dark') {
			document.body.classList.add('dark__body');
			document.querySelector('.container').classList.add('dark__cont');
			document.querySelector('.header__darkMod').textContent = "White Mod"
		}
		else {
			document.body.classList.remove('dark__body');
			document.querySelector('.container').classList.remove('dark__cont');
			document.querySelector('.header__darkMod').textContent = "Dark Mod"
		}
	}
	catch (err) { }
}
const showPreloader = () => (
	cartBlock.innerHTML = `
		<div class="card__loading">
			<img src="https://i.gifer.com/VAyR.gif" alt="Loading">
		</div>
	`
)
const dataFilter = (list) => {
	if (region.value.length === 0) {
		return list
	}
	else {
		const validCountri = list.filter(e => e.region === region.value)
		return validCountri;
	}
}
const dataSearch = (list) => {
	let val = searchVal.value.trim();
	if (val != '') {
		let validList = [];
		list.forEach(element => {
			if (element.name.common.toLowerCase().includes(val.toLowerCase())) {
				validList.push(element)
			}
		});
		return validList
	}
	return list

}
const creatCard = (countri) => {
	let validCountri = [];
	validCountri = dataFilter(dataSearch(countri))
	if (validCountri.length) {
		if (validCountri.length < 5) {
			cartBlock.classList.add('card__main_short')
		}
		cartBlock.innerHTML = '';
		validCountri.map((e) => {
			if (validCountri.length > 5) {
				cartBlock.classList.remove('card__main_short')
			}
			const container = document.createElement("div");
			container.className = ("card__container")
			const pic = document.createElement("div");
			pic.className = ("card__pic")
			const img = `<img src='${e.flags.svg}' alt="img">`
			pic.innerHTML = img
			const items = document.createElement("div");
			items.className = ("card__itams")
			const name = document.createElement("div");
			name.className = ("card__name")
			name.innerHTML = e.name.common;
			const region = document.createElement("div");
			region.className = ("card__region")
			region.innerHTML = `Region: ${e.region}`
			const capital = document.createElement("div");
			capital.className = ("card__capital")
			capital.innerHTML = `Capital: ${e.capital}`
			const population = document.createElement("div");
			population.className = ("card__popul")
			population.innerHTML = `Population: ${e.population}`
			items.appendChild(name)
			items.appendChild(population)
			items.appendChild(region)
			items.appendChild(capital)
			container.appendChild(pic)
			container.appendChild(items)
			cartBlock.appendChild(container)
		})
	}
	else {
		alert(" Поищи что-нибудь другое");
		showPreloader()
	}
}
const data = (async () => {
	showPreloader()
	const resp = await fetch('https://restcountries.com/v3.1/alpha?codes=068,008,344,032,804,744,703,678,616,558,484,392,372,276,246,218,192,152,124,108');
	const data = await resp.json();
	return data
})();
region.addEventListener('change', () => {
	data.then(creatCard)
});
searchVal.addEventListener("input", () => {
	data.then(creatCard)
});
darkMod.addEventListener('click', (event) => {
	event.preventDefault();
	if (localStorage.getItem('theme') === 'dark') {
		localStorage.removeItem('theme')
	}
	else {
		localStorage.setItem('theme', 'dark')
	}
	addHtmlClass();
})
data.then(creatCard)
addHtmlClass();












