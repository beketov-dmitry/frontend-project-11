import handlerProcessState from "./utils/handlerProcessState";
import handlerError from "./utils/handlerError";
import renderFeed from "./utils/renderFeed";
import renderPosts from "./utils/renderPosts";

export default (elements, initState, i18nextInstance) => (path, value, previousValue) => {
	switch (path){
		case "form.processState":
			handlerProcessState(value, elements, i18nextInstance);
			break;
		case "form.errorType":
			handlerError(value, elements, i18nextInstance);
			break;
		case "data.feeds":
			renderFeed(value, previousValue, elements);
			break;
		case "data.posts":
			renderPosts(value, previousValue, elements);
			break;
	}
}