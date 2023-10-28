import { useGetUserQuery } from "@/api/auth";
import { IUser } from "@/interface/auth";
import { Button, Table } from "antd";
import { Link } from "react-router-dom";
import { useState } from "react";

const AdminUser = () => {
  const { data: userData } = useGetUserQuery();
  const [filterRole, setFilterRole] = useState('all'); // Sử dụng state để theo dõi vai trò được lọc

  // Lọc danh sách người dùng dựa trên vai trò được chọn
  const filteredUsers = userData?.datas?.filter((user: IUser) => {
    if (filterRole === 'all') {
      return true; // Hiển thị tất cả người dùng
    } else {
      return user.role === filterRole;
    }
  });

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      render: (_text: unknown, _record: unknown, rowIndex: number) => rowIndex + 1,
    },
    {
      title: "fullname",
      dataIndex: "fullname",
      key: "fullname",
    },
    {
      title: "username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ];

  return (
    <div>
    <header className="flex items-center justify-between mb-4">
      <h2 className="text-2xl mt-2 ml-2">Quản lý user</h2>
      <div className="flex items-center">
        <select className="p-2 " onChange={(e) => setFilterRole(e.target.value)} style={{ margin: '0 auto',}} >
          <option value="all">Tất cả</option>
          <option value="admin">Admin</option>
          <option value="member">Member</option>
        </select>
      </div>
      <div className="flex items-center">
        <Button className="m-2 mt-4" type="primary" style={{ backgroundColor: "var(--primary-color)", color: "1890ff", border: "none" }}>
          <Link to="/admin/add">Thêm admin</Link>
        </Button>
      </div>
    </header>
    <Table dataSource={filteredUsers} columns={columns} />
  </div>
  );
};

export default AdminUser;
