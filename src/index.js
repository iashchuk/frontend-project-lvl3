import 'bootstrap';
import watch from './watchers';
import actions from './actions';
import validate from './validation';
import constants from './constants';


const init = () => {
  const form = document.querySelector('.rss-form');

  const initialState = {
    feeds: {},
    form: {
      status: 'filling',
      error: '',
    },
    loading: {
      status: 'waiting',
      error: '',
    },
  };

  const state = watch(initialState);
  setTimeout(() => actions.watchFeed(state), constants.UPDATE_INTERVAL);


  const onSubmit = (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    const url = formData.get('url');
    const error = validate.url(url, Object.values(state.feeds));

    state.form = {
      status: error ? 'invalid' : 'valid',
      error,
    };

    if (error) {
      return;
    }

    actions.loadFeed(state, url);
  };

  form.addEventListener('submit', onSubmit);
};

init();
