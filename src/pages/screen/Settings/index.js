import React from "react";
import "./index.scss";
import { Row, Col, Table } from "antd";
import { useState } from "react";

import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getUsers, searchUsers } from "../../../redux/Slice/UserSlice";
import FullPageSpinner from "../../../components/loader/FullPageSpinner";
import useDebounce from "./useDebounce";

const Settings = () => {
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 7,
    },
  });

  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });
  };
  const columns = [
    {
      title: "NAME",
      dataIndex: ["name"],
      render: (name, record) => {
        return (
          <div style={{ display: "Flex" }}>
            <Col>
              <img
                className="image"
                src={
                  record?.profile_image
                    ? record?.profile_image
                    : name?.charAt(0)
                }
                alt=""
              ></img>
            </Col>
            <Col>
              <a className="name" href="/profile-settings">
                {name}
              </a>{" "}
              <div className="tag">{record?.tag}</div>{" "}
            </Col>
          </div>
        );
      },
      sorter: (a, b) => a.name.length - b.name.length,
      color: "#3A5AFF",
    },
    {
      title: "EMAIL",
      dataIndex: "email",
      render: (email) => <div style={{ color: "#575A60" }}>{email}</div>,
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "ROLE",
      dataIndex: "role",
      render: () => <div className="role-row">-</div>,

      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "PLAN",
      dataIndex: "plan",
      sorter: (a, b) => a.name.length - b.name.length,
      render: () => <div className="plan-row">-</div>,
    },
    {
      title: "STATUS",
      dataIndex: "status",
      render: () => <div className="status-row">-</div>,
    },
  ];
  //dispatch users
  const dispatch = useDispatch();
  const { users, loading, searchData } = useSelector((state) => state.user);

  const [searchTerm, setSerachterm] = useState("");

  const debouncedSearch = useDebounce(searchTerm, 500);

  useEffect(() => {
    dispatch(getUsers());

    if (debouncedSearch) {
      dispatch(searchUsers(debouncedSearch));
    }
  }, [debouncedSearch, dispatch]);

  //search func
  const search = (e) => {
    e.preventDefault();
    setSerachterm(e.target.value);
  };

  return (
    <div className="setting-container">
      <div className="setting-header">
        <Row className="header" span={24}>
          <Col>
            <h1> User Access</h1>
          </Col>
          <Col>
            <div style={{ display: "flex" }}>
              <input
                placeholder="Search user..."
                type="text"
                className="mr-2"
                onChange={(e) => search(e)}
              />
            </div>
          </Col>
        </Row>
      </div>
      {/* header end */}

      {loading ? (
        <FullPageSpinner />
      ) : (
        <Table
          className="access-table"
          columns={columns}
          dataSource={
            searchTerm.length > 1 ? searchData[0]?.data : users[0]?.data
          }
          pagination={tableParams.pagination}
          loading={loading}
          onChange={handleTableChange}
        />
      )}
    </div>
  );
};

export default Settings;
