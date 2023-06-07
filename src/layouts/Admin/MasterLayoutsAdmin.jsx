import NavAdmin from "./NavAdmin"
import Sidebar from "./SideBarAdmin"
import {motion} from 'framer-motion'
import logo from "../../assets/img/imgAdmin/logo.svg";
import routes from '../../routes/routes';
import {  Route, Routes } from "react-router-dom";

const MasterLayoutsAdmin = ()=>{
    return (
        <div className="wrapper">
      <div className="main-header">
        <div className="logo-header" data-background-color="blue">
          <a href="index.html" className="logo">
            <motion.img
              initial={{ x: 103 }}
              whileInView={{ x: 50 }}
              src={logo}
              alt="navbar brand"
              className="navbar-brand"
            />
          </a>
          <button
            className="navbar-toggler sidenav-toggler ml-auto"
            type="button"
            data-toggle="collapse"
            data-target="collapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon">
              <i className="icon-menu"></i>
            </span>
          </button>
          <button className="topbar-toggler more">
            <i className="icon-options-vertical"></i>
          </button>
          <div className="nav-toggle">
            <button className="btn btn-toggle toggle-sidebar">
              <i className="icon-menu"></i>
            </button>
          </div>
        </div>
        <NavAdmin />
      </div>
      <Sidebar />
      <div className="main-panel text-center">
        <div className="content">
        <Routes>
        {routes.map((route,i)=>{
           return(
            route.component && (<Route 
                key={i} 
                path={route.path} 
                exact={route.exact}
                name={route.name}
                element={
                      <route.component />
                }
            />)
           )
        })}
      </Routes>
        </div>
      </div>
    </div>
    )
}

export default MasterLayoutsAdmin