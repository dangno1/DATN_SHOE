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
  AiOutlineSetting,
  AiOutlineFontSize,
  AiOutlineFontColors,
  AiOutlineOrderedList,
} from "react-icons/ai";

import { LiaProductHunt } from 'react-icons/lia'
import { NavLink, Outlet } from "react-router-dom";
import { HiOutlineTrash } from "react-icons/hi2";

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
          className="h-full font-semibold"
          items={
            [
              {
                key: 1,
                label: <NavLink to="/admin">DashBoard</NavLink>,
                icon: <AiOutlineDashboard />
              },
              {
                key: 3,
                label: <div>Sản phẩm</div>,
                icon: <LiaProductHunt />,
                children: [
                  {
                    key: 4,
                    label: <NavLink to="/admin/product">Danh sách</NavLink>,
                    icon: <AiOutlineOrderedList />
                  },
                  {
                    key: 5,
                    label: <NavLink to="/admin/categoryes">Danh mục sản phẩm</NavLink>,
                    icon: <BiCategory />
                  },
                  {
                    key: 6,
                    label: <NavLink to="/admin/size">Kích cỡ</NavLink>,
                    icon: <AiOutlineFontSize />
                  },
                  {
                    key: 7,
                    label: <NavLink to="/admin/color">Màu sắc</NavLink>,
                    icon: <AiOutlineFontColors />
                  },
                  {
                    key: 8,
                    label: <NavLink to="/admin/coupons">Mã giảm giá</NavLink>,
                    icon: <RiCoupon2Line />
                  },
                  {
                    key: 9,
                    label: <NavLink to="/admin/product">Thùng rác</NavLink>,
                    icon: <HiOutlineTrash />
                  },

                ]
              },
              {
                key: 10,
                label: <NavLink to="/admin/users">Users</NavLink>,
                icon: <AiOutlineUser />
              },
              {
                key: 11,
                label: <NavLink to="/admin/orders">Orders</NavLink>,
                icon: <AiOutlineShopping />
              },
              {
                key: 12,
                label: <NavLink to="/admin/settings">Settings</NavLink>,
                icon: <AiOutlineSetting />
              },
            ]
          }
        />
        {
          /* <Menu.Item key="1" icon={<AiOutlineDashboard />} >
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
          </Menu> */
        }
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
