import * as yup from 'yup';
import _ from "lodash"
import axios from "axios";


const errorMessages = {
	network: {
		error: 'Ошибка сети',
	},
};


const validate = (url, state) => {
	const schema = yup.string().url("Ссылка должна быть валидным URL").notOneOf(state.form.urls, "RSS уже существует");
	return schema.validate(url)
		.then(() =>  axios.get(url))
		.catch((e) => {
			throw e;
		});
}

export default validate;