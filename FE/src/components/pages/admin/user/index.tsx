import { useGetUserQuery } from "@/api/auth";
import { IUser } from "@/interface/auth";
import { Button, Table } from "antd";
import { Link } from "react-router-dom";

const AdminUser = () => {
  const { data: userData } = useGetUserQuery();
  const dataSource = userData?.datas?.map((user: IUser) => ({
    key: user._id,
    fullname: user.fullname,
    username: user.username,
    phone: user.phone,
    address: user.address,
    email: user.email,
  }));
console.log(dataSource);
  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      render: (_text: unknown, _record: unknown, rowIndex: number) => rowIndex + 1,
    },
    {
      title: "Họ và tên",
      dataIndex: "fullname",
      key: "fullname",
    },
    {
      title: "Tên tài khoản",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
  ];

  return (
    <div>
      <header className="flex items-center justify-between mb-4">
        <h2 className="text-2xl mt-2 ml-2">Quản lý người dùng</h2>
        <Button className="m-2 mt-4" type="primary" style={{ backgroundColor: "var(--primary-color)", color: "1890ff", border: "none" }}>
          <Link to="/admin/add">Thêm admin</Link>
        </Button>
      </header>
      <Table dataSource={dataSource} columns={columns} />;
    </div>
  );
};

export default AdminUser;
