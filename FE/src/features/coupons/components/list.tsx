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
} from "@material-tailwind/react";
import { Alert, Stack } from "@mui/material";

import { useEffect, useState } from "react";
import * as aiIcon from "react-icons/ai";
import { useGetAllCouponsQuery, useRemoveCouponsMutation } from "@/api/coupons";
import { ICoupons } from "@/interface/coupons";

// ----------------------------------------------------------------------

const ListCoupons = () => {
  const [deleteCoupons, { isSuccess }] = useRemoveCouponsMutation();
  const navigate = useNavigate();

  const [openAlert, setOpenAlert] = useState(false);
  const [openDialog, setOpenDialog] = useState<string>("close");
  const [idCoupons, setIdCoupons] = useState<string>("")

  const { data: couponsDatas } = useGetAllCouponsQuery();
  const TABLE_HEAD = ["Stt", "code", "discountValue", "Quantity", "CreatedAt", "UpdatedAt", "Action"];
  const TABLE_ROWS = couponsDatas?.map(
    ({ _id, code,discountValue, quantity, createdAt, updatedAt }: ICoupons) =>
      couponsDatas && {
        _id,
        code,
        // discountType,
        discountValue,
        quantity,
        createdAt,
        updatedAt,
      }
  );

  let closeAlertTimeout: ReturnType<typeof setTimeout>;
  useEffect(() => {
    isSuccess && setOpenAlert(isSuccess);
    closeAlertTimeout = setTimeout(() => {
      setOpenAlert(false);
    }, 3000);
    return () => clearTimeout(closeAlertTimeout);
  }, [isSuccess]);

  useEffect(() => {
    const handleDeleteCoupons = (id: string) => {
      openDialog === "delete" && deleteCoupons(id)
    };
    handleDeleteCoupons(idCoupons)
  }, [deleteCoupons, idCoupons, openDialog])


  return (
    <>
      {openDialog === "open" && <muiComponent.Dialog
        open={true}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <muiComponent.DialogContent>
          <muiComponent.DialogContentText id="alert-dialog-description">
            Xác nhận xóa Coupons.
          </muiComponent.DialogContentText>
        </muiComponent.DialogContent>
        <muiComponent.DialogActions>
          <Button
            justify-start="true"
            onClick={() => setOpenDialog("close")}
            className="bg-green-600">
            Thoát
          </Button>
          <Button
            justify-start="true"
            onClick={() => setOpenDialog("delete")}
            className="bg-pink-600">
            Xoá!
          </Button>
        </muiComponent.DialogActions>
      </muiComponent.Dialog>}
      <Card className="h-full w-full shadow-lg px-[20px] ">
        <CardHeader
          floated={false}
          shadow={false}
          className="rounded-none space-y-[20px] ">
          <div className="grid lg:grid-cols-2 lg:gap-x-[120px] sm:grid-cols-1 ">
            <div>
              <Typography
                variant="h5"
                color="blue-gray"
                className="text-[30px] font-[600]">
                Danh sách Coupons
              </Typography>
            </div>
            <div className="w-full h-full grid lg:grid-cols-4 place-items-center">
              <div className="w-full relative h-full lg:col-span-3 sm:col-span-2">
                <input
                  placeholder="Search..."
                  className="w-full h-full focus:outline-none border focus:border-gray-700 border-gray-400 rounded-lg px-[20px]"
                />
                <muiIcons.SearchIcon className="cursor-pointer hover:text-pink-500 h-5 w-5 absolute top-[50%] right-[10px] translate-y-[-50%] " />
              </div>
              <Button
                onClick={() => navigate("add")}
                className="bg-black w-max h-full grid grid-cols-3 place-items-center p-0 pr-[10px] ">
                <aiIcon.AiOutlinePlus className="w-5 h-5" />
                <div className="col-span-2">Thêm mới</div>
              </Button>
            </div>
          </div>
          {openAlert && (
            <Stack sx={{ width: "100%" }} spacing={2}>
              <Alert severity="success">Xóa Coupons thành công</Alert>
            </Stack>
          )}
        </CardHeader>
        <CardBody className="px-0">
          <table className="w-full table-auto text-left ">
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
              {TABLE_ROWS?.map((row: ICoupons, index: number) => {
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
                        <Typography>{row.code}</Typography>
                      </div>
                    </td>
                    {/* <td className={classes}>
                      <div className="flex items-center gap-3 min-w-[200px] ">
                        <Typography>{row.discountType}</Typography>
                      </div>
                    </td> */}
                    <td className={classes}>
                      <div className="flex items-center gap-3 min-w-[200px] ">
                        <Typography>{row.discountValue}</Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex items-center gap-3 min-w-[200px] ">
                        <Typography>{row.quantity}</Typography>
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
                            title="Delete Coupons"
                            placement="top">
                            <muiIcons.DeleteSweepOutlinedIcon
                              onClick={() => {
                                setIdCoupons(String(row._id))
                                setOpenDialog("open")
                              }}
                              className="h-5 w-5 text-pink-600 "
                            />
                          </muiComponent.Tooltip>
                          <muiComponent.Tooltip
                            title="Edit Coupons"
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
      </Card>

    </>
  );
};

export default ListCoupons;
