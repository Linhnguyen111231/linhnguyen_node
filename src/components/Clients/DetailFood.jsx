import axios from "axios"
import { useEffect, useLayoutEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import '../../assets/css/rating.css'
import Swal from 'sweetalert2'
import LoadingUser from "../LoadingUser"

const Detail = () => {
  const idParams = useParams()
  const location = useNavigate()
  const [food, setFood] = useState({});
  
  const [start, setStart] = useState();
  const [rating, setRating] = useState(0);
  const [allRatting, setAllRatting] = useState([]);
  const [allComment, setAllComment] = useState([]);
  // const [idComment, setComment] = useState('');
  const [post, setPost] = useState('');
  const [reply, setReply] = useState('');
  const [count, setCount] = useState(0);
  const [comment, setComment] = useState('');
  
  const [check, setCheck] = useState(false);
  const [quatity, setQuantity] = useState(0);
  const [loading, setLoading] = useState(true)
  const useToggle = (initialState) => {
    const [toggleValue, setToggleValue] = useState(initialState);

    const toggler = () => { setToggleValue(!toggleValue) };
    return [toggleValue, toggler]
  };
  const [toggle, setToggle] = useToggle();
  
  useEffect(() => {
    if (localStorage.getItem('auth_name')) {
      setCheck(true)
    }
  }, [])
  console.log(allComment);
  const handleAddFood = (e)=>{
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
			formData.append('quantity', quatity)
			formData.append('food_id', idParams.id)
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
  useEffect(() => {
    const formData = new FormData()
    formData.append('user_id', localStorage.getItem('auth_id'))
    formData.append('product_id', idParams.id)
    if (localStorage.getItem('auth_name')) {
      axios.post('api/ratting-user', formData)
        .then(res => {
          if (res.data.status === 200) {
            setRating(res.data.rate)
          }
        })
        .catch(()=>{

        })
    }
  }, [])
  useLayoutEffect(() => {
    const formData = new FormData()
    formData.append('product_id', idParams.id)
    axios.post('api/all-ratting', formData)
      .then(res => {
        if (res.data.status === 200) {
          setAllRatting(JSON.parse(res.data.rate_all))
          const nb=  JSON.parse(res.data.rate_all).length
       
          const total = (JSON.parse(res.data.rate_all).length ==1  ? JSON.parse(res.data.rate_all)[0].rate : Math.round(JSON.parse(res.data.rate_all).reduce((pre, p) => pre + p.rate, 0) / JSON.parse(res.data.rate_all).length)) || 0
        
          let tempStart2 = '';
          for (let i = 0; i < total; i++) {
            const starElement = document.createElement('i');
            starElement.className = 'fa fa-star rating-color';
            tempStart2 += starElement.outerHTML;
          }
          for (let i = total; i < 5; i++) {
            const starElement = document.createElement('i');
            starElement.className = 'fa fa-star ';
            tempStart2 += starElement.outerHTML;
          }
          setStart(tempStart2)
          setLoading(false);

        }

      });

  }, [])
  const handleReduce = () => {
    if (quatity > 0) {
      setQuantity(pre => pre - 1)
    }
  }
  function ratingFunc(count) {
    let tempStart2 = '';
    for (let i = 0; i < count; i++) {
      const starElement = document.createElement('i');
      starElement.className = 'fa fa-star rating-color';
      tempStart2 += starElement.outerHTML;
    }
    for (let i = count; i < 5; i++) {
      const starElement = document.createElement('i');
      starElement.className = 'fa fa-star ';
      tempStart2 += starElement.outerHTML;
    }
    return tempStart2
  }
  const handleIncrease = () => {
    setQuantity(pre => pre + 1)
  }
  const handleRatting = (e) => {
    const formData = new FormData()
    formData.append('rate', e.target.value)
    formData.append('user_id', localStorage.getItem('auth_id'))
    formData.append('product_id', idParams.id)
    axios.post('api/ratting', formData)
    setRating(e.target.value)
  }
  const handleLogin = (e) => {
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
    }
  }
  const handlePost = (e) => {
    e.preventDefault()

    if (post != '') {
      const formData = new FormData();
      formData.append('content', post)
      formData.append('rate', rating)
      formData.append('user_id', localStorage.getItem('auth_id'))
      formData.append('food_id', idParams.id)

      axios.post('api/ratting', formData)
        .then(res => {
          if (res.data.status === 200) {
            setPost('')
            setAllRatting(JSON.parse(res.data.rate_all))
          }
        })
    }
  }

  const handleReply = (e)=>{
    e.preventDefault()
    if (reply != '') {
      const formData = new FormData();
      formData.append('content', reply)
      formData.append('notify', 0)
      formData.append('rate', rating)
      formData.append('user_id_reply', e.target.getAttribute('data-user'))
      formData.append('comment_id', e.target.getAttribute('data-id'))
      formData.append('user_id', localStorage.getItem('auth_id'))
      formData.append('food_id', idParams.id)

      axios.post(`api/comment/reply`, formData)
        .then(res => {
          if (res.data.status === 200) {
            setReply('')
            setAllComment(JSON.parse(res.data.comments))
          }
        })
    }
  }
  const handleComment = (e) => {
    e.preventDefault()

    if (comment != '') {
      const formData = new FormData();
      formData.append('content', comment)
      formData.append('user_id', localStorage.getItem('auth_id'))
      formData.append('food_id', idParams.id)

      axios.post('api/comment', formData)
        .then(res => {
          if (res.data.status === 200) {           
            setComment('')
             setAllComment(JSON.parse(res.data.comments))


          }
        })
    }
  }
  useEffect(()=>{
    const formData = new FormData();
      formData.append('food_id', idParams.id)

      axios.post('api/all-comment', formData)
        .then(res => {
          if (res.data.status === 200) {
            setAllComment(JSON.parse(res.data.comments))

          }
        })
  },[])
  useEffect(() => {
    axios.get(`api/detail/${idParams.id}`)
      .then(res => {
        if (res.data.status === 200) {
          setFood(JSON.parse(res.data.foods))
        }
      })
      .catch(()=>{

      })
    }, [])
  
  useEffect(()=>{
    axios.get('api/comment/reply/count')
    .then(res=>{
        if (res.data.status === 200) {
          setCount(res.data.count)
        }
    })
  },[])
  const arrRD2 = new Set();
  let nbs = count + allComment.length;
  for (let i = 0; i < nbs; i++) {
    arrRD2.add(Math.round(Math.random()*(nbs*10)));
    
  }
  if (loading) {
    return <LoadingUser />
  } else {
    
    return (
      <>
        <section className="py-5">
          <div className="container">

            <div className="row gx-5">
              <aside className="col-lg-6">
                <div className="border rounded-4 mb-3 d-flex justify-content-center">
                  <Link data-fslightbox="mygalley" className="rounded-4" target="_blank" data-type="image" href="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/detail1/big.webp">
                    <img style={{ maxWidth: '100%', maxHeight: '100%', margin: "auto" }} className="rounded-4 fit" src={`http://127.0.0.1:8000/uploads/foods/${food.img_food}`} />
                  </Link>
                </div>
                <div className="d-flex justify-content-center mb-3">
                  <Link data-fslightbox="mygalley" className="item-thumb border mx-1 rounded-2" target="_blank" data-type="image" href="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/detail1/big1.webp">
                    <img width="60" height="60" className="item-thumb rounded-2" src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/detail1/big1.webp" />
                  </Link>
                  <Link data-fslightbox="mygalley" className="item-thumb border mx-1 rounded-2" target="_blank" data-type="image" href="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/detail1/big2.webp">
                    <img width="60" height="60" className="item-thumb rounded-2" src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/detail1/big2.webp" />
                  </Link>
                  <Link data-fslightbox="mygalley" className="item-thumb border mx-1 rounded-2" target="_blank" data-type="image" href="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/detail1/big3.webp">
                    <img width="60" height="60" className="item-thumb rounded-2" src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/detail1/big3.webp" />
                  </Link>
                  <Link data-fslightbox="mygalley" className="item-thumb border mx-1 rounded-2" target="_blank" data-type="image" href="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/detail1/big4.webp">
                    <img width="60" height="60" className="item-thumb rounded-2" src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/detail1/big4.webp" />
                  </Link>
                  <Link data-fslightbox="mygalley" className="item-thumb border mx-1 rounded-2" target="_blank" data-type="image" href="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/detail1/big.webp">
                    <img width="60" height="60" className="item-thumb rounded-2" src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/detail1/big.webp" />
                  </Link>
                </div>

              </aside>

              <main className="col-lg-6">
                <div className="ps-lg-3">
                  <h4 className="title text-dark">
                    {food.name}
                  </h4>
                  <div className="d-flex flex-row my-3">
                    <div className="ratings">
                      {
                        start && <div dangerouslySetInnerHTML={{ __html: start }}></div>
                      }
                    </div>
                    <span className="text-muted"><i className="fas fa-shopping-basket fa-sm mx-1"></i>154 orders</span>
                    <span className="text-success ms-2">In stock</span>
                  </div>

                  <div className="mb-3">
                    <span className="h5">${food.price}</span>
                  </div>

                  <p>
                    {food.detail}
                  </p>

                  <div className="row">
                    <dt className="col-3">Type: </dt>
                    <dd className="col-9">{(food.category!= undefined) ? food.category.category_name :''}</dd>

                    <dt className="col-3">Color</dt>
                    <dd className="col-9">Brown</dd>

                    <dt className="col-3">Material</dt>
                    <dd className="col-9">Cotton, Jeans</dd>

                    <dt className="col-3">Brand</dt>
                    <dd className="col-9">Reebook</dd>
                  </div>

                  <hr />

                <form onSubmit={handleAddFood}>
                  <div className="row mb-4">
                    

                <div className="col-md-4 col-6 mb-3">
                      <label className="mb-2 d-block">Quantity</label>
                      <div className="input-group mb-3" style={{ width: '170px' }}>
                        <button onClick={handleReduce} className="btn btn-white border border-secondary px-3 mr-0" type="button" id="button-addon1" data-mdb-ripple-color="dark">
                          <i className="fas fa-minus"></i>
                        </button>
                        <input type="text" value={quatity} className="form-control text-center border border-secondary" placeholder="14" aria-label="Example text with button addon" aria-describedby="button-addon1" />
                        <button onClick={handleIncrease} className="btn btn-white border border-secondary px-3" type="button" id="button-addon2" data-mdb-ripple-color="dark">
                          <i className="fas fa-plus"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  {quatity != 0 && <div className="text-muted">Nếu bạn đặt món thì tổng tiền cho món này là: {quatity * food.price}</div>}
                  
                  <button type="submit" className="btn btn-primary shadow-0"> <i className="me-1 fa fa-shopping-basket"></i> Add to cart </button>
                </form>
                </div>
              </main>
            </div>
          </div>

        </section>
        <div className="container">
          <div id="reviews" className="review-section">
            <div className="d-flex align-items-center justify-content-between mb-4">
              <h4 className="m-0">37 Reviews</h4>

              <span className="select2 select2-container select2-container--default" dir="ltr" data-select2-id="2" style={{ width: '188px' }}>
                <span className="selection">
                  <span className="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabIndex="0" aria-labelledby="select2-qd66-container">
                    <span className="select2-selection__rendered" id="select2-qd66-container" role="textbox" aria-readonly="true" title="Most Relevant">Most Relevant</span>
                    <span className="select2-selection__arrow" role="presentation"><b role="presentation"></b></span>
                  </span>
                </span>
                <span className="dropdown-wrapper" aria-hidden="true"></span>
              </span>
            </div>
          </div>
          <a
            onClick={handleLogin}
            className="btn btn-primary mb-5"
            data-mdb-toggle="collapse"
            href="#collapseWithScrollbar"
            role="button"
            aria-expanded="false"
            aria-controls="collapseExample"
          >
            Evaluate
          </a>
          <div className=' mb-5 mt-3 collapse scroll-sectio' id="collapseWithScrollbar">
            {check && <div className="row">

              <div className="rating col-md-3">
                <input type="radio" name="rating" onChange={handleRatting} checked={rating == 5} value={5} id="rating-5" />
                <label htmlFor="rating-5" />
                <input type="radio" name="rating" onChange={handleRatting} checked={rating == 4} value={4} id="rating-4" />
                <label htmlFor="rating-4" />
                <input type="radio" name="rating" onChange={handleRatting} checked={rating == 3} value={3} id="rating-3" />
                <label htmlFor="rating-3" />
                <input type="radio" name="rating" onChange={handleRatting} checked={rating == 2} value={2} id="rating-2" />
                <label htmlFor="rating-2" />
                <input type="radio" name="rating" onChange={handleRatting} checked={rating == 1} value={1} id="rating-1" />
                <label htmlFor="rating-1" />
                <div className="emoji-wrapper">
                  <div className="emoji">
                    <svg className="rating-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                      <circle cx={256} cy={256} r={256} fill="#ffd93b" />
                      <path d="M512 256c0 141.44-114.64 256-256 256-80.48 0-152.32-37.12-199.28-95.28 43.92 35.52 99.84 56.72 160.72 56.72 141.36 0 256-114.56 256-256 0-60.88-21.2-116.8-56.72-160.72C474.8 103.68 512 175.52 512 256z" fill="#f4c534" />
                      <ellipse transform="scale(-1) rotate(31.21 715.433 -595.455)" cx="166.318" cy="199.829" rx="56.146" ry="56.13" fill="#fff" />
                      <ellipse transform="rotate(-148.804 180.87 175.82)" cx="180.871" cy="175.822" rx="28.048" ry="28.08" fill="#3e4347" />
                      <ellipse transform="rotate(-113.778 194.434 165.995)" cx="194.433" cy="165.993" rx="8.016" ry="5.296" fill="#5a5f63" />
                      <ellipse transform="scale(-1) rotate(31.21 715.397 -1237.664)" cx="345.695" cy="199.819" rx="56.146" ry="56.13" fill="#fff" />
                      <ellipse transform="rotate(-148.804 360.25 175.837)" cx="360.252" cy="175.84" rx="28.048" ry="28.08" fill="#3e4347" />
                      <ellipse transform="scale(-1) rotate(66.227 254.508 -573.138)" cx="373.794" cy="165.987" rx="8.016" ry="5.296" fill="#5a5f63" />
                      <path d="M370.56 344.4c0 7.696-6.224 13.92-13.92 13.92H155.36c-7.616 0-13.92-6.224-13.92-13.92s6.304-13.92 13.92-13.92h201.296c7.696.016 13.904 6.224 13.904 13.92z" fill="#3e4347" />
                    </svg>
                    <svg className="rating-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                      <circle cx={256} cy={256} r={256} fill="#ffd93b" />
                      <path d="M512 256A256 256 0 0 1 56.7 416.7a256 256 0 0 0 360-360c58.1 47 95.3 118.8 95.3 199.3z" fill="#f4c534" />
                      <path d="M328.4 428a92.8 92.8 0 0 0-145-.1 6.8 6.8 0 0 1-12-5.8 86.6 86.6 0 0 1 84.5-69 86.6 86.6 0 0 1 84.7 69.8c1.3 6.9-7.7 10.6-12.2 5.1z" fill="#3e4347" />
                      <path d="M269.2 222.3c5.3 62.8 52 113.9 104.8 113.9 52.3 0 90.8-51.1 85.6-113.9-2-25-10.8-47.9-23.7-66.7-4.1-6.1-12.2-8-18.5-4.2a111.8 111.8 0 0 1-60.1 16.2c-22.8 0-42.1-5.6-57.8-14.8-6.8-4-15.4-1.5-18.9 5.4-9 18.2-13.2 40.3-11.4 64.1z" fill="#f4c534" />
                      <path d="M357 189.5c25.8 0 47-7.1 63.7-18.7 10 14.6 17 32.1 18.7 51.6 4 49.6-26.1 89.7-67.5 89.7-41.6 0-78.4-40.1-82.5-89.7A95 95 0 0 1 298 174c16 9.7 35.6 15.5 59 15.5z" fill="#fff" />
                      <path d="M396.2 246.1a38.5 38.5 0 0 1-38.7 38.6 38.5 38.5 0 0 1-38.6-38.6 38.6 38.6 0 1 1 77.3 0z" fill="#3e4347" />
                      <path d="M380.4 241.1c-3.2 3.2-9.9 1.7-14.9-3.2-4.8-4.8-6.2-11.5-3-14.7 3.3-3.4 10-2 14.9 2.9 4.9 5 6.4 11.7 3 15z" fill="#fff" />
                      <path d="M242.8 222.3c-5.3 62.8-52 113.9-104.8 113.9-52.3 0-90.8-51.1-85.6-113.9 2-25 10.8-47.9 23.7-66.7 4.1-6.1 12.2-8 18.5-4.2 16.2 10.1 36.2 16.2 60.1 16.2 22.8 0 42.1-5.6 57.8-14.8 6.8-4 15.4-1.5 18.9 5.4 9 18.2 13.2 40.3 11.4 64.1z" fill="#f4c534" />
                      <path d="M155 189.5c-25.8 0-47-7.1-63.7-18.7-10 14.6-17 32.1-18.7 51.6-4 49.6 26.1 89.7 67.5 89.7 41.6 0 78.4-40.1 82.5-89.7A95 95 0 0 0 214 174c-16 9.7-35.6 15.5-59 15.5z" fill="#fff" />
                      <path d="M115.8 246.1a38.5 38.5 0 0 0 38.7 38.6 38.5 38.5 0 0 0 38.6-38.6 38.6 38.6 0 1 0-77.3 0z" fill="#3e4347" />
                      <path d="M131.6 241.1c3.2 3.2 9.9 1.7 14.9-3.2 4.8-4.8 6.2-11.5 3-14.7-3.3-3.4-10-2-14.9 2.9-4.9 5-6.4 11.7-3 15z" fill="#fff" />
                    </svg>
                    <svg className="rating-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                      <circle cx={256} cy={256} r={256} fill="#ffd93b" />
                      <path d="M512 256A256 256 0 0 1 56.7 416.7a256 256 0 0 0 360-360c58.1 47 95.3 118.8 95.3 199.3z" fill="#f4c534" />
                      <path d="M336.6 403.2c-6.5 8-16 10-25.5 5.2a117.6 117.6 0 0 0-110.2 0c-9.4 4.9-19 3.3-25.6-4.6-6.5-7.7-4.7-21.1 8.4-28 45.1-24 99.5-24 144.6 0 13 7 14.8 19.7 8.3 27.4z" fill="#3e4347" />
                      <path d="M276.6 244.3a79.3 79.3 0 1 1 158.8 0 79.5 79.5 0 1 1-158.8 0z" fill="#fff" />
                      <circle cx={340} cy="260.4" r="36.2" fill="#3e4347" />
                      <g fill="#fff">
                        <ellipse transform="rotate(-135 326.4 246.6)" cx="326.4" cy="246.6" rx="6.5" ry={10} />
                        <path d="M231.9 244.3a79.3 79.3 0 1 0-158.8 0 79.5 79.5 0 1 0 158.8 0z" />
                      </g>
                      <circle cx="168.5" cy="260.4" r="36.2" fill="#3e4347" />
                      <ellipse transform="rotate(-135 182.1 246.7)" cx="182.1" cy="246.7" rx={10} ry="6.5" fill="#fff" />
                    </svg>
                    <svg className="rating-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                      <circle cx={256} cy={256} r={256} fill="#ffd93b" />
                      <path d="M407.7 352.8a163.9 163.9 0 0 1-303.5 0c-2.3-5.5 1.5-12 7.5-13.2a780.8 780.8 0 0 1 288.4 0c6 1.2 9.9 7.7 7.6 13.2z" fill="#3e4347" />
                      <path d="M512 256A256 256 0 0 1 56.7 416.7a256 256 0 0 0 360-360c58.1 47 95.3 118.8 95.3 199.3z" fill="#f4c534" />
                      <g fill="#fff">
                        <path d="M115.3 339c18.2 29.6 75.1 32.8 143.1 32.8 67.1 0 124.2-3.2 143.2-31.6l-1.5-.6a780.6 780.6 0 0 0-284.8-.6z" />
                        <ellipse cx="356.4" cy="205.3" rx="81.1" ry={81} />
                      </g>
                      <ellipse cx="356.4" cy="205.3" rx="44.2" ry="44.2" fill="#3e4347" />
                      <g fill="#fff">
                        <ellipse transform="scale(-1) rotate(45 454 -906)" cx="375.3" cy="188.1" rx={12} ry="8.1" />
                        <ellipse cx="155.6" cy="205.3" rx="81.1" ry={81} />
                      </g>
                      <ellipse cx="155.6" cy="205.3" rx="44.2" ry="44.2" fill="#3e4347" />
                      <ellipse transform="scale(-1) rotate(45 454 -421.3)" cx="174.5" cy={188} rx={12} ry="8.1" fill="#fff" />
                    </svg>
                    <svg className="rating-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                      <circle cx={256} cy={256} r={256} fill="#ffd93b" />
                      <path d="M512 256A256 256 0 0 1 56.7 416.7a256 256 0 0 0 360-360c58.1 47 95.3 118.8 95.3 199.3z" fill="#f4c534" />
                      <path d="M232.3 201.3c0 49.2-74.3 94.2-74.3 94.2s-74.4-45-74.4-94.2a38 38 0 0 1 74.4-11.1 38 38 0 0 1 74.3 11.1z" fill="#e24b4b" />
                      <path d="M96.1 173.3a37.7 37.7 0 0 0-12.4 28c0 49.2 74.3 94.2 74.3 94.2C80.2 229.8 95.6 175.2 96 173.3z" fill="#d03f3f" />
                      <path d="M215.2 200c-3.6 3-9.8 1-13.8-4.1-4.2-5.2-4.6-11.5-1.2-14.1 3.6-2.8 9.7-.7 13.9 4.4 4 5.2 4.6 11.4 1.1 13.8z" fill="#fff" />
                      <path d="M428.4 201.3c0 49.2-74.4 94.2-74.4 94.2s-74.3-45-74.3-94.2a38 38 0 0 1 74.4-11.1 38 38 0 0 1 74.3 11.1z" fill="#e24b4b" />
                      <path d="M292.2 173.3a37.7 37.7 0 0 0-12.4 28c0 49.2 74.3 94.2 74.3 94.2-77.8-65.7-62.4-120.3-61.9-122.2z" fill="#d03f3f" />
                      <path d="M411.3 200c-3.6 3-9.8 1-13.8-4.1-4.2-5.2-4.6-11.5-1.2-14.1 3.6-2.8 9.7-.7 13.9 4.4 4 5.2 4.6 11.4 1.1 13.8z" fill="#fff" />
                      <path d="M381.7 374.1c-30.2 35.9-75.3 64.4-125.7 64.4s-95.4-28.5-125.8-64.2a17.6 17.6 0 0 1 16.5-28.7 627.7 627.7 0 0 0 218.7-.1c16.2-2.7 27 16.1 16.3 28.6z" fill="#3e4347" />
                      <path d="M256 438.5c25.7 0 50-7.5 71.7-19.5-9-33.7-40.7-43.3-62.6-31.7-29.7 15.8-62.8-4.7-75.6 34.3 20.3 10.4 42.8 17 66.5 17z" fill="#e24b4b" />
                    </svg>
                    <svg className="rating-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                      <g fill="#ffd93b">
                        <circle cx={256} cy={256} r={256} />
                        <path d="M512 256A256 256 0 0 1 56.8 416.7a256 256 0 0 0 360-360c58 47 95.2 118.8 95.2 199.3z" />
                      </g>
                      <path d="M512 99.4v165.1c0 11-8.9 19.9-19.7 19.9h-187c-13 0-23.5-10.5-23.5-23.5v-21.3c0-12.9-8.9-24.8-21.6-26.7-16.2-2.5-30 10-30 25.5V261c0 13-10.5 23.5-23.5 23.5h-187A19.7 19.7 0 0 1 0 264.7V99.4c0-10.9 8.8-19.7 19.7-19.7h472.6c10.8 0 19.7 8.7 19.7 19.7z" fill="#e9eff4" />
                      <path d="M204.6 138v88.2a23 23 0 0 1-23 23H58.2a23 23 0 0 1-23-23v-88.3a23 23 0 0 1 23-23h123.4a23 23 0 0 1 23 23z" fill="#45cbea" />
                      <path d="M476.9 138v88.2a23 23 0 0 1-23 23H330.3a23 23 0 0 1-23-23v-88.3a23 23 0 0 1 23-23h123.4a23 23 0 0 1 23 23z" fill="#e84d88" />
                      <g fill="#38c0dc">
                        <path d="M95.2 114.9l-60 60v15.2l75.2-75.2zM123.3 114.9L35.1 203v23.2c0 1.8.3 3.7.7 5.4l116.8-116.7h-29.3z" />
                      </g>
                      <g fill="#d23f77">
                        <path d="M373.3 114.9l-66 66V196l81.3-81.2zM401.5 114.9l-94.1 94v17.3c0 3.5.8 6.8 2.2 9.8l121.1-121.1h-29.2z" />
                      </g>
                      <path d="M329.5 395.2c0 44.7-33 81-73.4 81-40.7 0-73.5-36.3-73.5-81s32.8-81 73.5-81c40.5 0 73.4 36.3 73.4 81z" fill="#3e4347" />
                      <path d="M256 476.2a70 70 0 0 0 53.3-25.5 34.6 34.6 0 0 0-58-25 34.4 34.4 0 0 0-47.8 26 69.9 69.9 0 0 0 52.6 24.5z" fill="#e24b4b" />
                      <path d="M290.3 434.8c-1 3.4-5.8 5.2-11 3.9s-8.4-5.1-7.4-8.7c.8-3.3 5.7-5 10.7-3.8 5.1 1.4 8.5 5.3 7.7 8.6z" fill="#fff" opacity=".2" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="col-md-8">
                <form onSubmit={handlePost}>
                  <textarea name="evaluate" id="" cols="10" rows="5" onChange={e => setPost(e.target.value)} placeholder="Write evaluate...." value={post}>{post}</textarea>
                  <button type="submit" className="mt-3 btn btn-primary">POST</button>
                </form>
              </div>
            </div>}
          </div>

          <div className=" mt-5 mb-5">
            <div className="row height d-flex justify-content-center align-items-center">
              <div className="col-md-12">
                <div className="card">
                  <div className="p-3">
                    <h6>Comments</h6>
                  </div>
                  {allRatting && allRatting.map((e, i) => {
                    return (

                      <div className="mt-2" key={i}>
                        <div className="d-flex flex-row p-3">
                          <img src="https://i.imgur.com/zQZSWrt.jpg" width={40} height={40} className="rounded-circle mr-3" />
                          <div className="w-100">
                            <div className="d-flex justify-content-between align-items-center">
                              <div className="d-flex flex-row align-items-center">
                                <span className="mr-2">{e.user.name}</span>
                                <span>
                                  {(<div dangerouslySetInnerHTML={{ __html: ratingFunc(e.rate) }}></div>)}
                                </span>
                                {e && <small className="c-badge ml-3">Top Comment</small>}
                              </div>
                            </div>
                            <p className="text-justify comment-text mb-0">{e.content}</p>

                          </div>
                        </div>
                      </div>
                    )
                  })}

                </div>
              </div>
            </div>
          </div>
          <div className="comments-container">
            <h1>Comentarios</h1>

            {check && <form onSubmit={handleComment} style={{ width: '100%' }}>
              <div className="mt-3 d-flex flex-row align-items-center p-3 form-color">
                <img src="https://i.imgur.com/zQZSWrt.jpg" width={50} className="rounded-circle mr-2" />
                <input type="text" className="form-control" onChange={e => setComment(e.target.value)} placeholder="Enter your comment..." />
                <button type="submit" className="btn-sm btn-primary">Post</button>
              </div>
            </form>}
            <ul id="comments-list" className="comments-list">
              {allComment && allComment.map((e,i)=>{
                
                return(
                 <li key={i}>
                  <div className="comment-main-level">
                    <div className="comment-avatar"><img className="rounded-circle" src="http://i9.photobucket.com/albums/a88/creaticode/avatar_1_zps8e1c80cd.jpg" alt="" /></div>

                    <div className="comment-box">
                      <div className="comment-head">
                        <h6 className="comment-name by-author"><a href="http://creaticode.com/blog">{ e.user.name}</a></h6>
                       
                         {localStorage.getItem('auth_id') == e.user.id && (
                         <a
                          onClick={handleLogin}
                          data-mdb-toggle="collapse"
                          href={`#collapseWithScrollbarEdit${i}`}
                          role="button"
                          aria-expanded="false"
                          aria-controls="collapseExample">
                          <i class="fa-solid fa-pen-to-square"></i>
                        </a>
                        )}

                        
                        <a
                          data-mdb-toggle="collapse"
                          href={`#collapseWithScrollbar${i}`}
                          role="button"
                          aria-expanded="false"
                          aria-controls="collapseExample"
                        >

                          <i className="fa fa-reply" />
                        </a>

                      </div>
                      <div className="comment-content">
                        {e.content}  
                      </div>
                      <div className='collapse scroll-sectio' id={`collapseWithScrollbar${i}`}>

                        <div className="mt-3 d-flex flex-row align-items-center p-3 form-color" >
                          <img src="https://i.imgur.com/zQZSWrt.jpg" width={50} className="rounded-circle mr-2" />
                          <form style={{ width: '100%' }} onSubmit={handleReply} data-user={e.user.id}  data-id={e.id}>
                          <input type="text" className="form-control" onChange={e=>setReply(e.target.value)} placeholder="Enter your comment..." />
                          <button type="submit"  className="ml-3 btn-sm btn-primary">Reply</button>

                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                  {
                      
                     ( e.reply.map((el,i)=>{
                      return( <ul className="comments-list reply-list" key={i}>
                      <li>
                        <div className="comment-avatar"><img className="rounded-circle" src="http://i9.photobucket.com/albums/a88/creaticode/avatar_2_zps7de12f8b.jpg" alt="" /></div>
  
                        <div className="comment-box">
                          <div className="comment-head">
                            <h6 className="comment-name"><a href="http://creaticode.com/blog">{el.user.name}</a></h6>
                            <span>hace 10 minutos</span>
                            <a
                              onClick={handleLogin}
                              data-mdb-toggle="collapse"
                              href={`#collapseWithScrollbar${arrRD2[i]}`}
                              role="button"
                              aria-expanded="false"
                              aria-controls="collapseExample"
                            >
  
                              <i className="fa fa-reply" />
                            </a>
                          </div>
                          <div className="comment-content">
                          <a tabIndex={-1}>{el.user.name}</a>  {el.content}
                          </div>
                          <div className='collapse scroll-sectio' id={`collapseWithScrollbar${arrRD2[i]}`}>
  
                            <div className="mt-3 d-flex  align-items-center p-3 form-color" >
                              <img src="https://i.imgur.com/zQZSWrt.jpg" width={50} className="rounded-circle mr-2" />
                              {check && <form style={{ width: '100%' }}>
                                <input type="text" style={{ width: '100%' }} className="form-control" placeholder="Enter your comment..." />
              
                                <button type="submit" data-se={el.id} className="ml-3 btn-sm btn-primary">Reply</button>
                              </form>}
                            </div>
                          </div>
                        </div>
                      </li>
                      <li>
                       
                      </li>
                    </ul>)
                     })
                     
                    )
                  }
                </li>

                )
              }) }
              
            </ul>
          </div>

        </div>
      </>
    )
  }
}
export default Detail