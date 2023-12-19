import { useAddColorMutation, useGetColorsQuery, useRemoveColorMutation, useUpdateColorMutation } from "@/api/color";
import { IColor } from "@/interface/color";
import { Modal, Popconfirm, Table, Tooltip, notification } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Backdrop, Button, CircularProgress } from "@mui/material";
import { useState, useEffect, Key } from "react";
import { useForm } from "react-hook-form";
import { BsPencilSquare, BsPlus, BsPlusLg, BsSearch, BsTrash3 } from "react-icons/bs";
import { joiResolver } from "@hookform/resolvers/joi";
import colorSchema from "@/schemas/color";

type NotificationType = 'success' | 'info' | 'warning' | 'error';
type FormType = { open: boolean, method: "add" | "update" | "", _id?: string }

const ListColor = () => {
  const [form, setForm] = useState<FormType>({ open: false, method: "" })
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
  const [colorData, setColorData] = useState<IColor[]>()

  const [deleteColor, { isLoading: loadDelete }] = useRemoveColorMutation();
  const [updateColor, { isLoading: loadUpdate, isSuccess: successUpdate }] = useUpdateColorMutation();
  const [addColor, { isLoading: loadAdd, isSuccess: successAdd }] = useAddColorMutation();
  const { data: colorDatas } = useGetColorsQuery<{ data: IColor[] }>();

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
    formState: { errors } } = useForm<IColor>({
      resolver: joiResolver(colorSchema)
    })

  const {
    register: registerSearch,
    handleSubmit: handleSubmitSearch
  } = useForm<{ search: string }>()

  useEffect(() => {
    reset()
  }, [reset, successAdd, successUpdate])

  useEffect(() => {
    form.method.length && setFocus("value");
    const updateColor = colorData?.find((item: IColor) => item._id == form._id)?.value
    form.method === "update" && colorData ? setValue("value", String(updateColor)) : reset()
  }, [form, reset, setFocus, colorData, setValue])

  useEffect(() => {
    colorDatas && setColorData(colorDatas)
  }, [colorDatas])

  const handleDeleteColor = (listId: string[]) => {
    listId.map(async (id: string) => {
      await deleteColor(id).unwrap().then(() => openNotification('success', "Xóa màu sắc thành công"))
    })
  };

  const handleAddUpdateColor = async (data: IColor) => {
    try {
      const existColor = colorDatas.find(({ value }: IColor) => value.toLowerCase() === data.value.toLowerCase())
      const { method } = form
      if (method === "add" && !existColor) {
        const result = await addColor(data)
        "data" in result && "success" in result.data && result.data.success
          ? openNotification('success', "Thêm màu sắc thành công")
          : openNotification('success', "Thêm màu sắc thất bại, vui lòng thử lại sau")
        return
      }
      if (method === "update" && !existColor || (existColor && existColor._id === form._id)) {
        const result = await updateColor({ ...data, _id: form._id })
        "data" in result && "success" in result.data && result.data.success
          ? openNotification('success', "Cập nhật màu sắc thành công")
          : openNotification('success', "Cập nhật màu sắc thất bại, vui lòng thử lại sau")
        return
      }
      setError("value", { type: "exist", message: "Màu sắc đã tồn tại" })
    } catch (error) {
      return error
    }
  }

  const handleSearch = (data: { search?: string }) => {
    const newData = colorDatas && colorDatas.filter((item: IColor) => String(item.value).toLowerCase().includes(String(data.search).toLowerCase()))
    setColorData(newData)
  }

  const onSelectChange = (newSelectedRowKeys: Key[]) => {
    console.log(newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    getCheckboxProps: (color: IColor) => ({
      disabled: color.products?.length as number > 0,
    }),
  };

  const columns: ColumnsType<IColor> = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      className: "w-[100px] max-w-[100px]",
      fixed: "left",
    },
    {
      title: "Màu sắc",
      dataIndex: "value",
      key: "value",
      className: "w-[450px] max-w-[450px]",
      render: (value: string, color: IColor) =>
        <div className="flex items-center gap-2">
          <BsPencilSquare
            className="w-3 h-3 fill-orange-600 cursor-pointer"
            onClick={() => setForm({ open: true, method: "update", _id: String(color._id) })} />
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
      render: (_id: string, color: IColor) =>
        <div className="w-max m-auto flex gap-3 cursor-pointer">
          <Popconfirm
            disabled={color.products?.length ? true : false}
            title
            description="Xóa danh mục?"
            okText="Yes"
            cancelText="No"
            okButtonProps={{ className: "bg-red-500 hover:!bg-red-500 active:!bg-red-700" }}
            cancelButtonProps={{ className: "border-slate-400" }}
            onConfirm={() => handleDeleteColor([_id])}
          >
            <Tooltip placement="right" title={!color.products?.length ? "Xóa" : ""}>
              <BsTrash3 className={`fill-red-600 w-4 h-4 ${color.products?.length && "fill-slate-500 cursor-not-allowed"}`} />
            </Tooltip>
          </Popconfirm>
          <BsPencilSquare
            className={`w-4 h-4 fill-orange-600 cursor-pointer disabled:!opacity-0`}
            onClick={() => setForm({ open: true, method: "update", _id: String(color._id) })} />
        </div >
    },
  ];
  const sortColor = colorData && [...colorData].sort((a, b) => Date.parse(String(b.updatedAt)) - Date.parse(String(a.updatedAt)))

  const dataSource = sortColor?.map((color: IColor, index: number) => ({
    ...color,
    key: color._id,
    index: index + 1
  }))

  return (
    <>
      <div className='h-[80px] min-h-[80px] max-h-[90px] grid grid-cols-2 items-center' >
        <div className="h-full w-max grid items-center font-bold uppercase text-base md:text-xl lg:text-3xl ml-2 text-slate-700">
          Tất cả màu sắc
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
            type="text" placeholder="tìm kiếm theo màu sắc" {...registerSearch("search")}
            className="w-[300px] h-full px-3 pr-10 rounded-md border border-gray-300 hover:border-blue-500 focus:border-blue-500 outline-none" />
          <BsSearch className="w-4 h-4 fill-gray-500 absolute top-[50%] right-3 translate-y-[-50%]" />
        </form>
        {
          selectedRowKeys.length > 0 && <div className="w-full flex items-center  cursor-pointer">
            <Popconfirm
              title
              description="Xóa màu sắc?"
              okText="Yes"
              cancelText="No"
              okButtonProps={{ className: "bg-red-500 hover:!bg-red-500 active:!bg-red-700" }}
              cancelButtonProps={{ className: "border-slate-400" }}
              onConfirm={() => handleDeleteColor(selectedRowKeys as string[])}
            >
              <Tooltip placement="right" title="Xóa" className="flex place-items-center gap-1 pr-2">
                <BsTrash3 className="fill-red-500 w-4 h-4" /><span className="font-semibold hover:text-red-500">Xóa màu sắc</span>
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
          centered open={form.open}
          onCancel={() => setForm({ open: false, method: "" })}
          okButtonProps={{ style: { display: "none" } }}
          cancelButtonProps={{ style: { display: "none" } }}
        >
          <form
            onSubmit={handleSubmit(handleAddUpdateColor)}
            className="w-full px-[20px] "
          >
            <label className="text-slate-600 font-semibold block float-left">Thêm mới màu sắc</label>
            <input
              {...register("value")} type="text"
              placeholder="Trắng, Đen..."
              className="w-full h-[48px] mt-[5px] border border-[#d0dbf0] hover:border-gray-500  focus:outline-0 focus:border-blue-700 font-[400] rounded-[5px] text-[#12263f] placeholder:text-slate-400 right-2 px-[10px] focus:shadow-full "
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

export default ListColor;