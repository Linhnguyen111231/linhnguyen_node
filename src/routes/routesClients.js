import ErrorFile from "../components/Clients/ErrorFile"
import AllFoods from "../components/Clients/AllFoods"
import BookTable from "../components/Clients/BookTable"
import Checkout from "../components/Clients/Checkout"
import Detail from "../components/Clients/DetailFood"
import Index from "../components/Clients/Index"
import Profile from "../components/Clients/Profile"


const routesClients = [
    {path: 'all-foods',exact: true,name:'AllFoods', component: AllFoods},
    {path: 'index',exact: true,name:'Index', component: Index},
    {path: '',exact: true,name:'Index', component: Index},
    {path: 'detail/:id',exact: true,name:'Detail', component: Detail},
    {path: 'checkout/:id',exact: true,name:'Detail', component: Checkout},
    {path: 'book',exact: true,name:'Book', component: BookTable},
    {path: '404',exact: true,name:'ErrorFile', component: ErrorFile},
    {path: 'profile/:id',exact: true,name:'Profile', component: Profile},
]
export default routesClients