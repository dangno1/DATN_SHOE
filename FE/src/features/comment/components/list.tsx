import React, { useEffect, useState } from "react";
import { Table, Button, Popconfirm, notification, Checkbox, Input } from "antd";
import {
  useGetCommentsQuery,
  useDeleteCommentAdminMutation,
  useDeleteCommentsAdminMutation,
} from "@/api/comment";
import "moment/locale/vi";

const { Search } = Input;

type NotificationType = "success" | "info" | "warning" | "error";

const CommentAdmin: React.FC = () => {
  const {
    data: commentData,
    isLoading,
    isError,
    refetch,
  } = useGetCommentsQuery();
  const [selectedComments, setSelectedComments] = useState<string[]>([]);
  const [deleteCommentAdmin] = useDeleteCommentAdminMutation();
  const [deleteCommentsAdmin] = useDeleteCommentsAdminMutation();
  const [selectAll, setSelectAll] = useState(false);
  const [itemsPerPage] = useState(5);
  const [locale] = useState("vi-VN");
  const [searchText, setSearchText] = useState("");

  const openNotification = (type: NotificationType, message: string) => {
    notification[type]({
      message: "Thông báo",
      description: message,
    });
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      await deleteCommentAdmin(commentId).unwrap();
      openNotification("success", "Xóa comment thành công");
      refetch();
    } catch (error) {
      console.error("Error deleting comment", error);
      openNotification("error", "Có lỗi xảy ra khi xóa comment");
    }
  };

  const handleCheckboxChange = (commentId: string) => {
    const isSelected = selectedComments.includes(commentId);
    setSelectedComments((prevSelected) =>
      isSelected
        ? prevSelected.filter((id) => id !== commentId)
        : [...prevSelected, commentId]
    );
  };

  const handleSelectAllChange = () => {
    setSelectAll(!selectAll);

    // Lọc và chọn tất cả các comment hiển thị trên trang
    const visibleItems = commentData?.slice(0, itemsPerPage);
    const visibleItemIds =
      visibleItems?.map((comment) => String(comment._id)) || [];
    setSelectedComments(selectAll ? [] : visibleItemIds);
  };

  const handleDeleteSelected = async () => {
    try {
      const commentIDs = selectedComments;

      if (
        !commentIDs ||
        !Array.isArray(commentIDs) ||
        commentIDs.length === 0
      ) {
        console.error("Invalid commentIDs:", commentIDs);
        return;
      }

      console.log("Sending commentIDs:", commentIDs);

      // Thực hiện xóa các sản phẩm đã chọn trên trang hiện tại
      await deleteCommentsAdmin(commentIDs).unwrap();
      setSelectedComments([]);
      setSelectAll(false);
      openNotification("success", "Xóa các comment đã chọn thành công");
      // Sau khi xóa thành công, tải lại dữ liệu mới
      refetch();
    } catch (error) {
      console.error("Error deleting selected comments", error);
      openNotification("error", "Có lỗi xảy ra khi xóa các comment đã chọn");
    }
  };

  const columns = [
    {
      title: <Checkbox checked={selectAll} onChange={handleSelectAllChange} />,
      key: "selectAll",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (_: any, record: any) => (
        <Checkbox
          checked={selectedComments.includes(record._id)}
          onChange={() => handleCheckboxChange(record._id)}
        />
      ),
    },
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
    },
    {
      title: "Người dùng",
      dataIndex: "UserID",
      key: "UserID",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (userId: any) => userId?.username,
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "ProductID",
      key: "ProductID",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (ProductID: any) => ProductID?.name,
    },
    {
      title: "Thương hiệu",
      dataIndex: "ProductID",
      key: "ProductID",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (ProductID: any) => ProductID?.brand,
    },
    {
      title: "Nội dung bình luận",
      dataIndex: "CommentContent",
      key: "CommentContent",
    },
    {
      title: "Ngày bình luận",
      dataIndex: "DatePosted",
      key: "DatePosted",
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
    },
    {
      title: "Hành động",
      key: "action",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (_: any, record: any) => (
        <Popconfirm
          title="Bạn chắc chắn muốn xóa comment này không?"
          onConfirm={() => handleDeleteComment(record._id)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="link" danger>
            Xóa
          </Button>
        </Popconfirm>
      ),
    },
  ];

  const filteredData = React.useMemo(() => {
    let data = commentData || [];

    // Lọc dữ liệu dựa trên searchText
    if (searchText) {
      const searchTextLower = searchText.toLowerCase();
      data = data.filter(
        (comment) =>
          comment.UserID?.username.toLowerCase().includes(searchTextLower) ||
          comment.ProductID?.name.toLowerCase().includes(searchTextLower) ||
          comment.ProductID?.brand.toLowerCase().includes(searchTextLower) ||
          comment.CommentContent.toLowerCase().includes(searchTextLower) ||
          new Intl.DateTimeFormat(locale, {
            hour: "numeric",
            minute: "numeric",
            weekday: "long",
            day: "numeric",
            month: "numeric",
            year: "numeric",
          })
            .format(new Date(comment.DatePosted))
            .toLowerCase()
            .includes(searchTextLower)
      );
    }

    return data;
  }, [commentData, searchText, locale]);

  // Sử dụng filteredData trong dataSource
  const formattedData = filteredData?.map((comment, index) => ({
    ...comment,
    index: index + 1,
  }));

  useEffect(() => {
    if (isError) {
      openNotification("error", "Có lỗi xảy ra khi tải danh sách comment");
    }
  }, [isError]);

  return (
    <>
      <div className="flex items-center justify-between mb-4">
  <h2 className="text-2xl mt-2 ml-2">Quản lý bình luận của khách hàng</h2>
</div>

<div className="flex justify-center mb-3">
  <div className="flex" style={{ marginRight: '8px' }}>
    <Search
      placeholder="Tìm kiếm"
      onChange={(e) => setSearchText(e.target.value)}
    />
  </div>
  
</div>

<Table
  columns={columns}
  dataSource={formattedData}
  pagination={{ defaultPageSize: itemsPerPage }}
  loading={isLoading}
  rowKey={(record) => record._id}
/>
<div>
    <Button type="primary" danger onClick={handleDeleteSelected}>
      Xóa bình luận
    </Button>
  </div>
    </>
  );
};

export default CommentAdmin;
