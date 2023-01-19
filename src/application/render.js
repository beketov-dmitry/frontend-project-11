import handlerProcessState from "./utils/handlerProcessState";
import handlerError from "./utils/handlerError";

export default (elements, i18nextInstance) => (path, value) => {
	switch (path){
		case "form.processState":
			handlerProcessState(value, elements, i18nextInstance);
			break;
		case "form.errorType":
			handlerError(value, elements, i18nextInstance);
			break;
	}
}