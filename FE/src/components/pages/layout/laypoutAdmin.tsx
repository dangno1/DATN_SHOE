import React, { useState } from "react";
import { Layout, Menu } from "antd";
import {
  AiOutlineDashboard,
  AiOutlineUser,
  AiOutlineShopping,
  AiOutlineBarChart,
  AiOutlineSetting,
} from "react-icons/ai";
import { Link } from "react-router-dom";

const { Sider, Content } = Layout;

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
        className="new-sidebar" // Tạo màu mới cho sidebar
      >
        <div className="logo">
          {collapsed ? (
            <span className="logo-text">L</span> // Thay đổi logo
          ) : (
            <span className="logo-text">Admin</span> // Thay đổi logo
          )}
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="vertical"
          className="new-menu" // Tạo màu mới cho menu
          style={{ backgroundColor: "#2d4059" }} // Thay đổi màu nền của menu
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
          {/* Thêm các mục menu tùy chỉnh ở đây */}
          <Menu.Item key="6" icon={<AiOutlineShopping />}>
            <Link to="/admin/orders">Orders</Link>
          </Menu.Item>
          <Menu.Item key="7" icon={<AiOutlineUser />}>
            <Link to="/admin/teams">Teams</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="new-site-layout">
  <Content style={{ margin: "16px" }}>
    <div
      className="content-background"
      style={{
        padding: 24,
        minHeight: 240, // Điều chỉnh chiều cao theo mong muốn
        backgroundImage: `url('https://t4.ftcdn.net/jpg/03/57/57/37/240_F_357573760_5pMK2dlamGFXwFPtPm3Lvu7HNWWTCXw7.jpg')`, // Thay đổi đường dẫn đến hình ảnh của bạn
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover", // Sử dụng "cover" để hình ảnh bao phủ toàn bộ phần nền và vẫn đủ chiều ngang
        backgroundPosition: "center center", // Căn chỉnh vị trí hình ảnh ở giữa
      }}
    >
      {/* Content for your admin pages */}
      {/* You can render different content based on your route */}
    </div>
  </Content>
</Layout>



    </Layout>
  );
};

export default AdminLayout;
