import { Button, Form, Input, Card } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { signUpFunc } from '../../redux/Slice/AuthSlice';
import './login.scss';

const SignUp = () => {
  const dispatch = useDispatch();
  const { success } = useSelector((state) => state.auth);
  const history = useHistory();
  const register = (e) => {
    let data = { ...e };
    dispatch(signUpFunc({ data }));
    console.log(success);

    if (success) {
      history.push('/login');
    }
  };
  return (
    <section style={{ display: 'flex', justifyContent: 'center' }}>
      <div className="signin-img">
        <div>
          <p className="ques">Already have an account?</p>
        </div>
        <Link to="/sign-in">
          <Button className="sign-up">Sign In</Button>
        </Link>
      </div>
      <Card className="cont mt-5">
        <h2 className="signin_heading">Sign Up</h2>
        <div className="form sign-in">
          <Form onFinish={register}>
            <Form.Item
              style={{ padding: '.5rem' }}
              label="Name"
              name="name"
              labelCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: 'Name is required'
                }
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              style={{ padding: '.5rem' }}
              label="Email"
              name="email"
              labelCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: 'Email is required'
                }
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              style={{ padding: '.5rem' }}
              label="password"
              name="password"
              labelCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: 'Password is required'
                }
              ]}
            >
              <Input />
            </Form.Item>
            <Button
              type="primary"
              className="submit"
              htmlType="submit"
              id="s_up"
            >
              Sign Up
            </Button>
          </Form>
        </div>
      </Card>
    </section>
  );
};

export default SignUp;
