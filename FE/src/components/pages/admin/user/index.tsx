import { Button, Table } from "antd";
import { Link } from "react-router-dom";

const AdminUser = () => {
  interface DataType {
    fullname: string;
    username: string;
    email: string;
    phone: string;
    address: string;
  }

  const dataSource: DataType[] = [
    {
      fullname: "Nguyễn Đình Đăng",
      username: "dinhdang",
      phone: "0974169738",
      address: "nam dinh",
      email: "dang@gmail.com",
    },
    {
      fullname: "Phan Văn Lợi",
      username: "vanloi",
      phone: "0974169738",
      address: "nam dinh",
      email: "loi@gmail.com",
    },
    {
      fullname: "Ngô Văn Quang",
      username: "vanquang",
      phone: "0974169738",
      address: "nam dinh",
      email: "quang@gmail.com",
    },
    {
      fullname: "Nguyễn Quý Minh",
      username: "quyminh",
      phone: "0974169738",
      address: "nam dinh",
      email: "minh@gmail.com",
    },
    {
        fullname: "Doãn Trường Duy",
        username: "truongduy",
        phone: "0974169738",
        address: "nam dinh",
        email: "duy@gmail.com",
      },
    {
      fullname: "Nguyễn Hoàng Linh",
      username: "hoanglinh",
      phone: "0974169738",
      address: "nam dinh",
      email: "linh@gmail.com",
    },
      {
        fullname: "Nguyễn Văn Tùng",
        username: "vantung",
        phone: "0974169738",
        address: "nam dinh",
        email: "tung@gmail.com",
      },
    
  ];

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      render: (text, record, rowIndex) => rowIndex + 1,
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
    {
      render: () => {
        return (
          <>
          </>
        )
      },
    },
  ]

  return (
    <div>
      <header className="flex items-center justify-between mb-4">
        <h2 className="text-2xl">Quản lý user</h2>
        <Button type="primary" style={{ backgroundColor: 'var(--primary-color)', color: '1890ff', border: 'none' }}>
          <Link to="/admin/add">Thêm admin</Link>
        </Button>
      </header>
      <Table dataSource={dataSource} columns={columns} pagination={{ pageSize: 7 }} />
    </div>
  )
}

export default AdminUser;
