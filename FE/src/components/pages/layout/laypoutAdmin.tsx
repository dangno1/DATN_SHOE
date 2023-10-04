import { MdFormatSize } from "react-icons/md";
import { Button, Layout, Menu } from "antd";
import { useState } from "react";
import {
  AiOutlineMenuFold,
  AiOutlineMenuUnfold,
  AiOutlineUser,
  AiFillAccountBook,
  AiFillFund,
  AiFillEdit,
} from "react-icons/ai";
import { Link, Outlet } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const LayoutAdmin = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout className="h-screen w-full max-w-[100vw]">
      <Sider
        className="max-w-[max-content] "
        trigger={null}
        collapsible
        collapsed={collapsed}>
        <Menu
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
              icon: <MdFormatSize />,
              label: <Link to="/admin/size">Size</Link>,
            },
            {
              key: "4",
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
