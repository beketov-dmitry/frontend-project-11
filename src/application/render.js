import handlerProcessState from "./utils/handlerProcessState";
import handlerError from "./utils/handlerError";
import {rest} from "lodash";

export default (elements, initState, i18nextInstance) => (path, value, previousValue) => {
	switch (path){
		case "form.processState":
			handlerProcessState(value, elements, i18nextInstance);
			break;
		case "form.errorType":
			handlerError(value, elements, i18nextInstance);
			break;
		case "data.feeds":
			renderFeeds(value, previousValue, elements, initState);
			break;
		case "data.posts":
			//renderPosts(value, previousValue, elements, initState);
			console.log(value, previousValue);
			break;
	}
}