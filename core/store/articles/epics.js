import {
  combineEpics,
  ofType 
} from 'redux-observable'
import {
    mergeMap, 
    catchError, 
    switchMap 
} from 'rxjs/operators'
import { request } from 'universal-rxjs-ajax'
import { of, concat } from 'rxjs'
import * as types from './action-types'
import * as actions from './actions'
import * as metaActions from '../meta/actions'

import {ARTICLE_SEARCH_API, API_KEY} from '../../environments'

const getOptions = ({
  type_of_material, 
  query, 
  page
}) => {
  return {
    url: `${ARTICLE_SEARCH_API}?fq=type_of_material:%22${type_of_material}%22&q=${query}&page=${page}&api-key=${API_KEY}`,
    method: "GET"
  }
}

const searchArticlesEpic = action$ => action$.pipe(
  ofType(types.SEARCH_ARTICLES),
  switchMap(action => {
    const {payload} = action
    const options = getOptions(payload)

    const genericActions = resp => [
      of(metaActions.setMetaPage(resp.response.response)),
      of(metaActions.setCriteria({ query: payload.query, type_of_material: payload.type_of_material })),
      of(actions.searchArticlesSuccess(Object.assign(resp.response.response || {}, {
        type: payload.type
      }))),
      of(metaActions.loadingFinished())
    ]

    const actionsPerType = resp => (payload.type === "new")? [
      of(metaActions.clearMetaPage()),
      ...genericActions(resp)
    ]: [
      of(metaActions.addPage()),
      ...genericActions(resp)
    ]

    const req = request(options)
    .pipe(
      mergeMap(
        resp => concat(...actionsPerType(resp))
      ),
      catchError(
        error => concat(
          of(metaActions.loadingFinished()),
          of(actions.searchArticlesError(error))  
        )
      )
    )
    return concat(
      of(metaActions.loading()), 
      req
    )
  })
)

export const articleEpics = combineEpics(searchArticlesEpic)