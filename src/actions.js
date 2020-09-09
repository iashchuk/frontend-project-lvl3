import axios from 'axios';
import { parseRss } from './parseRss.js';

const proxy = 'https://cors-anywhere.herokuapp.com';


const loadFeed = (state, url) => {
  state.loading = {
    error: '',
    status: 'loading',
  };

  axios.get(`${proxy}/${url}`)
    .then((response) => {
      const { title, items: posts } = parseRss(response.data);
      const id = Date.now();

      state.loading = {
        status: 'waiting',
        error: '',
      };

      state.form = {
        status: 'filling',
        error: '',
      };

      state.feeds = {
        ...state.feeds,
        [id]: {
          id,
          title,
          url,
          posts,
        },
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


export default {
  loadFeed,
};
