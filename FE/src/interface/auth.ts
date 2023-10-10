export interface IUser{
    _id:string | number;
    fullname:string,
    username:string,
    email:string,
    phone:string,
    password:string,
    confirmPassword:string,
    address:string,
    role:string,
    isBlocked:boolean,
}