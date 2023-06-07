import { useEffect, useRef, useState } from 'react'
import '../../../assets/css/Clients/tableorder.css'
import axios from 'axios';
import Swal from 'sweetalert2'
const Dashboard = () => {
  const useToggle = (initialState) => {
    const [toggleValue, setToggleValue] = useState(initialState);

    const toggler = () => { setToggleValue(!toggleValue) };
    return [toggleValue, toggler]
  };
  const [toggle, setToggle] = useToggle();
  const [book, setBook] = useState();
  const [check, setCheck] = useState();
  const [checkClick, setCheckClick] = useState(0);
 
 useEffect(()=>{
  axios.get('api/admin/all-book')
  .then(res=>{
    if (res.data.status===200) {
      setBook(res.data.books)
    }
  })
 },[checkClick])
 const elementsRef = useRef([]);

 useEffect(() => {
   setTimeout(() => {
    const arr= []
    book && book.forEach(e=>{
        arr.push(e.number_table)
    })
    console.log('');
     if (elementsRef) {
       elementsRef.current.forEach((elementRef) => {
        
        if (elementRef) {
          const checkLife = arr.includes(elementRef.textContent)
          if (checkLife) {
            
            elementRef.classList.add('bg-primary')
          }else{
            
            elementRef.classList.remove('bg-primary')
          
         }
        }
      })
    }
  }, 0);
 }, [book]);
 
 const addRef = (element) => {
   elementsRef.current.push(element);
 };
 const handleChooseTable = (e)=>{
   if (check) {
    let pst = e.target.getAttribute('data');
    const tbName = check.split(',')
  Swal.fire({
    title: `Đặt bàn cho ${tbName[0]} bàn số ${e.target.textContent} vị trí ${pst== 1 ? ' Trên lầu':'Tần trệt'}`,
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes!'
  }).then((result) => {
    if (result.isConfirmed) {
      const formData = new FormData();
      formData.append('number_table', e.target.textContent)
      formData.append('position', pst)
      Swal.fire(
        axios.post(`api/admin/updatebook/${tbName[1]}`, formData)
        .then(res=>{
          if (res.data.status === 200) {
    setCheckClick(pre => pre+1)
            
          }
          'Success!',
          'Your file has been deleted.',
          'success'
        })
      )
    }
  })
  }
 }
  return (
    <>

<div class="container">
  <span id="rateMe3"  class="rating-faces"></span>
</div>

      <div class="col-md-4 d-inline-block ">
        <div class="card">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <p class="mb-0 text-muted">Sales</p>
                <h2>$23,523</h2>
              </div>
              <span class="badge badge-pill badge-cyan font-size-12">
                <i class="fas fa-arrow-up"></i>
                <span class="font-weight-semibold ml-1">6.71%</span>
              </span>
            </div>
            <div class="m-t-40">
              <div class="d-flex justify-content-between">
                <div class="d-flex align-items-center">
                  <span class="badge badge-primary badge-dot mr-2"></span>
                  <span class="text-gray font-weight-semibold font-size-13">Monthly Goal</span>
                </div>
                <span class="text-dark font-weight-semibold font-size-13 mt-2">70% </span>
              </div>
              <div class="progress progress-sm w-100 m-b-0 mt-2">
                <div class="progress-bar bg-primary" style={{ width: '100%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4 d-inline-block">
        <div class="card">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <p class="mb-0 text-muted">Margin</p>
                <h2>$8,523</h2>
              </div>
              <span class="badge badge-pill badge-cyan badge-red">
                <i class="fas fa-arrow-down"></i>
                <span class="font-weight-semibold   ml-1">6.71%</span>
              </span>
            </div>
            <div class="m-t-40">
              <div class="d-flex justify-content-between">
                <div class="d-flex align-items-center">
                  <span class="badge badge-primary badge-dot mr-2"></span>
                  <span class="text-gray font-weight-semibold font-size-13">Monthly Goal</span>
                </div>
                <span class="text-dark font-weight-semibold font-size-13 mt-2">60% </span>
              </div>
              <div class="progress progress-sm w-100 m-b-0 mt-2">
                <div class="progress-bar bg-primary" style={{ width: '70%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4 d-inline-block">
        <div class="card">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <p class="mb-0 text-muted">Sales</p>
                <h2>$23,523</h2>
              </div>
              <span class="badge badge-pill badge-cyan font-size-12">
                <i class="fas fa-arrow-up"></i>
                <span class="font-weight-semibold ml-1">6.71%</span>
              </span>
            </div>
            <div class="m-t-40">
              <div class="d-flex justify-content-between">
                <div class="d-flex align-items-center">
                  <span class="badge badge-primary badge-dot mr-2"></span>
                  <span class="text-gray font-weight-semibold font-size-13">Monthly Goal</span>
                </div>
                <span class="text-dark font-weight-semibold font-size-13 mt-2">70% </span>
              </div>
              <div class="progress progress-sm w-100 m-b-0 mt-2">
                <div class="progress-bar bg-primary" style={{ width: '75%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='collapse mt-3 scroll-sectio' id="collapseWithScrollbar">
        <div class="col-md-4 d-inline-block ">
          <div class="card">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-center">
                <div>
                  <p class="mb-0 text-muted">Sales</p>
                  <h2>$23,523</h2>
                </div>
                <span class="badge badge-pill badge-cyan font-size-12">
                  <i class="fas fa-arrow-up"></i>
                  <span class="font-weight-semibold ml-1">6.71%</span>
                </span>
              </div>
              <div class="m-t-40">
                <div class="d-flex justify-content-between">
                  <div class="d-flex align-items-center">
                    <span class="badge badge-primary badge-dot mr-2"></span>
                    <span class="text-gray font-weight-semibold font-size-13">Monthly Goal</span>
                  </div>
                  <span class="text-dark font-weight-semibold font-size-13 mt-2">70% </span>
                </div>
                <div class="progress progress-sm w-100 m-b-0 mt-2">
                  <div class="progress-bar bg-primary" style={{ width: '100%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4 d-inline-block">
          <div class="card">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-center">
                <div>
                  <p class="mb-0 text-muted">Margin</p>
                  <h2>$8,523</h2>
                </div>
                <span class="badge badge-pill badge-cyan badge-red">
                  <i class="fas fa-arrow-down"></i>
                  <span class="font-weight-semibold   ml-1">6.71%</span>
                </span>
              </div>
              <div class="m-t-40">
                <div class="d-flex justify-content-between">
                  <div class="d-flex align-items-center">
                    <span class="badge badge-primary badge-dot mr-2"></span>
                    <span class="text-gray font-weight-semibold font-size-13">Monthly Goal</span>
                  </div>
                  <span class="text-dark font-weight-semibold font-size-13 mt-2">60% </span>
                </div>
                <div class="progress progress-sm w-100 m-b-0 mt-2">
                  <div class="progress-bar bg-primary" style={{ width: '70%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4 d-inline-block">
          <div class="card">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-center">
                <div>
                  <p class="mb-0 text-muted">Sales</p>
                  <h2>$23,523</h2>
                </div>
                <span class="badge badge-pill badge-cyan font-size-12">
                  <i class="fas fa-arrow-up"></i>
                  <span class="font-weight-semibold ml-1">6.71%</span>
                </span>
              </div>
              <div class="m-t-40">
                <div class="d-flex justify-content-between">
                  <div class="d-flex align-items-center">
                    <span class="badge badge-primary badge-dot mr-2"></span>
                    <span class="text-gray font-weight-semibold font-size-13">Monthly Goal</span>
                  </div>
                  <span class="text-dark font-weight-semibold font-size-13 mt-2">70% </span>
                </div>
                <div class="progress progress-sm w-100 m-b-0 mt-2">
                  <div class="progress-bar bg-primary" style={{ width: '75%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <a
        onClick={setToggle}
        class="btn btn-primary"
        data-mdb-toggle="collapse"
        href="#collapseWithScrollbar"
        role="button"
        aria-expanded="false"
        aria-controls="collapseExample"
      >
        {
          toggle &&
          <i class="fa-solid fa-circle-chevron-up"></i>
        }
        {
          !toggle && <i class="fa-sharp fa-solid fa-circle-chevron-down"></i>
        }
      </a>
      
 

      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 mt-5">

            
            <div class="mana d-inline-block ml-5">
              <div onClick={handleChooseTable} ref={addRef} data={2} class="A">B4</div>
              <div onClick={handleChooseTable} ref={addRef} data={2} class="A">B8</div>
              <div onClick={handleChooseTable} ref={addRef} data={2} class="A">X</div>
              <div onClick={handleChooseTable} ref={addRef} data={2} class="A">B2</div>
              <div onClick={handleChooseTable} ref={addRef} data={2} class="A">B2</div>
              <div class="res">
                <div  class="flex">
                  <div class="a2">
                    <div onClick={handleChooseTable} ref={addRef} data={2} class="btnC b2" id="ban02">2</div>
                    <div onClick={handleChooseTable} ref={addRef} data={2} class="btnC b2" id="ban03">3</div>
                    <div onClick={handleChooseTable} ref={addRef} data={2} class="btnC b2" id="ban04">4</div>
                    <div onClick={handleChooseTable} ref={addRef} data={2} class="btnC b2" id="ban05">5</div>
                    <div onClick={handleChooseTable} ref={addRef} data={2} class="btnC b2" id="ban06">6</div>
                    <div onClick={handleChooseTable} ref={addRef} data={2} class="btnC b2" id="ban07">7</div>
                    <div onClick={handleChooseTable} ref={addRef} data={2} class="btnC b2" id="ban08">8</div>
                    <div onClick={handleChooseTable} ref={addRef} data={2} class="btnC b2" id="ban09">9</div>
                    <div onClick={handleChooseTable} ref={addRef} data={2} class="btnC b2" id="ban10">10</div>
                    <div onClick={handleChooseTable} ref={addRef} data={2} class="btnC b2" id="ban01">1</div>
                  </div>
                  <div class="a4">
                    <div onClick={handleChooseTable} ref={addRef} data={2} class="btnC b4" id="ban12">12</div>
                    <div onClick={handleChooseTable} ref={addRef} data={2} class="btnC b4" id="ban13">13</div>
                    <div onClick={handleChooseTable} ref={addRef} data={2} class="btnC b4" id="ban14">14</div>
                    <div onClick={handleChooseTable} ref={addRef} data={2} class="btnC b4" id="ban11">11</div>
                  </div>
                  <div class="a8">
                    <div onClick={handleChooseTable} ref={addRef} data={2} class="btnC b8" id="ban16">16</div>
                    <div onClick={handleChooseTable} ref={addRef} data={2} class="btnC b8" id="ban15">15</div>
                  </div>
                </div>

              </div>
            </div>
          </div>
          <ol class="list-group list-group-light list-group-numbered col-md-6">
            {
              book && book.map((e,i)=>{
 var date = new Date(e.date_time)
                return(
              <li key={i} class="list-group-item d-flex justify-content-between align-items-center">
                <div class="ms-2 me-auto">
                  <div class="fw-bold">{e.name}</div>
                  {e.phone_number}
                </div>
                <input type="radio" onChange={e=>setCheck(e.target.value)} name='choosename' value={e.name + "," + e.id}/>
                { e.number_table && <><i class="ml-5 fa-solid fa-circle-check color-primary"></i> <span class="badge badge-primary rounded-pill mr-3">Bàn số : {e.number_table}</span></>}
              
                <span class="badge badge-primary rounded-pill mr-3">{ + date.getDate()+"/" + (date.getMonth()+1) +"/" + date.getFullYear()+" time: " +date.getHours()+":"+ date.getMinutes()}</span>
                
    
    <div><i class="fa-solid fa-square-minus cursor-pointer"></i></div>
              
              </li> 

                )
              })
            }
          </ol>
        </div>
        <table class="table bg-primary">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">First</th>
      <th scope="col">Last</th>
      <th scope="col">Handle</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
   
  </tbody>
</table>
      </div>
    </>
  )
}
export default Dashboard