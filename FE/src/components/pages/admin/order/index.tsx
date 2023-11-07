import { useState } from 'react';
import {useGetOrdersQuery} from '@/api/order'
import { IOrder } from '@/interface/order';

const index = () => {


    // interface User {
    //     userName: string;
    //     email: string;
    //     phone: string;
    //     image: string;
    // }

    // interface OrderItem {
    //     ProductName: string;
    //     ProductQuantity: number;
    //     ProductImage: string;
    //     ProductPrice: number;
    //     product: string;
    // }

    // interface dataOrder {
    //     code: string;
    //     time: string;
    //     total: number;
    //     OrderItems: OrderItem[];
    //     user: User[];
    //     node: string;
    //     status: string;
    //     id: number;
    // }
    // // db
    // const dataOrder = [
    //     {
    //         "code": "5FHLA$UL",
    //         "time": "Ngày 6 tháng 1 năm 2022",
    //         "total": 200,
    //         "OrderItems": [
    //             {
    //                 "ProductName": "Product 1",
    //                 "ProductQuantity": 3,
    //                 "ProductImage": "https://p-vn.ipricegroup.com/trends-article/3-dac-diem-co-mot-khong-hai-cua-giay-the-thao-adidas-superstar-de-nghiem-nhien-tro-thanh-bieu-tuong-cua-thuong-hieu-medium.jpg",
    //                 "ProductPrice": 10.99,
    //                 "product": "product_id_1"
    //             },
    //         ],
    //         "user": [
    //             {
    //                 "userName": "Quang",
    //                 "email": "quangnv@gmail.com",
    //                 "phone": "0347917363",
    //                 "image": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
    //             }
    //         ],
    //         "node": "che tên đơn hàng",
    //         "status": "Delivering",
    //         "id": 1
    //     },

    //     {
    //         "code": "5FHLASGS",
    //         "time": "Ngày 6 tháng 1 năm 2022",
    //         "total": 200,
    //         "OrderItems": [
    //             {
    //                 "ProductName": "Product 1",
    //                 "ProductQuantity": 3,
    //                 "ProductImage": "https://p-vn.ipricegroup.com/trends-article/3-dac-diem-co-mot-khong-hai-cua-giay-the-thao-adidas-superstar-de-nghiem-nhien-tro-thanh-bieu-tuong-cua-thuong-hieu-medium.jpg",
    //                 "ProductPrice": 10.99,
    //                 "product": "product_id_1"
    //             },
    //         ],
    //         "user": [
    //             {
    //                 "userName": "Quang",
    //                 "email": "quangnv@gmail.com",
    //                 "phone": "0347917362",
    //                 "image": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
    //             }
    //         ],
    //         "node": "giao nhanh giup toi",
    //         "status": "Returns",
    //         "id": 2
    //     },
    //     {
    //         "code": "5FHLAHA",
    //         "time": "Ngày 6 tháng 1 năm 2022",
    //         "total": 200,
    //         "OrderItems": [
    //             {
    //                 "ProductName": "Product 1",
    //                 "ProductQuantity": 3,
    //                 "ProductImage": "https://p-vn.ipricegroup.com/trends-article/3-dac-diem-co-mot-khong-hai-cua-giay-the-thao-adidas-superstar-de-nghiem-nhien-tro-thanh-bieu-tuong-cua-thuong-hieu-medium.jpg",
    //                 "ProductPrice": 10.99,
    //                 "product": "product_id_1"
    //             },
    //         ],
    //         "user": [
    //             {
    //                 "userName": "Quang",
    //                 "email": "quangnv@gmail.com",
    //                 "phone": "0347917361",
    //                 "image": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
    //             }
    //         ],
    //         "node": "che tên đơn hàng",
    //         "status": "Returns",
    //         "id": 3
    //     },
    //     {
    //         "code": "5FHL@@",
    //         "time": "Ngày 6 tháng 1 năm 2022",
    //         "total": 200,
    //         "OrderItems": [
    //             {
    //                 "ProductName": "Product 1",
    //                 "ProductQuantity": 3,
    //                 "ProductImage": "https://p-vn.ipricegroup.com/trends-article/3-dac-diem-co-mot-khong-hai-cua-giay-the-thao-adidas-superstar-de-nghiem-nhien-tro-thanh-bieu-tuong-cua-thuong-hieu-medium.jpg",
    //                 "ProductPrice": 10.99,
    //                 "product": "product_id_1"
    //             },
    //         ],
    //         "user": [
    //             {
    //                 "userName": "Quang",
    //                 "email": "quangnv@gmail.com",
    //                 "phone": "0347917360",
    //                 "image": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
    //             }
    //         ],
    //         "node": "che tên đơn hàng",
    //         "status": "Delivered",
    //         "id": 4
    //     },
    // ];

    const [searchCode, setSearchCode] = useState('');
    const { data: orders } = useGetOrdersQuery();
    const [selectedStatus, setSelectedStatus] = useState('');

    const filteredOrders: IOrder[] = orders?.filter((order:IOrder ) => {
        const searchTerm = searchCode.toLowerCase();
        const codeMatch = order.orderItem.productId.toLowerCase().includes(searchTerm);
        const phoneMatch = order.shippingAddress?.phone.toLowerCase().includes(searchTerm);
        const emailMatch = order.shippingAddress.email.toLowerCase().includes(searchTerm);
        const statusMatch = selectedStatus === '' || order.shippingAddress.status.toLowerCase() === selectedStatus.toLowerCase();
        return (codeMatch || phoneMatch || emailMatch) && statusMatch;
    }) || [];
    


    


    return (
        <div>
           

            <div className="py-3 px-4 flex items-center text-sm font-medium leading-none text-gray-600 bg-gray-200 hover:bg-gray-300 cursor-pointer rounded" >
                {/* navbar Lọc */}
                <div className="flex items-center px-8">
                    <p className="text-green-500">Order Status</p>
                    <select
                        aria-label="select"
                        className="focus:text-indigo-600 focus:outline-none bg-transparent ml-1"
                        onChange={e => setSelectedStatus(e.target.value)}
                    >
                        <option className="text-sm text-indigo-800" value="">
                            All
                        </option>
                        <option className="text-sm text-indigo-800" value="Delivering">
                            Delivering
                        </option>
                        <option className="text-sm text-indigo-800" value="Returns">
                            Returns
                        </option>
                        <option className="text-sm text-indigo-800" value="Delivered">
                            Delivered successfully
                        </option>
                    </select>
                </div>

                <div>

                </div>
                {/* lọc theo người dùng */}
                <div>
                    <p className="text-green-500">Category receiving party</p>
                    <select aria-label="select" className="focus:text-indigo-600 focus:outline-none bg-transparent ml-1">
                        <option className="text-sm text-indigo-800">NO Account</option>
                        <option className="text-sm text-indigo-800">Account</option>
                    </select>
                </div>
                {/* tìm kiếm mã đơn hàng */}
                <div className="flex py-3 px-40">
                    <div className="flex w-10 items-center justify-center rounded-tl-lg rounded-bl-lg border-r border-gray-200 bg-white p-5">
                        <svg viewBox="0 0 20 20" aria-hidden="true" className="pointer-events-none absolute w-5 fill-gray-500 transition">
                            <path d="M16.72 17.78a.75.75 0 1 0 1.06-1.06l-1.06 1.06ZM9 14.5A5.5 5.5 0 0 1 3.5 9H2a7 7 0 0 0 7 7v-1.5ZM3.5 9A5.5 5.5 0 0 1 9 3.5V2a7 7 0 0 0-7 7h1.5ZM9 3.5A5.5 5.5 0 0 1 14.5 9H16a7 7 0 0 0-7-7v1.5Zm3.89 10.45 3.83 3.83 1.06-1.06-3.83-3.83-1.06 1.06ZM14.5 9a5.48 5.48 0 0 1-1.61 3.89l1.06 1.06A6.98 6.98 0 0 0 16 9h-1.5Zm-1.61 3.89A5.48 5.48 0 0 1 9 14.5V16a6.98 6.98 0 0 0 4.95-2.05l-1.06-1.06Z"></path>
                        </svg>
                    </div>
                    <input type="text" className="w-full bg-white pl-2 text-base font-semibold outline-0" placeholder="order code to find" id="searchInput"
                        value={searchCode}
                        onChange={(e) => setSearchCode(e.target.value)} />
                    <input type="button" value="Search" className="bg-blue-500 p-4 rounded-tr-lg rounded-br-lg text-white font-semibold hover:bg-blue-800 transition-colors" />
                </div>
            </div>

            {/* hiển thị order */}
            <section className="container px-4 mx-auto">
                <div className="flex flex-col">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-800">
                                        <tr>
                                            <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                <div className="flex items-center gap-x-3">
                                                    <input type="checkbox" className="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
                                                    <button className="flex items-center gap-x-2">
                                                        <span>STT</span>
                                                        <svg className="h-3" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M2.13347 0.0999756H2.98516L5.01902 4.79058H3.86226L3.45549 3.79907H1.63772L1.24366 4.79058H0.0996094L2.13347 0.0999756ZM2.54025 1.46012L1.96822 2.92196H3.11227L2.54025 1.46012Z" fill="currentColor" stroke="currentColor" stroke-width="0.1" />
                                                            <path d="M0.722656 9.60832L3.09974 6.78633H0.811638V5.87109H4.35819V6.78633L2.01925 9.60832H4.43446V10.5617H0.722656V9.60832Z" fill="currentColor" stroke="currentColor" stroke-width="0.1" />
                                                            <path d="M8.45558 7.25664V7.40664H8.60558H9.66065C9.72481 7.40664 9.74667 7.42274 9.75141 7.42691C9.75148 7.42808 9.75146 7.42993 9.75116 7.43262C9.75001 7.44265 9.74458 7.46304 9.72525 7.49314C9.72522 7.4932 9.72518 7.49326 9.72514 7.49332L7.86959 10.3529L7.86924 10.3534C7.83227 10.4109 7.79863 10.418 7.78568 10.418C7.77272 10.418 7.73908 10.4109 7.70211 10.3534L7.70177 10.3529L5.84621 7.49332C5.84617 7.49325 5.84612 7.49318 5.84608 7.49311C5.82677 7.46302 5.82135 7.44264 5.8202 7.43262C5.81989 7.42993 5.81987 7.42808 5.81994 7.42691C5.82469 7.42274 5.84655 7.40664 5.91071 7.40664H6.96578H7.11578V7.25664V0.633865C7.11578 0.42434 7.29014 0.249976 7.49967 0.249976H8.07169C8.28121 0.249976 8.45558 0.42434 8.45558 0.633865V7.25664Z" fill="currentColor" stroke="currentColor" stroke-width="0.3" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </th>


                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                APPLICATION CODE
                                            </th>
                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                TIME
                                            </th>

                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                TOTAL SERVICE FEES
                                            </th>

                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                RECEIVING PARTY
                                            </th>

                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                ORDER NOTES
                                            </th>

                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                STATUS
                                            </th>

                                            <th scope="col" className="relative py-3.5 px-4">
                                                <span className="sr-only">Actions</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                                        {filteredOrders.map((order, index) => (
                                            <tr key={order._id}>
                                                <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap" >
                                                    <div className="inline-flex items-center gap-x-3">
                                                        <input type="checkbox" className="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
                                                        <p className="leading-relaxed "> {index + 1}</p>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                                    <p  className="leading-relaxed text-red-500">{order.orderItem.productId}
                                                    </p>
                                                </td>
                                                {/* <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{order.time}</td> */}
                                                <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                    <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60 dark:bg-gray-800">
                                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                        </svg>

                                                        <h2 className="text-sm font-normal">{order.orderItem.totalPrice}đ</h2>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                    <div className="flex items-center gap-x-2">
                                                        <img className="object-cover w-8 h-8 rounded-full" src="" alt={order.shippingAddress.email} />

                                                        <div>
                                                            <h2 className="text-sm font-medium text-gray-800 dark:text-white "> {order.shippingAddress.username} </h2>
                                                            <p className="text-xs font-normal text-gray-600 dark:text-gray-400">{order.shippingAddress.phone}</p>
                                                            <p className="text-xs font-normal text-gray-600 dark:text-gray-400">{order.shippingAddress.email}</p>
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{order.node}</td> */}
                                                <td className='px-4 py-4 text-sm whitespace-nowrap'>
                                                    < select id="cars" className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-300">
                                                        <option value="" className="py-2">{order.shippingAddress.status}</option>
                                                    </select>
                                                </td>

                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between mt-6">
                    <a href="#" className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                        </svg>

                        <span>
                            previous
                        </span>
                    </a>

                    <div className="items-center hidden md:flex gap-x-3">
                        <a href="#" className="px-2 py-1 text-sm text-blue-500 rounded-md dark:bg-gray-800 bg-blue-100/60">1</a>
                        <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">2</a>
                        <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">3</a>
                        <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">...</a>
                        <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">12</a>
                        <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">13</a>
                        <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">14</a>
                    </div>

                    <a href="#" className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
                        <span>
                            Next
                        </span>

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                        </svg>
                    </a>
                </div>
            </section>
        </div >
    )
}
export default index



