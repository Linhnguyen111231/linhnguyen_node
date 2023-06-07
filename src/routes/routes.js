import Category from '../components/Admin/ManageCategory/Category.jsx'
import Dashboard from '../components/Admin/Dashboard/Dashboard.jsx'
import Profile from '../components/Admin/Profile'
import AddCategory from '../components/Admin/ManageCategory/AddCategory.jsx'
import EditCategory from '../components/Admin/ManageCategory/EditCategory.jsx'
import AddProduct from '../components/Admin/ManageProduct/AddProduct.jsx'
import EditProduct from '../components/Admin/ManageProduct/EditProduct.jsx'
import Foods from '../components/Admin/ManageProduct/Foods.jsx'
import AddBlog from '../components/Admin/ManageBlogs/AddBlog.jsx'
import Blogs from '../components/Admin/ManageBlogs/Blogs.jsx'
import Chat from '../components/Admin/Dashboard/Chat.jsx'


const routes = [
    {path:'/admin', exact: true,name:'Admin'},
    {path:'index', exact: true,name:'Dashboard', component: Dashboard},
    {path:'profile', exact: true,name:'Profile', component: Profile},
    //categories
    {path:'category', exact: true,name:'Category', component: Category},
    {path:'category/add-category', exact: true,name:'AddCategory', component: AddCategory},
    {path:'category/:id/edit', exact: true,name:'EditCategory', component: EditCategory},
    //Products
    {path:'foods', exact: true,name:'Foods', component: Foods},
    {path:'foods/add-food', exact: true,name:'AllProduct', component: AddProduct},
    {path:'foods/:id/edit', exact: true,name:'EditProduct', component: EditProduct},
    //Blogs
    {path:'blogs', exact: true,name:'Blogs', component: Blogs},
    {path:'blogs/add-blog', exact: true,name:'AddBlog', component: AddBlog},
    {path:'index', exact: true,name:'Dashboard', component: Dashboard},
    {path:'chat', exact: true,name:'Chat', component: Chat},

]
export default routes