import { handleActions } from 'redux-actions'
import update from 'immutability-helper'
import * as types from './action-types'

const INITIAL_STATE = {
  error: null,
  articles: []
}

export default handleActions({
  [types.SEARCH_ARTICLES_SUCCESS]: searchArticlesSuccess,
  [types.SEARCH_ARTICLES_ERROR]: searchArticlesError,
}, INITIAL_STATE)

function searchArticlesSuccess(state, action) {
  const {payload} = action
  const data = (payload.type === "more")?
    update(state.articles, { $push: payload.docs }): 
    update(state.articles, { $set: [...payload.docs] })
  return {
    ...state,
    articles: data,
  }
}
function searchArticlesError(state, error) {
  return {
    ...state,
    error
  }
}