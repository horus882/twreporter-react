'use strict'

import * as types from '../constants/action-types'

import get from 'lodash/get'
import isArray from 'lodash/isArray'
import mergeWith from 'lodash/mergeWith'
import omit from 'lodash/omit'

const _ = {
  get,
  isArray,
  mergeWith,
  omit
}

const initialStates = {
  isFetching: false
}

function concatIfIsArray(previousValue, toAddValue, key) {
  if (key==='collectIndexList' && _.isArray(previousValue)) {
    return previousValue.concat(toAddValue)
  }
}

export const author = (state = initialStates, action = {}) => {
  switch (action.type) {
    case types.FETCH_AUTHOR_COLLECTION_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })
    case types.FETCH_AUTHOR_COLLECTION_SUCCESS:
      let actionObjToAdd = _.omit(action, [ 'type', 'authorId' ])
      actionObjToAdd.isFetching = false
      return _.mergeWith({}, state, actionObjToAdd, concatIfIsArray)
    case types.FETCH_AUTHOR_COLLECTION_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      })
    default:
      return state
  }
}
