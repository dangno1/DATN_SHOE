// import React, { useState } from "react";
import { Image, Popconfirm, Table, notification } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useGetProductsQuery, useRemoveProductMutation, useUpdateProductMutation } from "@/api/product";
import { IProduct } from "@/interface/product";
import { useGetCategoryesQuery } from "@/api/category";
import { ICategory } from "@/interface/category";
import { useNavigate } from "react-router-dom";
import { Backdrop, Button, CircularProgress } from "@mui/material";
import { HiMiniPencilSquare, HiOutlineTrash, HiPlus } from "react-icons/hi2";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { useState } from "react";
import '../index.css'

const ListProduct = () => {
  const [showTrashCan, setShowTrashCan] = useState(false)
  const { data: dataProduct } = useGetProductsQuery(showTrashCan);
  const { data: dataCategory } = useGetCategoryesQuery();
  const [updateProduct, { isLoading }] = useUpdateProductMutation();
  const [deleteProdcut, { isLoading: isLoadingDelete }] = useRemoveProductMutation();

  const navigate = useNavigate();

  const handleTrushCan = async (id: string) => {
    const product = dataProduct?.find((product: IProduct) => product._id === id)
    if (product?.isDelete === true) {
      await deleteProdcut(String(id))
      notification.success({
        message: "Xóa thành công",
        placement: "topRight",
      });
      return
    }
    await updateProduct({ ...product, isDelete: true } as IProduct)
    notification.success({
      message: "Đã di chuyển sản phẩm đến thùng rác",
      placement: "topRight",
    });
  };

  const columns: ColumnsType<IProduct> = [
    {
      title: "Hình ảnh",
      dataIndex: "image",
      key: "image",
      className: "w-[200px] max-w-max",
      render: (_, product: IProduct) =>
        < Image
          className="rounded-[10px] bg-slate-300 w-full h-full max-w-[68px]"
          src={product.image as unknown as string}
          alt="image"
        />
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
      className: "min-w-max max-w-[200px]",
      render: (name: string) =>
        <div className="truncate">
          {name}
        </div>
    },
    {
      title: "Mô tả",
      dataIndex: "desc",
      key: "desc",
      className: "w-[400px] max-w-[400px]  ",
      render: (desc) => <div dangerouslySetInnerHTML={{ __html: desc }} className="w-full max-h-[87px] overflow-y-auto scroll-hiden cursor-n-resize pr-5" />,
    },
    {
      title: "Danh mục",
      dataIndex: "categoryId",
      key: "categoryId",
      align: "center",
      render: (categoryId) => {
        const nameCate = dataCategory?.find(
          (category: ICategory) => category._id === categoryId
        );
        return categoryId && <div>{nameCate?.name}</div>;
      },
    },
    {
      title: "Hành động",
      dataIndex: "_id",
      key: "_id",
      align: "center",
      className: "w-[150px] max-w-[150px]",
      render: (_id: string) =>
        _id && (
          <div className="w-max m-auto grid grid-cols-3 place-items-center gap-3 cursor-pointer">
            <Popconfirm
              title
              description="Xóa sản phẩm?"
              okText="Yes"
              cancelText="No"
              okButtonProps={{ className: "bg-red-500 hover:!bg-red-500 active:!bg-red-700" }}
              cancelButtonProps={{ className: "border-slate-400" }}
              onConfirm={() => handleTrushCan(_id)}
            >
              <HiOutlineTrash className="stroke-red-600 w-4 h-4" />
            </Popconfirm>
            <HiMiniPencilSquare onClick={() => navigate(`update/${_id}`)} className="w-4 h-4" />
            <AiOutlineUnorderedList onClick={() => navigate(`update/${_id}`)} className="w-4 h-4" />
          </div >
        ),
    },
  ];

  const dataSource = dataProduct?.map((product: IProduct, index: number) => ({
    ...product,
    key: product._id,
    index,
  }))

  return (
    <div className="mx-5">
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading || isLoadingDelete}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className="h-[80px] min-h-[80px] max-h-[90px] grid grid-cols-2 items-center">
        <div className="h-full w-max grid items-center font-bold uppercase text-3xl ml-2 text-slate-700">Danh sách sản phẩm</div>
        <div className="grid grid-cols-[max-content_max-content] gap-2 justify-end place-items-center">
          <Button
            onClick={() => navigate("add")}
            variant="contained"
            className="float-right !font-semibold"
            startIcon={<HiPlus className="stroke-1" />}
          >
            Thêm sản phẩm
          </Button>
          <HiOutlineTrash onClick={() => setShowTrashCan(!showTrashCan)} className="stroke-red-500 w-8 h-8 cursor-pointer" />
        </div>
      </div>
      <Table columns={columns} dataSource={dataSource} pagination={{ defaultPageSize: 5 }} className="w-full max-w-[100vw] relative" />
    </div>
  );
};

export default ListProduct;