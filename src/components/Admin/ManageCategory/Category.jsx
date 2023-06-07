import axios from "axios"
import  { Suspense, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Loading from "../../Loading"
import Swal from 'sweetalert2'

const Category =  () => {
    const [dataCategory, setDataCategory] = useState([])
    const [keySearch, setKeySearch] = useState('')
    const [loading, setLoading] = useState(true)
    const location = useNavigate()
    let dataView =''
      useEffect(()=>{
        if (keySearch !== '') {
            let data = new FormData()
            data.append('search',keySearch)
            axios.post('api/admin/category-search',data)
            .then(res=>{
                if (res.data.status === 200) {
                    if (res.data.status!=='') {
                    setDataCategory(res.data.data_search)
                    }
                }
            })
        }else{
            axios.get('api/admin/category')
            .then(res=>{
                if (res.data.status === 200) {
                    setDataCategory(res.data.all_categories)
                    setLoading(false)

                }
            },[dataCategory])
        }
    },[keySearch])
    
    const handleDelete = (e)=>{
        const idAndName = e.target.value.split('.')
        Swal.fire({
            title: `Do you want to delete category ${idAndName[1]}?`,
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Delete',
            denyButtonText: `Don't delete`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                console.log(e.target.value);
                axios.delete(`api/admin/delete-category/${idAndName[0]}`).then(res=>{
                    if (res.data.status === 200) {
                        
                        Swal.fire('Delete', '', 'success')
                        location('/admin/category')
                    }
                })
                .catch(()=>{
                    Swal.fire('Delete dont success', '', 'info')

                })
            } else if (result.isDenied) {
              Swal.fire('Changes are not saved', '', 'info')
            }
          })
          
    }
    if (loading) {
        return <Loading/>
    }else{
        dataView = dataCategory.map((e,idx)=>{
                    const idCategory = e.id + '/edit'
            return (
                <tr key={idx}>
                    <td>{e.id}</td>
                    <td>{e.category_name}</td>
                    <td><img src={`http://127.0.0.1:8000/uploads/category/${e.img_category}`} alt="category" width={'200px'} /></td>
                    <td><Link to={idCategory} type="button" className="btn btn-primary edit" id="">Edit</Link></td>
                    <td><button onClick={handleDelete} value={e.id +"."+ e.category_name} to="#" className="btn btn-danger delete" data-id="">Delete</button></td>
                </tr>
            )
        })
    }
    return (
        <div className="container">
            <section className="category-section " >

                <Link to='add-category' className="btn btn-primary add_category">Add new Category</Link>
                <div className="collapse" id="search-nav">
						<form className="navbar-left navbar-form nav-search mr-md-3">
							<div className="input-group">
								<div className="input-group-prepend">
									<button type="submit" className="btn btn-search pr-1">
										<i className="fa fa-search search-icon"></i>
									</button>
								</div>
								<input name="search" onChange={e=> setKeySearch(e.target.value)}  type="text" placeholder="Search ..." className="form-control"/>
							</div>
						</form>
					</div>
                <div className="modal fade" id="catModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <form method="post" id="cat_form">
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label htmlFor="category_name">Category Name</label>
                                        <input type="text" className="form-control" name="category_name" id="category_name" />

                                        <span id="error" className="text-danger"></span>
                                    </div>

                                </div>
                                <div className="modal-footer">
                                    <input type="hidden" id="cat_id" name="id" />
                                    <input type="hidden" name="form_type" id="form_type" />
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="submit" className="btn btn-primary save" id="submit">Save</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <table className="table table-bordered text-bg-secondary">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Category name</th>
                            <th>Date</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        { dataView}
                    </tbody>
                </table>
                <ul className="pagination">
                    <li className="page-item"><Link to="?pageno=1" className="page-link">First</Link></li>
                    <li className="page-item ">
                        <Link to="" className="page-link">Previos</Link>
                    </li>
                    <li className="page-item">
                        <Link to="" className="page-link">Next</Link>
                    </li>
                    <li className="page-item "><Link to="?pageno=" className="page-link">Last</Link></li>
                </ul>
            </section>
        </div>
        
    )
}
export default Category