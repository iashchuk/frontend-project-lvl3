const renderLoadingInfo = ({ status, error }) => {
  const form = document.querySelector('.rss-form');
  const input = document.querySelector('.rss-form input');
  const feedback = document.querySelector('.feedback');

  switch (status) {
    case 'waiting':
      feedback.classList.add('text-success');
      feedback.textContent = 'Rss has been loaded';
      input.disabled = false;
      form.reset();
      input.focus();
      return;

    case 'loading':
      feedback.classList.remove('text-success');
      feedback.classList.remove('text-danger');
      feedback.textContent = '';
      input.disabled = true;
      return;

    case 'failed':
      feedback.classList.add('text-danger');
      feedback.textContent = error;
      input.disabled = false;
      return;

    default:
      throw new Error(`Unknown loading status: '${status}'`);
  }
};

export default renderLoadingInfo;
