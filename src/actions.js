/* eslint-disable no-param-reassign */

import axios from 'axios';
import _ from 'lodash';
import { parseRss } from './parseRss';
import constants from './constants';

const loadFeed = (state, url) => {
  state.loading = {
    ...state.loading,
    status: 'loading',
  };

  axios.get(`${constants.proxy}/${url}`)
    .then((response) => {
      const { title, items: posts } = parseRss(response.data);
      const id = Date.now();

      state.feeds = {
        ...state.feeds,
        [id]: {
          id,
          title,
          url,
          posts,
        },
      };

      state.loading = {
        ...state.loading,
        status: 'waiting',
      };
    })
    .catch((error) => {
      state.loading = {
        status: 'failed',
        error: error.message,
      };
      throw error;
    });
};

const watchFeed = (state) => {
  const promises = Object.values(state.feeds).map(({ id, url }) => axios.get(`${constants.proxy}/${url}`)
    .then((response) => {
      const { items: update } = parseRss(response.data);
      const posts = state.feeds[id]?.posts || [];
      return {
        id,
        posts: [
          ..._.differenceWith(update, posts, (post1, post2) => post1.link === post2.link),
          ...posts,
        ],
      };
    })
    .catch((error) => {
      state.loading = {
        status: 'failed',
        error: error.message,
      };
      throw error;
    }));

  Promise.all(promises)
    .then((data) => {
      state.feeds = data.reduce((feeds, { id, posts }) => ({
        ...feeds, [id]: { ...feeds[id], posts },
      }), state.feeds);
    }).finally(() => {
      setTimeout(() => watchFeed(state), constants.updateInterval);
    });
};

export default {
  watchFeed,
  loadFeed,
};
