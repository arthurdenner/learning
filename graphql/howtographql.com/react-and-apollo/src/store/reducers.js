import { combineReducers } from 'redux';
import { innerReducer as asyncState } from 'redux-async-initial-state';
import { handleActions } from 'redux-actions';
import { always, flip, get, stubObject } from 'lodash/fp';

import actions from '~/store/actions';

export default combineReducers({
  asyncState,

  app: combineReducers({
    selectedTab: handleActions({
      [actions.app.selectTab]: {
        next: flip(get('payload')),
        throw: always(null),
      },
    }, ['links']),
  }),

  auth: handleActions({
    [actions.auth.login]: {
      next: flip(get('payload')),
      throw: always({}),
    },
    [actions.auth.logout]: stubObject,
  }, {}),

});
