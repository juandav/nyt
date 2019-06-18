import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import { createEpicMiddleware } from 'redux-observable'
import { rootEpic } from './root-epics'
import { rootReducer } from './root-reducers'

export default function initStore (initialState, { isServer }) {
  const epicMiddleware = createEpicMiddleware()
  const logger = createLogger({ collapsed: true })
  const reduxMiddleware = applyMiddleware(epicMiddleware, logger)
  const store = createStore(rootReducer, initialState, reduxMiddleware)
  epicMiddleware.run(rootEpic)
  return store
}