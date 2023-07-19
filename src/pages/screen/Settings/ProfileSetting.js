import React, { useEffect } from "react";
import "./profile.scss";
import { Row, Col, Button, Input, Badge, Avatar, Form, message } from "antd";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editUsers } from "../../../redux/Slice/UserSlice";
import { getCurrentUser } from "../../../redux/Slice/AuthSlice";
import Person from "../../../assets/images/jacob.png";
import FullPageSpinner from "../../../components/loader/FullPageSpinner";
import Camera from "../../../assets/images/camera.png";
import axios from "axios";
const ProfileSetting = () => {
  const [show, setShow] = useState(true);
  const { user, loading } = useSelector((state) => state.auth);

  const profileImage = user[0].user?.profile_image;
  const dispatch = useDispatch();

  const handleNameUpdate = (e) => {
    let data = { ...e };
    const value = data?.name?.toString();

    const key = Object.keys(data)
      .find(() => "name")
      .toString();


    const payload = { field_name: key, field_value: value };
    console.log("name", payload);
    dispatch(editUsers(payload));
    setTimeout(() => {
      dispatch(getCurrentUser());
    }, 1000);
    if (loading) {
      return <FullPageSpinner />;
    }
  };

  const handleEmailUpdate = (e) => {
    let data = { ...e };
    const value = data?.email?.toString();

    const key = Object.keys(data)
      .find(() => "email")
      .toString();

    const payload = { field_name: key, field_value: value };
    dispatch(editUsers(payload));
    setTimeout(() => {
      dispatch(getCurrentUser());
    }, 1000);
    if (loading) {
      return <FullPageSpinner />;
    }
  };
  const handlePasswordUpdate = (e) => {
    let data = { ...e };
    const value = data.password.toString();

    const key = Object.keys(data)
      .find(() => "password")
      .toString();

    const payload = { field_name: key, field_value: value };

    dispatch(editUsers(payload));
    dispatch(getCurrentUser());
    if (loading) {
      return <FullPageSpinner />;
    }
  };

  const [file, setFile] = useState();
  const [image, setImage] = useState();

  function handleChange(e) {
    setFile(e.target.files[0]);
    setImage(URL.createObjectURL(e.target.files[0]));

  }
  const handleImageUpdate = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("field_name", "profile_image");
    form.append("field_value", file);
    const token = localStorage.getItem("token");
    if (file?.type == "image/jpeg" || file?.type == 'image/png') {
      const { data } = await axios.post(
        "https://charliiapp.clickysoft.net/api/v1/edit-user-fields",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(getCurrentUser());

      return data;
    }

    else {
      message.error("Please Select JPEG or PNG file");
    }
  };
  const [form1] = Form.useForm();
  const [form2] = Form.useForm();


  useEffect(() => {
    console.log("user", user[0]?.user?.email);
    form1.setFieldsValue({
      name: user[0]?.user?.name,
    })
    form2.setFieldsValue({
      email: user[0]?.user?.email,

    })
  }, [])
  return (
    <div className="profile-container">
      <div className="setting-heading">
        <Row span={24}>
          <h1> Profile Settings</h1>
        </Row>
      </div>
      <Row style={{ marginBottom: "40px" }}>
        <form onSubmit={handleImageUpdate}>
          <Badge
            size="large"
            offset={[-20, 90]}
            dot={show}
            color="#28C76F"
            placement="end"
            className="badge-row"
          >
            <div className="personal-image">
              <label className="label">
                <input type="file" onChange={handleChange} accept="image/jpeg, image/png" />
                <figure class="personal-figure">
                  <img
                    src={(typeof file !== undefined && image) || profileImage}
                    className="personal-avatar"
                    alt="avatar"
                  />
                  <figcaption class="personal-figcaption">
                    <img alt="" src={Camera} />
                  </figcaption>
                </figure>{" "}
              </label>
            </div>
          </Badge>
          <Col>
            <Row>
              <h2 className="h2-head">{user[0]["user"]["name"]}</h2>
            </Row>{" "}
            <div className="d-flex justify-between">
              <Button
                className="change"
                type="primary"
                size="large"
                htmlType="submit"
              >
                {" "}
                Update Image
              </Button>
            </div>
          </Col>
        </form>
      </Row>

      {/* start of input fields */}

      <Row
        gutter={{
          xs: 8,
          sm: 16,
          md: 24,
          lg: 32,
        }}
      >
        {/**For Name */}
        <Form onFinish={handleNameUpdate} form={form1}>
          <div className="d-flex">
            <Form.Item
              style={{ padding: ".5rem" }}
              label="Name"
              name="name"
              labelCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Name is required",
                },
              ]}
            >
              <Input placeholder="Enter user name" />
            </Form.Item>
            <Button
              htmlType="submit"
              type="primary"
              className="mt-3"
              style={{ cursor: "pointer" }}
            >
              Update Name
            </Button>
          </div>
        </Form>
      </Row>
      {/**For Email */}

      <Row
        gutter={{
          xs: 8,
          sm: 16,
          md: 24,
          lg: 32,
        }}
      >
        <Form onFinish={handleEmailUpdate} form={form2}>
          <div className="d-flex">
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
              ]}
            >
              <Input placeholder="Enter Email" />
            </Form.Item>
            <Button
              htmlType="submit"
              type="primary"
              className="mt-3"
              disabled
              style={{ cursor: "pointer" }}
            >
              Update Email
            </Button>
          </div>
        </Form>
        {/**For password */}
      </Row>
      <Row
        gutter={{
          xs: 8,
          sm: 16,
          md: 24,
          lg: 32,
        }}
      >
        <Form onFinish={handlePasswordUpdate}>
          <div className="d-flex">
            <Form.Item
              style={{ padding: ".5rem" }}
              label="Password"
              name="password"
              labelCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Password is required",
                },
              ]}
            >
              <Input.Password placeholder="Enter Password" />
            </Form.Item>
            <Button
              htmlType="submit"
              type="primary"
              className="mt-3"
              style={{ cursor: "pointer" }}
            >
              Update Password
            </Button>
          </div>
        </Form>
      </Row>
    </div>
  );
};

export default ProfileSetting;
