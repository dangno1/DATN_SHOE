import { RiCoupon2Line } from "react-icons/ri";
import { BiCategory } from "react-icons/bi";
import { Button, Layout, Menu } from "antd";
import { useState, } from "react";
import {
  AiOutlineMenuFold,
  AiOutlineMenuUnfold,
  AiOutlineUser,
  AiOutlineShopping,
  AiOutlineSetting,
  AiOutlineFontSize,
  AiOutlineFontColors,
  AiOutlineOrderedList,
} from "react-icons/ai";

import { TfiDashboard } from 'react-icons/tfi'

import { NavLink, Outlet } from "react-router-dom";
import { HiOutlineTrash } from "react-icons/hi2";
import { useDispatch } from "react-redux";
import { showTrashCan } from "@/app/trashcan.slice";
import { BsBoxSeam, BsPlusLg } from "react-icons/bs";

const { Header, Sider, Content } = Layout;

const LayoutAdmin = () => {
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();

  return (
    <Layout className="min-h-[100vh] w-full max-w-[100vw] ">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={250}
      >
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["3"]}
          className="h-full font-semibold"
          items={
            [
              {
                key: 1,
                label: <NavLink to="/admin">Thống kê</NavLink>,
                icon: <TfiDashboard />
              },
              {
                key: 3,
                label: <div>Sản phẩm</div>,
                icon: <BsBoxSeam />,
                children: [
                  {
                    key: 4,
                    label: <NavLink to="/admin/product" onClick={() => dispatch(showTrashCan(false))}>Danh sách Sản phẩm</NavLink>,
                    icon: <AiOutlineOrderedList />
                  },
                  {
                    key: 5,
                    label: <NavLink to="/admin/product/add">Thêm mới</NavLink>,
                    icon: <BsPlusLg />
                  },



                  {
                    key: 6,
                    label: <NavLink to="/admin/product" onClick={() => dispatch(showTrashCan(true))}>Thùng rác</NavLink>,
                    icon: <HiOutlineTrash />
                  },

                ]
              },
              {
                key: 7,
                label: <NavLink to="/admin/categoryes">Danh mục sản phẩm</NavLink>,
                icon: <BiCategory />,
              },
              {
                key: 8,
                label: <NavLink to="/admin/size">Kích cỡ</NavLink>,
                icon: <AiOutlineFontSize />
              },
              {
                key: 9,
                label: <NavLink to="/admin/color">Màu sắc</NavLink>,
                icon: <AiOutlineFontColors />
              },
              {
                key: 10,
                label: <NavLink to="/admin/users">Users</NavLink>,
                icon: <AiOutlineUser />
              },
              {
                key: 11,
                label: <NavLink to="/admin/coupons">Mã giảm giá</NavLink>,
                icon: <RiCoupon2Line />
              },
              {
                key: 15,
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
      </Sider>
      <Layout className="w-full bg-white p-1">
        <Header className="bg-white">
          <Button
            type="text"
            icon={collapsed ? <AiOutlineMenuUnfold /> : <AiOutlineMenuFold />}
            onClick={() => setCollapsed(!collapsed)}
            className="font-[16px] w-[64px] h-[64px]"
          />
        </Header>
        <Content className="w-full rounded-[20px] bg-gray-200 p-5 ">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutAdmin;
