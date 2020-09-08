
import * as yup from 'yup';

const urlSchema = yup.string().url().required();

const validateUrl = (url, feeds) => {
  const feedUrls = feeds.map((feed) => feed.url);
  const schema = urlSchema.notOneOf(feedUrls, 'Rss already exists');
  try {
    schema.validateSync(url);
    return '';
  } catch (error) {
    return error.message;
  }
};


export default {
  url: validateUrl,
};
