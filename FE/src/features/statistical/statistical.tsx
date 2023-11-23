import React, { useEffect, useState } from "react";
import { Statistic, Table, Space, Tabs } from "antd";
import { useGetOrdersQuery } from "@/api/orderedProduct";
import { valueType } from "antd/es/statistic/utils";
import ReactApexChart from "react-apexcharts";
import { Link } from "react-router-dom";

const { TabPane } = Tabs;

const Statistical = () => {
  const { data: orderProduct } = useGetOrdersQuery();
  const [activeTab, setActiveTab] = useState("total");
  const [chartData, setChartData] = useState([]);
  const [pendingConfirmationChartData, setChartDataStatus] = useState([]);
  const [orderSuccessfully, setOrderSuccessfully] = useState([]);
  const [test, setTest] = useState([]);
  const [testCount, setTestCount] = useState(0);
  const [testPrice, setTestPrice] = useState(0);
  const [pendingConfirmationCount, setPendingConfirmationCount] = useState(0);
  const [pendingConfirmationTotal, setPendingConfirmationTotal] = useState(0);
  const [priceOrderSuccessCount, setPriceOrderSuccessCount] = useState(0);
  const [priceOrderSuccess, setPriceOrderSuccess] = useState(0);

  // Dữ liệu cho biểu đồ thanh
  useEffect(() => {
    if (orderProduct) {
      // Xác định dữ liệu cho biểu đồ area
      const chartData = {
        series: [
          {
            name: "Tổng Giá Đơn Hàng",
            data: orderProduct.map((order) =>
              order.products.reduce(
                (acc, product) =>
                  acc + product.productInitialPrice * product.productQuantity,
                0
              )
            ),
          },
        ],
        options: {
          chart: {
            type: "area",
          },
          yaxis: {
            labels: {
              formatter: function (value: { toLocaleString: () => string }) {
                return value.toLocaleString() + " VND";
              },
            },
          },
          tooltip: {
            y: {
              formatter: function (value) {
                return value.toLocaleString() + " VND";
              },
            },
          },
        },
      };
      const pendingConfirmationChartData = {
        series: [
          {
            name: "Tổng Giá Đơn Hàng",
            data: orderProduct
              .filter((order) => order.status === "Chờ Xác Nhận")
              .map((order) =>
                order.products.reduce(
                  (acc, product) =>
                    acc + product.productInitialPrice * product.productQuantity,
                  0
                )
              ),
          },
        ],
        options: {
          chart: {
            type: "area",
          },
          yaxis: {
            labels: {
              formatter: function (value: { toLocaleString: () => string }) {
                return value.toLocaleString() + " VND";
              },
            },
          },
          tooltip: {
            y: {
              formatter: function (value) {
                return value.toLocaleString() + " VND";
              },
            },
          },
        },
      };
      const orderSuccessfully = {
        series: [
          {
            name: "Tổng Giá Đơn Hàng",
            data: orderProduct
              .filter((order) => order.status === "Đơn Hàng Đã Giao Thành Công")
              .map((order) =>
                order.products.reduce(
                  (acc, product) =>
                    acc + product.productInitialPrice * product.productQuantity,
                  0
                )
              ),
          },
        ],
        options: {
          chart: {
            type: "area",
          },
          yaxis: {
            labels: {
              formatter: function (value: { toLocaleString: () => string }) {
                return value.toLocaleString() + " VND";
              },
            },
          },
          tooltip: {
            y: {
              formatter: function (value) {
                return value.toLocaleString() + " VND";
              },
            },
          },
        },
      };
      const test = {
        series: [
          {
            name: "Tổng Giá Đơn Hàng",
            data: orderProduct
              .filter((order) => order.status === "Đã Xác Nhận")
              .map((order) =>
                order.products.reduce(
                  (acc, product) =>
                    acc + product.productInitialPrice * product.productQuantity,
                  0
                )
              ),
          },
        ],
        options: {
          chart: {
            type: "area",
          },
          yaxis: {
            labels: {
              formatter: function (value: { toLocaleString: () => string }) {
                return value.toLocaleString() + " VND";
              },
            },
          },
          tooltip: {
            y: {
              formatter: function (value) {
                return value.toLocaleString() + " VND";
              },
            },
          },
        },
      };
      const pendingConfirmationCount = orderProduct.filter(
        (order) => order.status === "Chờ Xác Nhận"
      ).length;
      const priceOrderSuccessCount = orderProduct.filter(
        (order) => order.status === "Đơn Hàng Đã Giao Thành Công"
      ).length;
      const testCount = orderProduct.filter(
        (order) => order.status === "Đã Xác Nhận"
      ).length;

      const pendingConfirmationTotal = orderProduct
        .filter((order) => order.status === "Chờ Xác Nhận")
        .reduce((acc, order) => {
          return (
            acc +
            order.products.reduce((productTotal, product) => {
              return (
                productTotal +
                product.productInitialPrice * product.productQuantity
              );
            }, 0)
          );
        }, 0);
      const priceOrderSuccess = orderProduct
        .filter((order) => order.status === "Đơn Hàng Đã Giao Thành Công")
        .reduce((acc, order) => {
          return (
            acc +
            order.products.reduce((productTotal, product) => {
              return (
                productTotal +
                product.productInitialPrice * product.productQuantity
              );
            }, 0)
          );
        }, 0);
      const testPrice = orderProduct
        .filter((order) => order.status === "Đã Xác Nhận")
        .reduce((acc, order) => {
          return (
            acc +
            order.products.reduce((productTotal, product) => {
              return (
                productTotal +
                product.productInitialPrice * product.productQuantity
              );
            }, 0)
          );
        }, 0);

      setPendingConfirmationTotal(pendingConfirmationTotal);
      setPendingConfirmationCount(pendingConfirmationCount);
      setPriceOrderSuccess(priceOrderSuccess);
      setPriceOrderSuccessCount(priceOrderSuccessCount);
      setOrderSuccessfully(orderSuccessfully);
      setChartData(chartData);
      setChartDataStatus(pendingConfirmationChartData);
      setTest(test);
      setTestCount(testCount);
      setTestPrice(testPrice);
    }
  }, [orderProduct]);

  // Kiểm tra nếu orderProduct không tồn tại
  if (!orderProduct) {
    return null;
  }

  // Tính tổng giá trị đơn hàng
  const total = orderProduct.reduce((acc, order) => {
    return (
      acc +
      order.products.reduce((productTotal, product) => {
        return (
          productTotal + product.productInitialPrice * product.productQuantity
        );
      }, 0)
    );
  }, 0);

  // Tính thống kê theo ngày
  // const dailyStats = orderProduct.reduce((acc, order) => {
  //   const orderDate = order.timer ? new Date(order.timer) : null;

  //   // Kiểm tra xem orderDate có là một đối tượng Date hợp lệ không
  //   if (orderDate instanceof Date && !isNaN(orderDate)) {
  //     const dateKey = orderDate.toISOString().split("T")[0];
  //     acc[dateKey] = (acc[dateKey] || 0) + 1;
  //   }

  //   return acc;
  // }, {});

  // Tính toán dữ liệu thống kê hàng được đặt nhiều nhất
  const mostOrderedProducts = orderProduct.reduce((acc, order) => {
    order.products.forEach((product) => {
      const existingProduct = acc.find(
        (p) => p.productName === product.productName
      );
      if (existingProduct) {
        existingProduct.count += product.productQuantity;
      } else {
        acc.push({
          productName: product.productName,
          count: product.productQuantity,
          productImage: product.productImage,
          productPrice: product.productPrice,
          productQuantity: product.productQuantity,
        });
      }
    });
    return acc;
  }, []);

  // Sắp xếp theo số lượng giảm dần
  const sortedMostOrderedProducts = mostOrderedProducts.sort(
    (a, b) => b.count - a.count
  );

  // Các cột cho bảng
  const columns = [
    {
      title: "Mã Đơn Hàng",
      dataIndex: "orderCode",
      key: "orderCode",
    },
    {
      title: "Tên Người Đặt",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Tổng Giá Trị",
      dataIndex: "totalValue",
      key: "totalValue",
      render: (text: valueType | undefined) => (
        <Space size="middle">
          <Statistic
            value={text}
            formatter={(value) => `${(+value).toLocaleString()} VND`}
          />
        </Space>
      ),
    },
    {
      title: "Chi Tiết Đơn Hàng",
      render: (text, record) => (
        <Space size="middle">
          <Link to={`detail/${record.key}`}>Chi Tiết</Link>
        </Space>
      ),
    },
  ];

  // Dữ liệu cho bảng
  const data = orderProduct.map((order) => ({
    key: order._id,
    orderCode: order.orderCode,
    userName: order.userName,
    totalValue: order.products.reduce((acc, product) => {
      return acc + product.productInitialPrice * product.productQuantity;
    }, 0),
  }));

  // Dữ liệu cho thống kê theo ngày
  // const dailyData = Object.entries(dailyStats).map(([date, count]) => ({
  //   date,
  //   count,
  // }));

  // Các cột cho bảng thống kê theo ngày
  // const dailyColumns = [
  //   {
  //     title: "Ngày",
  //     dataIndex: "date",
  //     key: "date",
  //   },
  //   {
  //     title: "Số Lượng Đơn Hàng",
  //     dataIndex: "count",
  //     key: "count",
  //   },
  // ];

  // Các cột cho bảng thống kê hàng được đặt nhiều nhất
  const mostOrderedColumns = [
    {
      title: "Tên Sản Phẩm",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Ảnh Sản Phẩm",
      dataIndex: "productImage",
      key: "productImage",
      render: (text: string) => (
        <img
          src={text}
          alt="Product"
          style={{ width: "100px", height: "100px" }}
        />
      ),
    },
    {
      title: "Số Lượng Đã Đặt",
      dataIndex: "count",
      key: "count",
    },
    {
      title: "Giá Sản Phẩm",
      dataIndex: "priceProduct",
      key: "priceProduct",
      render: (text: valueType | undefined) => (
        <Space size="middle">
          <Statistic
            value={text}
            formatter={(value) => `${(+value).toLocaleString()} VND`}
          />
        </Space>
      ),
    },
    {
      title: "Tổng Giá Trị",
      dataIndex: "totalValue",
      key: "totalValue",
      render: (text: valueType | undefined) => (
        <Space size="middle">
          <Statistic
            value={text}
            formatter={(value) => `${(+value).toLocaleString()} VND`}
          />
        </Space>
      ),
    },
  ];

  // Dữ liệu cho bảng thống kê hàng được đặt nhiều nhất
  const mostOrderedData = sortedMostOrderedProducts.map((product) => ({
    key: product._id,
    productName: product.productName,
    count: product.count,
    productImage: product.productImage,
    totalValue: product.productPrice * product.count,
    priceProduct: product.productPrice,
  }));

  // Hàm xử lý khi chọn tab
  const handleTabChange = (key: React.SetStateAction<string>) => {
    setActiveTab(key);
  };

  return (
    <div>
      <h2 className="h-full w-max grid items-center font-bold uppercase text-base md:text-xl lg:text-3xl ml-2 text-slate-700">
        Thống Kê Đơn Hàng
      </h2>
      <Tabs activeKey={activeTab} onChange={handleTabChange}>
        <TabPane tab="Tổng Quát">
          <div>
            <h3 className=" grid items-center font-bold uppercase text-base md:text-xl lg:text-2xl text-slate-700">
              Tất Cả Đơn Hàng
            </h3>
            <div className="flex items-center justify-between">
              <Statistic
                className="flex font-bold text-xl gap-2"
                title="Tổng Số Đơn Hàng:"
                value={orderProduct.length}
              />
              <Statistic
                className="flex font-bold text-xl gap-2"
                title="Tổng Giá Trị:"
                value={total}
                formatter={(value) => `${(+value).toLocaleString()} VND`}
              />
            </div>
            <ReactApexChart
              className="font-bold text-xl gap-2 items-center"
              options={chartData?.options}
              series={chartData?.series}
              type="area"
              height={350}
            />
          </div>
          <br />
          <div className="flex gap-10">
            <div className="w-3/6">
              <h3 className=" grid items-center font-bold uppercase text-base md:text-xl lg:text-2xl text-slate-700">
                Tất Cả Đơn Hàng Chưa Xác Nhận
              </h3>
              <div className="flex items-center justify-between">
                <Statistic
                  className="flex font-bold text-xl gap-2"
                  title="Số Đơn Hàng Chưa Xác Nhận:"
                  value={pendingConfirmationCount}
                />
                <Statistic
                  className="flex font-bold text-xl gap-2"
                  title="Tổng Giá Trị Đơn Hàng Chưa Xác Nhận:"
                  value={pendingConfirmationTotal}
                  formatter={(value) => `${(+value).toLocaleString()} VND`}
                />
              </div>
              <ReactApexChart
                className="font-bold text-xl gap-2 items-center"
                options={pendingConfirmationChartData?.options}
                series={pendingConfirmationChartData?.series}
                type="area"
                height={350}
              />
            </div>
            <div className="w-3/6">
              <h3 className=" grid items-center font-bold uppercase text-base md:text-xl lg:text-2xl text-slate-700">
                Tất Cả Đơn Hàng Đã Xác Nhận
              </h3>
              <div className="flex items-center justify-between">
                <Statistic
                  className="flex font-bold text-xl gap-2"
                  title="Số Đơn Hàng Đã Xác Nhận:"
                  value={testCount}
                />
                <Statistic
                  className="flex font-bold text-xl gap-2"
                  title="Tổng Giá Trị:"
                  value={testPrice}
                  formatter={(value) => `${(+value).toLocaleString()} VND`}
                />
              </div>
              <ReactApexChart
                className="font-bold text-xl gap-2 items-center"
                options={test?.options}
                series={test?.series}
                type="area"
                height={350}
              />
            </div>
          </div>

          <div>
            <h3 className=" grid items-center font-bold uppercase text-base md:text-xl lg:text-2xl text-slate-700">
              Tất Cả Đơn Hàng Đã Giao Thành Công
            </h3>
            <div className="flex items-center justify-between">
              <Statistic
                className="flex font-bold text-xl gap-2"
                title="Số Đơn Hàng Đã Giao Thành Công:"
                value={priceOrderSuccessCount}
              />
              <Statistic
                className="flex font-bold text-xl gap-2"
                title="Tổng Giá Trị Đơn Hàng Đã Giao Thành Công:"
                value={priceOrderSuccess}
                formatter={(value) => `${(+value).toLocaleString()} VND`}
              />
            </div>
            <ReactApexChart
              className="font-bold text-xl gap-2 items-center"
              options={orderSuccessfully?.options}
              series={orderSuccessfully?.series}
              type="area"
              height={350}
            />
          </div>
        </TabPane>
        <TabPane tab="Chi Tiết Đơn Hàng" key="total">
          <Table columns={columns} dataSource={data} />
        </TabPane>
        {/* <TabPane tab="Thống Kê Theo Ngày" key="byDay">
          <Table columns={dailyColumns} dataSource={dailyData} />
        </TabPane> */}
        <TabPane tab="Hàng Được Đặt Nhiều Nhất" key="mostOrdered">
          <Table columns={mostOrderedColumns} dataSource={mostOrderedData} />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Statistical;
