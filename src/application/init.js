import * as yup from "yup";
import axios from "axios";
import onChange from "on-change";
import render from "./render";
import {setLocale} from "yup";
import i18next from "i18next";


export default () => {
	const initState = {
		urls: [],
        form: {
	       processState: 'filling',
	       errorType: null
        }
	}
	const i18nextInstance = i18next.createInstance();
	i18nextInstance.init({
	 	lng: 'ru', // Текущий язык
	 	debug: true,
	 	resources: {
	 		ru: { // Тексты конкретного языка
	 			translation: { // Так называемый namespace по умолчанию
	 				validErrorAnswer: "Ссылка должна быть валидным URL",
	 				existErrorAnswer: "RSS уже существует",
	 				axiosErrorAnswer: "Ошибка сети",
	 				typeErrorAnswer: "Ресурс не содержит валидный RSS"
	 			},
	 		},
	 	},
	 });
	const elements = {
		header: {
			form: document.querySelector(".rss-form"),
			feedback:  document.querySelector(".feedback "),
			submit: document.querySelector(".btn"),
			urlInput: document.querySelector("#url-input")
		},
		main: {
			posts: document.querySelector(".posts")
		}
	}

	const state = onChange(initState, render(elements, initState, i18nextInstance));
	const {form} = elements.header;
	const BASE_URL = `https://allorigins.hexlet.app/get?url=`;

	form.addEventListener("submit", (e) => {
		e.preventDefault();

		const formData = new FormData(e.target);
		const url = formData.get("url");
		const feeds = state.urls;
		 setLocale({
		 	mixed: {
		 		notOneOf: i18nextInstance.t("existErrorAnswer")
		 	},
		 	string: {
		 		url: i18nextInstance.t("validErrorAnswer")
		 	}
		 });
		const schema = yup.string().required().url().notOneOf(feeds);

		schema.validate(url).then(() => {
			const modifyURL = `${BASE_URL}${encodeURIComponent(url.toString())}`;
			state.form.processState = "sending";
			return axios.get(modifyURL);
		}).then((response) => {
			console.log(response.data.contents.split(" "));
			state.form.processState = 'success'
			state.urls.push(url);
		}).catch((err) => {
			state.form.processState = "error";
			state.form.errorType = err;
			console.log(err.name);
			console.log(err.errors);
		})
	})


}