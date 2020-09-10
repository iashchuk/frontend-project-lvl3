import * as yup from 'yup';
import i18next from 'i18next';

const getUrlSchema = () => yup.string()
  .url(i18next.t('form.invalid'))
  .required(i18next.t('form.required'));


const validateUrl = (url, feeds) => {
  const feedUrls = feeds.map((feed) => feed.url);
  const schema = getUrlSchema().notOneOf(feedUrls, i18next.t('form.exist'));
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
