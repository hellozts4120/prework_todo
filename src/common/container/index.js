import React from 'react';
import { Link } from 'react-router-dom'
import { Menu, Layout } from 'antd'
import Top from './header'
import Contents from './content'
import './index.less'

export default class Container extends React.Component {
  state = {
    theme: 'dark',
    current: 'index',
    mode: 'inline',  // 水平垂直展现
  }
  componentDidMount() {
    this.handleClick([], 'index')
  }
  changeTheme = (value) => {
    this.setState({
      theme: value ? 'dark' : 'light',
    });
  }
  clear = () => {
    this.setState({
      current: 'index',
    });
  }
  handleClick = (e, special) => {
    this.setState({
      current: e.key || special,
    });
  }
  render() {
    return (
      <Layout className="containAll">
        <Layout>
          <Top clear={this.clear} />
          <Contents />
        </Layout>
      </Layout>
    );
  }
}