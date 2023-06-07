
import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import '../../../assets/css/Clients/navdropshopping.css'
const Nav = () => {
  const localtion = useNavigate()
  const [count, setCount] = useState(0);
  const handleLogOut = (e) => {
    e.preventDefault()
    axios.post('api/logout').then(res => {
      localStorage.removeItem('auth_token')
      localStorage.removeItem('auth_name')
      localtion("/login")
    })
  }
  useEffect(() => {
    if (localStorage.getItem('auth_id')) {
      axios.get(`api/checkout/` + localStorage.getItem('auth_id')).then(res => {

        if (res.data.status === 200) {
          setCount(res.data.order.length)
        }
      })
    }
  }, [count])
  
  let status = ''

  if (!localStorage.getItem('auth_name')) {
    status = <Link className="rounded btn btn-warning" to={'/login'}>Login</Link>

  } else {

    status = <div className="d-flex align-items-baseline">
      <div class="btn-group  shadow-0 mb-2">
  <button
    class="btn  dropdown-toggle"
    type="button"
    id="dropdownMenuButton"
    data-mdb-toggle="dropdown"
    aria-expanded="false"
  >
    <div class="cart d-flex">
          <span class="count">{count}</span>
          <i class="material-icons top-0">
            <i className="fa-solid fa-cart-shopping"></i>

          </i>
        </div>
  </button>
  <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
    <li><a class="dropdown-item" href="#"><ul class="list-group list-group-light">
  <li class="list-group-item d-flex justify-content-between align-items-center">
    <div class="d-flex align-items-center" style={{width:'300px'}}>
      <img src="https://mdbootstrap.com/img/new/avatars/8.jpg" alt="" style={{width: '45px', height: '45px'}}
        class="rounded-circle" />
      <div class="ms-3">
        <p class="fw-bold mb-1">John Doe</p>
        <p class="text-muted mb-0">john.doe@gmail.com</p>
      </div>
    </div>
    <span  ><i class="fa-solid fa-square-minus"></i></span>
  </li>
  <li class="list-group-item d-flex justify-content-between align-items-center">
    <div class="d-flex align-items-center">
      <img src="https://mdbootstrap.com/img/new/avatars/6.jpg" class="rounded-circle" alt=""
        style={{width: '45px', height: '45px'}} />
      <div class="ms-3">
        <p class="fw-bold mb-1">Alex Ray</p>
        <p class="text-muted mb-0">alex.ray@gmail.com</p>
      </div>
    </div>
    <span ><i class="fa-solid fa-square-minus"></i></span>
  </li>
  <li class="list-group-item d-flex justify-content-between align-items-center">
    <div class="d-flex align-items-center">
      <img src="https://mdbootstrap.com/img/new/avatars/7.jpg" class="rounded-circle" alt=""
        style={{width: '45px', height: '45px'}} />
      <div class="ms-3">
        <p class="fw-bold mb-1">Kate Hunington</p>
        <p class="text-muted mb-0">kate.hunington@gmail.com</p>
      </div>
    </div>
    <span ><i class="fa-solid fa-square-minus"></i></span>
  </li>
</ul></a></li>
  </ul>
</div>
      {/* <Link to={`checkout/` + localStorage.getItem('auth_id')} className="fs-5 ml-3">
        
      

      </Link> */}
      <button onClick={handleLogOut} className=" ml-3 " style={{width: '25px',height:'25px', borderRadius: '50%'}}> <i class="fa-solid fa-power-off"></i></button></div>
  }


  return (
    <>
      <nav className="navbar navbar-expand-lg col-md-12">

        <div className="navbar-brand">
          <Link href="index.html">
            <img src={require('../../../assets/img/logo.png')} />
          </Link>
        </div>

        <button className="navbar-toggler collapsed" type="button" data-toggle="collapse"
          data-target="#slide-navbar-collapse" aria-controls="slide-navbar-collapse"
          aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"><i className="icon icon-navicon"></i></span>
        </button>

        <div className="navbar-collapse collapse" id="slide-navbar-collapse">
          <ul className="navbar-nav light list-inline strong sf-menu">
            <li className="nav-item active">
              <Link href="index.html" className="nav-link" data-effect="Home">HOME</Link>
            </li>
            <li className="nav-item">
              <Link href="reservation.html" className="nav-link"
                data-effect="Reservation">RESERVATION</Link>
            </li>
            <li className="nav-item">
              <Link to={'/all-foods'} className="nav-link" data-effect="Menu">MENU</Link>
            </li>
            
          </ul>

        </div>

        <div className="social-block d-flex align-items-baseline">
          <form>
            <div className="form-group">
              <input type="email" className="form-control" id="email" name="email address"
                placeholder="Search Meal" />
              <button type="submit" className="searchbtn"><i className="icon icon-search"></i></button>
            </div>
          </form>
          <div className="social-icon">
            {status}
          </div>
          
        </div>
      </nav>
    </>
  )
}
export default Nav