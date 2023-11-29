import { useAddCouponsMutation, useGetAllCouponsQuery, useRemoveCouponsMutation, useUpdateCouponsMutation } from "@/api/coupons";
import { ICoupons } from "@/interface/coupons";
import { joiResolver } from '@hookform/resolvers/joi'
import { Modal, Popconfirm, Table, Tooltip, notification } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Backdrop, Button, CircularProgress } from "@mui/material";
import { useState, useEffect, Key } from "react";
import { useForm } from "react-hook-form";
import { BsPencilSquare, BsPlus, BsPlusLg, BsSearch, BsTrash3 } from "react-icons/bs";
import couponsSchema from "@/schemas/coupons";

type NotificationType = 'success' | 'info' | 'warning' | 'error';
type FormType = { open: boolean, method: "add" | "update" | "", _id?: string }

const ListCoupons = () => {
  const [form, setForm] = useState<FormType>({ open: false, method: "" })
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
  const [couponsData, setCouponsData] = useState<ICoupons[]>([])

  const [deleteCoupons, { isLoading: loadDelete }] = useRemoveCouponsMutation();
  const [updateCoupons, { isLoading: loadUpdate, isSuccess: successUpdate }] = useUpdateCouponsMutation();
  const [addCoupons, { isLoading: loadAdd, isSuccess: successAdd }] = useAddCouponsMutation();
  const { data: couponsDatas } = useGetAllCouponsQuery<{ data: ICoupons[] }>();

  const [api, contextHolder] = notification.useNotification();
  const openNotification = (type: NotificationType, message: string) => {
    api[type]({
      message: 'Thông báo',
      description: message
    });
  };

  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    setValue,
    setError,
    formState: { errors }
  } = useForm<ICoupons>({
    resolver: joiResolver(couponsSchema)
  })

  const {
    register: registerSearch,
    handleSubmit: handleSubmitSearch
  } = useForm<{ search: string }>()

  useEffect(() => {
    reset()
  }, [reset, successAdd, successUpdate])

  useEffect(() => {
    setFocus("code")
    if (form._id && form.method === "update") {
      const coupons = couponsData.find((item: ICoupons) => item._id == form._id)
      setValue("code", String(coupons?.code))
      setValue("discountValue", Number(coupons?.discountValue))
      setValue("quantity", Number(coupons?.quantity))
      return;
    }
    reset()
  }, [form, reset, couponsData, setFocus, setValue])

  useEffect(() => {
    couponsDatas && setCouponsData(couponsDatas)
  }, [couponsDatas])

  const handleDeleteCoupons = (listId: string[]) => {
    listId.map(async (id: string) => {
      await deleteCoupons(id).unwrap().then(() => openNotification('success', "Xóa mã giảm giá thành công"))
    })
  };

  const handleAddUpdateCoupons = async (data: ICoupons) => {
    try {
      const existCoupons = couponsDatas.find(({ code }: ICoupons) => code.toLowerCase() === data.code.toLowerCase())
      const { method } = form
      if (method === "add" && !existCoupons) {
        const result = await addCoupons(data)
        "data" in result && "success" in result.data && result.data.success
          ? openNotification('success', "Thêm mã giảm giá thành công")
          : openNotification('error', "Thêm mã giảm giá thất bại, vui lòng thử lại sau")
        return
      }
      if (method === "update" && !existCoupons || (existCoupons && existCoupons._id === form._id)) {
        
        const result = await updateCoupons({ ...data, _id: form._id })
        "data" in result && "success" in result.data && result.data.success
          ? openNotification('success', "Cập nhật mã giảm giá thành công")
          : openNotification('error', "Cập nhật mã giảm giá thất bại, vui lòng thử lại sau")
        return
      }
      setError("code", { type: "exist", message: "Mã giảm giá đã tồn tại" })

    } catch (error) {
      return error
    }
  }

  const handleSearch = (data: { search?: string }) => {
    const newData = couponsDatas
      && couponsDatas.filter((item: ICoupons) => String(item.code).toLowerCase().includes(String(data.search).toLowerCase()))
    setCouponsData(newData)
  }

  const onSelectChange = (newSelectedRowKeys: Key[]) => {
    console.log(newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const columns: ColumnsType<ICoupons> = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      className: "w-[70px] max-w-[100px]",
      fixed: "left",
    },
    {
      title: "Mã giảm giá",
      dataIndex: "code",
      key: "code",
      className: "w-[250px] max-w-[250px] md:min-w-[350px] lg:min-w-[250px] lg:max-w-[300px]",
    },
    {
      title: "Giá trị mã giảm giá(%)",
      dataIndex: "discountValue",
      key: "discountValue",
      sorter: (a, b) => Number(a.discountValue) - Number(b.discountValue),
      className: "w-[250px] max-w-[250px] md:min-w-[350px] lg:min-w-[250px] lg:max-w-[250px]",
      render: (discountValue: string,) =>
        <div>
          {discountValue}%
        </div>
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      sorter: (a, b) => Number(a.quantity) - Number(b.quantity),
      showSorterTooltip: { title: "click để sắp xếp theo số lượng mã giảm giá" },
      className: "capitalize w-[150px] max-w-[150px] md:min-w-[200px] lg:min-w-[250px] lg:max-w-[250px]",
      render: (quantity: number) =>
        <div className="max-h-[45px]">
          {quantity}
        </div>
    },
    {
      title: "Thời gian cập nhật",
      dataIndex: "updatedAt",
      key: "updatedAt",
      sorter: (a, b) => Date.parse(String(a.updatedAt)) - Date.parse(String(b.updatedAt)),
      showSorterTooltip: { title: "click để sắp xếp theo ngày cập nhật" },
      render: (updatedAt: string) =>
        <div className="max-h-[45px]">
          {new Date(updatedAt).toLocaleString()}
        </div>,
      className: "capitalize w-[250px] max-w-[250px] md:min-w-[350px] lg:min-w-[250px] lg:max-w-[250px]",
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
          <div className="w-max m-auto flex gap-3 cursor-pointer">
            <Popconfirm
              title
              description="Xóa mã giảm giá?"
              okText="Yes"
              cancelText="No"
              okButtonProps={{ className: "bg-red-500 hover:!bg-red-500 active:!bg-red-700" }}
              cancelButtonProps={{ className: "border-slate-400" }}
              onConfirm={() => handleDeleteCoupons([_id])}
            >
              <Tooltip placement="top" title="Xóa">
                <BsTrash3 className="fill-red-600 w-4 h-4" />
              </Tooltip>
            </Popconfirm>
            <Tooltip placement="top" title="Cập nhật">
              <BsPencilSquare
                className="w-4 h-4 fill-gray-700 cursor-pointer"
                onClick={() => setForm({ open: true, method: "update", _id: _id })} />
            </Tooltip>
          </div >
        ),
    },
  ];
  const sortCoupons = couponsData && [...couponsData].sort((a, b) => Date.parse(String(b.updatedAt)) - Date.parse(String(a.updatedAt)))

  const dataSource = sortCoupons?.map((coupons: ICoupons, index: number) => ({
    ...coupons,
    key: coupons._id,
    index: index + 1
  }))

  return (
    <>
      <div className='h-[80px] min-h-[80px] max-h-[90px] grid grid-cols-2 items-center' >
        <div className="h-full w-max grid items-center font-bold uppercase text-base md:text-xl lg:text-3xl ml-2 text-slate-700">
          Tất cả mã giảm giá
        </div>
        <div className="grid grid-cols-[max-content_max-content] gap-2 justify-end place-items-center">
          <Button
            onClick={() => { setForm({ open: true, method: "add" }) }}
            variant="contained"
            className="float-right !font-semibold !bg-[#58b4ff] !shadow-none"
            startIcon={<BsPlus className="w-6 h-6" />}
          >
            Thêm Mới
          </Button>
        </div>
      </div>
      <div className="h-[35px] w-full my-3 flex gap-2">
        <form onSubmit={handleSubmitSearch(handleSearch)} className="w-max h-full flex items-center relative">
          <input
            type="text" placeholder="tìm kiếm theo kích thước" {...registerSearch('search')}
            className="w-[300px] h-full px-3 pr-10 rounded-md border border-gray-300 hover:border-blue-500 focus:border-blue-500 outline-none" />
          <BsSearch className="w-4 h-4 fill-gray-500 absolute top-[50%] right-3 translate-y-[-50%]" />
        </form>
        {
          selectedRowKeys.length > 0 && <div className="w-full flex items-center cursor-pointer">
            <Popconfirm
              title
              description="Xóa mã giảm giá?"
              okText="Yes"
              cancelText="No"
              okButtonProps={{ className: "bg-red-500 hover:!bg-red-500 active:!bg-red-700" }}
              cancelButtonProps={{ className: "border-slate-400" }}
              onConfirm={() => handleDeleteCoupons(selectedRowKeys as string[])}
            >
              <Tooltip placement="right" title="Xóa" className="flex place-items-center gap-1 pr-2">
                <BsTrash3 className="fill-red-500 w-4 h-4" /><span className="font-semibold hover:text-red-500">Xóa mã giảm giá</span>
              </Tooltip>
            </Popconfirm>
          </div >
        }
      </div>
      <Table
        rowSelection={rowSelection} columns={columns}
        dataSource={dataSource} pagination={{ defaultPageSize: 5 }}
        scroll={{ x: "auto" }} className="w-full rounded-lg" />
      <>
        {contextHolder}
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loadAdd || loadDelete || loadUpdate}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <Modal
          title={<div className="text-[1.7rem] uppercase text-center font-semibold mb-5">Thêm mới mã giảm giá</div>}
          centered open={form.open}
          onCancel={() => setForm({ open: false, method: "" })}
          okButtonProps={{ style: { display: "none" } }}
          cancelButtonProps={{ style: { display: "none" } }}
        >
          <form
            onSubmit={handleSubmit(handleAddUpdateCoupons)}
            className="w-full px-[20px] "
            noValidate
          >
            <div className="mb-[20px]">
              <label className="text-slate-600 font-semibold block float-left">Tên mã giảm giá</label>
              <input
                {...register("code")} type="text"
                autoFocus placeholder="Ví dụ: GIAM50..."
                className={`w-full h-[40px] mt-[5px] border border-[#d0dbf0] hover:border-gray-500  focus:outline-0 focus:border-blue-700 font-[400] rounded-[5px] text-[#12263f] placeholder:text-slate-400 right-2 px-[10px] focus:shadow-full ${errors.code && 'border border-red-500'}`}
              />
              {errors.code && <span className="text-red-500">{errors.code.message}</span>}
            </div>
            <div className="mb-[20px]">
              <label className="text-slate-600 font-semibold block float-left">Giá trị mã giảm giá(%)</label>
              <input
                {...register("discountValue")} type="number"
                autoFocus placeholder="1-100%"
                className={`w-full h-[40px] mt-[5px] border border-[#d0dbf0] hover:border-gray-500  focus:outline-0 focus:border-blue-700 font-[400] rounded-[5px] text-[#12263f] placeholder:text-slate-400 right-2 px-[10px] focus:shadow-full ${errors.discountValue && 'border border-red-500'}`}
              />
              {errors.discountValue && <span className="text-red-500">{errors.discountValue.message}</span>}
            </div>
            <div className="mb-[20px]">
              <label className="text-slate-600 font-semibold block float-left">Số lượng</label>
              <input
                {...register("quantity")} type="number"
                autoFocus placeholder="Số lượng mã giảm giá"
                className={`w-full h-[40px] mt-[5px] border border-[#d0dbf0] hover:border-gray-500  focus:outline-0 focus:border-blue-700 font-[400] rounded-[5px] text-[#12263f] placeholder:text-slate-400 right-2 px-[10px] focus:shadow-full ${errors.quantity && 'border border-red-500'}`}
              />
              {errors.quantity && <span className="text-red-500">{errors.quantity.message}</span>}
            </div>
            <div className="w-full grid items-center justify-end mt-2">
              <Button
                type="submit"
                variant="contained"
                className="w-max !font-semibold !bg-[#58b4ff] !shadow-none"
                startIcon={form.method === "update" ? <BsPencilSquare className="w-4 h-4" /> : <BsPlusLg className="w-5 h-5" />}
              >
                {form.method === "update" ? "cập nhật" : "Thêm mới"}
              </Button>
            </div>
          </form>
        </Modal>
      </>
    </>
  );
};

export default ListCoupons;