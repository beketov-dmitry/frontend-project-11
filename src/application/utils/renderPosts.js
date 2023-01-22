const renderHeadAndUl = (elements) => {
	const card = document.createElement("div")
	const cardBody = document.createElement("div");
	const cardTitle = document.createElement("h2");
	const feedUl = document.createElement("ul");

	cardBody.classList.add("card-body");
	cardTitle.classList.add("card-title", "h4");
	cardTitle.innerHTML = "Посты";
	feedUl.classList.add("list-group", "border-0", "rounded-0");
	card.classList.add("card", "border-0");

	cardBody.append(cardTitle);
	card.append(cardBody);
	card.append(feedUl);
	elements.main.posts.append(card);
}

const makeNewPost = ({id, url, description, title}) => {
    const newPost = document.createElement("li");
    const postLink = document.createElement("a");
    const buttonToModal = document.createElement("button")

	newPost.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-start", "border-0", "border-end-0");
	postLink.href = url;
    postLink.classList.add("fw-normal", "link-secondary");
	postLink.dataset.id = id;
	postLink.innerHTML = title;
	buttonToModal.classList.add("btn", "btn-outline-primary", "btn-sm");
	buttonToModal.innerHTML = "Просмотр";

	newPost.append(postLink, buttonToModal);

	return newPost;
}



export default (value, previousValue, elements) => {

	const countOfAll = value.length;
	const countOfPrevious = previousValue.length;

	if(countOfPrevious === 0){
		renderHeadAndUl(elements);
	}
	const countOfNew = countOfAll - countOfPrevious;
	const newPosts = value.slice(countOfPrevious);

	const postUl = elements.main.posts.querySelector("ul");

    newPosts.forEach((postInf) => {
		const newPost = makeNewPost(postInf);
		postUl.prepend(newPost);
    })
}