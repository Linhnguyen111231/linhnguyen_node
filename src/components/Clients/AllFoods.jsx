import { useEffect, useState } from 'react'
import '../../assets/css/Clients/filterproducts.css'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import Loading from '../Loading'
const AllFoods = () => {
	const [dataCategory, setDataCategory] = useState([])
	const [selectOp, setSelectOp] = useState('null')
	const [keySearch, setKeySearch] = useState('')
	
	const [price, setPrice] = useState(0)
	const [priceMin, setPriceMin] = useState(0)
	const [maxC, setMaxC] = useState(0)
	const [loading, setLoading] = useState(true)
	const [dataFoods, setDataFoods] = useState([])
	const location = useNavigate()
	const [checkCategory,setCheckCategory]= useState([]);
	const handleCheckbox = (e)=>{
		setCheckCategory((pr) => {
		  const isChecked = checkCategory.includes(parseInt(e.target.getAttribute('data-category')));
		  if (isChecked) {
			return checkCategory.filter((item) => item !== parseInt(e.target.getAttribute('data-category')));
		  } else {
			return [...pr, parseInt(e.target.getAttribute('data-category'))];
		  }
		});
		
	  }
	useEffect(() => {
		axios.get('api/categories')
			.then(res => {
				if (res.data.status === 200) {
					setDataCategory(res.data.all_categories)
					setLoading(false)

				}
			}, [])
	}, [])
	useEffect(()=>{
		const stop = setTimeout(() => {
			const formData = new FormData()
		formData.append('category_id', checkCategory)
		formData.append('maxPrice', price)
		formData.append('minPrice', priceMin)
		formData.append('arrage', selectOp)
		formData.append('search', keySearch)
		formData.append('category_id', checkCategory)
		axios.post('api/all-foods/classify',formData)
		.then(res=>{
			if (res.data.status === 200) {
				if (res.data.foods.length >0 ) {
					setDataFoods(res.data.foods)
				}
			}
		})
		}, 1000);
		return ()=> clearTimeout(stop)
	},[checkCategory,price,priceMin,selectOp, keySearch])
	const handleRangeMax = (e) => {
		setPrice(e.target.value)
		
	}
	const handleRangeMin = (e)=>{
		setPriceMin(e.target.value);
	}
	const handleBuyFood = (e) => {
		e.preventDefault()

		if (!localStorage.getItem('auth_name')) {
			Swal.fire({
				title: 'Bạn chưa đăng nhập',
				text: "Đăng nhập để đặt ngay và thưởng thức nào!",
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Đăng Nhập'
			}).then((result) => {
				if (result.isConfirmed) {
					location('/login')
				}
			})
		} else {
			const formData = new FormData();
			formData.append('quantity', 1)
			formData.append('food_id', e.target.value)
			formData.append('user_id', localStorage.getItem('auth_id'))

			axios.post('api/food/store', formData)
				.then(res => {
					if (res.data.status === 200) {
						const path = '/checkout/' + localStorage.getItem('auth_id')
						location(path);
					}
				})
		}
	}
	const handleReadMore = (e) => {
		location(`/detail/${e.target.value}`)
	}
	useEffect(() => {
		axios.get('api/index').then(res => {
			if (res.data.status === 200) {
				setDataFoods(res.data.foods)
				setLoading(false)
				const priceMax = res.data.foods.reduce((max,obj)=>(obj.price > max ? obj.price:max),0)
				const minPrice = res.data.foods.reduce((min,obj)=>(obj.price < min ? obj.price:min),Infinity)
		
				setMaxC(priceMax)
				setPriceMin(minPrice)
				setPrice(priceMax)
			}
		})
	}, [])
	useEffect(()=>{
		
	},[])
	return (
		<>
			<div className="container">
				<div className="row">
					<div className='col-md-3 mt-6 d-inline-block' id="filter">
						<form >
							<div className='fw-bold'>Select Categories</div>
							<div className="form-group col-sm-3 col-xs-6 text-right">
								{dataCategory.map((e, i) => {
									return (
										<div key={i}>
											<label htmlFor={`check` + i}>

												<input className="form-check-input " onChange={e=>handleCheckbox(e,i)} type="checkbox" id={`check` + i} data-category={e.id} value="" aria-label="..." /> <span className='ml-5'>{e.category_name}</span>
											</label>

										</div>


									)
								})}
							</div>
							<div className="fw-bold">Select arrage</div>

							<select id='customSelect' value={selectOp} onChange={e => setSelectOp(e.target.value)} data-filter="type" className="select btn-sm">

								<option disabled value="null">Select One</option>
								<option value="increase">Tăng</option>
								<option value="reduce">Giảm</option>
							</select>

							<div className="fw-bold">Price: {priceMin} - <span>{price == 0 ? maxC : price}</span></div>
							<div className="row">
							<div class="col-md-6 range">
								<input type="range" min={0} max={price} step={1} onChange={handleRangeMin} className="form-range" id="customRange1" />
							</div>
							<div class="col-md-6 range">
								<input type="range" min={priceMin} max={maxC} step={1} onChange={handleRangeMax} className="form-range" id="customRange1" />
							</div>
							</div>
						</form>
					</div>
					<section className="d-inline-block post-grid col-md-9 mt-sm-5 mt-6">

						<div className="row">
						<div className="col-md-12">

<div className="form  d-flex justify-content-center align-items-center mb-3">
  <i className="fa fa-search"></i>
  <input type="text" className="form-control form-input" onChange={e=>setKeySearch(e.target.value)} placeholder="Search anything..."/>
</div>

</div>
							{dataFoods.map((e, i) => {
								return (
									<div className="col-md-4 post-item" key={i}>
										<figure className="zoom-effect mb-0">
											<img src={`http://127.0.0.1:8000/uploads/foods/${e.img_food}`} alt="food3" className="InblogImg" />
										</figure>
										<div className="post-content pt-4 mb-4">
											<h2 className="post-title"><Link to="single-blog.html">{e.name}</Link></h2>
											<div className="meta-tags">
												<em className="meta-date">March 30, 2018</em>
												<em className="meta-author">by<Link to="#"> Gustave Berneit</Link></em>
											</div>
											<p>{e.detail}</p>
											<Link to={`detail/` + e.id}>Only price ${e.price}</Link>
										</div>
										<div className="d-flex" style={{ justifyContent: "space-between" }}>
											<div className="pix_btn" style={{ whiteSpace: 'nowrap' }}>
												<button value={e.id} onClick={handleReadMore} className="button btn-effect">Đọc Thêm</button>
											</div>
											<div className="pix_btn">
												<button value={e.id} className="button btn-effect" onClick={handleBuyFood} style={{ whiteSpace: 'nowrap' }}>Đặt Ngay</button>
											</div>
										</div>
									</div>
									
								)
							})}

									


							<nav aria-label="...">
								<ul class="pagination pagination-circle">
									<li class="page-item">
										<a class="page-link">Previous</a>
									</li>
									<li class="page-item"><a class="page-link" href="#">1</a></li>
									<li class="page-item active" aria-current="page">
										<a class="page-link" href="#">2 <span class="visually-hidden">(current)</span></a>
									</li>
									<li class="page-item"><a class="page-link" href="#">3</a></li>
									<li class="page-item">
										<a class="page-link" href="#">Next</a>
									</li>
								</ul>
							</nav>
						</div>

					</section>
				</div>

			</div>
		</>
	)
}
export default AllFoods