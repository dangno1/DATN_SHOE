import React, { useState } from "react";
import { Carousel, Divider, Image, Skeleton, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { TableRowSelection } from "antd/es/table/interface";
import { useGetProductsQuery, useRemoveProductMutation } from "@/api/product";
import { IProduct } from "@/interface/product";
import { useGetCategoryesQuery } from "@/api/category";
import { ICategory } from "@/interface/category";
import { MdDeleteSweep } from "react-icons/md";
import { BiEditAlt } from "react-icons/bi";
import { Link } from "react-router-dom";

const List = () => {
  const { data: dataProduct } = useGetProductsQuery();
  const { data: dataCategory } = useGetCategoryesQuery();
  const [deteteProduct] = useRemoveProductMutation();

  const handleDelete = (id: string) => {
    deteteProduct(id)
      .unwrap()
      .then(() => alert("Xóa Thành công"));
  };

  const columns: ColumnsType<IProduct> = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
      render: (_id: string) => <div>{_id}</div>,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name) => (name ? <Divider>{name}</Divider> : ""),
    },
    {
      title: "Description",
      dataIndex: "desc",
      key: "desc",
      render: (desc) => (desc ? <Divider>{desc}</Divider> : ""),
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image, { name }: IProduct) =>
        image ? (
          <Image
            className="rounded-[10px] bg-slate-300"
            src={image}
            alt={name}
            width={65}
          />
        ) : (
          <div>Không có ảnh</div>
        ),
    },
    {
      title: "Thumbnail",
      dataIndex: "thumbnail",
      key: "thumbnail",
      render: (thumbnail: string[], { name }: IProduct) => {
        return (
          <Carousel
            arrows={true}
            dotPosition="bottom"
            effect="fade"
            className="w-[65px]">
            {thumbnail.map(
              (thmbn: string): JSX.Element => (
                <Image
                  className="rounded-[10px] bg-slate-300"
                  key={thmbn}
                  src={thmbn}
                  alt={name}
                  width={65}
                />
              )
            )}
          </Carousel>
        );
      },
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
      render: (brand) => (brand ? <Divider>{brand}</Divider> : ""),
    },

    {
      title: "Category",
      dataIndex: "categoryId",
      key: "categoryId",
      render: (categoryId) => {
        const nameCate = dataCategory?.find(
          (category: ICategory) => category._id === categoryId
        );
        return categoryId ? <Divider>{nameCate?.name}</Divider> : <Skeleton />;
      },
    },
    {
      title: "Action",
      dataIndex: "_id",
      key: "_id",
      render: (_id: string) =>
        _id ? (
          <div className="grid grid-cols-2 place-items-center space-x-2 w-max">
            <button
              onClick={() => confirm("Xóa ản phẩm!") && handleDelete(_id)}
              className="p-2 bg-red-500 rounded-lg text-white grid grid-cols-2 place-items-center">
              <MdDeleteSweep className="fill-white" />
              <span>Xóa</span>
            </button>
            <button className="p-2 bg-red-500 rounded-lg text-white grid grid-cols-1 place-items-center w-max">
              <Link
                to={`update/${_id}`}
                className="grid grid-cols-2 place-items-center hover:text-white">
                <BiEditAlt className="fill-white" />
                Edit
              </Link>
            </button>
          </div>
        ) : (
          ""
        ),
    },
  ];

  // Kiểm tra loại cho selectedRowKeys và dataSource
  const selectedRowKeys: React.Key[] = [];
  const dataSource: IProduct[] = dataProduct ?? [];

  const [selectedRowKeysState, setSelectedRowKeysState] =
    useState(selectedRowKeys);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeysState(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<IProduct> = {
    selectedRowKeys: selectedRowKeysState,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: "odd",
        text: "Select Odd Row",
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          setSelectedRowKeysState(newSelectedRowKeys);
        },
      },
      {
        key: "even",
        text: "Select Even Row",
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          setSelectedRowKeysState(newSelectedRowKeys);
        },
      },
    ],
  };

  const tableProps = {
    rowSelection,
    columns,
    dataSource: dataSource?.map((product: IProduct) => ({
      key: product._id,
      ...product,
    })),
  };

  return <Table className="w-full max-w-[100vw] relative" {...tableProps} />;
};

export default List;
