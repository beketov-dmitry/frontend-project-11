const errorMessages = {
	network: {
		error: 'Ресурс не содержит валидный RSS',
	},
};

export default (error, elements, i18nextInstance) => {
	switch (error.name){
		case 'ValidationError':
			elements.header.feedback.innerHTML = error.errors[0];
			break;
		case 'AxiosError':
			elements.header.feedback.innerHTML = i18nextInstance.t("axiosErrorAnswer");
			break;
		case 'TypeError':
			elements.header.feedback.innerHTML = i18nextInstance.t("typeErrorAnswer");
			break;
		default:
			elements.header.feedback.innerHTML = errorMessages.network.error;
	}
}

