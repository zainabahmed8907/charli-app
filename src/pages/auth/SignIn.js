import { Button, Form, Input, Card, message, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";

import { postLoginData } from "../../redux/Slice/AuthSlice";
import "./login.scss";
const SignIn = () => {
  const { loading } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const login = (e) => {
    const data = { ...e };
    dispatch(postLoginData({ data }));
    localStorage.setItem("isModalShown", true);
  };

  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 24,
      }}
      spin
    />
  );

  return (
    <section
      style={{ display: "flex", justifyContent: "center" }}
      className="login-container"
    >
      <Card className="cont mt-5">
        <h2 className="signin_heading">Login</h2>
        <div className="form sign-in">
          <Form
            onFinish={login}
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 24,
            }}
            layout="horizontal"
            initialValues={{
              remember: true,
            }}
            autoComplete="off"
            className="gx-signin-form gx-form-row0"
            style={{
              maxWidth: 1000,
            }}
          >
            <Form.Item
              style={{ padding: ".5rem" }}
              label="Email"
              name="email"
              labelCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Email is required",
                },
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
              ]}
            >
              <Input placeholder="Enter Email" />
            </Form.Item>
            <Form.Item
              style={{ padding: ".5rem" }}
              label="password"
              name="password"
              labelCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Password is required",
                },
              ]}
            >
              <Input.Password placeholder="password" />
            </Form.Item>
            <button type="submit" className="submit">
              login {loading ? <Spin indicator={antIcon} /> : ""}
            </button>
          </Form>
        </div>
      </Card>
    </section>
  );
};

export default SignIn;
