// import React from "react";
// import { Button, Form, Input } from "antd";
// import { Link } from "react-router-dom";
// // const onFinish = (values: any) => {
// //   console.log('Success:', values);
// // };
// // const onFinishFailed = (errorInfo: any) => {
// //   console.log('Failed:', errorInfo);
// // };
// type FieldType = {
//   fullname: string;
//   username?: string;
//   email: string;
//   phone: string;
//   confirmPassword: string;
//   address: string;
//   password?: string;
//   remember?: string;
// };
// const AddAdmin: React.FC = () => (
//   <Form
//     name="basic"
//     labelCol={{ span: 8 }}
//     wrapperCol={{ span: 16 }}
//     style={{ maxWidth: 600 }}
//     initialValues={{ remember: true }}
//     // onFinish={onFinish}
//     // onFinishFailed={onFinishFailed}
//     autoComplete="off"
//   >
//     <Form.Item<FieldType>
//       label="Fullname"
//       name="fullname"
//       rules={[{ required: true, message: "Please input your fullname!" }]}
//     >
//       <Input placeholder="Nhập Fullname" />
//     </Form.Item>
//     <Form.Item<FieldType>
//       label="Username"
//       name="username"
//       rules={[{ required: true, message: "Please input your username!" }]}
//     >
//       <Input placeholder="Nhập Username" />
//     </Form.Item>
//     <Form.Item<FieldType>
//       label="Email"
//       name="email"
//       rules={[{ required: true, message: "Please input your email!" }]}
//     >
//       <Input placeholder="Nhập Email" />
//     </Form.Item>
//     <Form.Item<FieldType>
//       label="Phone"
//       name="phone"
//       rules={[{ required: true, message: "Please input your phone!" }]}
//     >
//       <Input placeholder="Nhập Phone" />
//     </Form.Item>
//     <Form.Item<FieldType>
//       label="Address"
//       name="address"
//       rules={[{ required: true, message: "Please input your address!" }]}
//     >
//       <Input placeholder="Nhập Address" />
//     </Form.Item>
//     <Form.Item<FieldType>
//       label="Password"
//       name="password"
//       rules={[{ required: true, message: "Please input your password!" }]}
//     >
//       <Input.Password placeholder="Nhập Password" />
//     </Form.Item>
//     <Form.Item<FieldType>
//       label="ConfirmPassword"
//       name="confirmPassword"
//       rules={[
//         { required: true, message: "Please input your confirmPassword!" },
//       ]}
//     >
//       <Input.Password placeholder="Nhập lại Password" />
//     </Form.Item>

//     <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
//       <Button
//         type="primary"
//         style={{
//           backgroundColor: "var(--primary-color)",
//           color: "1890ff",
//           border: "none",
//         }}
//       >
//         <Link to="/admin/user">Quay Lại</Link>
//       </Button>
//       <Button
//         type="primary"
//         style={{
//           backgroundColor: "var(--primary-color)",
//           color: "1890ff",
//           border: "none",
//           float:'right'
//         }}
//         htmlType="submit"
//       >
//         Submit
//       </Button>
//     </Form.Item>
//   </Form>
// );


// export default AddAdmin;
import { Link } from "react-router-dom";
const AddAdmin: React.FC = () => {
    return (
<div className="flex justify-center items-center ">
	<div className="lg:w-3/5 md:w-1/2 w-2/3">
		<form className="bg-white p-10 ">
			<h1 className="text-center text-2xl mb-4 text-gray-600 font-bold font-sans">Thêm Admin</h1>
            <div>
				<label className="text-gray-800 font-semibold block my-2 text-md" htmlFor="username">Fullname</label>
				<input className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none" type="text" name="fullname" id="fullname" placeholder="fullname" />
      </div>
			<div>
				<label className="text-gray-800 font-semibold block my-2 text-md" htmlFor="username">Username</label>
				<input className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none" type="text" name="username" id="username" placeholder="username" />
      </div>
				<div>
					<label className="text-gray-800 font-semibold block my-2 text-md" htmlFor="email">Email</label>
					<input className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none" type="text" name="email" id="email" placeholder="email" />
      </div>
      <div>
				<label className="text-gray-800 font-semibold block my-2 text-md" htmlFor="phone">Phone</label>
				<input className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none" type="text" name="phone" id="phone" placeholder="phone" />
      </div>
      <div>
				<label className="text-gray-800 font-semibold block my-2 text-md" htmlFor="address">Address</label>
				<input className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none" type="text" name="address" id="address" placeholder="address" />
      </div>
					<div>
						<label className="text-gray-800 font-semibold block my-2 text-md" htmlFor="password">Password</label>
						<input className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none" type="text" name="password" id="password" placeholder="password" />
      </div>
						<div>
							<label className="text-gray-800 font-semibold block my-2 text-md" htmlFor="confirm">Confirm password</label>
							<input className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none" type="text" name="confirm" id="confirm" placeholder="confirm password" />
      </div>
      <div className="buttons flex mt-6">
      <div className="btn border border-gray-300 p-1 px-4 font-semibold cursor-pointer text-gray-500 ml-auto rounded-2xl"><Link to="/admin/users">Quay Lại</Link></div>
      <div className="btn border border-black  p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-black rounded-2xl">Đăng ký</div>
    </div>
		</form>
	</div>
</div>
    )
}

    export default AddAdmin;