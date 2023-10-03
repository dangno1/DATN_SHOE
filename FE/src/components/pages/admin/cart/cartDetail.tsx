import { Table } from "antd";

const dataSource = [
  {
    key: "001",
    orderCode: "001",
    image:
      "https://assets.adidas.com/images/w_276,h_276,f_auto,q_auto:sensitive,fl_lossy,c_fill,g_auto/27a43e53d1dc43c29df7eebc35869087_9366/IG9841_01_standard.jpg",
    product: "Giày thể thao",
    quantity: 2,
    price: "$100",
    total: "$200",
    status: "Đã xác nhận",
  },
  {
    key: "002",
    orderCode: "002",
    image:
      "https://assets.adidas.com/images/w_276,h_276,f_auto,q_auto:sensitive,fl_lossy,c_fill,g_auto/c6875e65e704417daeccb1d414cb5e21_9366/IG8980_01_standard.jpg",
    product: "Giày thể thao",
    quantity: 1,
    price: "$100",
    total: "$100",
    status: "Chưa xác nhận",
  },
  {
    key: "003",
    orderCode: "003",
    image:
      "https://assets.adidas.com/images/w_276,h_276,f_auto,q_auto:sensitive,fl_lossy,c_fill,g_auto/d24a194891044c1fb0a17d049d19b86a_9366/IE9704_01_standard.jpg",
    product: "Giày thể thao",
    quantity: 3,
    price: "$100",
    total: "$300",
    status: "Đã Giao Hàng",
  },
];

const columns = [
  {
    title: "Code Orders",
    dataIndex: "orderCode",
    key: "orderCode",
  },
  {
    title: "Products",
    dataIndex: "product",
    key: "product",
  },
  {
    title: "Images",
    dataIndex: "image",
    key: "image",
    render: (theImageURL: string | undefined) => (
      <img src={theImageURL} width={"100px"} height={"100px"} />
    ),
  },
  {
    title: "Quantitys",
    dataIndex: "quantity",
    key: "quantity",
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Totals",
    dataIndex: "total",
    key: "total",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
];

const CartAdminDetail = () => {
  return (
    <>
      <h1 className="text-3xl pt-5 font-bold mb-4">Manage User Cart</h1>
      <div>ID:</div>
      <div className="pb-5">User Name:</div>
      <Table dataSource={dataSource} columns={columns} />
    </>
  );
};

export default CartAdminDetail;
