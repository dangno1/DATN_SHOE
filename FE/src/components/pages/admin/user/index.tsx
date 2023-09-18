

import { Button, Table } from "antd";
import { Link } from "react-router-dom";
import { IUser } from "../../../../interface/auth";
import { useGetUserQuery } from "../../../../api/auth";


const AdminUser = () => {
    const { data: userData } = useGetUserQuery();
    const dataSource = userData?.datas?.map((user: IUser) => ({
        key: user._id,
        fullname: user.fullname,
        username: user.username,
    }));

    const columns = [
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
            render: () => {
                return (
                    <>
                        <Button type="primary" danger className="ml-2">
                            Xóa
                        </Button>
                    </>
                );
            },
        },
    ];

    return (
        <div>
            <header className="flex items-center justify-between mb-4">
                <h2 className="text-2xl">Quản lý user</h2>
                <Button type="primary" danger>
                    <Link to="/admin/product/add">Thêm admin</Link>
                </Button>
            </header>
            <Table dataSource={dataSource} columns={columns} />;
        </div>
    );
};

export default AdminUser;