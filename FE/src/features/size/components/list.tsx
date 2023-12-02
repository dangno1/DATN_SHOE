/* eslint-disable react-hooks/exhaustive-deps */
import { useAddSizeMutation, useGetSizesQuery, useRemoveSizeMutation, useUpdateSizeMutation } from "@/api/size";
import { ISize } from "@/interface/size";
import { Modal, Popconfirm, Table, Tooltip, notification } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Backdrop, Button, CircularProgress } from "@mui/material";
import { useState, useEffect, Key } from "react";
import { useForm } from "react-hook-form";
import { BsPencilSquare, BsPlus, BsPlusLg, BsSearch, BsTrash3 } from "react-icons/bs";
import { joiResolver } from "@hookform/resolvers/joi";
import sizeSchema from "@/schemas/size";

type NotificationType = 'success' | 'info' | 'warning' | 'error';
type FormType = { open: boolean, method: "add" | "update" | "", _id?: string }

const ListSize = () => {
  const [form, setForm] = useState<FormType>({ open: false, method: "" })
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
  const [sizeData, setSizeData] = useState<ISize[]>()

  const [deleteSize, { isLoading: loadDelete }] = useRemoveSizeMutation();
  const [updateSize, { isLoading: loadUpdate }] = useUpdateSizeMutation();
  const [addSize, { isLoading: loadAdd, isSuccess: successAdd }] = useAddSizeMutation();
  const { data: sizeDatas } = useGetSizesQuery<{ data: ISize[] }>();

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
    setValue,
    setFocus,
    setError,
    formState: { errors } } = useForm<ISize>({
      resolver: joiResolver(sizeSchema)
    })

  const {
    register: registerSearch,
    handleSubmit: handleSubmitSearch
  } = useForm<{ search: string }>()

  useEffect(() => {
    reset()
  }, [reset, successAdd])

  useEffect(() => {
    form.method.length && setFocus("value");
    const updateSize = sizeData?.find((item: ISize) => item._id == form._id)?.value
    form.method === "update" && sizeData ? setValue("value", Number(updateSize)) : reset()
  }, [form, reset, setFocus, setValue])

  useEffect(() => {
    sizeDatas && setSizeData(sizeDatas)
  }, [sizeDatas])

  const handleDeleteSize = (listId: string[]) => {
    listId.map(async (id: string) => {
      await deleteSize(id).unwrap().then(() => openNotification('success', "Xóa kích cỡ thành công"))
    }
    )

  };

  const handleAddUpdateSize = async (data: ISize) => {
    try {
      const existSize = sizeDatas.find(({ value }: ISize) => value === data.value)

      const { method } = form
      if (method === "add" && !existSize) {
        const result = await addSize(data)
        "data" in result && "success" in result.data && result.data.success
          ? openNotification('success', "Thêm kích cỡ thành công")
          : openNotification('error', "Thêm kích cỡ thất bại, vui lòng thử lại")
        return
      }

      if (method === "update" && !existSize || (existSize && existSize._id === form._id)) {
        const result = await updateSize({ ...data, _id: form._id })
        "data" in result && "success" in result.data && result.data.success
          ? openNotification('success', "Cập nhật kích cỡ thành công")
          : openNotification('error', "Cập nhật kích cỡ thất bại, vui lòng thử lại")
        return
      }
      setError("value", { type: "exist", message: "Kích cỡ đã tồn tại" })
    } catch (error) {
      return error
    }
  }

  const handleSearch = (data: { search?: string }) => {
    const newData = sizeDatas && sizeDatas.filter((item: ISize) => String(item.value).toLowerCase().includes(String(data.search).toLowerCase()))
    setSizeData(newData)
  }

  const onSelectChange = (newSelectedRowKeys: Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    getCheckboxProps: (size: ISize) => ({
      disabled: size.products?.length as number > 0,
    }),
  };

  const columns: ColumnsType<ISize> = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      className: "w-[100px] max-w-[100px]",
      fixed: "left",
    },
    {
      title: "Kích cỡ",
      dataIndex: "value",
      key: "value",
      sorter: (a, b) => a.value - b.value,
      showSorterTooltip: { title: "click để sắp xếp theo kích thước" },
      className: "w-[450px] max-w-[450px]",
      render: (value: string, size: ISize) =>
        <div className="flex items-center gap-2">
          <BsPencilSquare
            className="w-3 h-3 fill-orange-600 cursor-pointer"
            onClick={() => {
              setFocus("value")
              setForm({ open: true, method: "update", _id: String(size._id) })
            }} />
          {value}
        </div>
    },
    {
      title: "Thời gian cập nhật",
      dataIndex: "updatedAt",
      key: "updatedAt",
      sorter: (a, b) => Date.parse(String(a.updatedAt)) - Date.parse(String(b.updatedAt)),
      showSorterTooltip: { title: "click để sắp xếp theo ngày cập nhật" },
      className: "w-[450px] max-w-[450px]",
      render: (updatedAt: string) =>
        <div className="max-h-[45px]">
          {new Date(updatedAt).toLocaleString()}
        </div>,
    },
    {
      title: "Hành động",
      dataIndex: "_id",
      key: "_id",
      align: "center",
      className: "w-auto",
      fixed: "right",
      render: (_id: string, size: ISize) =>
        _id && (
          <div className="w-max m-auto flex gap-3 cursor-pointer">
            {!size.products?.length ? <Popconfirm
              title
              description="Xóa kích cỡ?"
              okText="Yes"
              cancelText="No"
              okButtonProps={{ className: "bg-red-500 hover:!bg-red-500 active:!bg-red-700" }}
              cancelButtonProps={{ className: "border-slate-400" }}
              onConfirm={() => handleDeleteSize([_id])}
            >
              <Tooltip placement="right" title="Xóa">
                <BsTrash3 className="fill-red-600 w-4 h-4" />
              </Tooltip>
            </Popconfirm> : <div className="w-max h-max p-1 bg-red-500 text-white rounded-lg">Không thể xóa</div>}
          </div >
        ),
    },
  ];

  const sortSize = sizeData && [...sizeData].sort((a, b) => Date.parse(String(b.updatedAt)) - Date.parse(String(a.updatedAt)))

  const dataSource = sortSize?.map((size: ISize, index: number) => ({
    ...size,
    key: size._id,
    index: index + 1
  }))

  return (
    <>
      <div className='h-[80px] min-h-[80px] max-h-[90px] grid grid-cols-2 items-center' >
        <div className="h-full w-max grid items-center font-bold uppercase text-base md:text-xl lg:text-3xl ml-2 text-slate-700">
          Tất cả Kích cỡ
        </div>
        <div className="grid grid-cols-[max-content_max-content] gap-2 justify-end place-items-center">
          <Button
            onClick={() => setForm({ open: true, method: "add" })}
            variant="contained"
            className="float-right !font-semibold !bg-[#58b4ff] !shadow-none "
            startIcon={<BsPlus className="w-6 h-6" />}
          >
            Thêm Mới
          </Button>
        </div>
      </div>
      <div className="h-[35px] w-full my-3 flex gap-2">
        <form onSubmit={handleSubmitSearch(handleSearch)} className="w-max h-full flex items-center relative">
          <input
            type="number" placeholder="tìm kiếm theo kích cỡ" {...registerSearch('search')}
            className="w-[300px] h-full px-3 pr-10 rounded-md border border-gray-300 hover:border-blue-500 focus:border-blue-500 outline-none" />
          <BsSearch className="w-4 h-4 fill-gray-500 absolute top-[50%] right-3 translate-y-[-50%]" />
        </form>
        {
          selectedRowKeys.length > 0 && <div className="w-full flex items-center  cursor-pointer">
            <Popconfirm
              title
              description="Xóa kích cỡ?"
              okText="Yes"
              cancelText="No"
              okButtonProps={{ className: "bg-red-500 hover:!bg-red-500 active:!bg-red-700" }}
              cancelButtonProps={{ className: "border-slate-400" }}
              onConfirm={() => handleDeleteSize(selectedRowKeys as string[])}
            >
              <Tooltip placement="right" title="Xóa" className="flex place-items-center gap-1 pr-2">
                <BsTrash3 className="fill-red-500 w-4 h-4" /><span className="font-semibold hover:text-red-500">Xóa kích cỡ</span>
              </Tooltip>
            </Popconfirm>
          </div >
        }
      </div>
      <Table rowSelection={rowSelection} columns={columns} dataSource={dataSource} pagination={{ defaultPageSize: 5 }} scroll={{ x: "auto" }} className="w-full rounded-lg" />
      <>
        {contextHolder}
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loadAdd || loadDelete || loadUpdate}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <Modal
          title={
            <div className="text-[1.7rem] uppercase text-slate-600 text-center font-semibold mb-5">
              {form.method === "update" ? "Cập nhật kích cỡ" : "Thêm mới kích cỡ"}
            </div>}
          centered open={form.open}
          onCancel={() => setForm({ open: false, method: "" })}
          okButtonProps={{ style: { display: "none" } }}
          cancelButtonProps={{ style: { display: "none" } }}
        >
          <form
            onSubmit={handleSubmit(handleAddUpdateSize)}
            className="w-full px-[20px]"
            noValidate
          >
            <label className="text-slate-600 font-semibold block float-left">Kích cỡ<span className="text-red-500">*</span></label>
            <input
              {...register("value")} type="number"
              placeholder="40, 45..."
              className={`w-full h-[48px] mt-[5px] border border-[#d0dbf0] hover:border-gray-500 focus:outline-0 
              focus:border-blue-700 font-[400] rounded-[5px] text-[#12263f] placeholder:text-slate-400 right-2 px-[10px] focus:shadow-full ${errors.value && "border-red-500"}`}
            />
            {errors.value && <span className="text-red-500">{errors.value.message}</span>}
            <div className="w-full grid items-center justify-end mt-2">
              <Button
                type="submit"
                variant="contained"
                className="w-max !font-semibold !bg-[#58b4ff] !shadow-none"
                startIcon={form.method === "update" ? <BsPencilSquare className="w-4 h-4" /> : <BsPlusLg className="w-4 h-4" />}
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

export default ListSize;