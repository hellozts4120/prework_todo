import { handleActions } from 'redux-actions'
import 'babel-polyfill';

async function addTodoList(data) {
  let response = await fetch('http://127.0.0.1:8000/todo/add/', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  let res = await response;
  return res;
}

async function updateTodoList(data) {
  let response = await fetch('http://127.0.0.1:8000/todo/update/', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  let res = await response;
  return res;
}

async function deleteTodoList(data) {
  let response = await fetch('http://127.0.0.1:8000/todo/delete/', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  let res = await response;
  return res;
}

const todo = (state, action) => {
  let newObj
  switch (action.type) {
    case 'ADD_TODO':
      newObj = {
        id: action.id,
        text: action.text,
        priority: action.priority,
        expiredate: action.expiredate,
        completed: false // 刚传入的待办项未完成
      }
      addTodoList(newObj)
      return newObj
    case 'TOGGLE_TODO':
      if (state.id !== action.id) {
        return state
      }
      newObj = Object.assign({}, state, {
        completed: !state.completed
      })
      updateTodoList(newObj)
      return newObj
    case 'UPDATE_TODO':
      if (state.id !== action.id) {
        return state
      }
      newObj = Object.assign({}, state, {
        text: action.text,
        priority: action.priority,
        expiredate: action.expiredate,
        completed: state.completed
      })
      updateTodoList(newObj)
      return newObj
    default:
      return state
  }
}

const todoListInit = []

export const todoList = handleActions({
  'ADD_TODO'(state, action) {
    return [
      ...state,
      todo(undefined, action.payload)
    ]
  },
  'TOGGLE_TODO'(state, action) {
    return state.map(t => todo(t, action.payload))
  },
  'UPDATE_TODO'(state, action) {
    return state.map(t => todo(t, action.payload))
  },
  'DEL_TODO'(state, action) {
    deleteTodoList({id: action.payload.id})
    return state.filter(t => t.id !== action.payload.id)
  },
  'RECEIVE_DATA'(state, action) {
    return action.payload
  }
}, todoListInit)

const setVisibilityInit = {
  filter: 'SHOW_ALL',
}

export const setVisibility = handleActions({
  'SET_VISIBILITY'(state, action) {
    return { ...state, ...action.payload}
  }
}, setVisibilityInit)

const setSortByPriorityInit = {
  sort: true,
}

export const setSortByPriority = handleActions({
  'SET_PRIORITY'(state, action) {
    return { ...state, ...action.payload}
  }
}, setSortByPriorityInit)