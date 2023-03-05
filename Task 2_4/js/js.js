
class Validator {
	constructor(form, fields,) {
		this.form = form;
		this.fields = fields;
	}
	validateForm = () => {
		this.removeError()
		this.checkName()
		this.checkEmail()
		this.passwordCheck()
	}
	checkName = () => {
		const str = this.getFieldValue('userFirstName');
		const сheckSpaces = () => str.value.trim();
		if (сheckSpaces().length === "" || сheckSpaces().length < 3) {
			let error = this.generatError('Name is wrong');
			str.parentElement.insertBefore(error, str);
			return
		}
	}
	checkEmail = () => {
		let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
		const email = this.getFieldValue('userEmail');
		if (!email.value.match(pattern)) {
			const error = this.generatError('Email is wrong');
			email.parentElement.insertBefore(error, email);
		}
	}
	passwordCheck = () => {
		const pass = this.getFieldValue('userPassword');
		const passCon = this.getFieldValue('passwordСonfir');

		const isPasswordInvalid = !pass.value ||
			pass.value.length < 6 ||
			pass.value !== passCon.value;
		let error;

		if (!pass.value) {
			error = this.generatError('Enter password');
		}
		if (pass.value.length < 6) {
			error = this.generatError('Too short');
		}

		if (pass.value !== passCon.value) {
			error = this.generatError('Passwords are different');
		}

		if (isPasswordInvalid) {
			pass.parentElement.insertBefore(error, pass);
		}
	}
	removeError = () => {
		let errors = Array.from(this.form.querySelectorAll('.error'))
		let removeErrors = errors.map(element => element.remove())
	}
	generatError = (text) => {
		let error = document.createElement('div');
		error.className = 'error'
		error.style.color = 'red'
		error.innerHTML = text
		return error
	}
	getFieldValue = (fieldName) => {
		return [...this.fields].find(field => field.name === fieldName);
	}
}
const form = document.querySelector('.form');
form.addEventListener('submit', (event) => {
	event.preventDefault();
	fields = form.querySelectorAll('.imField')
	const valid = new Validator(form, fields)
	valid.validateForm();
});
