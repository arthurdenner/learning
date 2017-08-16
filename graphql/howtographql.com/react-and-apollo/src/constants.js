export const DEV = process.env.NODE_ENV !== 'production';

export const Cache = {
  KEY: DEV ? 'HACKERNEWS_DEV' : 'HACKERNEWS_PROD',
};

export const LINKS_PER_PAGE = 5;
