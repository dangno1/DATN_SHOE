
import { useForm } from "react-hook-form";
import { useAddUserMutation } from "@/api/auth";
import { IUser } from "@/interface/auth";
import { Link, useNavigate } from "react-router-dom";
const AddAdmin = () => {
	const {register,handleSubmit} = useForm<IUser>();
	const navigate = useNavigate();
	const [addUser, { isLoading }] = useAddUserMutation();
	
	const onSubmit = (data: IUser) => {
		addUser(data)
		.unwrap()
		.then((res) =>{
			if (res?.data) {
				navigate("/admin/users")
				console.log("ok");
			} else {
				console.log("Messages:", res.messages);
				console.log(res);
			}
		});
	};
    return (
<div className="flex justify-center items-center ">
	<div className="lg:w-3/5 md:w-1/2 w-2/3">
		<form className="bg-white p-10 " onSubmit={handleSubmit(onSubmit)}>
			<h1 className="text-center text-2xl mb-4 text-gray-600 font-bold font-sans">Thêm Admin</h1>
            <div>
				<label className="text-gray-800 font-semibold block my-2 text-md" htmlFor="username">Fullname</label>
				<input {...register("fullname")} className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none" type="text" name="fullname" id="fullname" placeholder="fullname" 
				/>
      </div>
			<div>
				<label className="text-gray-800 font-semibold block my-2 text-md" htmlFor="username">Username</label>
				<input {...register("username")} className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none" type="text" name="username" id="username" placeholder="username" 
				/>
      </div>
				<div>
					<label className="text-gray-800 font-semibold block my-2 text-md" htmlFor="email">Email</label>
					<input {...register("email")} className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none" type="text" name="email" id="email" placeholder="email" 
					/>
      </div>
      <div>
				<label className="text-gray-800 font-semibold block my-2 text-md" htmlFor="phone">Phone</label>
				<input {...register("phone")} className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none" type="text" name="phone" id="phone" placeholder="phone" 
				/>
      </div>
      <div>
				<label className="text-gray-800 font-semibold block my-2 text-md" htmlFor="address">Address</label>
				<input {...register("address")} className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none" type="text" name="address" id="address" placeholder="address" 
				/>
      </div>
					<div>
						<label className="text-gray-800 font-semibold block my-2 text-md" htmlFor="password">Password</label>
						<input {...register("password")} className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none" type="text" name="password" id="password" placeholder="password" 
						/>
      </div>
						<div>
							<label className="text-gray-800 font-semibold block my-2 text-md" htmlFor="confirm">Confirm password</label>
							<input {...register("confirmPassword")} className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none" type="text" name="confirmPassword" id="confirmPassword" placeholder="confirm password" 
							/>
      </div>
      <div className="buttons flex mt-6">
      <div className="btn border border-gray-300 p-1 px-4 font-semibold cursor-pointer text-gray-500 ml-auto rounded-2xl"><Link to="/admin/users">Quay Lại</Link></div>
      <div className="btn border border-black  p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-black rounded-2xl"><button type="submit"
        disabled={isLoading}>
		{isLoading ? "Đang thêm..." : "Thêm"}
		</button></div>
    </div>
		</form>
	</div>
</div>
    )
}

    export default AddAdmin;