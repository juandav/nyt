import { createAction } from 'redux-actions'
import * as types from './action-types'

export const loading = createAction(types.LOADING_START)
export const loadingFinished = createAction(types.LOADING_FINISH)
export const addPage = createAction(types.ADD_PAGE)
export const setMetaPage = createAction(types.SET_META_PAGE, payload => ({ ...payload }))
export const clearMetaPage = createAction(types.CLEAR_META_PAGE)
export const setCriteria = createAction(types.SET_CRITERIA, payload => payload)