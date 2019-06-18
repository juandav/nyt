import { handleActions } from 'redux-actions'
import * as types from './action-types'

const INITIAL_STATE = {
  loading: false,
  page: 0,
  hits: 0,
  count: 0,
  citeria_material: "",
  criteria_query: ""
}

export default handleActions({
  [types.LOADING_FINISH]: finishLoading,
  [types.LOADING_START]: startLoading,
  [types.ADD_PAGE]: addPage,
  [types.SET_META_PAGE]: setMetaPage,
  [types.CLEAR_META_PAGE]: clearMetaPage,
  [types.SET_CRITERIA]: setCriteria
}, INITIAL_STATE)


function startLoading(state = INITIAL_STATE) {
  return {
    ...state,
    loading: true,
  }
}
function finishLoading(state = INITIAL_STATE) {
  return {
    ...state,
    loading: false
  }
}
function addPage(state = INITIAL_STATE) {
  return {
    ...state,
    page: state.page + 1
  }
}
function setMetaPage(state = INITIAL_STATE, action) {
  const {payload} = action
  return {
    ...state,
    hits: payload.meta.hits,
    count: state.count + payload.docs.length
  }
}
function clearMetaPage(state = INITIAL_STATE) {
  return {
    ...state,
    hits: 0,
    count: 0,
    page: 0
  }
}
function setCriteria(state = INITIAL_STATE, {payload}) {
  return {
    ...state,
    citeria_material: payload.type_of_material,
    criteria_query: payload.query
  }
}