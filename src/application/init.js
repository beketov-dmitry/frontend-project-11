import {isEmpty} from "lodash";
import * as yup from "yup";
import validate from "./validate";
import axios from "axios";
import onChange from "on-change";
import {value} from "lodash/seq";
import {setLocale} from "yup";


export default () => {
	const initState = {
		urls: [],
        form: {
	       processState: 'filling',
	       errorType: null
        }
	}

	const elements = {
		header: {
			form: document.querySelector(".rss-form"),
			feedback:  document.querySelector(".feedback "),
			submit: document.querySelector(".btn"),
			urlInput: document.querySelector("#url-input")
		}
	}


	const errorMessages = {
		network: {
			error: 'Ресурс не содержит валидный RSS',
		},
		codeOfNetworkErr: "ERR_CODE"
	};

    const render = (elements, initialState) => (path, value) => {
        switch (path){
	        case "form.processState":
				handlerProcessState(value, elements);
				break;
	        case "form.errorType":
				handlerError(value, elements);
		        break;
        }
	}

	const handlerValidationError = (err) => {
		if (err.errors[0] === 'not_valid'){
			return 'Ссылка должна быть валидным URL';
		}
		return 'RSS уже существует'
	}

	const handlerError = (error, elements) => {
		switch (error.name){
			case 'ValidationError':
				elements.header.feedback.innerHTML = handlerValidationError(error);
				break;
			case 'AxiosError':
				elements.header.feedback.innerHTML = "Ошибка сети";
				break;
			case 'TypeError':
				elements.header.feedback.innerHTML = "Ресурс не содержит валидный RSS";
				break;
			default:
				elements.header.feedback.innerHTML = errorMessages.network.error;
		}
	}


	 const handlerProcessState = (value, elements) => {
		switch (value){
			case 'sending':
				elements.header.submit.disabled = true;
			    break;
			case 'success':
				elements.header.feedback.innerHTML = "RSS успешно загружен";
				elements.header.feedback.classList.add("text-success");
				elements.header.feedback.classList.remove("text-danger");
				elements.header.submit.disabled = false;
                elements.header.urlInput.innerHTML = "";
				form.reset();
				form.focus();
				break;
			case 'error':
				elements.header.feedback.classList.remove("text-success");
				elements.header.feedback.classList.add("text-danger");
				elements.header.submit.disabled = false;
		}
	}

	const state = onChange(initState, render(elements, initState));
	const {form} = elements.header;
	const posts = document.querySelector(".posts")
	const BASE_URL = `https://allorigins.hexlet.app/get?url=`;

	form.addEventListener("submit", (e) => {
		e.preventDefault();

		const formData = new FormData(e.target);
		const url = formData.get("url");
		const feeds = state.urls;

		const schema = yup.string("not_valid").required("not_valid").url("not_valid").notOneOf(feeds, "exist");


		schema.validate(url).then(() => {
			const modifyURL = BASE_URL + encodeURIComponent(url.toString());
			state.form.processState = "sending";
			return axios.get(modifyURL);
		}).then((response) => {
			console.log(response.data.contents.split("v"));
			state.form.processState = 'success'
			state.urls.push(url);
		}).catch((err) => {
			state.form.processState = "error";
			state.form.errorType = err;
			console.log(err.name);
		})
	})


}