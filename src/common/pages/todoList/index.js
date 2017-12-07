import React from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import { addTodo, toggleTodo, delTodo, updateTodo, setSortPriority, receiveData } from 'actions/todoList'
import { Checkbox, Tooltip, Button } from 'antd'
import FilterLink from './filterLink'
import ModalCreate from './modalCreate'
import './index.less'

@connect(
  (state) => ({
    todoList: state.todoList,
    setVisibility: state.setVisibility,
    setSortByPriority: state.setSortByPriority
  })
)

export default class todoList extends React.Component {
  state = {
    isSort: false
  }

  submit = (value, date, priority) => {
    const { todoList } = this.props
    if (!value.trim()) {
      return
    }
    this.props.dispatch(addTodo({
      id: todoList.length,
      text: value,
      priority: priority,
      expiredate: date,
      completed: false,
      type: 'ADD_TODO'
    }))
  }

  update = (value, date, priority, id) => {
    if (!value.trim()) {
      return
    }
    this.props.dispatch(updateTodo({
      id: id,
      text: value,
      priority: priority,
      expiredate: date,
      type: 'UPDATE_TODO'
    }))
  }

  onChangeSort = () => {this.setState({
    isSort: !this.state.isSort,
  })}

  componentWillMount() {
    let getTodoList = async function () {
      let response = await fetch('http://127.0.0.1:8000/todo/list');
      let res = await response.json();
      return res;
    }
    getTodoList().then(data => this.props.dispatch(receiveData(data)))
  }

  render() {
    const { todoList, setVisibility, setSortByPriority } = this.props
    let todos = todoList
    if (setVisibility.filter === 'SHOW_COMPLETED') {
      todos = todoList.filter(t => t.completed)
    } else if (setVisibility.filter === 'SHOW_ACTIVE') {
      todos = todoList.filter(t => !t.completed)
    } else if (setVisibility.filter === 'SHOW_EXPIRED') {
      todos = todoList.filter(t => moment(t.expiredate, 'YYYY-MM-DD HH:mm:ss').valueOf() - moment().valueOf() < 0)
    }
    if (!setSortByPriority.sort) {
      let todoListCopy = JSON.parse(JSON.stringify(todoList))
      todos = todoListCopy.sort((a, b) => (+b.priority) - (+a.priority))
    }
    return (
      <div className="todo-box">
        <div className="todo-innerBox">
          <div className="todo-tab">
            <FilterLink filter="SHOW_ALL" name="All-Task"></FilterLink>
            <FilterLink filter="SHOW_ACTIVE" name="Todo"></FilterLink>
            <FilterLink filter="SHOW_COMPLETED" name="Completed"></FilterLink>
            <FilterLink filter="SHOW_EXPIRED" name="Expired"></FilterLink>
          </div>
          <ul className="list-group">
            <Checkbox className="check-box" onChange={this.onChangeSort}
              onClick={e => this.props.dispatch(setSortPriority({
                sort: this.state.isSort
              }))}>Sort By Priority
            </Checkbox>
          </ul>
          <ul className="list-group">
            {
              todos.map(todo =>
                <li className="todo-list-li" key={todo.id} style={{ backgroundColor: todo.priority == 1 ? '#DAF7A6' : (todo.priority == 2 ? '#F9E79F' : '#F5B7B1') }}>
                  <Checkbox className="check-box" onChange={this.onChange} checked={todo.completed} style={{ textDecoration: todo.completed ? "line-through" : "none" }}
                    onClick={e => this.props.dispatch(toggleTodo({
                      id: todo.id,
                      type: "TOGGLE_TODO"
                    }))}>
                    <Tooltip placement="top" title={"Expire Date: " + todo.expiredate}>{todo.text}</Tooltip>
                  </Checkbox>
                  <ModalCreate handleSubmit={this.update} openText="Update" id={todo.id} expiredate={todo.expiredate} priority={todo.priority} inputVal={todo.text} submitWidth='100' submitHeight='20' />
                  <Button type="danger" key={`button-${todo.id}`} className="todo-list-del" style={{height: 20}} onClick={e => this.props.dispatch(delTodo({
                    id: todo.id,
                    type: "DEL_TODO"
                  }))}>Delete</Button>
                    
                </li>
              )
            }
          </ul>
          <form className="todo-add">
            <ModalCreate handleSubmit={this.submit.bind(this)} submitWidth='200' openText="+ Add New Todo" className="todo-submit" />
          </form>
        </div>
      </div>
    )
  }
}