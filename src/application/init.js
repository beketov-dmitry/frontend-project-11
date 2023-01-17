import submit from "./submit"
import {isEmpty} from "lodash";
import * as yup from "yup";
import validate from "./validate";
import axios from "axios";

export default () => {
	const state = {
       form: {
		   valid: "true",
	       processState: 'filling',
	       processError: null,
	       errors: {},
	       field: {
			   link: null
	       },
		   urls: []
       }
	}

	const schema = yup.string().url("Ссылка должна быть валидным URL").notOneOf(state.form.urls, "RSS уже существует");

	const form = document.querySelector(".rss-form");
	const feedback = document.querySelector(".feedback ");
	form.addEventListener("submit", (e) => {
		e.preventDefault();

		const formData = new FormData(e.target);
		const url = new URL(formData.get("url"));
        const {errors, urls} = state.form;

		schema.validate(url)
			.then(() => fetch(url))
			.catch((e) => {
				errors["form"] = e.errors;
			})
			.then((data) => {
				urls.push(url);
			});

	})

	if(!isEmpty(state.form.errors)){
		feedback.classList.add("text-danger");
		feedback.innerHTML = state.form.errors.form;
	}
}