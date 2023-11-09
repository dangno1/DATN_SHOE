/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prefer-const */
import { useNavigate } from "react-router-dom";
import * as muiIcons from "./mui.icon";
import * as muiComponent from "./mui.component";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  CardFooter,
  IconButton,
  Input,
} from "@material-tailwind/react";

import { useGetCategoryesQuery, useRemoveCategoryMutation } from "@/api/category";
import { ICategory } from "@/interface/category";
import { Modal, Popconfirm, notification } from "antd";
import { Backdrop, CircularProgress } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";

const ListCategory = () => {
  const [formAdd, setFormAdd] = useState<boolean>(false)
  const [deleteCategory, { isLoading }] = useRemoveCategoryMutation();
  const navigate = useNavigate();

  const { data: categoryDatas } = useGetCategoryesQuery();
  const TABLE_HEAD = ["Stt", "Value", "CreatedAt", "UpdatedAt", "Action"];
  const TABLE_ROWS = categoryDatas?.map(
    ({ _id, name, createdAt, updatedAt }: ICategory) =>
      categoryDatas && {
        _id,
        name,
        createdAt,
        updatedAt,
      }
  );


  const handleDeleteCategory = async (id: string) => {
    await deleteCategory(id)
    notification.success({
      message: "Xóa category thành công",
      placement: "topRight",
    });
  };

  const { register, handleSubmit } = useForm()

  const onSubmit = (data: unknown) => {
    console.log(data);

  }

  return (
    <>
      <Modal open={true}
        centered
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="text" {...register("category")} className="border border-slate-500" />
          <button type="submit">Submit</button>
        </form>
      </Modal>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Modal
        title="Thêm mới category"
        centered
        open={formAdd}
        okButtonProps={{ className: "bg-blue-500 hover:bg-blue-500 active:bg-blue-700" }}
        onCancel={() => setFormAdd(false)}
        footer
      >
        <form className="w-full px-[20px] grid grid-cols-1 gap-y-[10px] justify-items-end">
          <Input required className="border border-slate-500 w-full rounded-lg " />
          <div className="w-max grid grid-cols-2 gap-x-[10px] items-center justify-items-end ">
            <Button
              onClick={() => setFormAdd(false)}
              className="cursor-pointer capitalize bg-gradient-to-r from-[#6f89fb] to-[#5151ec] w-max px-3 py-2 font-medium text-white rounded-lg ">
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="cursor-pointer capitalize bg-gradient-to-r from-[#6f89fb] to-[#5151ec] w-max px-3 py-2 font-medium text-white rounded-lg ">
              Thêm mới
            </Button>
          </div>
        </form>
      </Modal>
      <Card className="h-full w-full shadow-lg px-[20px] ">
        <CardHeader
          floated={false}
          shadow={false}
          className="rounded-none space-y-[20px] ">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div>
              <Typography
                variant="h5"
                color="blue-gray"
                className="text-[30px] font-[600]">
                Danh sách Category
              </Typography>
            </div>
            <div className="flex w-full shrink-0 gap-2 md:w-max ">
              <div className="w-full md:w-72 relative h-full">
                <Input
                  placeholder="Search..."
                  className="border outline-transparent focus:border-gray-500 border-gray-400 rounded-lg"
                />
                <muiIcons.SearchIcon className="cursor-pointer hover:text-pink-500 h-5 w-5 absolute top-[50%] right-[10px] translate-y-[-50%] " />
              </div>
              <Button
                onClick={() => navigate("add")}
                className="flex items-center gap-3 bg-black relative pl-[40px]">
                <muiIcons.AddIcon className="absolute top-[50%] left-[10px] translate-y-[-50%] " />
                Thêm mới
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardBody className="px-0">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 uppercase">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70">
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TABLE_ROWS?.map((row: ICategory, index: number) => {
                const isLast = index === TABLE_ROWS.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";
                return (
                  <tr key={row._id}>
                    <td className={classes}>
                      <div className="flex items-center gap-3 min-w-[100px] ">
                        <Typography>{index + 1}</Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex items-center gap-3 min-w-[200px] ">
                        <Typography>{row.name}</Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <Typography>{row.createdAt}</Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <Typography>{row.updatedAt}</Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="grid grid-cols-2 justify-start">
                        <div className="grid grid-cols-2 gap-x-[20px] items-center cursor-pointer">
                          <Popconfirm
                            title="Delete the task"
                            description="Are you sure to delete this task?"
                            okText="Yes"
                            cancelText="No"
                            okButtonProps={{ className: "bg-red-500 hover:!bg-red-500 active:!bg-red-700" }}
                            cancelButtonProps={{ className: "border-slate-400" }}
                            onConfirm={() => handleDeleteCategory(String(row._id))}
                          >
                            <muiIcons.DeleteSweepOutlinedIcon
                              className="h-5 w-5 text-pink-600 "
                            />
                          </Popconfirm>
                          <muiComponent.Tooltip
                            title="Edit category"
                            placement="top">
                            <muiIcons.ModeEditIcon
                              onClick={() => navigate(`update/${row._id}`)}
                              className="h-5 w-5 text-orange-400 "
                            />
                          </muiComponent.Tooltip>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Button variant="outlined" size="sm">
            Previous
          </Button>
          <div className="flex items-center gap-2">
            <IconButton
              variant="outlined"
              className="shadow-[none] border border-gray-300 text-gray-500 grid place-items-center w-max h-max p-[15px]">
              1
            </IconButton>
            <IconButton
              variant="outlined"
              className="shadow-[none] border border-gray-300 text-gray-500 grid place-items-center w-max h-max p-[15px]">
              2
            </IconButton>
            <IconButton
              variant="outlined"
              className="shadow-[none] border border-gray-300 text-gray-500 grid place-items-center w-max h-max p-[15px]">
              3
            </IconButton>
            <IconButton
              variant="outlined"
              className="shadow-[none] border border-gray-300 text-gray-500 grid place-items-center w-max h-max p-[15px]">
              4
            </IconButton>
            <IconButton
              variant="outlined"
              className="shadow-[none] border border-gray-300 text-gray-500 grid place-items-center w-max h-max p-[15px]">
              5
            </IconButton>
          </div>
          <Button variant="outlined" size="sm">
            Next
          </Button>
        </CardFooter>
      </Card >
    </>
  );
};

export default ListCategory;
