import axios from 'axios';
import parser from './parser';

const updatePosts = (state) => {
  setTimeout(() => {
    const { urls } = state.data;
    const promises = urls.map((url) => axios.get(`${state.BASE_URL}${encodeURIComponent(url.toString())}`));
    const promise = Promise.all(promises);
    promise.then((responses) => {
      responses.forEach((response) => {
        const { feed, posts } = parser(response.data.contents);
        let postId = 0;
        state.data.feeds.forEach((item) => {
          if (item.title === feed.title) {
						 postId = item.id;
          }
        });
        const postsWithId = posts.map((post) => ({ ...post, postId }));
        const oldPosts = state.data.posts;
        const newPosts = postsWithId.filter((post) => !oldPosts.find((item) => (item.title === post.title) && (item.postId === postId)));
        state.data.posts.push(...newPosts);
        // console.log(newPosts);
      });
    });
    return updatePosts(state);
  }, 5000);
};

export default updatePosts;
