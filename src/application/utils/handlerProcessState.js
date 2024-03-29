export default (value, elements, i18nextInstance) => {
  switch (value) {
    case 'sending':
      elements.header.submit.disabled = true;
      break;
    case 'success':
      elements.header.feedback.textContent = i18nextInstance.t('successAnswer');
      elements.header.feedback.classList.add('text-success');
      elements.header.feedback.classList.remove('text-danger');
      elements.header.submit.disabled = false;
      elements.header.form.reset();
      elements.header.urlInput.focus();
      break;
    case 'error':
      elements.header.feedback.classList.remove('text-success');
      elements.header.feedback.classList.add('text-danger');
      elements.header.submit.disabled = false;
      break;
    default:
      break;
  }
};
