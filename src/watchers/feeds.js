const renderPost = (post) => `
    <li>
        <a href=${post.link}>${post.title}</a>
    </li>
    `;

const renderFeeds = (feeds, posts) => {
  const feedsContainer = document.querySelector('.feeds');

  const feedsMarkup = [...feeds].map(({ id, title }) => `
        <h2>${title}</h2>
        <ul>${posts.filter((item) => item.feedId === id).map(renderPost).join('')}</ul>
      `).join('');

  feedsContainer.innerHTML = feedsMarkup;
};

export default renderFeeds;
