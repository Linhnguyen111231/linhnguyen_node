import Header from "./Components/Header";
import Footer from "./Components/Footer";
import "../../assets/css/Clients/styleindex.css"
import "../../assets/css/Clients/superfish.css"
import '../../assets/css/Clients/fonts/icomoon/icomoon.css'

import { Route, Routes, useParams } from "react-router-dom";
import routesClients from "../../routes/routesClients";
const MasterLayoutClients = ()=> {
    
  
    return (
        
        <div className="main-wrapper">
            <Header/>
            <Routes>
            {routesClients.map((routesClient,i)=>{
           return(
            routesClient.component && (<Route 
                key={i} 
                path={routesClient.path} 
                exact={routesClient.exact}
                name={routesClient.name}
                element={
                      <routesClient.component />
                }
            />)
           )
        })}
            </Routes>
            <Footer/>
        </div>
    
    )
}
export default MasterLayoutClients