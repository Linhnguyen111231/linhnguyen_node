import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom"
import '../../assets/css/historyorder.css'
import axios from "axios";
const arrLi = ['Đang xử lý', 'Đã xử lý', 'Đang giao hàng', 'Đã nhận hàng']
const Profile = () => {
  const idParam = useParams()
  const [user, setUser] = useState([]);
  const location = useNavigate();
  console.log(localStorage.getItem('auth_id') != idParam.id);
  useEffect(() => {
    if ((localStorage.getItem('auth_id') != idParam.id)) {
      console.log(1);
      location('/404')
    }
  }, [])
  
  useEffect(() => {
    axios.post(`api/profile/${idParam.id}`)
      .then(res => {
        if (res.data.status === 200) {
          setUser(JSON.parse(res.data.user))
        }
      })
  }, [])

  const handleChange = () => {

  }
  return (
    <section style={{ backgroundColor: '#eee' }}>
      <div class="container">
        <h1>Edit Profile</h1>
        <hr />
        <div className="card">

          <div class="row align-items-center">
            <div class="col-md-3">
              <div class="text-center">
                <img src="//placehold.it/100" style={{ width: '200px', height: '200px' }} class="img-circle" alt="avatar" />
                <h6>Upload a different photo...</h6>

                <input type="file" class="form-control" />
              </div>
            </div>

            <div class="col-md-9 personal-info">
              <div class="alert alert-info alert-dismissable mt-5">
                <a class="panel-close close" data-dismiss="alert">×</a>
                <i class="fa fa-coffee"></i>
                This is an <strong>.alert</strong>. Use this to show important messages to the user.
              </div>
              <h3>Personal info</h3>

              <form class="form-row" role="form">

                <div class="form-group">
                  <label class="col-lg-3 control-label">Email:</label>
                  <div class="col-lg-8">
                    <input class="form-control" type="text" value="janesemail@gmail.com" />
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-md-3 control-label">Username:</label>
                  <div class="col-md-8">
                    <input class="form-control" type="text" value="janeuser" />
                  </div>
                </div>
                <div class="form-group col-md-6">
                  <label class="col-lg-3 control-label">Address:</label>
                  <div class="col-lg-8">
                    <input class="form-control" type="text" value="janesemail@gmail.com" />
                  </div>
                </div>
                <div class="form-group col-md-6">
                  <label class="col-lg-3 control-label">Phone Number:</label>
                  <div class="col-lg-8">
                    <input class="form-control" type="text" value="janesemail@gmail.com" />
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-md-3 control-label">Password:</label>
                  <div class="col-md-8">
                    <input class="form-control" type="password" value="11111122333" />
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-md-3 control-label">Confirm password:</label>
                  <div class="col-md-8">
                    <input class="form-control" type="password" value="11111122333" />
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-md-3 control-label"></label>
                  <div class="col-md-8">
                    <input type="button" class="btn btn-primary" value="Save Changes" />
                    <span></span>
                    <input type="reset" class="btn btn-default" value="Cancel" />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="container py-5">

        <div className="row">
          <div className="col-lg-4">
            <div className="card mb-4">
              <div className="card-body text-center">
                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" alt="avatar" className="rounded-circle img-fluid" style={{ width: '150px', height: '150px' }} />
                <h5 className="my-3">John Smith</h5>
                <div className="d-flex justify-content-center mb-2">
                </div>
              </div>
            </div>

          </div>

          <div className="col-lg-8">
            <div className="card mb-4">
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Full Name</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">Johnatan Smith</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Email</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">example@example.com</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Phone</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">(097) 234-5678</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Mobile</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">(098) 765-4321</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Address</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">Bay Area, San Francisco, CA</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="card mb-4 mb-md-0">
                  <div className="card-body">
                    <p className="mb-4"><span className="text-primary font-italic me-1">assigment</span> Project Status
                    </p>
                    <p className="mb-1" style={{ fontSize: '.77rem' }}>Web Design</p>
                    <div className="progress rounded" style={{ height: '5px' }}>
                      <div className="progress-bar" role="progressbar" style={{ width: '80%' }} aria-valuenow={80} aria-valuemin={0} aria-valuemax={100} />
                    </div>
                    <p className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Website Markup</p>
                    <div className="progress rounded" style={{ height: '5px' }}>
                      <div className="progress-bar" role="progressbar" style={{ width: '72%' }} aria-valuenow={72} aria-valuemin={0} aria-valuemax={100} />
                    </div>
                    <p className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>One Page</p>
                    <div className="progress rounded" style={{ height: '5px' }}>
                      <div className="progress-bar" role="progressbar" style={{ width: '89%' }} aria-valuenow={89} aria-valuemin={0} aria-valuemax={100} />
                    </div>
                    <p className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Mobile Template</p>
                    <div className="progress rounded" style={{ height: '5px' }}>
                      <div className="progress-bar" role="progressbar" style={{ width: '55%' }} aria-valuenow={55} aria-valuemin={0} aria-valuemax={100} />
                    </div>
                    <p className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Backend API</p>
                    <div className="progress rounded mb-2" style={{ height: '5px' }}>
                      <div className="progress-bar" role="progressbar" style={{ width: '66%' }} aria-valuenow={66} aria-valuemin={0} aria-valuemax={100} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card mb-4 mb-md-0">
                  <div className="card-body">
                    <p className="mb-4"><span className="text-primary font-italic me-1">assigment</span> Project Status
                    </p>
                    <p className="mb-1" style={{ fontSize: '.77rem' }}>Web Design</p>
                    <div className="progress rounded" style={{ height: '5px' }}>
                      <div className="progress-bar" role="progressbar" style={{ width: '80%' }} aria-valuenow={80} aria-valuemin={0} aria-valuemax={100} />
                    </div>
                    <p className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Website Markup</p>
                    <div className="progress rounded" style={{ height: '5px' }}>
                      <div className="progress-bar" role="progressbar" style={{ width: '72%' }} aria-valuenow={72} aria-valuemin={0} aria-valuemax={100} />
                    </div>
                    <p className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>One Page</p>
                    <div className="progress rounded" style={{ height: '5px' }}>
                      <div className="progress-bar" role="progressbar" style={{ width: '89%' }} aria-valuenow={89} aria-valuemin={0} aria-valuemax={100} />
                    </div>
                    <p className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Mobile Template</p>
                    <div className="progress rounded" style={{ height: '5px' }}>
                      <div className="progress-bar" role="progressbar" style={{ width: '55%' }} aria-valuenow={55} aria-valuemin={0} aria-valuemax={100} />
                    </div>
                    <p className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Backend API</p>
                    <div className="progress rounded mb-2" style={{ height: '5px' }}>
                      <div className="progress-bar" role="progressbar" style={{ width: '66%' }} aria-valuenow={66} aria-valuemin={0} aria-valuemax={100} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container-fluid">
        <div class="route-wrapper card mt-5">
          <div class="route-name rounded-pill d-inline-block">TUYẾN SỐ 1</div>
          <div class="route card-body">
            <div class="row">
              <input type="radio" disabled={true} name="route-1" class="col station-dot" id="sta-1" checked data-bs-toggle="tooltip" data-bs-custom-class="route-tooltip"
                data-bs-html="true" data-bs-title="Tuyến " />
              <input type="radio" name="route-1" class="col station-dot" id="sta-2" data-bs-toggle="tooltip" data-bs-custom-class="route-tooltip"
                data-bs-html="true" checked disabled={true} data-bs-title="Tuyến " />
              <input type="radio" name="route-1" class="col station-dot" id="sta-3" data-bs-toggle="tooltip" data-bs-custom-class="route-tooltip"
                data-bs-html="true" disabled={true} data-bs-title="Tuyến " />
              <input type="radio" name="route-1" class="col station-dot" id="sta-4" data-bs-toggle="tooltip" data-bs-custom-class="route-tooltip"
                data-bs-html="true" disabled={true} data-bs-title="Tuyến " />


            </div>
            <div class="row text-center">
              <div class="col station-name">
                Đang Xử Lý
              </div>
              <div class="col station-name">
                Đã Xử Lý
              </div>
              <div class="col station-name">
                Đang Giao
              </div>
              <div class="col station-name">
                Đã Giao
              </div>


            </div>
          </div>
        </div>
      </div>
    </section>

  )
}
export default Profile