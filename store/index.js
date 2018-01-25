import { createStore, applyMiddleware, compose } from 'redux'
import { createLogger } from 'redux-logger'
import decks from '../reducers'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const loggerMiddleware = createLogger()

export default function configureStore(preloadedState) {
  return createStore(decks, preloadedState, composeEnhancers(applyMiddleware(loggerMiddleware)));
}
