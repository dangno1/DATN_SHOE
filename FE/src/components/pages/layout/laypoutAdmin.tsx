import { useState } from "react";
import { Layout, Menu } from "antd";
import {
  AiOutlineDashboard,
  AiOutlineUser,
  AiOutlineShopping,
  AiOutlineBarChart,
  AiOutlineSetting,
  AiOutlineShoppingCart
} from "react-icons/ai";
import { Link, Outlet } from "react-router-dom";

const { Sider } = Layout;

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={toggleSidebar}
        width={250}
        theme="dark"
        className="new-sidebar"
      >
        <div className="logo">
          {collapsed ? (
            <span className="logo-text">L</span>
          ) : (
            <span className="logo-text">Admin</span>
          )}
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="vertical"
          className="new-menu"
          style={{ backgroundColor: "#2d4059" }}
        >
          <Menu.Item key="1" icon={<AiOutlineDashboard />}>
            <Link to="/admin/dashboard">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<AiOutlineUser />}>
            <Link to="/admin/users">Users</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<AiOutlineShopping />}>
            <Link to="/admin/product">Products</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<AiOutlineBarChart />}>
            <Link to="/admin/analytics">Analytics</Link>
          </Menu.Item>
          <Menu.Item key="5" icon={<AiOutlineSetting />}>
            <Link to="/admin/settings">Settings</Link>
          </Menu.Item>
          <Menu.Item key="6" icon={<AiOutlineShopping />}>
            <Link to="/admin/orders">Orders</Link>
          </Menu.Item>
          <Menu.Item key="7" icon={<AiOutlineUser />}>
            <Link to="/admin/teams">Teams</Link>
          </Menu.Item>
          <Menu.Item key="8" icon={<AiOutlineShoppingCart />}>
            <Link to="/admin/carts">Cart</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="new-site-layout">
        <Outlet />
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
