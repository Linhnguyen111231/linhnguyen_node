import axios from "axios";
import { useEffect, useMemo, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const Checkout = ()=>{
  const idParam = useParams();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userName, setUserName] = useState('');
  const [error, setError] = useState('');
  const location = useNavigate()
  const [orderFood,setOrderFood]= useState([]);
  const [qty,setQty]= useState([]);
  const [checkFood,setCheckFood]= useState([]);
  useEffect(()=>{
    if (localStorage.getItem('auth_id') == idParam.id) {
      axios.get(`api/checkout/${localStorage.getItem('auth_id')}`)
      .then(res=>{
        if (res.data.status===200) {
          setOrderFood(JSON.parse(res.data.order))
        }
      })
    }else if (localStorage.getItem('auth_id')){
      Swal.fire({
        icon: 'error',
        title: "Don't connect",
        text: 'Something went wrong!',
        footer: '<a href="">Why do I have this issue?</a>'
      })
      location('/all-foods');

    }else{
      location('/login');
    }
  },[])
  const handleChange = (e) => {
    const input = e.target.value;
    const formattedInput = input.replace(/\D/g, ''); // Chỉ giữ lại chữ số
    setPhoneNumber(formattedInput);

  if (phoneNumber.length !== 10) {
    setError('Số điện thoại phải có 10 chữ số');
  }
    setError(''); // Xóa thông báo lỗi khi người dùng tiếp tục nhập
  };
  const handleCheckbox = (e)=>{
    setCheckFood((pr) => {
      const isChecked = checkFood.includes(parseInt(e.target.value));
      if (isChecked) {
        return checkFood.filter((item) => item !== parseInt(e.target.value));
      } else {
        return [...pr, parseInt(e.target.value)];
      }
    });
  }
  const handleSubmit =(e)=>{
    e.preventDefault()
    if (checkFood.length ==0  ) {
      Swal.fire({
        title: 'Bạn chưa chọn món cần đặt nè',
        text: "Hãy chọn món nào!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Okay'
      }).then((result) => {
        if (result.isConfirmed) {
          
        }
      })
    }else{

      const formData = new FormData()
      formData.append('user_id', idParam.id)
      formData.append('food_id', checkFood)
      formData.append('phone_number', phoneNumber)
      formData.append('address', userName)
      axios.post(`api/order/${idParam.id}`,formData)
      .then(res=>{
        if (res.data.status === 200) {
          location(`/profile/${idParam.id}`)
        }
      })
    }
  }
  const handleQty = (e)=>{
    const  value  = e.target.value;
    const index = e.target.getAttribute('data-index')

  if (!isNaN(value)) {
    const updatedNumbers = [...qty];
    
    updatedNumbers[index] = (Number(value) + 1)-1; 
    console.log(value);
    
    setQty(updatedNumbers); // Cập nhật lại mảng số mới
  }
    const formData = new FormData();
			formData.append('quantity', e.target.value)
			formData.append('food_id', e.target.getAttribute('data-id'))
			formData.append('user_id', localStorage.getItem('auth_id'))

			axios.post('api/food/update', formData)
				.then(res => {
					if (res.data.status === 200) {
						setOrderFood(JSON.parse(res.data.order))
					}
				})
  }
  
  const totalOrd= 
    orderFood.reduce((pre,p)=>
   pre +p.total
  ,0)
    return(
        <section className="h-100 h-custom" style={{backgroundColor: '#eee'}}>
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col">
        <div className="card">
          <div className="card-body p-4">

            <div className="row">

              <div className="col-lg-7">
                <h5 className="mb-3"><a href="#!" className="text-body"><i
                      className="fas fa-long-arrow-alt-left me-2"></i>Continue shopping</a></h5>
                <hr/>

                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div>
                    <p className="mb-1">Shopping cart</p>
                    <p className="mb-0">You have 4 items in your cart</p>
                  </div>
                  <div>
                    <p className="mb-0"><span className="text-muted">Sort by:</span> <a href="#!"
                        className="text-body">price <i className="fas fa-angle-down mt-1"></i></a></p>
                  </div>
                </div>
                
                {orderFood && orderFood.map((e,i)=>{
                 
                  return(

                  <div className="card mb-3" key={i}>
                    <div className="card-body">
                      <div className="d-flex justify-content-between">
                        <div className="d-flex flex-row align-items-center">
                          <input type="checkbox" onChange={e=>handleCheckbox(e,i)} checked={checkFood.includes(e.id)} value={e.id} />
                          <div>
                            <img
                              src={`http://127.0.0.1:8000/uploads/foods/`+e.img_food}
                              className="img-fluid rounded-3" alt="Shopping item" style={{width: '65px'}}/>
                          </div>
                          <div className="ms-3">
                            <div>{e.name}</div>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center">
                          <div id={`collapseWithScrollbar${e.id}`} className="collapse scroll-sectio">
                            
                        <input type="number" min={1} value={e.quantity} data-id={e.id} data-index={i} onChange={handleQty} style={{width: '55px'}}  className="mr-4 border-1 form-control-sm"/>
                          </div>
                          <div style={{width: '100px'}}>
                            <div className="fw-normal fs-6 mb-0 ">Qty: {e.quantity}</div>
                          </div>
                          <div style={{width: '80px'}}>
                            <div className="mb-0">Total: ${e.total}</div>
                          </div>
                          <a
            className="btn btn-primary "
            data-mdb-toggle="collapse"
            href={`#collapseWithScrollbar${e.id}`}
            role="button"
            aria-expanded="false"
            aria-controls="collapseExample"
          >
            
                          <i class="fa-solid fa-pen-to-square"></i>
          </a>
                          <button type="button" className="btn-sm btn-primary" style={{color:  'red'}}><i className="fas fa-trash-alt"></i></button>
                        </div>
                      </div>
                    </div>
                  </div>
                  )
                })}

              </div>
              <div className="col-lg-5">

                <div className="card bg-info text-white rounded-3">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <h5 className="mb-0">Card details</h5>
                      <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                        className="img-fluid rounded-3" style={{width: '45px'}} alt="Avatar"/>
                    </div>

                    <p className="small mb-2">Card type</p>
                    <a href="#!" type="submit" className="text-white"><i
                        className="fab fa-cc-mastercard fa-2x me-2"></i></a>
                    <a href="#!" type="submit" className="text-white"><i
                        className="fab fa-cc-visa fa-2x me-2"></i></a>
                    <a href="#!" type="submit" className="text-white"><i
                        className="fab fa-cc-amex fa-2x me-2"></i></a>
                    <a href="#!" type="submit" className="text-white"><i className="fab fa-cc-paypal fa-2x"></i></a>

  <input type="text" onChange={e=>setUserName(e.target.value)} id="form12" class="mt-3 form-control" placeholder="Address"/>
  <input type="tel" onChange={handleChange} value={phoneNumber} pattern="[0-9]{10}"  class="mt-3 form-control" placeholder="Phone number"/>
  {error && <p className="error">{error}</p>}

                    <hr className="my-4"/>

                    <div className="d-flex justify-content-between">
                      <p className="mb-2">Subtotal</p>
                      <p className="mb-2">${totalOrd}</p>
                    </div>



                    <button onClick={handleSubmit} type="button" className="btn btn-effect">
                      <div className="d-flex justify-content-between">
                        <span>Checkout <i className="fas fa-long-arrow-alt-right ms-2"></i></span>
                      </div>
                    </button>

                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    )
}
export default Checkout