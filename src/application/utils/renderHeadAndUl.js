export default (insertArea, textForTitle) => {
  const card = document.createElement('div');
  const cardBody = document.createElement('div');
  const cardTitle = document.createElement('h2');
  const feedUl = document.createElement('ul');

  cardBody.classList.add('card-body');
  cardTitle.classList.add('card-title', 'h4');
  cardTitle.innerHTML = textForTitle;
  feedUl.classList.add('list-group', 'border-0', 'rounded-0');
  card.classList.add('card', 'border-0');

  cardBody.append(cardTitle);
  card.append(cardBody);
  card.append(feedUl);
  insertArea.append(card);
};
