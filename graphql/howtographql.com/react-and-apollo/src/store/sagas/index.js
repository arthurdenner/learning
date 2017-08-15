import { fork, all } from 'redux-saga/effects';
import { map, unary } from 'lodash/fp';

export default function* () {
  const _sagas = [
  ];

  yield all(map(unary(fork), _sagas));
}
