import { RiCoupon2Line } from "react-icons/ri";
import { BiCategory } from "react-icons/bi";
import { Button, Layout, Menu, Popconfirm } from "antd";
import { useEffect, useState } from "react";
import { MdQueryStats } from "react-icons/md";
import {
  AiOutlineMenuFold,
  AiOutlineMenuUnfold,
  AiOutlineUser,
  AiOutlineShopping,
  AiOutlineFontSize,
  AiOutlineFontColors,
  AiOutlineOrderedList,
  AiOutlineLogout,
  AiOutlineComment,
} from "react-icons/ai";
import { CgAdidas } from "react-icons/cg";

import { NavLink, Outlet } from "react-router-dom";
import { HiOutlineTrash } from "react-icons/hi2";
import { BsBoxSeam, BsPlusLg } from "react-icons/bs";

const { Header, Sider, Content } = Layout;

const LayoutAdmin = () => {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    window.addEventListener("resize", function () {
      this.innerWidth <= 640 ? setCollapsed(true) : setCollapsed(false);
    });
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <Layout className="min-h-[100vh] w-full max-w-[100vw]">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={250}
        className="max-h-[100vh] w-[250px] !bg-white"
      >
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["3"]}
          className={`h-full font-semibold fixed top-0 max-w-[250px] ${collapsed && "max-w-[80px]"} overflow-y-auto `}
          items={
            [
              {
                key: 1,
                label: <NavLink to="/admin/statistical">Thống Kê</NavLink>,
                icon: <MdQueryStats />
              },
              {
                key: 3,
                label: <div>Sản phẩm</div>,
                icon: <BsBoxSeam />,
                children: [
                  {
                    key: 4,
                    label: <NavLink to="/admin/product">Tất cả Sản phẩm</NavLink>,
                    icon: <AiOutlineOrderedList />
                  },
                  {
                    key: 5,
                    label: <NavLink to="/admin/product/add">Thêm mới sản phẩm</NavLink>,
                    icon: <BsPlusLg />
                  },
                  {
                    key: 6,
                    label: <NavLink to="/admin/product/trashCan">Thùng rác</NavLink>,
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
                label: <NavLink to="/admin/brand">Thương hiệu</NavLink>,
                icon: <CgAdidas />,
              },
              {
                key: 9,
                label: <NavLink to="/admin/size">Kích cỡ</NavLink>,
                icon: <AiOutlineFontSize />
              },
              {
                key: 10,
                label: <NavLink to="/admin/color">Màu sắc</NavLink>,
                icon: <AiOutlineFontColors />
              },
              {
                key: 11,
                label: <NavLink to="/admin/coupons">Mã giảm giá</NavLink>,
                icon: <RiCoupon2Line />
              },
              {
                key: 12,
                label: <NavLink to="/admin/users">Khách Hàng</NavLink>,
                icon: <AiOutlineUser />
              },
              {
                key: 13,
                label: <NavLink to="/admin/orders">Đơn Hàng</NavLink>,
                icon: <AiOutlineShopping />
              },
              {
                key: 13,
                label: <NavLink to="/admin/comment">Bình luận</NavLink>,
                icon: <AiOutlineComment />
              }
            ]
          }
        />
      </Sider>
      <Layout className="w-full bg-white p-1">
        <Header className="bg-white flex justify-between">
          <Button
            type="text"
            icon={collapsed ? <AiOutlineMenuUnfold /> : <AiOutlineMenuFold />}
            onClick={() => setCollapsed(!collapsed)}
            className="font-[16px] w-[64px] h-[64px]"
          />
          {/* Nút Đăng xuất */}
          <div className="text-center mb-10 mr-5 mt-7 flex items-center">
            <Popconfirm
              title="Bạn có chắc chắn muốn đăng xuất?"
              onConfirm={handleLogout}
              okText="Yes"
              cancelText="No"
            >
              <NavLink to="/" onClick={(e) => e.preventDefault()}>
                <Button type="link">
                  {collapsed ? (
                    <AiOutlineLogout className="text-xl text-black font-semibold" />
                  ) : (
                    <div className="flex items-center">
                      <AiOutlineLogout className="text-xl text-black font-semibold" />
                      <span className="ml-2 text-base text-black font-semibold">
                        Đăng xuất
                      </span>
                    </div>
                  )}
                </Button>
              </NavLink>
            </Popconfirm>
          </div>
        </Header>
        <Content className="w-full rounded-[20px] bg-gray-200 p-5 ">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutAdmin;
