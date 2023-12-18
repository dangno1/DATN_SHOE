import { useGetUserQuery } from "@/api/auth";
import { useGetOrdersQuery } from "@/api/orderedProduct";
import { useAddReviewMutation, useGetAllReviewQuery } from "@/api/review"
import { IOrder } from "@/interface/order";
import IReview from "@/interface/review"
import { Rating } from "@mui/material";
import { notification } from "antd";
import { ChangeEvent, useState } from "react"
import { LuUser } from "react-icons/lu";

type NotificationType = 'success' | 'info' | 'warning' | 'error';
type PropsType = {
    data: {
        productId: string,
        user: Storage
    }
}

const Review = (props: PropsType) => {
    const { data: userDatas } = useGetUserQuery()
    const { data } = useGetAllReviewQuery()
    const [addReview] = useAddReviewMutation()
    const { data: orderDatas } = useGetOrdersQuery()
    const [reviewDatas, setReviewDatas] = useState<IReview | null>(null)
    const [error, setError] = useState<{ rating?: string, content?: string } | null>(null)

    const [api, contextHolder] = notification.useNotification();
    const openNotification = (type: NotificationType, message: string) => {
        api[type]({
            message: 'Thông báo',
            description: message
        });
    };

    const reviewExist = data?.filter((review: IReview) => review.userId == String(props.data.user._id) && review.productId === props.data.productId)
    const orderExist = orderDatas?.filter((order: IOrder) => order.userEmail == String(props.data.user.email) && order.products.filter(item => item.productID == props.data.productId).length)

    const handleAddReview = () => {
        !reviewDatas?.content && !reviewDatas?.stars && setError({ rating: "Vui lòng chọn số sao muốn đánh giá", content: "Vui lòng nhập nội dung đánh giá" })
        !reviewDatas?.content && reviewDatas?.stars && setError({ content: "Vui lòng nhập nội dung đánh giá" })
        reviewDatas?.content && !reviewDatas?.stars && setError({ rating: "Vui lòng chọn số sao muốn đánh giá" })
        if (reviewDatas?.content && reviewDatas.stars) {
            reviewDatas?.content && reviewDatas.stars && addReview({ ...reviewDatas, productId: props.data.productId, userId: props.data.user._id })
            setError(null)
            window.location.reload()
            openNotification("success", "Đánh giá thành công")
        }
    }

    return (
        <>
            {contextHolder}
            {(!reviewExist?.length && orderExist?.length)
                && <>
                    <div className="flex flex-col items-center my-4 w-full justify-center">
                        <p className="text-lg">Bạn thấy sản phẩm như thế nào?</p>
                        {error?.rating && <p className="text-[14px] text-red-500 py-2">{error.rating}</p>}
                        <Rating
                            name="simple-controlled"
                            value={reviewDatas?.stars ?? 0}
                            onChange={(_event: unknown, newValue) => {
                                setReviewDatas({ ...reviewDatas, stars: Number(newValue) });
                            }}
                            size="large"
                        />
                    </div>
                    <textarea placeholder="Nội dung đánh giá..." onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setReviewDatas({ ...reviewDatas, content: e.target.value })} className="w-full h-[150px] border focus:outline-none p-5 rounded-md" />
                    {error?.content && <p className="text-[14px] text-red-500">{error.content}</p>}
                    <button onClick={() => handleAddReview()} className="w-max h-max p-2 my-2 rounded-md border-transparent bg-blue-500 text-white float-right">Lưu đánh giá</button>
                </>
            }
            {
                data?.length
                    ? data?.map((review: IReview) =>
                    (<div key={review._id} className="w-full max-h-[500px] overflow-y-auto">
                        <div className="w-full grid grid-cols-[max-content_auto] gap-x-2 mb-4">
                            <div className="w-[40px] h-[40px] rounded-[50%] grid place-items-center bg-gray-400">
                                <LuUser className="w-7 h-7 stroke-gray-100" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[14px] text-slate-700">{userDatas && userDatas?.datas?.find(user => String(user._id) == String(review.userId))?.username}</span>
                                <Rating size="small" value={review.stars} readOnly />
                                <span className="text-[13px] text-slate-700">{new Date(String(review.createdAt)).toLocaleString()}</span>
                                <p className="text-base text-slate-700">{review.content}</p>
                            </div>
                        </div>
                    </div>))
                    : <div className="mt-[50px] w-full text-center uppercase text-lg">Chưa có đánh giá</div>
            }
        </>
    )
}

export default Review