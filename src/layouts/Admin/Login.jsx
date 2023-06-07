import { Link, Route, Routes, useNavigate } from "react-router-dom"

import { useState } from "react"
import axios from "axios"
import swal from "sweetalert"
import '../../assets/css/Admin/login.css'
import MasterLayoutsAdmin from "./MasterLayoutsAdmin"
const Login =()=> {
    const localtion = useNavigate();
    const [inputUser, setInputUser] = useState({
        email: "",
        password: ""
    })
    const handleInput=  (e)=> {
        e.persist();
        setInputUser({...inputUser, [e.target.name]: e.target.value})
    }
    
    const handleLogin = (e)=> {
        e.preventDefault()
        const data = {
            email:inputUser.email,
            password: inputUser.password
        }
        axios.get('/sanctum/csrf-cookie').then((response)=>{
            axios.post("api/login",data).then(res=>{
                if (res.data.status === 200) {
                    localStorage.setItem('auth_token',res.data.token)
                    localStorage.setItem('auth_name',res.data.name)
                    localStorage.setItem('auth_id',res.data.user_id)
                    if (res.data.name === 'Admin') {
                        localtion('/admin/category',<MasterLayoutsAdmin/>)
                    }else{
                        localtion('/index')
                    }
                }else{
                    swal('Error',res.data.login_not_success,'Error')

                }
            })
        })
    }
    return (
        <>
         <section style={{display: "flex"}}>
        <div className="img-bg">
            <img src=""
                alt="Hình Ảnh Minh Họa"/>
        </div>
        <div className="noi-dung">
            <div className="form">
                <h2>Trang Đăng Nhập</h2>
                <form onSubmit={handleLogin}>
                    <div className="input-form">
                        <span>Tên Người Dùng</span>
                        <input type="text" name="email" onChange={handleInput} value={inputUser.email}/>
                    </div>
                    <div className="input-form">
                        <span>Mật Khẩu</span>
                        <input type="password" name="password"onChange={handleInput} value={inputUser.password}/>
                    </div>
                    <div className="nho-dang-nhap">
                        <label><input type="checkbox" name=""/> Nhớ Đăng Nhập</label>
                    </div>
                    <div className="input-form">
                        <input type="submit" value="Đăng Nhập"/>
                    </div>
                    <div className="input-form">
                        <p>Bạn Chưa Có Tài Khoản? <Link to="/register">Đăng Ký</Link></p>
                    </div>
                </form>
                <h3>Đăng Nhập Bằng Mạng Xã Hội</h3>
                <ul className="icon-dang-nhap">
                    <li><i className="fa fa-facebook" aria-hidden="true"></i></li>
                    <li><i className="fa fa-google" aria-hidden="true"></i></li>
                    <li><i className="fa fa-twitter" aria-hidden="true"></i></li>
                </ul>
            </div>
        </div>
    </section>
        </>
    )
}
export default Login