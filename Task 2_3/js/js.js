const tabsBtn = document.querySelectorAll(".tabs__btn");

tabsBtn.forEach(function (item) {
	const handleTabClick = () => {
		const currentBtn = item;
		const tabId = currentBtn.getAttribute("data-tab");
		const nav = document.querySelector('.page__items');

		const lengthSort = () => {
			const nav = Array.from(document.querySelectorAll('.page__cart'));
			nav.sort((a, b) =>
				b.querySelector('.cart__item_title').innerHTML.length - a.querySelector('.cart__item_title').innerHTML.length);
			for (i = 0; i < nav.length; ++i) {
				document.querySelector('.page__items').appendChild(nav[i]);
			}
		}
		const insertionSort = (nav) => {
			for (let i = 1, l = nav.children.length; i < l; i++) {
				const current = +nav.children[i].getAttribute('data-price');
				let j = i;
				insertAfter = (elem, refElem) => {
					let parentDiv = refElem.parentNode;
					return parentDiv.insertBefore(elem, refElem);
				}
				while (j > 0 && +nav.children[j - 1].getAttribute('data-price') > current) {
					replacedNode = nav.replaceChild(nav.children[j - 1], nav.children[j]);
					insertAfter(replacedNode, nav.children[j - 1]);
					j--;
				}
				nav.children[j] = current;
			}
		}
		const weightSort = () => {
			const nav = Array.from(document.querySelectorAll('.page__cart'))
			nav.sort((a, b) => b.querySelector('span').innerHTML - a.querySelector('span').innerHTML);
			for (i = 0; i < nav.length; ++i) {
				document.querySelector('.page__items').appendChild(nav[i]);
			}
		}
		const bubbleSort = (nav) => {
			for (let i = 0, endI = nav.children.length - 1; i < endI; i++) {
				const insertAfter = (elem, refElem) => {
					let parentDiv = refElem.parentNode;
					return parentDiv.insertBefore(elem, refElem.nextSibling);
				}
				for (let j = 0, endJ = endI - i; j < endJ; j++) {
					if (+nav.children[j].getAttribute('data-rew') < +nav.children[j + 1].getAttribute('data-rew')) {
						replacedNode = nav.replaceChild(nav.children[j + 1], nav.children[j]);
						insertAfter(replacedNode, nav.children[j]);

					}
				}
			}
		}

		if (tabId === 'length') {
			lengthSort();
		}
		if (tabId === 'review') {
			bubbleSort(nav);
		}
		if (tabId === 'price') {
			insertionSort(nav);
		}
		if (tabId === 'weight') {
			weightSort();
		}
		tabsBtn.forEach(function (tabsBtn) {
			tabsBtn.classList.remove('tabs__btn_active');
			currentBtn.classList.add('tabs__btn_active');
		})
	}
	item.addEventListener("click", handleTabClick);
})


