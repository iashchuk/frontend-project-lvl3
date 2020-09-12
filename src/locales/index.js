import en from './en';
import ru from './ru';

export default (lng = 'en') => ({ lng, resources: { en, ru } });
