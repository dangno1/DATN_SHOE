/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prefer-const */
import { useAddCategoryMutation, useGetCategoryesQuery, useRemoveCategoryMutation, useUpdateCategoryMutation } from "@/api/category";
import { ICategory } from "@/interface/category";
import { Modal, Popconfirm, Table, Tooltip, notification } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Backdrop, Button, CircularProgress } from "@mui/material";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { BsPencilSquare, BsPlus, BsPlusLg, BsTrash3 } from "react-icons/bs";

type NotificationType = 'success' | 'info' | 'warning' | 'error';
type FormType = { open: boolean, method: "add" | "update" | "", _id?: string }

const ListCategory = () => {
  const [form, setForm] = useState<FormType>({ open: false, method: "" })

  const [deleteCategory, { isLoading: loadDelete }] = useRemoveCategoryMutation();
  const [updateCategory, { isLoading: loadUpdate, isSuccess: successUpdate }] = useUpdateCategoryMutation();
  const [addCategory, { isLoading: loadAdd, isSuccess: successAdd }] = useAddCategoryMutation();
  const { data: categoryDatas } = useGetCategoryesQuery<{ data: ICategory[] }>();

  const [api, contextHolder] = notification.useNotification();
  const openNotification = (type: NotificationType, message: string) => {
    api[type]({
      message: 'Thông báo',
      description: message
    });
  };

  const { register, handleSubmit, reset } = useForm<ICategory>()

  useEffect(() => {
    setForm({ method: "", open: false })
  }, [successAdd, successUpdate])

  useEffect(() => {
    form.method === "update"
      ? reset({ _id: form._id, name: categoryDatas.find((item: ICategory) => item._id == form._id)?.name })
      : reset({ name: "" })
  }, [form])

  const handleDeleteCategory = async (id: string) => {
    await deleteCategory(id)
    openNotification('success', "Xóa Danh mục thành công")
  };

  const handleCategory = async (data: ICategory) => {
    try {
      const { open, method } = form
      if (open && method === "add") {
        const result = await addCategory(data)
        console.log(result);

        openNotification('success', "Thêm danh mục thành công")
        return
      }
      if (open && method === "update" && form._id) {
        await updateCategory(data)
        openNotification('success', "Cập nhật danh mục thành công")
        return
      }
      reset()
    } catch (error) {
      return error
    }
  }

  const columns: ColumnsType<ICategory> = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      className: "w-[200px] max-w-[250px]",
      fixed: "left",
      align: "center",
    },
    {
      title: "Tên Danh mục",
      dataIndex: "name",
      key: "name",
      className: "w-[250px] max-w-[250px] md:min-w-[350px] lg:min-w-[500px] lg:max-w-[500px]",
      render: (name: string, product: ICategory) =>
        <div className="flex items-center gap-2">
          <BsPencilSquare className="w-3 h-3 fill-gray-500 cursor-pointer" onClick={() => setForm({ open: true, method: "update", _id: String(product._id) })} />
          {name}
        </div>
    },
    {
      title: "Số lượng sản phẩm",
      dataIndex: "_id",
      key: "_id",
      className: "capitalize w-[250px] max-w-[250px] md:min-w-[350px] lg:min-w-[300px] lg:max-w-[500px]",
      render: (_, categoty: ICategory) =>
        <div className="max-h-[45px] overflow-y-auto scroll-hiden cursor-n-resize">
          {categoty.products?.length}
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
          <div className="w-max m-auto flex gap-3 cursor-pointer">
            <Popconfirm
              title
              description="Xóa danh mục?"
              okText="Yes"
              cancelText="No"
              okButtonProps={{ className: "bg-red-500 hover:!bg-red-500 active:!bg-red-700" }}
              cancelButtonProps={{ className: "border-slate-400" }}
              onConfirm={() => handleDeleteCategory(_id)}
            >
              <Tooltip placement="right" title="Xóa">
                <BsTrash3 className="fill-red-600 w-4 h-4" />
              </Tooltip>
            </Popconfirm>
          </div >
        ),
    },
  ];

  const dataSource = categoryDatas?.map((category: ICategory, index: number) => ({
    ...category,
    key: category._id,
    index: index + 1
  }))

  return (
    <>
      <div className='h-[80px] min-h-[80px] max-h-[90px] grid grid-cols-2 items-center' >
        <div className="h-full w-max grid items-center font-bold uppercase text-base md:text-xl lg:text-3xl ml-2 text-slate-700">
          Tất cả danh mục sản phẩm
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
      </div >
      <Table columns={columns} dataSource={dataSource} pagination={{ defaultPageSize: 5 }} scroll={{ x: "auto" }} className="w-full rounded-lg" />
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
            onSubmit={handleSubmit(handleCategory)}
            className="w-full px-[20px] "
          >
            <label className="text-slate-600 font-semibold block float-left">Tên Danh mục</label>
            <input
              {...register("name")} type="text" minLength={3}
              required autoFocus
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

export default ListCategory;