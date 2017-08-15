export const DEV = process.env.NODE_ENV !== 'production';

export const Cache = {
  KEY: DEV ? 'HACKERNEWS_DEV' : 'HACKERNEWS_PROD',
};

export const MENU_OPTIONS = [
  {
    key: 'item_1',
    route: '/',
    name: 'Links',
    icon: 'link',
  },
  {
    key: 'item_2',
    route: '/submit',
    name: 'Submit a link',
    icon: 'plus',
  },
];
