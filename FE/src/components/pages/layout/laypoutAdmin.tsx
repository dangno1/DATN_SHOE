import { RiCoupon2Line } from "react-icons/ri";
import { BiCategory } from "react-icons/bi";
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
  AiOutlineFontSize,
  AiOutlineBgColors,

} from "react-icons/ai";
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
          className="h-full font-semibold">
          <Menu.Item key="1" icon={<AiOutlineDashboard />} >
            <Link to={"/admin"}>ADMIN</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<AiOutlineUser />} >
            <Link to="/admin/users">Users</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<AiOutlineShopping />}>
            <Link to="/admin/product">Products</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<BiCategory />}>
            <Link to="/admin/categoryes">Category</Link>
          </Menu.Item>
          <Menu.Item key="5" icon={<AiOutlineFontSize />}>
            <Link to="/admin/size">Size</Link>
          </Menu.Item>
          <Menu.Item key="6" icon={<AiOutlineBgColors />}>
            <Link to="/admin/color">Color</Link>
          </Menu.Item>
          <Menu.Item key="7" icon={<RiCoupon2Line />}>
            <Link to="/admin/coupons">Coupons</Link>
          </Menu.Item>
          <Menu.Item key="8" icon={<AiOutlineBarChart />}>
            <Link to="/admin/analytics">Analytics</Link>
          </Menu.Item>
          <Menu.Item key="9" icon={<AiOutlineSetting />}>
            <Link to="/admin/settings">Settings</Link>
          </Menu.Item>
          <Menu.Item key="10" icon={<AiOutlineShopping />}>
            <Link to="/admin/orders">Orders</Link>
          </Menu.Item>
          <Menu.Item key="11" icon={<AiOutlineUser />}>
            <Link to="/admin/teams">Teams</Link>
          </Menu.Item>
          <Menu.Item key="12" icon={<AiOutlineShoppingCart />}>
            <Link to="/admin/carts">Cart</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="w-full bg-white">
        <Header className="bg-white">
          <Button
            type="text"
            icon={collapsed ? <AiOutlineMenuUnfold /> : <AiOutlineMenuFold />}
            onClick={() => setCollapsed(!collapsed)}
            className="font-[16px] w-[64px] h-[64px]"
          />
        </Header>
        <Content className="w-full bg-gray-200 rounded-lg">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutAdmin;
