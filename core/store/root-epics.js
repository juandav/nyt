import {combineEpics} from 'redux-observable'
import {articleEpics} from './articles/epics'

export const rootEpic = combineEpics(articleEpics)