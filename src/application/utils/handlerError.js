const errorMessages = {
  network: {
    error: 'Ресурс не содержит валидный RSS',
  },
};

export default (error, elements, i18nextInstance) => {
  const { name, errors } = error;
  const [one] = errors;
  switch (name) {
    case 'ValidationError':
      elements.header.feedback.innerHTML = one;
      break;
    case 'AxiosError':
      elements.header.feedback.innerHTML = i18nextInstance.t('axiosErrorAnswer');
      break;
    case 'TypeError':
      elements.header.feedback.innerHTML = i18nextInstance.t('typeErrorAnswer');
      break;
    default:
      elements.header.feedback.innerHTML = errorMessages.network.error;
  }
};
