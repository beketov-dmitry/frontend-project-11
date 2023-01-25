import * as yup from 'yup';
import axios from 'axios';
import onChange from 'on-change';
import { setLocale } from 'yup';
import i18next from 'i18next';
import { uniqueId } from 'lodash';
import parser from './utils/parser';
import render from './render';
import updatePosts from './utils/updatePosts';
import ru from './utils/locales/ru';

export default () => {
  const initState = {
    data: {
      feeds: [],
      posts: [],
      readPosts: [],
      urls: [],
    },
    form: {
      processState: 'filling',
      errorType: null,
    },
    BASE_URL: 'https://allorigins.hexlet.app/get?url=',
  };
  const i18nextInstance = i18next.createInstance();

  i18nextInstance.init({
    lng: 'ru',
    debug: true,
    resources: ru,
  });
  const elements = {
    body: document.querySelector('body'),
    modal: document.querySelector('.modal'),
    header: {
      form: document.querySelector('.rss-form'),
      feedback: document.querySelector('.feedback '),
      submit: document.querySelector('.btn'),
      urlInput: document.querySelector('#url-input'),
    },
    main: {
      posts: document.querySelector('.posts'),
      feeds: document.querySelector('.feeds'),
    },
  };

  const state = onChange(initState, render(elements, initState, i18nextInstance));
  const { form } = elements.header;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const url = formData.get('url');
    const { urls } = state.data;
    setLocale({
      mixed: {
        notOneOf: i18nextInstance.t('existErrorAnswer'),
      },
      string: {
        url: i18nextInstance.t('validErrorAnswer'),
      },
    });
    const schema = yup.string().required().url().notOneOf(urls);

    schema.validate(url).then(() => {
      const modifyURL = `${state.BASE_URL}${encodeURIComponent(url.toString())}`;
      state.form.processState = 'sending';
      return axios.get(modifyURL);
    }).then((response) => {
      const postId = uniqueId();
      state.form.processState = 'success';
      const { feed, posts } = parser(response.data.contents, postId);
      state.data.feeds.push(feed);
      state.data.posts = [...state.data.posts, ...posts];
      state.data.urls.push(url);
      if (state.data.urls.length === 1) {
        updatePosts(state);
      }
    }).catch((err) => {
      state.form.processState = 'error';
      state.form.errorType = err;
    });
  });
};
