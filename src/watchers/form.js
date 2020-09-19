const renderForm = ({ status, error }) => {
  const input = document.querySelector('.rss-form input');
  const feedback = document.querySelector('.feedback');

  switch (status) {
    case 'valid':
      input.classList.remove('is-invalid');
      feedback.classList.remove('text-danger');
      feedback.textContent = '';
      return;

    case 'invalid':
      input.classList.add('is-invalid');
      feedback.classList.add('text-danger');
      feedback.textContent = error;
      return;

    default:
      throw new Error(`Unknown form status: '${status}'`);
  }
};

export default renderForm;
