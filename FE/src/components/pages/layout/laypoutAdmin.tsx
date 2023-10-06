import { Button, Layout, Menu } from "antd";
import { useState } from "react";
import {
  AiOutlineMenuFold,
  AiOutlineMenuUnfold,
  AiOutlineUser,
  AiOutlineDashboard,
  AiOutlineShopping,
  AiOutlineBarChart,
  AiOutlineSetting,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { MdFormatSize } from "react-icons/md";
import { Link, Outlet } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const LayoutAdmin = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout className="h-max min-h-[100vh] w-full max-w-[100vw]">
      <Sider
        className="max-w-[max-content] "
        trigger={null}
        collapsible
        collapsed={collapsed}>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={["1"]}
          className="h-full">
          <Menu.Item key="1" icon={<AiOutlineDashboard />}>
            <Link to={"/admin"}>ADMIN</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<AiOutlineUser />}>
            <Link to="/admin/users">Users</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<AiOutlineShopping />}>
            <Link to="/admin/product">Products</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<MdFormatSize />}>
            <Link to="/admin/size">Size</Link>
          </Menu.Item>
          <Menu.Item key="5" icon={<AiOutlineBarChart />}>
            <Link to="/admin/analytics">Analytics</Link>
          </Menu.Item>
          <Menu.Item key="6" icon={<AiOutlineSetting />}>
            <Link to="/admin/settings">Settings</Link>
          </Menu.Item>
          <Menu.Item key="7" icon={<AiOutlineShopping />}>
            <Link to="/admin/orders">Orders</Link>
          </Menu.Item>
          <Menu.Item key="8" icon={<AiOutlineUser />}>
            <Link to="/admin/teams">Teams</Link>
          </Menu.Item>
          <Menu.Item key="9" icon={<AiOutlineShoppingCart />}>
            <Link to="/admin/carts">Cart</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="w-full">
        <Header className="bg-white">
          <Button
            type="text"
            icon={collapsed ? <AiOutlineMenuUnfold /> : <AiOutlineMenuFold />}
            onClick={() => setCollapsed(!collapsed)}
            className="font-[16px] w-[64px] h-[64px] "
          />
        </Header>
        <Content className="w-full">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutAdmin;
