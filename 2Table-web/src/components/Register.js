import React from 'react';
import { Form, Input, Button, message,  Select, Radio } from 'antd';
import $ from 'jquery';
import { API_ROOT } from '../constants';
import { Link } from 'react-router-dom';

const FormItem = Form.Item;
const { Option } = Select;
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};


class RegistrationForm extends React.Component {

constructor() {
  super();
    this.state = {
      Client: 'User',
      confirmDirty: false,
      autoCompleteResult: [],
    };
  }

  handleFormLayoutChange = (e) => {
      this.setState({ Client: e.target.value });
  }

   handleSubmit = (e) => {
     var myHeaders = new Headers();

     e.preventDefault();
     this.props.form.validateFieldsAndScroll((err, values) => {
       if (!err) {
         console.log('Received values of form: ', values);
         if (this.state.Client === 'User'){
            $.ajax({
                url: `${API_ROOT}/register`,
                method: 'POST',
                data: JSON.stringify({
                    client: this.state.Client,
                    ID: values.UserID,
                    name: values.name,
                    phone: values.phone,
                    email: values.email,
                    password: values.password,
                })
            }).then((response) => {
                message.success(response);
            }, (response) => {
                message.error(response.responseText);
            }).catch((error) => {
                console.log(error);
            });
       }else {
            $.ajax({
                url: `${API_ROOT}/register`,
                method: 'POST',
                data: JSON.stringify({
                    client: this.state.Client,
                    ID: values.UserID,
                    name: values.name,
                    phone: values.phone,
                    email: values.email,
                    password: values.password,
                    address: values.address,
                    capacity: values.capacity,
                })
            }).then((response) => {
                message.success(response);
            }, (response) => {
                message.error(response.responseText);
            }).catch((error) => {
                console.log(error);
            });
       }
       }
     });
   }

   handleConfirmBlur = (e) => {
     const value = e.target.value;
     this.setState({ confirmDirty: this.state.confirmDirty || !!value });
   }

   compareToFirstPassword = (rule, value, callback) => {
     const form = this.props.form;
     if (value && value !== form.getFieldValue('password')) {
       callback('Two passwords that you enter is inconsistent!');
     } else {
       callback();
     }
   }


   validateToNextPassword = (rule, value, callback) => {
     const form = this.props.form;
     if (value && this.state.confirmDirty) {
       form.validateFields(['confirm'], { force: true });
     }
     callback();
   }

    getResItem = () => {
        const { getFieldDecorator } = this.props.form;
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '1',
        })(
            <Select style={{ width: 70 }}>
            <Option value="1">+1</Option>
            <Option value="44">+44</Option>
            <Option value="49">+49</Option>
            <Option value="86">+86</Option>
            <Option value="91">+91</Option>
            </Select>
        );

        return (
            <>
                <FormItem
                    {...formItemLayout}
                    label="RestaurantID"
                >
                {getFieldDecorator('RestaurantID', {
                    rules: [{ required: true, message: 'Please input your RestaurantID!', whitespace: true }],
                })(
                    <Input />
                )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                        label="Password"
                >
                {getFieldDecorator('password', {
                    rules: [{
                        required: true, message: 'Please input your password!',
                        }, {
                        validator: this.validateToNextPassword,
                        }],
                })(
                <Input type="password" />
                )}
            </FormItem>
                <FormItem
                    {...formItemLayout}
                         label="Confirm Password"
            >
                {getFieldDecorator('confirm', {
                    rules: [{
                        required: true, message: 'Please confirm your password!',
                    }, {
                        validator: this.compareToFirstPassword,
                    }],
                })(
                    <Input type="password" onBlur={this.handleConfirmBlur} />
                )}
                </FormItem>
                 <FormItem {...formItemLayout} label="Restaurant Name">
                    {getFieldDecorator('name', {
                        rules: [{
                            required: true, message: 'Please Please input your restaurant\'s name!',
                            whitespace: true }]
                        }) (
                        <Input />
                         )}
                 </FormItem>
                  <FormItem {...formItemLayout} label="Phone Number">
                                   {getFieldDecorator('phone', {
                                     rules: [{
                                         required: true, message: 'Please Please input your phone number!',
                                     whitespace: true }]
                                   }) (
                                      <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                                   )}
                         </FormItem>
                         <FormItem {...formItemLayout} label="Email Address">
                                   {getFieldDecorator('email', {
                                      rules: [{
                                         required: true, message: 'Please Please input your Email Address!',
                                      whitespace: true }]
                                   }) (
                                     <Input />
                                   )}
                          </FormItem>
                          <FormItem {...formItemLayout} label="Address">
                                     {getFieldDecorator('address', {
                                         rules: [{
                                             required: true, message: 'Please Please input your Address!',
                                          whitespace: true }]
                                      }) (
                                         <Input />
                              )}
                          </FormItem>
                          <FormItem {...formItemLayout} label="Capacity">
                                     {getFieldDecorator('capacity', {
                                           rules: [{
                                                   required: true, message: 'Please Please input your capacity!',
                                           whitespace: true }]
                                     }) (
                                        <Input />
                          )}
                          </FormItem>
                          <FormItem {...tailFormItemLayout}>
                                     <Button type="primary" htmlType="submit">Register</Button>
                                     <p>I already have an account, go back to <Link to="/login">login</Link></p>
                                   </FormItem>
                                   </>)
   }

   getUserItem = () => {
          const { getFieldDecorator } = this.props.form;
          const prefixSelector = getFieldDecorator('prefix', {
                initialValue: '1',
              })(
                <Select style={{ width: 70 }}>
                  <Option value="1">+1</Option>
                  <Option value="44">+44</Option>
                  <Option value="49">+49</Option>
                  <Option value="86">+86</Option>
                  <Option value="91">+91</Option>
                </Select>
              );

          return (
            <>
                <FormItem
                      {...formItemLayout}
                      label="UserID"
                    >
                      {getFieldDecorator('UserID', {
                        rules: [{ required: true, message: 'Please input your userID!', whitespace: true }],
                      })(
                        <Input />
                      )}
                    </FormItem>
                    <FormItem
                      {...formItemLayout}
                      label="Password"
                    >
                      {getFieldDecorator('password', {
                        rules: [{
                          required: true, message: 'Please input your password!',
                        }, {
                          validator: this.validateToNextPassword,
                        }],
                      })(
                        <Input type="password" />
                      )}
                    </FormItem>
                    <FormItem
                      {...formItemLayout}
                      label="Confirm Password"
                    >
                      {getFieldDecorator('confirm', {
                        rules: [{
                          required: true, message: 'Please confirm your password!',
                        }, {
                          validator: this.compareToFirstPassword,
                        }],
                      })(
                        <Input type="password" onBlur={this.handleConfirmBlur} />
                      )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="Name">
                       {getFieldDecorator('name', {
                         rules: [{
                             required: true, message: 'Please Please input your name!',
                         whitespace: true }]
                       }) (
                         <Input />
                       )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="Phone Number">
                              {getFieldDecorator('phone', {
                                rules: [{
                                    required: true, message: 'Please Please input your phone number!',
                                whitespace: true }]
                              }) (
                                 <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                              )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="Email Address">
                              {getFieldDecorator('email', {
                                 rules: [{
                                    required: true, message: 'Please Please input your Email Address!',
                                 whitespace: true }]
                              }) (
                                <Input />
                              )}
                     </FormItem>
                     <FormItem {...tailFormItemLayout}>
                                <Button type="primary" htmlType="submit">Register</Button>
                                <p>I already have an account, go back to <Link to="/login">login</Link></p>
                              </FormItem>
                              </>)
   }


   render() {

              const formItemLayout = {
                labelCol: {
                  xs: { span: 24 },
                  sm: { span: 8 },
                },
                wrapperCol: {
                  xs: { span: 24 },
                  sm: { span: 16 },
                },
              };
     const Client  = this.state.Client;
     const Items = Client === 'User' ? this.getUserItem : this.getResItem;

     return (
     <Form client={Client} onSubmit={this.handleSubmit} className="register-form">

                           <FormItem {...formItemLayout}>
                              <Radio.Group defaultValue="User" onChange={this.handleFormLayoutChange}>
                                 <Radio.Button value="User">User</Radio.Button>
                                 <Radio.Button value="Restaurant">Restaurant</Radio.Button>
                              </Radio.Group>
                           </FormItem>
                           <Items />
              </Form>)
              ;
   }
  }

  export const Register = Form.create()(RegistrationForm);