import { useGetUserQuery } from "@/api/auth";
import { IUser } from "@/interface/auth";
import { Button, Table, Input, Select } from "antd";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Option } from "rc-select";

const AdminUser = () => {
  const { data: userData } = useGetUserQuery();
  const [searchText, setSearchText] = useState(''); // State to track the search text
  const [filterRole, setFilterRole] = useState('all'); // State to track the role filter

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

  // Function to update the filtered users based on the search text and role
  const updateFilteredUsers = () => {
    let filteredUsers = userData?.datas;

    if (searchText) {
      filteredUsers = filteredUsers.filter((user: IUser) => {
        const searchMatch =
          user.fullname.toLowerCase().includes(searchText.toLowerCase()) ||
          user.username.toLowerCase().includes(searchText.toLowerCase()) ||
          user.email.toLowerCase().includes(searchText.toLowerCase()) ||
          user.phone.toLowerCase().includes(searchText.toLowerCase());

        return searchMatch;
      });
    }

    if (filterRole !== 'all') {
      filteredUsers = filteredUsers.filter((user: IUser) => user.role === filterRole);
    }

    return filteredUsers;
  };

  return (
    <div>
    <header className="flex items-center justify-between mb-4">
      <h2 className="text-2xl mt-2 ml-2">Quản lý user</h2>
      <div className="flex items-center">
        <div style={{ marginRight: '10px' }}>
          <Select
            className="ml-2 text-center"
            defaultValue="all"
            style={{ width: 120 }}
            onChange={(value) => setFilterRole(value)}
            
          >
            <Option value="all">Tất cả</Option>
            <Option value="admin">Admin</Option>
            <Option value="member">Member</Option>
          </Select>
        </div>
        <Input
          type="text"
          className="p-2 ml-20 mr-2"
          placeholder="Tìm kiếm theo fullname, username, email, phone"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Button
          type="primary"
          onClick={() => setFilterRole('all')}
          // className="text-white bg-black"
          style={{
            backgroundColor: "black",
            color: "white",
            border: "none",
          }}
        >
          Tìm kiếm
        </Button>
      </div>
      <div className="flex items-center">
        <Button
          className="m-2 mt-4"
          type="primary"
          style={{
            backgroundColor: "var(--primary-color)",
            color: "1890ff",
            border: "none",
          }}
        >
          <Link to="/admin/add">Thêm admin</Link>
        </Button>
      </div>
    </header>
    <Table dataSource={updateFilteredUsers()} columns={columns} />
  </div>
  );
};

export default AdminUser;
