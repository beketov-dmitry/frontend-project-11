const errorMessages = {
  network: {
    error: 'Ресурс не содержит валидный RSS',
  },
};

export default (error, elements, i18nextInstance) => {
  const { name, errors } = error;
  switch (name) {
    case 'ValidationError': {
      const [one] = errors;
      elements.header.feedback.textContent = one;
      break;
    }
    case 'AxiosError':
      elements.header.feedback.textContent = i18nextInstance.t('axiosErrorAnswer');
      break;
    case 'TypeError':
      elements.header.feedback.textContent = i18nextInstance.t('typeErrorAnswer');
      break;
    default:
      elements.header.feedback.textContent = errorMessages.network.error;
  }
};
