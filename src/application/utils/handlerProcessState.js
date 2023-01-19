export default (value, elements) => {
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
			elements.header.form.reset();
			elements.header.form.focus();
			break;
		case 'error':
			elements.header.feedback.classList.remove("text-success");
			elements.header.feedback.classList.add("text-danger");
			elements.header.submit.disabled = false;
	}
}