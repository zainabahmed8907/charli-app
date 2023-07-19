import {Layout} from "antd";
import {useLocation} from "react-router-dom";

import Header from "./Header";
import Sidenav from "./Sidenav";

const {Header: AntHeader, Content} = Layout;

function Main({children}) {
  let {pathname} = useLocation();
  pathname = pathname.replace("/", "");

  return (
    <Layout className='layout-dashboard'>
      <Sidenav />
      <Layout>
        <AntHeader className='zIndex-1'>
          <Header />
        </AntHeader>
        <Content className='content-ant'>{children}</Content>
      </Layout>
    </Layout>
  );
}

export default Main;
