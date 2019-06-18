import {combineReducers} from 'redux'
import meta from './meta/reducer'
import data from './articles/reducers'

export const rootReducer = combineReducers({meta, data})