import { useState } from "react";
import axios from "axios";
import swal from 'sweetalert';
import { useNavigate } from "react-router-dom";
const Register =()=> {
    const localtion = useNavigate()
    const [inputUser, setInputUser] = useState({
        email: "",
        password: "",
        name: "",
        error_list: [],
    });
    const handleInput = (e) => {
        e.persist();

        setInputUser({ ...inputUser, [e.target.name]: e.target.value });
    };
    const handldSubmit = (e) => {
        e.preventDefault();
        const data = {
            email: inputUser.email,
            password: inputUser.password,
            name: inputUser.name,
        };
        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`/api/register`, data).then((res) => {
                if (res.data.status === 200) {
                    localStorage.setItem('auth_token',res.data.token)
                    localStorage.setItem('auth_name',res.data.name)
                    swal('Success',res.data.message,'success')
                    localtion("/login")
                } else {
                    setInputUser({
                        ...inputUser,
                        error_list: res.data.validation_error,
                    });
                }
            });
        });
        
    };
    return (
        <>
            <section class="vh-100" style={{backgroundColor:  '#eee'}}>
  <div class="container h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-lg-12 col-xl-11">
        <div class="card text-black" style={{borderRadius: '25px'}}>
          <div class="card-body p-md-5">
            <div class="row justify-content-center">
              <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                <form class="mx-1 mx-md-4" onSubmit={handldSubmit}>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                      <input placeholder="Your Name" type="text" onChange={handleInput} value={inputUser.name} id="form3Example1c" name="name" class="form-control" />
                      
                      <span>{''||inputUser.error_list.name}</span>
                    
                    </div>
                  </div>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                      <input placeholder="Your Email" onChange={handleInput} value={inputUser.email} type="email" name="email" id="form3Example3c" class="form-control" />
                      
                    <span>{inputUser.error_list.email}</span>

                    </div>
                  </div>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                      <input onChange={handleInput} placeholder="Password" type="password" name="password" id="form3Example4c" class="form-control" />
                      
                    </div>
                  </div>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-key fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                      <input  type="password" id="form3Example4cd" class="form-control" />
                      <label class="form-label" for="form3Example4cd">Repeat your password</label>
                    <span>{inputUser.error_list.password}</span>

                    </div>
                  </div>

                  <div class="form-check d-flex justify-content-center mb-5">
                    <input class="form-check-input me-2" type="checkbox" value="" id="form2Example3c" />
                    <label class="form-check-label" for="form2Example3">
                      I agree all statements in <a href="#!">Terms of service</a>
                    </label>
                  </div>

                  <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <button type="submit" class="btn btn-primary btn-lg">Register</button>
                  </div>

                </form>

              </div>
              <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                  class="img-fluid" alt="Sample image"/>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
        </>
    );
}
export default Register;
