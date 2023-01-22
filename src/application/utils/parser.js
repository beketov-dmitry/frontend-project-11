import {uniqueId} from "lodash";

export default (feedUrl, stringContainingHTMLSource, postId) => {
	 if (!stringContainingHTMLSource){
	 	throw TypeError;
     }
	const parser = new DOMParser();
	const doc = parser.parseFromString(stringContainingHTMLSource, "text/html");
	const feedTitle = doc.querySelector("title").textContent;
	const feedDescription = doc.querySelector("description").textContent;
	const feedPosts = Array.from(doc.querySelectorAll("item"));
	const posts = feedPosts.map((post) => {
		const title = post.querySelector("title").textContent;
		const url = post.querySelector("link").textContent;
		const description = post.querySelector("description").textContent;
		return {
			id: uniqueId(),
			postId,
			url,
			title,
			description
		}
	})
	return {
		feed: {
			url: feedUrl,
			title: feedTitle,
			description: feedDescription,
			id: postId
		},
		posts
	}
}

// <title>Фильтрация значений и подготовка данных для анализа / Python: Pandas</title>
// <guid isPermaLink="false">3378</guid>
// <link>https://ru.hexlet.io/courses/python-pandas/lessons/prepare-data/theory_unit</link>
// <description>Цель: Познакомиться с инструментами Pandas для подготовки и первичного анализа данных</description>
// <pubDate>Mon, 16 Jan 2023 10:05:04 +0000</pubDate>
//const post = {
// 	url: "",
// 	title: "",
// 	description: ""
// }
// const feed = {
// 	url: "",
// 	title: "",
// 	description: "",
// 	posts: []
// }