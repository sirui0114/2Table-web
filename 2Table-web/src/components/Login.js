import React, { Component } from "react";
import {  FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { API_ROOT } from '../constants';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { Form, Icon, Input, Button, message, Select } from 'antd';
import $ from 'jquery';

const FormItem = Form.Item;
const { Option } = Select;

export default class NormalLoginForm extends Component {

  static propTypes = {
     handleLogin: PropTypes.func.isRequired,
   }
  constructor(props) {
    super(props);

    this.state = {
      userID: "",
      password: ""
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
     this.props.form.validateFields((err, values) => {
         if (!err) {
               console.log('Received values of form: ', values);
        $.ajax({
                 url: `${API_ROOT}/login`,
                 method: 'POST',
                 data: JSON.stringify({
                    Id: values.UserID,
                    password: values.password,
                    clientType: values.clientType,
                 }),
         }).then((response) => {
            this.props.handleLogin(response);
         },(error) => {
            message.error(error.responseText);
         }).catch((error) => {
                     console.log(error);
                     });
         }
      });
    }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
        <Form onSubmit={this.handleSubmit} className="Login">
            <FormItem>
                {getFieldDecorator('UserID', {
                    rules: [{ required: true, message: 'Please input your username!' }],
                })(
                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                )}
            </FormItem>
            <FormItem>
                {getFieldDecorator('password', {
                    rules: [{ required: true, message: 'Please input your Password!' }],
                 })(
                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                 )}
            </FormItem>
            <FormItem>
            {getFieldDecorator('clientType', {
                 rules: [
                    { required: true, message: 'Please select a client type!' },
                        ],
                      })(
                        <Select placeholder="Please select a type">
                          <Option value="user">User</Option>
                          <Option value="restaurant">Restaurant</Option>
                        </Select>
                      )}
            </FormItem>
            <FormItem>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Log in
                </Button>
                Or <Link to="/register">register now!</Link>
            </FormItem>
            </Form>
            );
        }
    }

export const Login = Form.create()(NormalLoginForm);