import renderHeadAndUl from './renderHeadAndUl';

const makeNewPost = ({
  id, url, description, title,
}, elements, state) => {
  const newPost = document.createElement('li');
  const postLink = document.createElement('a');
  const buttonToModal = document.createElement('button');

  newPost.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');
  postLink.href = url;
  postLink.classList.add('fw-bold');
  postLink.dataset.id = id;

  postLink.innerHTML = title;
  postLink.target = '_blank';
  postLink.rel = 'noopener noreferrer';

  postLink.addEventListener('click', () => {
    postLink.classList.add('fw-normal');
    postLink.classList.remove('fw-bold');
    state.data.readPosts.push({
      id, url, description, title,
    });
  });

  buttonToModal.classList.add('btn', 'btn-outline-primary', 'btn-sm');
  buttonToModal.innerHTML = 'Просмотр';
  buttonToModal.dataset.bsToggle = 'modal';
  buttonToModal.dataset.bsTarget = '#exampleModal';

  buttonToModal.addEventListener('click', () => {
    elements.modal.querySelector('.modal-body').innerHTML = description;
    elements.modal.querySelector('a').href = url;
    elements.modal.querySelector('.modal-title').innerHTML = title;
    postLink.classList.add('fw-normal');
    postLink.classList.remove('fw-bold');
    state.data.readPosts.push({
      id, url, description, title,
    });
  });

  newPost.append(postLink, buttonToModal);
  return newPost;
};

export default (value, previousValue, elements, state) => {
  const countOfPrevious = previousValue.length;

  if (countOfPrevious === 0) {
    renderHeadAndUl(elements.main.posts, 'Посты');
  }
  const newPosts = value.slice(countOfPrevious);

  const postUl = elements.main.posts.querySelector('ul');

  newPosts.forEach((postInf) => {
    const newPost = makeNewPost(postInf, elements, state);
    postUl.prepend(newPost);
  });
};
