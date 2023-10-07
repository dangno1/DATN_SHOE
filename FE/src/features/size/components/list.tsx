/* eslint-disable prefer-const */
import { useGetSizesQuery, useRemoveSizeMutation } from "@/api/size";
import { ISize } from "@/interface/size";
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
import { Alert, Stack } from "@mui/material";

import { useEffect, useState } from "react";
import * as aiIcon from "react-icons/ai";

const ListSize = () => {
  const [deleteSize, { isSuccess }] = useRemoveSizeMutation();
  const navigate = useNavigate();

  useEffect(() => {
    isSuccess && setOpenAlert(isSuccess);
    let closeAlertTimeout: number;
    closeAlertTimeout = setTimeout(() => {
      setOpenAlert(false);
    }, 3000);
    return () => clearTimeout(closeAlertTimeout);
  }, [isSuccess]);
  const [openAlert, setOpenAlert] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const { data: sizeDatas } = useGetSizesQuery();
  const TABLE_HEAD = ["Stt", "Value", "CreatedAt", "UpdatedAt", "Action"];
  const TABLE_ROWS = sizeDatas?.map(
    ({ _id, value, createdAt, updatedAt }: ISize) =>
      sizeDatas && {
        _id,
        value,
        createdAt,
        updatedAt,
      }
  );

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    return true;
  };

  const handleDeleteSize = (id: string) => {
    deleteSize(id);
  };

  return (
    <>
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
                Danh sách size
              </Typography>
            </div>
            <div className="flex w-full shrink-0 gap-2 md:w-max ">
              <div className="w-full md:w-72 relative h-full">
                <Input
                  placeholder="Search..."
                  className="border border-gray-400 rounded-lg"
                />
                <muiIcons.SearchIcon className="cursor-pointer hover:text-pink-500 h-5 w-5 absolute top-[50%] right-[10px] translate-y-[-65%] " />
              </div>
              <Button className="flex items-center gap-3 bg-black relative pl-[40px]">
                <aiIcon.AiOutlineDownload className="absolute w-5 h-5 top-[50%] left-[10px] translate-y-[-50%] " />
                Download
              </Button>
              <Button
                onClick={() => navigate("add")}
                className="flex items-center gap-3 bg-black relative pl-[40px]">
                <aiIcon.AiOutlinePlus className="absolute w-5 h-5 top-[50%] left-[10px] translate-y-[-50%] " />
                Thêm mới
              </Button>
            </div>
          </div>
          {openAlert && (
            <Stack sx={{ width: "100%" }} spacing={2}>
              <Alert severity="success">Xóa Size thành công</Alert>
            </Stack>
          )}
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
              {TABLE_ROWS?.map((row: ISize, index: number) => {
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
                        <Typography>{row.value}</Typography>
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
                          <muiComponent.Tooltip
                            title="Delete size"
                            placement="top">
                            <muiIcons.DeleteSweepOutlinedIcon
                              onClick={handleOpenDialog}
                              className="h-5 w-5 text-pink-600 "
                            />
                          </muiComponent.Tooltip>
                          <muiComponent.Tooltip
                            title="Edit size"
                            placement="top">
                            <muiIcons.ModeEditIcon
                              onClick={() => navigate(`update/${row._id}`)}
                              className="h-5 w-5 text-orange-400 "
                            />
                          </muiComponent.Tooltip>
                        </div>
                        <muiComponent.Dialog
                          open={openDialog}
                          aria-labelledby="alert-dialog-title"
                          aria-describedby="alert-dialog-description">
                          <muiComponent.DialogTitle id="alert-dialog-title">
                            {"Thông báo quan trọng."}
                          </muiComponent.DialogTitle>
                          <muiComponent.DialogContent>
                            <muiComponent.DialogContentText id="alert-dialog-description">
                              Xác nhận xóa size.
                            </muiComponent.DialogContentText>
                          </muiComponent.DialogContent>
                          <muiComponent.DialogActions>
                            <Button
                              justify-start="true"
                              onClick={() => handleCloseDialog()}
                              className="bg-green-600">
                              Thoát
                            </Button>
                            <Button
                              justify-start="true"
                              onClick={() =>
                                handleCloseDialog() &&
                                handleDeleteSize(String(row._id))
                              }
                              className="bg-pink-600">
                              Xoá!
                            </Button>
                          </muiComponent.DialogActions>
                        </muiComponent.Dialog>
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
      </Card>
    </>
  );
};

export default ListSize;
