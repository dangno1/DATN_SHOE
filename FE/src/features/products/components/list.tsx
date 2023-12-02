import { Image, Popconfirm, Table, Tooltip, notification } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useGetProductsQuery, useRemoveProductMutation, useUpdateProductMutation } from "@/api/product";
import { IProduct } from "@/interface/product";
import { useGetCategoryesQuery } from "@/api/category";
import { ICategory } from "@/interface/category";
import { useNavigate, useLocation } from "react-router-dom";
import { Backdrop, Button, CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { ITrashCan, showTrashCan } from "@/app/trashcan.slice";
import { BsPencilSquare, BsTrash3, BsListUl, BsPlus, BsArrowCounterclockwise, BsSearch } from "react-icons/bs";
import '../index.css'
import { Key, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useGetBrandsQuery } from "@/api/brand";
import { IBrand } from "@/interface/brand";

type NotificationType = 'success' | 'info' | 'warning' | 'error';

const ListProduct = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
  const [productData, setProductData] = useState<IProduct[]>()


  const dispatch = useDispatch()
  const trashCanState = useSelector((state: { trashCan: ITrashCan }) => state.trashCan?.value)

  const { data: productDataApi } = useGetProductsQuery(trashCanState);
  const { data: dataCategory } = useGetCategoryesQuery();
  const { data: brandDatas } = useGetBrandsQuery();
  const [updateProduct, { isLoading }] = useUpdateProductMutation();
  const [deleteProdcut, { isLoading: isLoadingDelete }] = useRemoveProductMutation();

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { handleSubmit, register } = useForm<{ search?: string }>()

  useEffect(() => {
    productDataApi && setProductData(productDataApi)
    setSelectedRowKeys([])
  }, [productDataApi])

  useEffect(() => {
    pathname === '/admin/product/trashCan'
      ? dispatch(showTrashCan(true))
      : dispatch(showTrashCan(false))
  }, [dispatch, pathname])

  const [api, contextHolder] = notification.useNotification();
  const openNotification = (type: NotificationType, message: string) => {
    api[type]({
      message: 'Thông báo',
      description: message
    });
  };

  const handleTrushCan = async (listId: string[]) => {
    listId.map(async (id: string) => {
      const product = productDataApi?.find((product: IProduct) => product._id === id)
      const oldImage = [...product?.image as File[]]
      await updateProduct({ ...product, image: oldImage, isDelete: true, _id: id } as IProduct).unwrap().then(() => openNotification('success', 'Đã di chuyển sản phẩm đến thùng rác'))
    })
  };

  const handleDelete = (listId: string[]) => {
    listId.map(async (id: string) => {
      await deleteProdcut(String(id)).unwrap().then(() => openNotification('success', 'Xóa thành công'))
    })
  }

  const handleRecovery = (listId: string[]) => {
    listId.map(async (id: string) => {
      const product = productDataApi?.find((product: IProduct) => product._id === id)
      const oldImage = [...product?.image as File[]]
      await updateProduct({ ...product, image: oldImage, isDelete: false, _id: id } as IProduct).unwrap().then(() => openNotification('success', 'Khôi phục thành công'))
    })
  }

  const handleSearch = (data: { search?: string }) => {
    const dataSearch = String(data.search).toLowerCase()
    const categorys = dataCategory?.find((item: ICategory) => item.name.toLowerCase().includes(dataSearch))
    const newProduct = productDataApi?.filter(({ name, brandId, categoryId }: IProduct) => {
      return name.toLowerCase().includes(dataSearch) || brandId.toLowerCase().includes(dataSearch) || (categorys && categoryId == String(categorys._id))
    })
    setProductData(newProduct)
  }

  const onSelectChange = (newSelectedRowKeys: Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const columns: ColumnsType<IProduct> = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      className: "w-[60px] max-w-[100px]",
      fixed: "left",
      align: "center"
    },
    {
      title: "Hình ảnh",
      dataIndex: "image",
      key: "image",
      className: "min-w-[100px] w-[120px] max-w-[150px]",
      render: (image: string) =>
        < Image
          className="rounded-[10px] bg-slate-300 w-full max-w-[68px] !h-[68px] max-h-[68px] object-cover "
          src={image}
          alt="image"
        />
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
      className: "capitalize w-[130px] max-w-[130px] md:min-w-[200px] lg:min-w-[200px] lg:max-w-[200px]",
      render: (name: string) =>
        <div className="max-h-[45px] overflow-y-auto scroll-hiden cursor-n-resize">
          {name}
        </div>
    },
    {
      title: "Mô tả",
      dataIndex: "desc",
      key: "desc",
      className: "min-w-[100px] w-max max-w-[500px]",
      render: (desc) =>
        <div dangerouslySetInnerHTML={{ __html: desc }}
          className="max-h-[48px] overflow-y-auto scroll-hiden cursor-n-resize pr-5"
        />,
    },
    {
      title: "Danh mục",
      dataIndex: "categoryId",
      key: "categoryId",
      className: "min-w-[100px] w-[150px] max-w-[150px] capitalize",
      render: (categoryId) => {
        const nameCate = dataCategory?.find(
          (category: ICategory) => category._id === categoryId
        );
        return categoryId && <div className="truncate">{nameCate?.name}</div>;
      },
    },
    {
      title: "Thương hiệu",
      dataIndex: "brandId",
      key: "brandId",
      className: "min-w-[120px] w-[150px] max-w-[150px] capitalize",
      render: (brandId) => {
        const nameBrand = brandDatas?.find(
          (brand: IBrand) => brand._id === brandId
        );
        return brandId && <div className="truncate">{nameBrand?.name}</div>;
      },
    },
    {
      title: "Hành động",
      dataIndex: "_id",
      key: "_id",
      align: "center",
      className: "w-auto",
      fixed: "right",
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
              onConfirm={() => trashCanState ? handleDelete([_id]) : handleTrushCan([_id])}
            >
              <Tooltip placement="right" title="Xóa">
                <BsTrash3 className="fill-red-600 w-4 h-4" />
              </Tooltip>
            </Popconfirm>
            {trashCanState
              ? <Tooltip placement="top" title="Khôi phục">
                <BsArrowCounterclockwise onClick={() => handleRecovery([_id])} className="w-4 h-4" />
              </Tooltip>
              : <>
                <Tooltip placement="right" title="Sửa">
                  <BsPencilSquare onClick={() => navigate(`update/${_id}`)} className="w-4 h-4" />
                </Tooltip>
                <Tooltip placement="right" title="Chi tiết">
                  <BsListUl onClick={() => navigate(`detail/${_id}`)} className="w-4 h-4" />
                </Tooltip>
              </>
            }
          </div >
        ),
    },
  ];

  const dataSource = productData?.map((product: IProduct, index: number) => ({
    ...product,
    key: product._id,
    index: index + 1,
  }))

  return (
    <>
      <div className='h-[80px] min-h-[80px] max-h-[90px] grid grid-cols-2 items-center'>
        <div className="h-full w-max grid items-center font-bold uppercase text-base md:text-xl lg:text-3xl ml-2 text-slate-700 select-none">
          {trashCanState ? "Thùng Rác" : "Tất cả sản phẩm"}
        </div>
        <div className="grid grid-cols-[max-content_max-content] gap-2 justify-end place-items-center">
          {!trashCanState
            && <Button
              onClick={() => {
                trashCanState ? dispatch(showTrashCan(!trashCanState)) && navigate('/admin/product') : navigate("add")
              }}
              variant="contained"
              className="float-right !font-semibold !bg-[#58b4ff] !shadow-none select-none"
              startIcon={<BsPlus className="w-6 h-6" />}
            >
              Thêm Mới
            </Button>}
        </div>
      </div >
      <div className="h-[35px] w-full my-3 flex gap-2">
        <form onSubmit={handleSubmit(handleSearch)} className="w-max h-full flex items-center relative">
          <input
            type="text" placeholder="Tìm kiếm sản phẩm" {...register('search')}
            className="w-[300px] h-full px-3 pr-10 rounded-md border border-gray-300 hover:border-blue-500 focus:border-blue-500 outline-none" />
          <BsSearch className="w-4 h-4 fill-gray-500 absolute top-[50%] right-3 translate-y-[-50%]" />
        </form>
        {
          selectedRowKeys.length > 0
          && <div className="w-full flex items-center  cursor-pointer">
            <Popconfirm
              title
              description="Xóa sản phẩm?"
              okText="Yes"
              cancelText="No"
              okButtonProps={{ className: "bg-red-500 hover:!bg-red-500 active:!bg-red-700" }}
              cancelButtonProps={{ className: "border-slate-400" }}
              onConfirm={() => trashCanState ? handleDelete(selectedRowKeys as string[]) : handleTrushCan(selectedRowKeys as string[])}
              className="flex place-items-center gap-1 pr-2"
            >
              <BsTrash3 className="fill-red-500 w-4 h-4" /><span className="font-semibold hover:text-red-500 select-none">Xóa sản phẩm</span>
            </Popconfirm>
            {
              trashCanState
              && <div
                onClick={() => handleRecovery(selectedRowKeys as string[])}
                className="flex place-items-center gap-1 pr-2 before:w-[1px] before:h-[15px] before:bg-gray-500">
                <BsArrowCounterclockwise className="fill-blue-500 w-4 h-4" />
                <span className="font-semibold hover:text-blue-500 select-none">Khôi phục</span>
              </div>
            }
          </div >
        }
      </div >
      <Table rowSelection={rowSelection} columns={columns} dataSource={dataSource} pagination={{ defaultPageSize: 5 }} scroll={{ x: "auto" }} className="w-full rounded-lg" />
      <>
        {contextHolder}
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading || isLoadingDelete}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </>
    </>
  );
};
export default ListProduct;