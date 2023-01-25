import { uniqueId } from 'lodash';
import {AxiosError} from "axios";

export default (stringContainingHTMLSource, postId = 0) => {
  if (!stringContainingHTMLSource) {
    throw TypeError;
  }
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(stringContainingHTMLSource, 'text/xml');
    const feedTitle = doc.querySelector('title').textContent;
    const feedDescription = doc.querySelector('description').textContent;
    const feedPosts = Array.from(doc.querySelectorAll('item'));
    const posts = feedPosts.map((post) => {
      const title = post.querySelector('title').textContent;
      const postLink = post.querySelector('link').textContent;
      const description = post.querySelector('description').textContent;
      return {
        id: uniqueId(),
        postId,
        url: postLink,
        title,
        description,
      };
    });
    return {
      feed: {
        title: feedTitle,
        description: feedDescription,
        id: postId,
      },
      posts,
    };
  }catch (e){
    throw AxiosError("Network Problems");
  }
};
