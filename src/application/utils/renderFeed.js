const renderHeadAndUl = (elements) => {
	const card = document.createElement("div")
	const cardBody = document.createElement("div");
	const cardTitle = document.createElement("h2");
    const feedUl = document.createElement("ul");


	cardBody.classList.add("card-body");
	cardTitle.classList.add("card-title", "h4");
	cardTitle.innerHTML = "Фиды";
    feedUl.classList.add("list-group", "border-0", "rounded-0");
	card.classList.add("card", "border-0");

	cardBody.append(cardTitle);
	card.append(cardBody);
	card.append(feedUl);
	elements.main.feeds.append(card);
}

const makeNewFeed = ({title, description}) => {
	const newFeed = document.createElement("li");
	const feedTitle = document.createElement("h3");
    const feedDescrp = document.createElement("p");

	newFeed.classList.add("list-group-item", "border-0", "border-end-0");
	feedTitle.classList.add("h6", "m-0");
	feedTitle.innerHTML = title;
    feedDescrp.classList.add("m-0", "small", "text-black-50");
    feedDescrp.innerHTML = description;

    newFeed.append(feedTitle);
	newFeed.append(feedDescrp);

	return newFeed;
}

export default (value, previousValue, elements) => {
	if (previousValue.length === 0){
		renderHeadAndUl(elements);
	}

     const countOfFeeds = value.length;
	 const newFeedInf = value[countOfFeeds - 1];
	 const feedUl = elements.main.feeds.querySelector("ul");
	 const newFeed = makeNewFeed(newFeedInf);

	 feedUl.prepend(newFeed);
}