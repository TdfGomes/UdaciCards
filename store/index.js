import { Platform } from 'react-native';
import { createStore, applyMiddleware, compose } from 'redux';
import devTools from 'remote-redux-devtools';
import decks from '../reducers';

export default function configureStore(initialState) {
  const enhancer = compose(
    devTools({
      name: Platform.OS,
      hostname: 'localhost',
      port: 19001
    })
  );
  return createStore(decks, initialState, enhancer);
}