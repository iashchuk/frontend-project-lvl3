const parseInfo = (item) => {
  const title = item.querySelector('title').textContent;
  const link = item.querySelector('link').textContent;
  const description = item.querySelector('description').textContent;
  return { title, link, description };
};

export const parseRss = (xml) => {
  const parser = new DOMParser();
  const document = parser.parseFromString(xml, 'text/xml');
  const items = [...document.querySelectorAll('item')];

  return {
    ...parseInfo(document), items: items.map(parseInfo),
  };
};

export default parseRss;
