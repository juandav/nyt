import { createAction } from 'redux-actions'
import * as types from './action-types'

export const searchArticles = createAction(types.SEARCH_ARTICLES, payload => ({...payload}))
export const searchArticlesSuccess = createAction(types.SEARCH_ARTICLES_SUCCESS, (response) => ({...response}))
export const searchArticlesError = createAction(types.SEARCH_ARTICLES_ERROR, (error) => ({...error}))