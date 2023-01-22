import * as yup from "yup";
import axios from "axios";
import onChange from "on-change";
import render from "./render";
import {setLocale} from "yup";
import i18next from "i18next";
import parser from "./utils/parser";
import {uniqueId} from "lodash";


export default () => {
	const initState = {
		data: {
			feeds: [],
			posts: [],
			urls: [],
		},
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
	 				typeErrorAnswer: "Ресурс не содержит валидный RSS",
				    successAnswer: "RSS спешно загружен"
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
			posts: document.querySelector(".posts"),
			feeds: document.querySelector(".feeds")
		}
	}

	const state = onChange(initState, render(elements, initState, i18nextInstance));
	const {form} = elements.header;
	const BASE_URL = `https://allorigins.hexlet.app/get?url=`;

	form.addEventListener("submit", (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const url = formData.get("url");
		const urls = state.data.urls;
		 setLocale({
		 	mixed: {
		 		notOneOf: i18nextInstance.t("existErrorAnswer")
		 	},
		 	string: {
		 		url: i18nextInstance.t("validErrorAnswer")
		 	}
		 });
		const schema = yup.string().required().url().notOneOf(urls);

		schema.validate(url).then(() => {
			const modifyURL = `${BASE_URL}${encodeURIComponent(url.toString())}`;
			state.form.processState = "sending";
			return axios.get(modifyURL);
		}).then((response) => {
			const postId = uniqueId();
			state.form.processState = 'success'
			const {feed, posts} = parser(url, response.data.contents, postId);
			state.data.feeds.push(feed);
			state.data.posts = [...state.data.posts, ...posts];
			state.data.urls.push(url);
			//console.log(response.data.contents, Array.from(state.data.feeds), Array.from(state.data.posts));
		}).catch((err) => {
			state.form.processState = "error";
			state.form.errorType = err;
		})
	})


}