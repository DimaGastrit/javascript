function onPageLoaded() {
	const input = document.querySelector("input[type='text']");
	const ul = document.querySelector(".todos");
	const btn = document.querySelector(".addBtn");
	const clearButton = document.querySelector(".clear");

	const createTodo = () => {
		const li = document.createElement("li");
		const textSpan = document.createElement("span");
		textSpan.classList.add("todo-text");
		const newTodo = input.value;
		if (newTodo === "") {
			alert("You must write something!");
			return
		}
		else { textSpan.append(newTodo); }

		const deleteBtn = document.createElement("span");
		deleteBtn.classList.add("todo-trash");
		const icon = document.createElement("i");
		icon.classList.add("fas", "fa-trash-alt");
		deleteBtn.appendChild(icon);
		ul.appendChild(li).append(textSpan, deleteBtn);
		input.value = "";
		listenDeleteTodo(deleteBtn);
		localStorage.setItem("todos", ul.innerHTML);

	}
	const listenDeleteTodo = (element) => {
		element.addEventListener("click", (event) => {
			element.parentElement.remove();
			event.stopPropagation();
		});
	}
	const onClickTodo = (event) => {
		if (event.target.tagName === "LI") {
			event.target.classList.toggle("checked");
		}
	}
	const loadTodos = () => {
		const data = localStorage.getItem("todos");
		if (data) {
			ul.innerHTML = data;
		}
		const deleteButtons = document.querySelectorAll("span.todo-trash");
		for (const button of deleteButtons) {
			listenDeleteTodo(button);
		}
	}
	btn.addEventListener("click", createTodo);
	ul.addEventListener("click", onClickTodo);
	input.addEventListener("keypress", (keyPressed) => {
		const keyEnter = 13;
		if (keyPressed.which == keyEnter) {
			createTodo();
		}
	});
	clearButton.addEventListener("click", () => {
		ul.innerHTML = "";
		localStorage.removeItem('todos', ul.innerHTML);
	});
	loadTodos();
}
document.addEventListener("DOMContentLoaded", onPageLoaded);