import { get } from 'lodash/fp';

export const getSelectedTab = state => get('app.selectedTab', state);
export const isAppLoaded = state => get('asyncState.loaded', state);
