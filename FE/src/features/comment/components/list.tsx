import React, { useState } from "react";
import { Table } from "antd";
import "moment/locale/vi";
import { useGetAllReviewQuery } from "@/api/review";
import IReview from "@/interface/review";
import { useGetUserQuery } from "@/api/auth";
import {  useGetProductsQuery } from "@/api/product";

const CommentAdmin: React.FC = () => {
  const [itemsPerPage] = useState(5);
  const [locale] = useState("vi-VN");
  const { data: userDatas } = useGetUserQuery()

  const { data: reviewDatas } = useGetAllReviewQuery();
  const { data: productDatas } = useGetProductsQuery(false);


  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
    },
    {
      title: "Người dùng",
      dataIndex: "userId",
      key: "userId",
      render: (_id: string) => (
        <div>{
          userDatas?.datas.find(user => user._id == _id)?.fullname
          }</div>
      )
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "productId",
      key: "productId",
      render: (_id: string)=> (
        <div>
          {productDatas?.find(product=> String(product._id) == _id)?.name}
        </div>
      )
    },
    {
      title: "Nội dung bình luận",
      dataIndex: "content",
      key: "content",
      className: "max-w-[400px] max-h-[48px] overflow-y-auto scroll-hiden cursor-n-resize pr-5",
    },
    {
      title: "Số sao đánh giá",
      dataIndex: "stars",
      key: "stars",
      className: "max-w-[400px] max-h-[48px] overflow-y-auto scroll-hiden cursor-n-resize pr-5",
    },
    {
      title: "Ngày bình luận",
      dataIndex: "createdAt",
      key: "createdAt",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (date: any) =>
        new Intl.DateTimeFormat(locale, {
          hour: "numeric",
          minute: "numeric",
          weekday: "long",
          day: "numeric",
          month: "numeric",
          year: "numeric",
        }).format(new Date(date)),
    }
  ];

  // const filteredData = React.useMemo(() => {
  //   let data = commentData || [];

  //   // Lọc dữ liệu dựa trên searchText
  //   if (searchText) {
  //     const searchTextLower = searchText.toLowerCase();
  //     data = data.filter(
  //       (comment) =>
  //         comment.UserID?.username.toLowerCase().includes(searchTextLower) ||
  //         comment.ProductID?.name.toLowerCase().includes(searchTextLower) ||
  //         comment.ProductID?.brand.toLowerCase().includes(searchTextLower) ||
  //         comment.CommentContent.toLowerCase().includes(searchTextLower) ||
  //         new Intl.DateTimeFormat(locale, {
  //           hour: "numeric",
  //           minute: "numeric",
  //           weekday: "long",
  //           day: "numeric",
  //           month: "numeric",
  //           year: "numeric",
  //         })
  //           .format(new Date(comment.DatePosted))
  //           .toLowerCase()
  //           .includes(searchTextLower)
  //     );
  //   }

  //   return data;
  // }, [commentData, searchText, locale]);

  // Sử dụng filteredData trong dataSource
  // const formattedData = filteredData?.map((comment, index) => ({
  //   ...comment,
  //   index: index + 1,
  // }));

  const dataSource = reviewDatas?.map((size: IReview, index: number) => ({
    ...size,
    key: size._id,
    index: index + 1,
  }));

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl mt-2 ml-2">Quản lý đánh giá của khách hàng</h2>
      </div>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={{ defaultPageSize: itemsPerPage }}
      />
    </>
  );
};

export default CommentAdmin;
