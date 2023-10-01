import { Button, Divider, Layout, Menu, theme } from "antd";
import { useState } from "react";
import {
  AiOutlineMenuFold,
  AiOutlineMenuUnfold,
  AiOutlineUser,
  AiOutlineVideoCamera,
  AiFillAccountBook,
  AiFillCalendar,
  AiFillFund,
  AiFillEdit,
} from "react-icons/ai";
import { Link, Outlet } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const LayoutAdmin = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout className="h-screen">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          className="sticky top-0"
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <AiOutlineUser />,
              label: <Link to="/admin/dashboard">Admin</Link>,
            },
            {
              key: "2",
              icon: <AiFillAccountBook />,
              label: <Link to="/admin/product">Sản phẩm</Link>,
            },
            {
              key: "3",
              icon: <AiOutlineUser />,
              label: <Link to="/admin/user">Quản lý khách hàng</Link>,
            },

            {
              key: "5",
              icon: <AiFillFund />,
              label: <Link to="/admin/statistical">Thống Kê</Link>,
            },
            {
              key: "6",
              icon: <AiFillEdit />,
              label: <Link to="/admin/oder">Quản lý đơn hàng</Link>,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <AiOutlineMenuUnfold /> : <AiOutlineMenuFold />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutAdmin;
