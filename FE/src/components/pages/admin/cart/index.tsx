import { Table, Button } from 'antd';
import { Link } from 'react-router-dom';

const dataSource = [
    {
      key: "1",
      stt: "001",
      userName: "Nguyễn Văn A",
    },
    {
      key: "2",
      stt: "002",
      userName: "Trần Thị B",
    },
    {
      key: "3",
      stt: "003",
      userName: "Phạm Minh C",
    },
    {
      key: "4",
      stt: "004",
      userName: "Nguyễn Văn T",
    },
  ];
  

const columns = [
  {
    title: 'STT',
    dataIndex: 'stt',
    key: 'stt',
  },
  {
    title: 'User Name',
    dataIndex: 'userName',
    key: 'userName',
  },
  {
    title: 'View Shopping Cart',
    dataIndex: 'viewCart',
    key: 'viewCart',
    render: (_: any, record: { key: any; }) => (
      <Link to={`/admin/cart/user/${record.key}`}>
        <Button>View</Button>
      </Link>
    ),
  },
];

const Carts = () => {
  return (
    <>
      <h1 className="text-3xl pt-5 font-bold mb-4">
        Manage User Shopping Cart
      </h1>
      <Table dataSource={dataSource} columns={columns} />
    </>
  );
};

export default Carts;
