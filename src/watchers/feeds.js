const renderPost = (post) => `
    <li>
        <a href=${post.link}>${post.title}</a>
    </li>
    `;

const renderFeeds = (feeds) => {
  const feedsContainer = document.querySelector('.feeds');
  const feedsMarkup = Object.values(feeds).sort((feed1, feed2) => feed2.id - feed1.id).map(({ title, posts }) => `
        <h2>${title}</h2>
        <ul>${posts.map(renderPost).join('')}</ul>
      `).join('');

  feedsContainer.innerHTML = feedsMarkup;
};

export default renderFeeds;
