import { Image, Popconfirm, Table, Tooltip, notification } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useGetProductsQuery, useRemoveProductMutation, useUpdateProductMutation } from "@/api/product";
import { IProduct } from "@/interface/product";
import { useGetCategoryesQuery } from "@/api/category";
import { ICategory } from "@/interface/category";
import { useNavigate } from "react-router-dom";
import { Backdrop, Button, CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { ITrashCan, showTrashCan } from "@/app/trashcan.slice";
import { BsArrowLeftShort, BsPencilSquare, BsTrash3, BsListUl, BsPlus, BsArrowCounterclockwise } from "react-icons/bs";
import '../index.css'

type NotificationType = 'success' | 'info' | 'warning' | 'error';

const ListProduct = () => {
  const dispatch = useDispatch()
  const trashCanState = useSelector((state: { trashCan: ITrashCan }) => state.trashCan?.value)

  const { data: dataProduct } = useGetProductsQuery(trashCanState);
  const { data: dataCategory } = useGetCategoryesQuery();
  const [updateProduct, { isLoading }] = useUpdateProductMutation();
  const [deleteProdcut, { isLoading: isLoadingDelete }] = useRemoveProductMutation();

  const navigate = useNavigate();

  const [api, contextHolder] = notification.useNotification();
  const openNotification = (type: NotificationType, message: string) => {
    api[type]({
      message: 'Thông báo',
      description: message
    });
  };

  const handleTrushCan = async (id: string, action?: string) => {
    const product = dataProduct?.find((product: IProduct) => product._id === id)
    const oldImage = [...product?.image as File[]]
    if (product?.isDelete === true && action === undefined) {
      await deleteProdcut(String(id))
      openNotification('success', 'Xóa thành công')
      return
    }

    if (action === 'recovery') {
      await updateProduct({ ...product, image: oldImage, isDelete: false, _id: id } as IProduct)
      openNotification('success', 'Khôi phục thành công')
      return
    }

    await updateProduct({ ...product, image: oldImage, isDelete: true, _id: id } as IProduct)
    openNotification('success', 'Đã di chuyển sản phẩm đến thùng rác')
  };

  const columns: ColumnsType<IProduct> = [
    {
      title: "STT",
      dataIndex: "_id",
      key: "_id",
      className: "w-[60px] max-w-[100px]",
      fixed: "left",
      align: "center",
      render: (_, product: IProduct, index: number) =>
        <div key={product._id} className="truncate">{index + 1}</div>
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
      dataIndex: "brand",
      key: "brand",
      className: "min-w-[120px] w-[150px] max-w-[150px] capitalize",
      render: (branh: string) =>
        <div className="truncate">
          {branh}
        </div>
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
              onConfirm={() => handleTrushCan(_id)}
            >
              <Tooltip placement="right" title="Xóa">
                <BsTrash3 onClick={() => handleTrushCan} className="fill-red-600 w-4 h-4" />
              </Tooltip>
            </Popconfirm>
            {trashCanState
              ? <Tooltip placement="top" title="Khôi phục">
                <BsArrowCounterclockwise onClick={() => handleTrushCan(_id, "recovery")} className="w-4 h-4" />
              </Tooltip>
              : <>
                <Tooltip placement="right" title="Sửa">
                  <BsPencilSquare onClick={() => navigate(`update/${_id}`)} className="w-4 h-4" />
                </Tooltip>
                <Tooltip placement="right" title="Chi tiết">
                  <BsListUl onClick={() => navigate(`update/${_id}`)} className="w-4 h-4" />
                </Tooltip>

              </>
            }
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
    <>
      <div className='h-[80px] min-h-[80px] max-h-[90px] grid grid-cols-2 items-center'>
        <div className="h-full w-max grid items-center font-bold uppercase text-base md:text-xl lg:text-3xl ml-2 text-slate-700">{trashCanState ? "Thùng Rác" : "Danh sách sản phẩm"}</div>
        <div className="grid grid-cols-[max-content_max-content] gap-2 justify-end place-items-center">
          <Button
            onClick={() => {
              trashCanState ? dispatch(showTrashCan(!trashCanState)) : navigate("add")
            }}
            variant="contained"
            className="float-right !font-semibold !bg-[#58b4ff] !shadow-none "
            startIcon={trashCanState ? <BsArrowLeftShort /> : <BsPlus className="w-6 h-6" />}
          >
            {trashCanState ? "Quay lại" : "Thêm Mới"}
          </Button>
          {!trashCanState && <BsTrash3 onClick={() => dispatch(showTrashCan(!trashCanState))} className="fill-slate-600 w-7 h-7 cursor-pointer" />}
        </div>
      </div>
      <Table columns={columns} dataSource={dataSource} pagination={{ defaultPageSize: 5 }} scroll={{ x: "auto" }} className="w-full rounded-lg" />
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