import renderHeadAndUl from './renderHeadAndUl';

const makeNewFeed = ({ title, description }) => {
  const newFeed = document.createElement('li');
  const feedTitle = document.createElement('h3');
  const feedDescrp = document.createElement('p');

  newFeed.classList.add('list-group-item', 'border-0', 'border-end-0');
  feedTitle.classList.add('h6', 'm-0');
  feedTitle.innerHTML = title;
  feedDescrp.classList.add('m-0', 'small', 'text-black-50');
  feedDescrp.innerHTML = description;

  newFeed.append(feedTitle);
  newFeed.append(feedDescrp);

  return newFeed;
};

export default (value, previousValue, elements, i18nextInstance) => {
  if (previousValue.length === 0) {
    renderHeadAndUl(elements.main.feeds, i18nextInstance.t('feeds'));
  }

  const countOfFeeds = value.length;
  const newFeedInf = value[countOfFeeds - 1];
  const feedUl = elements.main.feeds.querySelector('ul');
  const newFeed = makeNewFeed(newFeedInf);

  feedUl.prepend(newFeed);
};
