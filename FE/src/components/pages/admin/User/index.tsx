import React from 'react'
import { Table, Button, Popconfirm } from "antd";
import { Link } from 'react-router-dom';

type Props = {}

const User = (props: Props) => {
    const dataSource = [
        {
            key: '1',
            name: 'DANG',
            email: 'Dang@gamil.com',
            pass: "1234567",
        },
        {
            key: '2',
            name: 'Linh',
            email: 'Linhg@gamil.com',
            pass: "1234567",
        },

        {
            key: '3',
            name: 'Loi',
            email: 'Loig@gamil.com',
            pass: "1234567",
        },
        {
            key: '4',
            name: 'Quang',
            email: 'Quang@gamil.com',
            pass: "1234567",
        },
    ];

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'PassWord',
            dataIndex: 'pass',
            key: 'pass',
        },
        {
            title: "Action",
            render: ({ key: id }: any) => {
                return (
                    <>
                        <div className="flex space-x-2">
                            <Popconfirm
                                title="Are you fucking sure?"
                                onConfirm={() => confirm(id)}
                                okText="Yes"
                                cancelText="No"
                            >
                                <Button type="primary" danger>
                                    Xóa
                                </Button>
                            </Popconfirm>

                            <Button type="primary" danger>
                                <Link to={`#`}>Sửa</Link>
                            </Button>
                        </div>
                    </>
                );
            },
        },
    ];

    return (
        <div>
            <div>
                <header className="mb-4 flex justify-between items-center">
                    <h2 className="font-bold text-2xl">Quản lý User</h2>
                </header>
            </div>
            <Table dataSource={dataSource} columns={columns} />;

        </div>
    )
}

export default User