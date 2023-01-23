import axios from "axios";
import parser from "./parser";


const updatePosts = (state) => {
	setTimeout(() => {
		const urls = state.data.urls;
		const promises = urls.map((url) => axios.get(`${state.BASE_URL}${encodeURIComponent(url.toString())}`));
		const promise = Promise.all(promises);
		promise.then((responses) => {
			responses.forEach(response => {
				const {feed, posts} = parser(response.data.contents);
				const oldPosts = state.data.posts;
				const newPosts = posts.filter(post => !oldPosts.find(item => item.title === post.title));
				state.data.posts.push(...newPosts);
				console.log(newPosts)
			})
		})
		return updatePosts(state);
	}, 5000)
}

export default updatePosts;