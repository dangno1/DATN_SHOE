import React from 'react'
import { Table, Button, Skeleton, Popconfirm, Alert } from "antd";
import { Link } from 'react-router-dom';

type Props = {}

const AdminProduct = (props: Props) => {
    const dataSource = [
        {
          key: '1',
          name: 'Giay Thoi Trang',
          price: 9999,
          description: 'New sneakers, pursuing sports-focused fashion. harness the power of sport in your lives.',
          size: 40,
        },
        {
          key: '2',
          name: 'Giay Da Bong',
          price: 9999,
          description: 'New sneakers, pursuing sports-focused fashion. harness the power of sport in your lives.',
          size: 40,
        },
     
        {
          key: '3',
          name: 'Giay Tre Em',
          price: 9999,
          description: 'New sneakers, pursuing sports-focused fashion. harness the power of sport in your lives.',
          size: 39,
        },
        {
          key: '4',
          name: 'Giay NU',
          price: 9999,
          description: 'New sneakers, pursuing sports-focused fashion. harness the power of sport in your lives.',
          size: 41,
        },
      ];
      
      const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Price',
          dataIndex: 'price',
          key: 'price',
        },
        {
          title: 'Size',
          dataIndex: 'size',
          key: 'size',
        },
        {
          title: 'Description',
          dataIndex: 'description',
          key: 'description',
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
                <h2 className="font-bold text-2xl">Quản lý sản phẩm</h2>
                <Button type="primary" danger>
                    <Link to="#" className="flex items-center space-x-2">
                        Thêm sản phẩm
                    </Link>
                </Button>
            </header>
            
        </div>
        <Table dataSource={dataSource} columns={columns} />;

    </div>
  )
}

export default AdminProduct