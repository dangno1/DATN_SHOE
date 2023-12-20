import React, { useEffect, useState } from "react";
import { Statistic, Table, Space, Tabs, DatePicker } from "antd";
import { useGetOrdersQuery } from "@/api/orderedProduct";
import { valueType } from "antd/es/statistic/utils";
import ReactApexChart from "react-apexcharts";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

const { TabPane } = Tabs;

const Statistical = () => {
  const { data: orderProduct } = useGetOrdersQuery();
  const [activeTab, setActiveTab] = useState("total");
  const [chartData, setChartData] = useState([]);
  const [pendingConfirmationChartData, setChartDataStatus] = useState([]);
  const [orderSuccessfully, setOrderSuccessfully] = useState([]);
  const [pendingConfirmationCount, setPendingConfirmationCount] = useState(0);
  const [pendingConfirmationTotal, setPendingConfirmationTotal] = useState(0);
  const [priceOrderSuccessCount, setPriceOrderSuccessCount] = useState(0);
  const [priceOrderSuccess, setPriceOrderSuccess] = useState(0);
  const [canceledOrders, setCanceledOrders] = useState([]);
  const [canceledCount, setCanceledCount] = useState(0);
  const [canceledTotal, setCanceledTotal] = useState(0);
  const [monthlyChartData, setMonthlyChartData] = useState({});
  const [test, setTest] = useState([]);
  const [testCount, setTestCount] = useState(0);
  const [testPrice, setTestPrice] = useState(0);
  const [test1, setTest1] = useState([]);
  const [testCount1, setTestCount1] = useState(0);
  const [testPrice1, setTestPrice1] = useState(0);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [test2, setTest2] = useState([]);
  const [testCount2, setTestCount2] = useState(0);
  const [testPrice2, setTestPrice2] = useState(0);

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(dayjs(start).format("YYYY-MM-DD"));
    setEndDate(dayjs(end).format("YYYY-MM-DD"));
  };

  const extractMonthYear = (timer: unknown) => {
    if (timer === undefined || timer === null) {
      return "N/A";
    }
    const orderDate = new Date(String(timer));
    if (isNaN(orderDate.getTime())) {
      console.error("Invalid Date:", timer);
      return "N/A";
    }
    const year = orderDate.getFullYear();
    const month = String(orderDate.getMonth() + 1).padStart(2, "0");

    return `${year}-${month}`;
  };

  useEffect(() => {
    if (orderProduct) {
      const filteredOrders = [];
      for (const order of orderProduct) {
        const orderDate = dayjs(order.timer).format("YYYY-MM-DD");
        if (
          parseFloat(orderDate.replace(/-/g, "")) >=
            parseFloat(startDate?.replace(/-/g, "")) &&
          parseFloat(orderDate.replace(/-/g, "")) <=
            parseFloat(endDate?.replace(/-/g, ""))
        ) {
          filteredOrders.push(order);
        }
      }

      const chartData = {
        series: [
          {
            name: "Tổng Giá Đơn Hàng",
            data: filteredOrders.map((order) =>
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
              formatter: function (value: { toLocaleString: () => string }) {
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
            data: filteredOrders
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
              formatter: function (value: { toLocaleString: () => string }) {
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
            data: filteredOrders
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
              formatter: function (value: { toLocaleString: () => string }) {
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
            data: filteredOrders
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
              formatter: function (value: { toLocaleString: () => string }) {
                return value.toLocaleString() + " VND";
              },
            },
          },
        },
      };
      const test1 = {
        series: [
          {
            name: "Tổng Giá Đơn Hàng",
            data: filteredOrders
              .filter((order) => order.status === "Đơn Hàng Đang Giao Đến Bạn")
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
              formatter: function (value: { toLocaleString: () => string }) {
                return value.toLocaleString() + " VND";
              },
            },
          },
        },
      };
      const canceledOrders = {
        series: [
          {
            name: "Tổng Giá Đơn Hàng",
            data: filteredOrders
              .filter((order) => order.status === "Hủy Đơn Hàng")
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
              formatter: function (value: { toLocaleString: () => string }) {
                return value.toLocaleString() + " VND";
              },
            },
          },
        },
      };

      const test2 = {
        series: [
          {
            name: "Tổng Giá Đơn Hàng",
            data: filteredOrders
              .filter((order) => order.status === "Đã Nhận Được Hàng")
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
              formatter: function (value: { toLocaleString: () => string }) {
                return value.toLocaleString() + " VND";
              },
            },
          },
        },
      };

      const pendingConfirmationCount = filteredOrders.filter(
        (order) => order.status === "Chờ Xác Nhận"
      ).length;
      const priceOrderSuccessCount = filteredOrders.filter(
        (order) => order.status === "Đơn Hàng Đã Giao Thành Công"
      ).length;
      const testCount = filteredOrders.filter(
        (order) => order.status === "Đã Xác Nhận"
      ).length;
      const canceledCount = filteredOrders.filter(
        (order) => order.status === "Hủy Đơn Hàng"
      ).length;
      const testCount1 = filteredOrders.filter(
        (order) => order.status === "Đơn Hàng Đang Giao Đến Bạn"
      ).length;

      const testCount2 = filteredOrders.filter(
        (order) => order.status === "Đã Nhận Được Hàng"
      ).length;

      const pendingConfirmationTotal = filteredOrders
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
      const priceOrderSuccess = filteredOrders
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
      const testPrice = filteredOrders
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
      const canceledTotal = filteredOrders
        .filter((order) => order.status === "Hủy Đơn Hàng")
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

      const testPrice1 = filteredOrders
        .filter((order) => order.status === "Đơn Hàng Đang Giao Đến Bạn")
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

      const testPrice2 = filteredOrders
        .filter((order) => order.status === "Đã Nhận Được Hàngn")
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

      const ordersByMonth = filteredOrders.reduce((acc, order) => {
        const orderDate = dayjs(order.timer).format("YYYY-MM-DD");
        if (
          parseFloat(orderDate.replace(/-/g, "")) >=
            parseFloat(startDate?.replace(/-/g, "")) &&
          parseFloat(orderDate.replace(/-/g, "")) <=
            parseFloat(endDate?.replace(/-/g, ""))
        ) {
          const monthYear = extractMonthYear(order.timer);
          if (!acc[monthYear]) {
            acc[monthYear] = 1;
          } else {
            acc[monthYear]++;
          }
        }
        return acc;
      }, {});

      const monthlyChartData = {
        series: [
          {
            name: "Số Đơn Hàng",
            data: Object.values(ordersByMonth),
          },
        ],
        options: {
          chart: {
            type: "bar",
          },
          xaxis: {
            categories: Object.keys(ordersByMonth),
          },
          yaxis: {
            title: {
              text: "Số Đơn Hàng",
            },
          },
          tooltip: {
            y: {
              formatter: function (value: string) {
                return value + " đơn hàng";
              },
            },
          },
        },
      };
      setMonthlyChartData(monthlyChartData);
      setPendingConfirmationTotal(pendingConfirmationTotal);
      setPendingConfirmationCount(pendingConfirmationCount);
      setPriceOrderSuccess(priceOrderSuccess);
      setPriceOrderSuccessCount(priceOrderSuccessCount);
      setTestCount(testCount);
      setTestPrice(testPrice);
      setTestCount1(testCount1);
      setTestPrice1(testPrice1);
      setTestCount2(testCount2);
      setTestPrice2(testPrice2);
      setCanceledTotal(canceledTotal);
      setCanceledCount(canceledCount);
      setCanceledOrders(canceledOrders);
      setOrderSuccessfully(orderSuccessfully);
      setChartData(chartData);
      setChartDataStatus(pendingConfirmationChartData);
      setTest(test);
      setTest1(test1);
      setTest2(test2);
    }
  }, [orderProduct, startDate, endDate]);

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
          orderDate: order.timer,
        });
      }
    });
    return acc;
  }, []);

  const filteredOrders2 = [];
  for (const product of mostOrderedProducts) {
    const orderDate1 = dayjs(product.orderDate).format("YYYY-MM-DD");
    if (
      parseFloat(orderDate1.replace(/-/g, "")) >=
        parseFloat(startDate?.replace(/-/g, "")) &&
      parseFloat(orderDate1.replace(/-/g, "")) <=
        parseFloat(endDate?.replace(/-/g, ""))
    ) {
      filteredOrders2.push(product);
    }
  }
  // });

  const sortedMostOrderedProductsInRange = filteredOrders2.sort(
    (a, b) => b.count - a.count
  );

  const mostOrderedDataInRange = sortedMostOrderedProductsInRange.map(
    (product) => ({
      key: product._id,
      productName: product?.productName,
      count: product?.count,
      productImage: product?.productImage,
      totalValue: product?.productPrice * product?.count,
      priceProduct: product.productPrice,
    })
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
      render: (record: { key: unknown }) => (
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
          <div className="flex gap-10 mt-5 mb-5">
            <div className="p-12 bg-gray-300 rounded-xl text-black-400 text-lg">
              Tổng doanh thu:{" "}
              <span className="text-2xl">
                {(
                  priceOrderSuccess +
                  canceledTotal +
                  testPrice1 +
                  testPrice +
                  pendingConfirmationTotal
                )?.toLocaleString()}
                VND
              </span>
            </div>
            <div className="p-12 bg-gray-300 rounded-xl text-black-400 text-lg">
              Tổng doanh thu phải hoàn lại:{" "}
              <span className="text-2xl">
                {canceledTotal?.toLocaleString()}VND
              </span>
            </div>
            <div className="p-12 bg-gray-300 rounded-xl text-black-400 text-lg">
              Tổng doanh thu đã xác nhận:{" "}
              <span className="text-2xl">
                {(
                  priceOrderSuccess +
                  canceledTotal +
                  testPrice1 +
                  testPrice +
                  pendingConfirmationTotal -
                  canceledTotal
                )?.toLocaleString()}
                VND
              </span>
            </div>
          </div>
          <div>
            <h3 className=" grid items-center font-bold uppercase text-base md:text-xl lg:text-2xl text-slate-700">
              Tất Cả Đơn Hàng
            </h3>
            <DatePicker.RangePicker onChange={handleDateChange} />
            <div className="flex items-center justify-between">
              <Statistic
                className="flex font-bold text-xl gap-2"
                title="Tổng Số Đơn Hàng:"
                value={
                  pendingConfirmationCount +
                  priceOrderSuccessCount +
                  canceledCount +
                  testCount1 +
                  testCount
                }
              />
              <Statistic
                className="flex font-bold text-xl gap-2"
                title="Tổng Giá Trị:"
                value={
                  priceOrderSuccess +
                  canceledTotal +
                  testPrice1 +
                  testPrice +
                  pendingConfirmationTotal
                }
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
          <br />
          <div className="flex gap-10">
            <div className="w-3/6">
              <h3 className=" grid items-center font-bold uppercase text-base md:text-xl lg:text-2xl text-slate-700">
                Đơn Hàng Đang Giao Đến Bạn
              </h3>
              <div className="flex items-center justify-between">
                <Statistic
                  className="flex font-bold text-xl gap-2"
                  title="Số Đơn Hàng Đã Giao Thành Công:"
                  value={testCount1}
                />
                <Statistic
                  className="flex font-bold text-xl gap-2"
                  title="Tổng Giá Trị Hủy Đơn Hàng:"
                  value={testPrice1}
                  formatter={(value) => `${(+value).toLocaleString()} VND`}
                />
              </div>
              <ReactApexChart
                className="font-bold text-xl gap-2 items-center"
                options={test1?.options}
                series={test1?.series}
                type="area"
                height={350}
              />
            </div>

            <div className="w-3/6">
              <h3 className=" grid items-center font-bold uppercase text-base md:text-xl lg:text-2xl text-slate-700">
                Tất Cả Hủy Đơn Hàng
              </h3>
              <div className="flex items-center justify-between">
                <Statistic
                  className="flex font-bold text-xl gap-2"
                  title="Số Đơn Hàng Đã Giao Thành Công:"
                  value={canceledCount}
                />
                <Statistic
                  className="flex font-bold text-xl gap-2"
                  title="Tổng Giá Trị Hủy Đơn Hàng:"
                  value={canceledTotal}
                  formatter={(value) => `${(+value).toLocaleString()} VND`}
                />
              </div>
              <ReactApexChart
                className="font-bold text-xl gap-2 items-center"
                options={canceledOrders?.options}
                series={canceledOrders?.series}
                type="area"
                height={350}
              />
            </div>
          </div>
          <br />
          <div className="flex gap-10">
            <div className="w-3/6">
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
            <div className="w-3/6">
            <h3 className=" grid items-center font-bold uppercase text-base md:text-xl lg:text-2xl text-slate-700">
                Tất Cả Đơn Hàng Đã Nhận
              </h3>
              <div className="flex items-center justify-between">
                <Statistic
                  className="flex font-bold text-xl gap-2"
                  title="Số Đơn Hàng Đã Giao Thành Công:"
                  value={testCount2}
                />
                <Statistic
                  className="flex font-bold text-xl gap-2"
                  title="Tổng Giá Trị Đơn Hàng Đã Giao Thành Công:"
                  value={testPrice2}
                  formatter={(value) => `${(+value).toLocaleString()} VND`}
                />
              </div>
              <ReactApexChart
                className="font-bold text-xl gap-2 items-center"
                options={test2?.options}
                series={test2?.series}
                type="area"
                height={350}
              />
            </div>
          </div>
        </TabPane>
        <TabPane tab="Chi Tiết Đơn Hàng" key="total">
          <Table columns={columns} dataSource={data} />
        </TabPane>
        <TabPane tab="Hàng Được Đặt Nhiều Nhất" key="mostOrdered">
          <DatePicker.RangePicker onChange={handleDateChange} />
          <Table
            columns={mostOrderedColumns}
            dataSource={mostOrderedDataInRange}
          />
        </TabPane>
        <TabPane tab="Thống Kê Theo Tháng" key="byMonth">
          <div>
            <h3 className="grid items-center font-bold uppercase text-base md:text-xl lg:text-2xl text-slate-700">
              Thống Kê Theo Tháng
            </h3>
            {/* Step 1: Add Date Range Picker */}
            <DatePicker.RangePicker onChange={handleDateChange} />
            <ReactApexChart
              className="font-bold text-xl gap-2 items-center"
              options={monthlyChartData?.options}
              series={monthlyChartData?.series}
              type="bar"
              height={350}
            />
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Statistical;
