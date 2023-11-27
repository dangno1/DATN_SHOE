import { useAddCategoryMutation, useGetCategoryesQuery, useRemoveCategoryMutation, useUpdateCategoryMutation } from "@/api/category";
import { ICategory } from "@/interface/category";
import { Modal, Popconfirm, Table, Tooltip, notification } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Backdrop, Button, CircularProgress } from "@mui/material";
import { useState, useEffect, Key } from "react";
import { useForm } from "react-hook-form";
import { BsPencilSquare, BsPlus, BsPlusLg, BsSearch, BsTrash3 } from "react-icons/bs";
import { joiResolver } from "@hookform/resolvers/joi";
import categorySchema from "@/schemas/category";

type NotificationType = 'success' | 'info' | 'warning' | 'error';
type FormType = { open: boolean, method: "add" | "update" | "", _id?: string }

const ListCategory = () => {
  const [form, setForm] = useState<FormType>({ open: false, method: "" })
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
  const [categoryData, setCategoryData] = useState<ICategory[]>()

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

  const {
    register,
    handleSubmit,
    reset,
    setError,
    setValue,
    setFocus,
    formState: { errors }
  } = useForm<ICategory>({
    resolver: joiResolver(categorySchema)
  })
  const {
    register: registerSearch,
    handleSubmit: handleSubmitSearch
  } = useForm<{ search: string }>()

  useEffect(() => {
    reset()
  }, [reset, successAdd, successUpdate])

  useEffect(() => {
    form.method.length && setFocus("name");
    const updateCate = categoryData?.find((item: ICategory) => item._id == form._id)?.name
    form.method === "update" && categoryData ? setValue("name", String(updateCate)) : reset()
  }, [categoryData, form, reset, setFocus, setValue])

  useEffect(() => {
    categoryDatas && setCategoryData(categoryDatas)
  }, [categoryDatas])

  const handleDeleteCategory = (listId: string[]) => {
    listId.map(async (id: string) => {
      await deleteCategory(id)
    })
    openNotification('success', "Xóa Danh mục thành công")
  };

  const handleAddUpdateCategory = async (data: ICategory) => {
    try {
      const existCategory = categoryDatas.find((item: ICategory) => item.name.toLowerCase() === data.name.toLowerCase())
      const { method } = form

      if (method === "add" && !existCategory) {
        await addCategory(data)
        openNotification('success', "Thêm danh mục thành công")
        return;
      }

      if (method === "update" && !existCategory || (existCategory && existCategory._id === form._id)) {
        await updateCategory({ ...data, _id: form._id })
        openNotification('success', "Cập nhật danh mục thành công")
        return;
      }

      setError("name", { type: "exist", message: "Danh mục đã tồn tại" })
    } catch (error) {
      return error
    }
  }

  const handleSearch = (data: { search?: string }) => {
    const newData = categoryDatas && categoryDatas.filter((item: ICategory) => item.name.toLowerCase().includes(String(data.search).toLowerCase()))
    setCategoryData(newData)
  }

  const onSelectChange = (newSelectedRowKeys: Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    getCheckboxProps: (category: ICategory) => ({
      disabled: category.products?.length as number > 0 || category.name.toLowerCase() == "chưa phân loại",
    }),
  };

  const columns: ColumnsType<ICategory> = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      className: "w-[70px] max-w-[100px]",
      fixed: "left",
    },
    {
      title: "Tên Danh mục",
      dataIndex: "name",
      key: "name",
      className: "w-[250px] max-w-[250px] md:min-w-[350px] lg:min-w-[300px] lg:max-w-[300px]",
      render: (name: string, category: ICategory) =>
        <div className="flex items-center gap-2">
          {category.name.toLowerCase() !== "chưa phân loại" && < BsPencilSquare className="w-3 h-3 fill-orange-600 cursor-pointer" onClick={() => setForm({ open: true, method: "update", _id: String(category._id) })} />}
          {name}
        </div>
    },
    {
      title: "Số lượng sản phẩm",
      dataIndex: "_id",
      key: "_id",
      sorter: (a, b) => Number(a.products?.length) - Number(b.products?.length),
      showSorterTooltip: { title: "click để sắp xếp theo số lượng sản phẩm" },
      className: "capitalize w-[250px] max-w-[250px] md:min-w-[350px] lg:min-w-[200px] lg:max-w-[25 0px]",
      render: (_, categoty: ICategory) =>
        <div className="max-h-[45px] overflow-y-auto scroll-hiden cursor-n-resize">
          {categoty.products?.length}
        </div>
    },
    {
      title: "Thời gian cập nhật",
      dataIndex: "updatedAt",
      key: "updatedAt",
      sorter: (a, b) => Date.parse(String(a.updatedAt)) - Date.parse(String(b.updatedAt)),
      showSorterTooltip: { title: "click để sắp xếp theo ngày cập nhật" },
      className: "capitalize w-[250px] max-w-[250px] md:min-w-[350px] lg:min-w-[400px] lg:max-w-[500px]",
      render: (updatedAt: string) =>
        <div className="max-h-[45px]">
          {new Date(updatedAt).toLocaleString()}
        </div>
    },
    {
      title: "Hành động",
      dataIndex: "_id",
      key: "_id",
      align: "center",
      className: "w-auto",
      fixed: "right",
      render: (_id: string, category: ICategory) =>
        (_id && category.name.toLowerCase() !== "chưa phân loại" && !category.products?.length) ? (
          <div className="w-max m-auto flex gap-3 cursor-pointer">
            <Popconfirm
              title
              description="Xóa danh mục?"
              okText="Yes"
              cancelText="No"
              okButtonProps={{ className: "bg-red-500 hover:!bg-red-500 active:!bg-red-700" }}
              cancelButtonProps={{ className: "border-slate-400" }}
              onConfirm={() => handleDeleteCategory([_id])}
            >
              <Tooltip placement="right" title="Xóa">
                <BsTrash3 className="fill-red-600 w-4 h-4" />
              </Tooltip>
            </Popconfirm>
          </div >
        ) : <div className="w-max h-max p-1 bg-red-500 text-white rounded-lg">Không thể xóa</div>,
    },
  ];

  const sortUpdatedAtCategoryData = categoryData && [...categoryData].sort((a, b) => Date.parse(String(b.updatedAt)) - Date.parse(String(a.updatedAt)))

  const dataSource = sortUpdatedAtCategoryData?.map((category: ICategory, index: number) => ({
    ...category,
    key: category._id,
    index: index + 1
  }))

  return (
    <>
      <div className='h-[80px] min-h-[80px] max-h-[90px] grid grid-cols-2 items-center' >
        <div className="h-full w-max grid items-center font-bold uppercase text-base md:text-xl lg:text-3xl ml-2 text-slate-700 select-none">
          Tất cả danh mục sản phẩm
        </div>
        <div className="grid grid-cols-[max-content_max-content] gap-2 justify-end place-items-center">
          <Button
            onClick={() => setForm({ open: true, method: "add" })}
            variant="contained"
            className="float-right !font-semibold !bg-[#58b4ff] !shadow-none select-none"
            startIcon={<BsPlus className="w-6 h-6" />}
          >
            Thêm Mới
          </Button>
        </div>
      </div>
      <div className="h-[35px] w-full my-3 flex gap-2">
        <form onSubmit={handleSubmitSearch(handleSearch)} className="w-max h-full flex items-center relative">
          <input
            type="text" placeholder="tìm kiếm danh mục" {...registerSearch('search')}
            className="w-[300px] h-full px-3 pr-10 rounded-md border border-gray-300 hover:border-blue-500 focus:border-blue-500 outline-none" />
          <BsSearch className="w-4 h-4 fill-gray-500 absolute top-[50%] right-3 translate-y-[-50%]" />
        </form>
        {
          selectedRowKeys.length > 0 && <div className="w-full flex items-center  cursor-pointer">
            <Popconfirm
              title
              description="Xóa danh mục?"
              okText="Yes"
              cancelText="No"
              okButtonProps={{ className: "bg-red-500 hover:!bg-red-500 active:!bg-red-700" }}
              cancelButtonProps={{ className: "border-slate-400" }}
              onConfirm={() => handleDeleteCategory(selectedRowKeys as string[])}
            >
              <Tooltip placement="right" title="Xóa" className="flex place-items-center gap-1 pr-2">
                <BsTrash3 className="fill-red-500 w-4 h-4" /><span className="font-semibold hover:text-red-500 select-none">Xóa {selectedRowKeys.length} danh mục</span>
              </Tooltip>
            </Popconfirm>
          </div>
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
          title={<div className="text-[1.7rem] uppercase text-slate-600 text-center font-semibold mb-5">
            {form.method === "update" ? "Cập nhật danh mục" : "Thêm mới danh mục"}
          </div>}
          centered open={form.open}
          onCancel={() => setForm({ open: false, method: "" })}
          okButtonProps={{ style: { display: "none" } }}
          cancelButtonProps={{ style: { display: "none" } }}
        >
          <form
            onSubmit={handleSubmit(handleAddUpdateCategory)}
            className="w-full px-[20px]"
          >
            <label className="text-slate-600 font-semibold block float-left">Tên Danh mục<span className="text-red-500">*</span></label>
            <input
              {...register("name")} type="text"
              autoFocus placeholder="Giày nam, Giày nữ..."
              className={`w-full h-[40px] mt-[5px] border border-[#d0dbf0] hover:border-gray-500  focus:outline-0 focus:border-blue-700 font-[400] rounded-[5px] text-[#12263f] placeholder:text-slate-400 right-2 px-[10px] focus:shadow-full ${errors.name && "border-red-500"}`}
            />
            {errors.name && <span className="text-red-500">{errors.name.message}</span>}
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