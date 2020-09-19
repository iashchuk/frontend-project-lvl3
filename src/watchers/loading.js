import i18next from 'i18next';

const renderSpinner = () => '<span class="spinner-border spinner-border-sm mb-1" role="status" aria-hidden="true"></span>';

const renderLoadingInfo = ({ status, error }) => {
  const form = document.querySelector('.rss-form');
  const input = form.querySelector('input');
  const button = form.querySelector('button');
  const feedback = document.querySelector('.feedback');

  switch (status) {
    case 'waiting':
      feedback.classList.add('text-success');
      feedback.textContent = i18next.t('loading.success');
      button.textContent = 'Add';
      input.disabled = false;
      button.disabled = false;
      form.reset();
      input.focus();
      return;

    case 'loading':
      feedback.classList.remove('text-success');
      feedback.classList.remove('text-danger');
      feedback.textContent = '';
      button.innerHTML = renderSpinner();
      input.disabled = true;
      button.disabled = true;
      return;

    case 'failed':
      feedback.classList.add('text-danger');
      feedback.textContent = error;
      button.textContent = 'Add';
      input.disabled = false;
      button.disabled = false;
      return;

    default:
      throw new Error(`Unknown loading status: '${status}'`);
  }
};

export default renderLoadingInfo;
