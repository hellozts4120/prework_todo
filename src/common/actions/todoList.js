import { createAction } from 'redux-actions'

export const addTodo = createAction('ADD_TODO')
export const setVisibility = createAction('SET_VISIBILITY')
export const setSortPriority = createAction('SET_PRIORITY')
export const toggleTodo = createAction('TOGGLE_TODO')
export const delTodo = createAction('DEL_TODO')
export const updateTodo = createAction('UPDATE_TODO')
export const receiveData = createAction('RECEIVE_DATA')