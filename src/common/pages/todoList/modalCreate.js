import React from 'react'
import moment from 'moment'
import { Modal, Button, DatePicker, Select, Input } from 'antd';
import './modalCreate.less'

const Option = Select.Option;

export default class ModalCreate extends React.Component {
  state = {
    loading: false,
    visible: false,
    priority: this.props.priority ? this.props.priority + '' : '1',
    inputVal: this.props.inputVal || '',
    expiredate: this.props.expiredate ? moment(this.props.expiredate, 'YYYY-MM-DD HH:mm:ss') : moment(new Date(), 'YYYY-MM-DD HH:mm:ss')
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleOk = () => {
    this.setState({ loading: true });
    this.props.handleSubmit(this.state.inputVal, this.state.expiredate.format("YYYY-MM-DD HH:mm:ss"), this.state.priority, this.props.id)
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 1000);
    this.setState({ inputVal: '' })
  }
  handleCancel = () => {
    this.setState({ visible: false })
  }
  onSelectTime = (date, dateString) => {
    this.setState({ expiredate: date })
  }
  onSelectPriority = (value) => {
    this.setState({ priority: value })
  }
  onChangeInput = (event) => {
    this.setState({ inputVal: event.target.value })
  }
  render() {
    const { visible, loading } = this.state;
    return (
      <span className="todo-list-del" style={{padding: 0, height: 20}}>
        <Button type="primary" onClick={this.showModal} style={{ width: this.props.submitWidth, height: this.props.submitHeight }}>
          {this.props.openText}
        </Button>
        <Modal
          visible={visible}
          title={this.props.id ? "Update Todo" : "Create New Todo"}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" size="large" onClick={this.handleCancel}>Cancel</Button>,
            <Button key="submit" type="primary" size="large" loading={loading} onClick={this.handleOk}>
              Submit
            </Button>,
          ]}
        >
          <span className="form-label">Expire Date: </span>
          <DatePicker
            showTime
            format="YYYY-MM-DD HH:mm:ss"
            value={this.state.expiredate}
            placeholder="Select Time"
            style={{width: 300}}
            onChange={this.onSelectTime}
            className="form-item"
          />
          <br/>
          <span className="form-label">Todo Priority: </span>
          <Select value={this.state.priority} className="form-item" onChange={this.onSelectPriority}>
            <Option value="1" style={{ backgroundColor: '#DAF7A6' }}>Low</Option>
            <Option value="2" style={{ backgroundColor: '#F9E79F' }}>Medium</Option>
            <Option value="3" style={{ backgroundColor: '#F5B7B1' }}>High</Option>
          </Select>
          <br/>
          <span className="form-label">Todo Content: </span>
          <Input placeholder="What you want to do..." value={this.state.inputVal} onChange={this.onChangeInput} className="todo-input" style={{ width: 300, marginBottom: 10 }} />
        </Modal>
      </span>
    );
  }
}