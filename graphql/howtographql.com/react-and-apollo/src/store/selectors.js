import { get, isEmpty } from 'lodash/fp';

export const getUserData = state => get('auth', state);
export const isUserLogged = state => !isEmpty(get('auth', state));
export const getSelectedTab = state => get('app.selectedTab', state);
export const isAppLoaded = state => get('asyncState.loaded', state);
