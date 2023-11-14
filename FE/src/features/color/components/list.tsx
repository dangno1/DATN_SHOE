import { useAddColorMutation, useGetColorsQuery, useRemoveColorMutation, useUpdateColorMutation } from "@/api/color";
import { IColor } from "@/interface/color";
import { Modal, Popconfirm, Table, Tooltip, notification } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Backdrop, Button, CircularProgress } from "@mui/material";
import { useState, useEffect, Key } from "react";
import { useForm } from "react-hook-form";
import { BsPencilSquare, BsPlus, BsPlusLg, BsSearch, BsTrash3 } from "react-icons/bs";

type NotificationType = 'success' | 'info' | 'warning' | 'error';
type FormType = { open: boolean, method: "add" | "update" | "", _id?: string }
export interface IColorExtend extends IColor { search?: string }

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

  const { register, handleSubmit, reset } = useForm<IColorExtend>()

  useEffect(() => {
    reset()
  }, [reset, successAdd, successUpdate])

  useEffect(() => {
    form.method === "update"
      ? reset({ _id: form._id, value: colorDatas.find((item: IColor) => item._id == form._id)?.value })
      : reset({ value: undefined })
  }, [form, reset, colorDatas])

  useEffect(() => {
    colorDatas && setColorData(colorDatas)
    console.table(colorDatas);

  }, [colorDatas])

  const handleDeleteColor = (listId: string[]) => {
    listId.map(async (id: string) => {
      await deleteColor(id)
    })
    openNotification('success', "Xóa màu sắc thành công")
  };

  const handleAddUpdateColor = async (data: IColorExtend) => {
    try {
      const { open, method } = form
      if (open && method === "add") {
        await addColor({ ...data, search: undefined })
        openNotification('success', "Thêm màu sắc thành công")
        return
      }
      if (open && method === "update" && form._id) {
        await updateColor({ ...data, search: undefined })
        openNotification('success', "Cập nhật màu sắc thành công")
        return
      }
      reset()
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
  };

  const columns: ColumnsType<IColor> = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      className: "w-[70px] max-w-[100px] !pl-8",
      fixed: "left",
    },
    {
      title: "màu sắc",
      dataIndex: "value",
      key: "value",
      className: "w-[250px] max-w-[250px] md:min-w-[350px] lg:min-w-[300px] lg:max-w-[300px]",
      render: (value: string, color: IColor) =>
        <div className="flex items-center gap-2">
          <BsPencilSquare
            className="w-3 h-3 fill-orange-600 cursor-pointer"
            onClick={() => setForm({ open: true, method: "update", _id: String(color._id) })} />
          {value}
        </div>
    },
    {
      title: "Số lượng sản phẩm",
      dataIndex: "_id",
      key: "_id",
      sorter: (a, b) => Number(a.products?.length) - Number(b.products?.length),
      showSorterTooltip: { title: "click để sắp xếp theo số lượng sản phẩm" },

      className: "capitalize w-[250px] max-w-[250px] md:min-w-[350px] lg:min-w-[300px] lg:max-w-[500px]",
      render: (_, size: IColor) =>
        <div className="max-h-[45px]">
          {size.products?.length}
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
      className: "capitalize w-[250px] max-w-[250px] md:min-w-[350px] lg:min-w-[400px] lg:max-w-[500px]",
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
              description="Xóa kích thước?"
              okText="Yes"
              cancelText="No"
              okButtonProps={{ className: "bg-red-500 hover:!bg-red-500 active:!bg-red-700" }}
              cancelButtonProps={{ className: "border-slate-400" }}
              onConfirm={() => handleDeleteColor([_id])}
            >
              <Tooltip placement="right" title="Xóa">
                <BsTrash3 className="fill-red-600 w-4 h-4" />
              </Tooltip>
            </Popconfirm>
          </div >
        ),
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
        <form onSubmit={handleSubmit(handleSearch)} className="w-max h-full flex items-center relative">
          <input
            type="text" placeholder="tìm kiếm theo màu sắc" {...register('search')}
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
              required autoFocus placeholder="Trắng, Đen..."
              className="w-full h-[48px] mt-[5px] border border-[#d0dbf0] hover:border-gray-500  focus:outline-0 focus:border-blue-700 font-[400] rounded-[5px] text-[#12263f] placeholder:text-slate-400 right-2 px-[10px] focus:shadow-full "
            />
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