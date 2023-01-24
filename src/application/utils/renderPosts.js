import renderHeadAndUl from "./renderHeadAndUl";


const makeNewPost = ({id, url, description, title}) => {
    const newPost = document.createElement("li");
    const postLink = document.createElement("a");
    const buttonToModal = document.createElement("button")

	newPost.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-start", "border-0", "border-end-0");
	postLink.href = url;
    postLink.classList.add("fw-bold");
	postLink.dataset.id = id;
	postLink.innerHTML = title;
	postLink.target = "_blank";
	postLink.rel = "noopener noreferrer";
	buttonToModal.classList.add("btn", "btn-outline-primary", "btn-sm");
	buttonToModal.innerHTML = "Просмотр";

	newPost.append(postLink, buttonToModal);

	return newPost;
}

export default (value, previousValue, elements) => {

	const countOfPrevious = previousValue.length;

	if(countOfPrevious === 0){
		renderHeadAndUl(elements.main.posts, "Посты");
	}
	const newPosts = value.slice(countOfPrevious);

	const postUl = elements.main.posts.querySelector("ul");

    newPosts.forEach((postInf) => {
		const newPost = makeNewPost(postInf);
		postUl.prepend(newPost);
    })
}