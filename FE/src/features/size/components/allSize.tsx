import { useGetSizesQuery, useRemoveSizeMutation } from "@/api/size";
import { ISize } from "@/interface/size";
import { useNavigate } from "react-router-dom";
import { Button, Typography } from "@material-tailwind/react";

const TABLE_HEAD = ["ID", "Value", "CreatedAt", "UpdatedAt", "Action"];

const AllSizeCoppy = () => {
  const naviagate = useNavigate();
  const { data: sizeDatas } = useGetSizesQuery();
  const TABLE_ROWS = sizeDatas?.map(
    ({ _id, value, createdAt, updatedAt }: ISize) =>
      sizeDatas && {
        _id,
        value,
        createdAt,
        updatedAt,
      }
  );

  const [deleteSize, { isSuccess: succsessDelete }] = useRemoveSizeMutation();

  const handleDeleteSize = (id: string) => {
    deleteSize(id);
  };

  return (
    <>
      {succsessDelete ? <span>✅Xóa size thành công</span> : <span></span>}
      <Button
        onClick={() => naviagate("add")}
        className="my-[10px] float-right capitalize bg-gradient-to-r from-[#6f89fb] to-[#5151ec] w-max font-medium text-white p-2 rounded-lg">
        Thêm mới size
      </Button>
      <table className="w-full min-w-max border rounded-[20px] ">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-blue-red-500 p-4 ">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70 w-max">
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {TABLE_ROWS?.map(
            ({ _id, value, createdAt, updatedAt }: ISize, index) => {
              const isLast = index === TABLE_ROWS.length - 1;
              const classes = isLast ? "p-4" : "p-4";

              return (
                <tr key={_id}>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal">
                      {index + 1}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal">
                      {value}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal">
                      {createdAt}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal">
                      {updatedAt}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-medium grid grid-cols-2 w-full">
                      <Button
                        onClick={() => naviagate(`/admin/size/update/${_id}`)}
                        className="bg-pink-700 text-white w-max">
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleDeleteSize(String(_id))}
                        className="bg-blue-400 w-max">
                        Xóa
                      </Button>
                    </Typography>
                  </td>
                </tr>
              );
            }
          )}
        </tbody>
      </table>
    </>
  );
};

export default AllSizeCoppy;
