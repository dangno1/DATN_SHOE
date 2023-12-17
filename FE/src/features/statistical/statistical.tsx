import React, { useEffect, useState } from "react";
import { Statistic, Table, Space, Tabs, DatePicker } from "antd";
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
  const [pendingConfirmationCount, setPendingConfirmationCount] = useState(0);
  const [pendingConfirmationTotal, setPendingConfirmationTotal] = useState(0);
  const [priceOrderSuccessCount, setPriceOrderSuccessCount] = useState(0);
  const [priceOrderSuccess, setPriceOrderSuccess] = useState(0);
  const [canceledOrders, setCanceledOrders] = useState([]);
  const [canceledCount, setCanceledCount] = useState(0);
  const [canceledTotal, setCanceledTotal] = useState(0);
  const [monthlyChartData, setMonthlyChartData] = useState({});
  const [dailyChartData, setDailyChartData] = useState({});
  const [test, setTest] = useState([]);
  const [testCount, setTestCount] = useState(0);
  const [testPrice, setTestPrice] = useState(0);
  const [test1, setTest1] = useState([]);
  const [testCount1, setTestCount1] = useState(0);
  const [testPrice1, setTestPrice1] = useState(0);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    console.log("Ngày bắt đầu:", start);
    console.log("Ngày kết thúc:", end);
    setStartDate(start);
    setEndDate(end);
  };
  const extractMonthYear = (orderTime) => {
    // const dateParts = orderTime.split("T")[0].split("-");
    // const year = dateParts[0];
    // const month = dateParts[1];
    // return `${year}-${month}`;
  };

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
      const test1 = {
        series: [
          {
            name: "Tổng Giá Đơn Hàng",
            data: orderProduct
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
              formatter: function (value) {
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
            data: orderProduct
              .filter((order) => order.status === "Đơn Hàng Đã Hủy")
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
      const canceledCount = orderProduct.filter(
        (order) => order.status === "Đơn Hàng Đã Hủy"
      ).length;
      const testCount1 = orderProduct.filter(
        (order) => order.status === "Đơn Hàng Đang Giao Đến Bạn"
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
      const canceledTotal = orderProduct
        .filter((order) => order.status === "Đơn Hàng Đã Hủy")
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

      const testPrice1 = orderProduct
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

      const ordersByMonth = orderProduct.reduce((acc, order) => {
        const monthYear = extractMonthYear(order.orderTime);
        if (!acc[monthYear]) {
          acc[monthYear] = 1;
        } else {
          acc[monthYear]++;
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
              formatter: function (value) {
                return value + " đơn hàng";
              },
            },
          },
        },
      };

      const ordersByDay = orderProduct.reduce((acc, order) => {
        const orderDate = new Date(order.orderTime);
        const day = `${orderDate.getFullYear()}-${String(
          orderDate.getMonth() + 1
        ).padStart(2, "0")}-${String(orderDate.getDate()).padStart(2, "0")}`;

        if (!acc[day]) {
          acc[day] = 1;
        } else {
          acc[day]++;
        }
        return acc;
      }, {});

      const dailyChartData = {
        series: [
          {
            name: "Số Đơn Hàng",
            data: Object.values(ordersByDay),
          },
        ],
        options: {
          chart: {
            type: "bar",
          },
          xaxis: {
            categories: Object.keys(ordersByDay),
          },
          yaxis: {
            title: {
              text: "Số Đơn Hàng",
            },
          },
          tooltip: {
            y: {
              formatter: function (value) {
                return value + " đơn hàng";
              },
            },
          },
        },
      };

      setDailyChartData(dailyChartData);
      setMonthlyChartData(monthlyChartData);
      setPendingConfirmationTotal(pendingConfirmationTotal);
      setPendingConfirmationCount(pendingConfirmationCount);
      setPriceOrderSuccess(priceOrderSuccess);
      setPriceOrderSuccessCount(priceOrderSuccessCount);
      setTestCount(testCount);
      setTestPrice(testPrice);
      setTestCount1(testCount1);
      setTestPrice1(testPrice1);
      setCanceledTotal(canceledTotal);
      setCanceledCount(canceledCount);
      setCanceledOrders(canceledOrders);
      setOrderSuccessfully(orderSuccessfully);
      setChartData(chartData);
      setChartDataStatus(pendingConfirmationChartData);
      setTest(test);
      setTest1(test1);
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


  // console.log(orderProduct);
  

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
          orderDate: Date(order.timer)
        });
      }
    });
    return acc;
  }, []);  
  console.log(mostOrderedProducts);
  

  const mostOrderedProductsInRange = mostOrderedProducts.filter((product) => {
    const orderDate = new Date(product.orderDate);
    const isWithinRange =
      (!startDate || orderDate >= new Date(startDate)) &&
      (!endDate || orderDate <= new Date(endDate));
  
    return isWithinRange;
  });

  const sortedMostOrderedProductsInRange = mostOrderedProductsInRange.sort(
    (a, b) => b.count - a.count
  );

  const mostOrderedDataInRange = sortedMostOrderedProductsInRange.map(
    (product) => ({
      key: product._id,
      productName: product.productName,
      count: product.count,
      productImage: product.productImage,
      totalValue: product.productPrice * product.count,
      priceProduct: product.productPrice,
    })
  );

  console.log(mostOrderedProductsInRange);
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

  // console.log(mostOrderedData);
  

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
          {/* rtyuiop */}
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
                  title="Tổng Giá Trị Đơn Hàng Đã Hủy:"
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
                Tất Cả Đơn Hàng Đã Hủy
              </h3>
              <div className="flex items-center justify-between">
                <Statistic
                  className="flex font-bold text-xl gap-2"
                  title="Số Đơn Hàng Đã Giao Thành Công:"
                  value={canceledCount}
                />
                <Statistic
                  className="flex font-bold text-xl gap-2"
                  title="Tổng Giá Trị Đơn Hàng Đã Hủy:"
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
        <TabPane tab="Hàng Được Đặt Nhiều Nhất" key="mostOrdered">
          <DatePicker.RangePicker onChange={handleDateChange} />
          <Table
            columns={mostOrderedColumns}
            dataSource={mostOrderedDataInRange}
          />
        </TabPane>
        <TabPane tab="Thống Kê Theo Ngày" key="byDay">
          <div>
            <h3 className="grid items-center font-bold uppercase text-base md:text-xl lg:text-2xl text-slate-700">
              Thống Kê Theo Ngày
            </h3>
            <ReactApexChart
              className="font-bold text-xl gap-2 items-center"
              options={dailyChartData?.options}
              series={dailyChartData?.series}
              type="bar"
              height={350}
            />
          </div>
        </TabPane>
        <TabPane tab="Thống Kê Theo Tháng" key="byMonth">
          <div>
            <h3 className="grid items-center font-bold uppercase text-base md:text-xl lg:text-2xl text-slate-700">
              Thống Kê Theo Tháng
            </h3>
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
