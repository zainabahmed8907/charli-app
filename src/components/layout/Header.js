import { useEffect } from "react";
import { Row, Col, Button, Dropdown } from "antd";

import "./index.css";
import { getCurrentUser, LogoutFunc } from "../../redux/Slice/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
function Header() {
  useEffect(() => window.scrollTo(0, 0));

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state?.auth);
  const location = useLocation();
  const user_name = user[0]?.user?.name;
  const profile_image = user[0]?.user?.profile_image;
  const logout = () => {
    dispatch(LogoutFunc());
    localStorage.removeItem("token");
    localStorage.removeItem("authenticated");
    localStorage.removeItem("isModalShown");

  };

  useEffect(() => {
    dispatch(getCurrentUser());
  }, []);
  const items = [
    {
      key: "1",
      label: <span>{user_name}</span>,
    },

    {
      key: "2",
      label: (
        <span>
          <Link to="/profile_Setting">Settings</Link>
        </span>
      ),
    },
    {
      key: "3",
      label: (
        <span>
          {" "}
          <button type="button" onClick={logout} className="logout">
            Logout
          </button>
        </span>
      ),
    },
  ];
  const path = location.pathname.split("/");

  const test = Array.from(path[1]);
  let pathName = "";

  if (test?.includes("-")) {
    const dashIndex = test?.indexOf("-");
    test?.splice(dashIndex, 1);
    pathName = test.join('');
  }
  else if (test?.includes("_")) {
    const dashIndex = test?.indexOf("_");
    test[dashIndex] = " ";
    pathName = test.join('');
      


  }
  else {
    pathName = path[1]
  }

  const menuProps = {
    items,
    selectable: true,
  };
  return (
    <>
      <Row justify="space-between" className="align-center">
        <Col
          xs={18}
          sm={18}
          md={18}
          lg={18}
          xl={18}
          xxl={18}
          className="border-r"
        >
          <p className="location_name">{pathName}</p>
        </Col>
        <Col
          className="display-flex"
          xs={5}
          sm={5}
          md={5}
          lg={5}
          xl={5}
          xxl={5}
        >
          <img
            src={profile_image}
            className="mr-2 icon-35"
            alt="Avatar"
            id="profile_image"
          />

          <Dropdown menu={menuProps} trigger={["click"]}>
            <Button>My Profile</Button>
          </Dropdown>
        </Col>
      </Row>
    </>
  );
}

export default Header;
