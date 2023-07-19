import { Menu, Layout } from "antd";
import { NavLink, useLocation } from "react-router-dom";

import AppLogo from "../../assets/icons/App-Logo.svg";
import GreenDot from "../../assets/icons/online-pill.svg";
import WhiteIcon from "../../assets/icons/SidebarIcon/WhiteIcon.svg"

import CustomButton from "../button/Button";
import { ROUTES } from "../../constant/routeConstant";

const { Sider } = Layout;

const Sidenav = () => {
  const { pathname } = useLocation();
  const ADMIN_ROUTE = ROUTES.ADMIN;
  const ADMIN_LENGTH = ADMIN_ROUTE.length;
  const OTHER_ROUTE = ROUTES.OTHER;
  const route = pathname;

  const renderMenu = (item, index) => {
    const { selectedIcon, unSelectedIcon } = item;

    return (
      <Menu.Item key={index}>
        <NavLink to={item.route}>
          <div className="align-center">
            {selectedIcon ? (
              <img
                src={route === item.route ? selectedIcon : unSelectedIcon}
                className="mr-3 mb-0-3 icon-20"
                alt="Menu Icon"
              />
            ) : (
              <img
                src={WhiteIcon}
                className="mr-3 mb-0-3 icon-20"
                alt="Menu Icon"
              />
            )}
            <span
              className={`text-16 font-w-600 ${
                route === item.route ? "blue-color" : null
              }`}
            >
              {item.label}
            </span>
          </div>
        </NavLink>
      </Menu.Item>
    );
  };

  return (
    <Sider collapsedWidth="0" trigger={null} width={250} className="zIndex-1">
      <div className="siderbar-header">
        <img src={AppLogo} alt="App logo" />
      </div>

      <div className="sidebar-container mb-110px">
        <Menu mode="inline">
          {ADMIN_ROUTE.map((item, index) => renderMenu(item, index))}

          <div className="divider mb-4" />

          {OTHER_ROUTE.map((item, index) =>
            renderMenu(item, index + ADMIN_LENGTH)
          )}
        </Menu>
      </div>

      <div className="text-align-center">
        <CustomButton
          buttonTitle="Invite Users"
          type="hyperlink"
          spacing="margin-0"
          verticalSpacing="margin-0"
          onClick={() => console.log("INVITE USER IS CLICKED")}
        />

        <div className="display-flex place-center mt-48px mb-3">
          <img src={GreenDot} className="mr-2" alt="Online Icon" />
          <p className="text-12 font-w-400">Partially Degraded Service</p>
        </div>
      </div>
    </Sider>
  );
};

export default Sidenav;
