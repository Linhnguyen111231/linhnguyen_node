import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Slider from "react-slick";
import Echo from 'laravel-echo';
import '../../assets/css/slick.css'
import '../../assets/css/chatclient.css'
import Pusher from 'pusher-js'
const Index = () => {
	const settings = 
		{
			dots: true,
			infinite: true,
			autoplay: true,
			centerMode: false,
			centerPadding: '60px',
			slidesToShow: 4,
			responsive: [
			  {
				breakpoint: 768,
				settings: {
				  arrows: true,
				  centerMode: true,
				  centerPadding: '100px',
				  slidesToShow: 3
				}
			  },
			  {
				breakpoint: 600,
				settings: {
				  arrows: false,
				  centerMode: true,
				  centerPadding: '40px',
				  slidesToShow: 1
				}
			  }
			]
		  }
		  useEffect(() => {
			var pusher = new Pusher('93c346738a8636876459', {
				cluster: 'ap1'
			  });
		  
			  var channel = pusher.subscribe('message');
			  channel.bind('message', function(data) {
				alert(JSON.stringify(data));
				console.log(data);
			  });
		  }, []);
		
	const [dataFoods, setDataFoods] = useState([])
	const [dataBlogs, setDataBlogs] = useState([])
	const [dataCategories, setDataCategories] = useState([])
	const [data12Foods, setData12Foods] = useState([])
	useEffect(() => {
		axios.get('api/index').then(res => {
			if (res.data.status === 200) {
				setDataFoods(res.data.foods)
				
			}
		})
	}, [])
	useEffect(() => {
		axios.get('api/categories').then(res => {
			if (res.data.status === 200) {
				setDataCategories(res.data.all_categories)
				
			}
		})
	}, [])
	useEffect(() => {
		axios.get('api/blogs').then(res => {
			if (res.data.status === 200) {
				setDataBlogs(res.data.blogs)
				
			}
		})
	}, [])
	useEffect(() => {
		axios.get('api/getTop12FoodsHot').then(res => {
			if (res.data.status === 200) {
				setData12Foods(res.data.food_lm12)
			}
		})
	}, [])
	return (
		<>
	<div className="my-channel"></div>
			<section className="company-intro pt-60">
				<div className="container">
					<div className="row">
						<div className="section-image col-md-7 zoom-effect">
							<img src={require('../../assets/img/food1.jpg')} className="introImg" />
						</div>

						<div className="text-content text-center heading dark col-md-5">
							<h2 className="section-title">
								<strong>About Us </strong>the most awarded restaurant
							</h2>
							<div className="divider dark mb-4">
								<div className="icon-wrap">
									<i className="icon icon-spoon"></i>
								</div>
							</div>
							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper
								mattis, pulvinar dapibus leo.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
								tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>
						</div>

					</div>
				</div>
			</section>

			<section className="text-center featured-food-wrap heading">
				<div className="container">

					<h2 className="section-title"><strong>Check </strong>featured dishes</h2>
					<div className="divider dark mb-4">
						<div className="icon-wrap">
							<i className="icon icon-spoon"></i>
						</div>
					</div>

					<div className="box-wrap ">
						<Slider {...settings}>

					
						{
							dataCategories.map((e,i)=>{
								
								return(
									<div key={i} className="col-md-4 row-cols-sm-1 box fix_context">
							<figure>
								<Link href="#">
									<img src={`http://127.0.0.1:8000/uploads/category/${e.img_category}`} style={{width: '258px',height: '269px'}} />
								</Link>
							</figure>
							<div className="text-content text-align ">
								<div className="category">
									<Link href="">{e.category_name}</Link>
								</div>
								<div className="content">
									<h3><Link href="#">italian fresh salad</Link></h3>
									<p>{e.detail}</p>
								</div>
								<div className="pix_btn text-center">
									<Link style={{color: '#fff'}} href="#" className="button btn-effect mt-5">View full {e.category_name}</Link>
								</div>
							</div>
						</div>
								)
							})
						}
						</Slider>



					</div>
				</div>
			</section>


			<section className="light notice-board-wrap mt-5">
				<div className="container">
					<div className="notice-board">
						<div className="content text-center heading ">
							<h2 className="section-title"><strong>Time </strong>open at</h2>
							<div className="divider mb-4">
								<div className="icon-wrap">
									<i className="icon icon-spoon"></i>
								</div>
							</div>
							<div className="notice">
								<ul className="list-unstyled colored-light col-md-6">
									<li><strong>Monday-Friday</strong></li>
									<li>7am - 11am(Breakfast)</li>
									<li>11am - 10am(Lunch/Dinner)</li>
								</ul>
								<ul className="list-unstyled colored-light col-md-6">
									<li><strong>Monday-Friday</strong></li>
									<li>7am - 11am(Breakfast)</li>
									<li>11am - 10am(Lunch/Dinner)</li>
								</ul>
							</div>

							<div className="contact-info color-primary">
								<span>+15 12456785 23</span>
								<Link to={`/book`} className="btn btn-pill btn-outline-light light hvr-sweep-to-right">Book Your Table</Link>
							</div>

						</div>
					</div>

				</div>
			</section>


			<section>
				<div className="container">
					<div className="heading text-center">
						<h2 className="section-title text-center"><strong>Discover </strong>our starters</h2>
						<div className="divider dark mb-4">
							<div className="icon-wrap">
								<i className="icon icon-spoon"></i>
							</div>
						</div>
					</div>
					<div className="dark price-list">

						<div className="row">

							<table className="col-md-6">
								<thead></thead>
								<tbody>

									{
										dataFoods && dataFoods.map((e, i) => {
											return (

												<tr key={i}>
													<td>
														<img src={require('../../assets/img/food1.jpg')} className="menuImg" />
														<div className="title">
															<strong>{e.name}</strong>
															<em>{e.detail}</em>
														</div>
													</td>
													<td className="color-primary"><strong>${e.price}</strong></td>
												</tr>
											)

										})
									}
								</tbody>
							</table>

							<table className="col-md-6">
								<tr>
									<td>
										<img src={require('../../assets/img/food1.jpg')} className="menuImg" />
										<div className="title">
											<strong>Soft-Boiled Organic Egg</strong>
											<em>with soldiers</em>
										</div>
									</td>
									<td className="color-primary"><strong>$5.00</strong></td>
								</tr>
							</table>

						</div>

					</div>

					<div className="pix_btn text-center">
						<Link replace={true} to="/all-foods" className="button btn-effect mt-5">View full menu</Link>
					</div>

				</div>
			</section>


			<section className="latest-blogs">
				<div className="container">
					<div className="heading text-center">
						<h2 className="section-title text-center"><strong>Check </strong>our blogs</h2>
						<div className="divider dark mb-4">
							<div className="icon-wrap">
								<i className="icon icon-spoon"></i>
							</div>
						</div>
					</div>

					<div className="row">
						{
							dataBlogs && dataBlogs.map((e, i) => {
								return (
									<div className="col-md-6 post-item" key={i}>
										<figure className="zoom-effect">
											<img src={require('../../assets/img/food3.jpg')} alt="food3" className="blogImg" />
										</figure>
										<div className="post-content pt-4">
											<h3 className="post-title"><Link href="single-blog.html">{e.title}</Link></h3>
											<div className="meta-tags">
												<em className="meta-date">March 30, 2018</em>
												<em className="meta-author">by<Link href="#"> Gustave Berneit</Link></em>
												<em className="meta-comment"><Link href="#">2</Link> comments</em>
											</div>
											<p>{e.description}.<Link href="#">Continue Reading ...</Link></p>
										</div>
									</div>
								)
							})
						}

					</div>

				</div>

			</section>

			<section className="gallery text-center mb-5">
				<div className="heading">
					<h2 className="section-title"><strong>Discover </strong>our gallery</h2>
					<div className="divider dark mb-4">
						<div className="icon-wrap">
							<i className="icon icon-spoon"></i>
						</div>
					</div>
				</div>

				<div className="gallery-wrap">

					<div className="col-lg-3 p-0">
						<figure>
							<Link className="fancybox" data-fancybox-group="gallery" href="#">
								<img
									src="images/food4.jpg" alt="food" />
								<div className="title">
									<p>green veg</p>
									<i className="icon icon-expand"></i>
								</div>
							</Link>
						</figure>
					</div>

					<div className="col-lg-3 p-0">
						<figure>
							<Link className="fancybox" data-fancybox-group="gallery" href='#'>
								<img src={require('../../assets/img/food1.jpg')} />
								<div className="title">
									<p>juicy nonveg</p>
									<i className="icon icon-expand"></i>
								</div>
							</Link>
						</figure>
					</div>





					<div className="col-md-3 position-fixed bottom-0 z-2 border-1" style={{right: '0px'}}>
  <div className="box box-primary direct-chat direct-chat-primary">
    <div className="box-header with-border">
      <h3 className="box-title">Direct Chat</h3>
      <div className="box-tools pull-right">
        <span data-toggle="tooltip" title className="badge bg-light-blue" data-original-title="3 New Messages">3</span>
        <button type="button" className="btn btn-box-tool" data-widget="collapse"><i className="fa fa-minus" />
        </button>
        <button type="button" className="btn btn-box-tool" data-toggle="tooltip" title="Contacts" data-widget="chat-pane-toggle">
          <i className="fa fa-comments" /></button>
        <button type="button" className="btn btn-box-tool" data-widget="remove"><i className="fa fa-times" /></button>
      </div>
    </div>
    <div className="box-body">
      <div className="direct-chat-messages">
        <div className="direct-chat-msg">
          <div className="direct-chat-info clearfix">
            <span className="direct-chat-name pull-left">Alexander Pierce</span>
            <span className="direct-chat-timestamp pull-right">23 Jan 2:00 pm</span>
          </div>
          <img className="direct-chat-img" src="https://bootdey.com/img/Content/user_1.jpg" alt="Message User Image" />
          <div className="direct-chat-text">
            Is this template really for free? That's unbelievable!
          </div>
        </div>
        <div className="direct-chat-msg right">
          <div className="direct-chat-info clearfix">
            <span className="direct-chat-name pull-right">Sarah Bullock</span>
            <span className="direct-chat-timestamp pull-left">23 Jan 2:05 pm</span>
          </div>
          <img className="direct-chat-img" src="https://bootdey.com/img/Content/user_2.jpg" alt="Message User Image" />
          <div className="direct-chat-text">
            You better believe it!
          </div>
        </div>
      </div>
      <div className="direct-chat-contacts">
        <ul className="contacts-list">
          <li>
            <a href="#">
              <img className="contacts-list-img" src="https://bootdey.com/img/Content/user_1.jpg" />
              <div className="contacts-list-info">
                <span className="contacts-list-name">
                  Count Dracula
                  <small className="contacts-list-date pull-right">2/28/2015</small>
                </span>
                <span className="contacts-list-msg">How have you been? I was...</span>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div className="box-footer">
      <form>
        <div className="input-group">
          <input type="text" name="message" placeholder="Type Message ..." className="form-control" />
          <span className="input-group-btn">
            <button type="submit" className="btn btn-primary btn-flat">Send</button>
          </span>
        </div>
      </form>
    </div>
  </div>
</div>

					<div className="col-lg-3 p-0">
						<figure>
							<Link className="fancybox" data-fancybox-group="gallery" href="#">
								<img src="images/platter.jpg" />
								<div className="title">
									<p>green veg</p>
									<i className="icon icon-expand"></i>
								</div>
							</Link>
						</figure>
					</div>

					<div className="col-lg-3 p-0">
						<figure>
							<Link className="fancybox" data-fancybox-group="gallery" href="#">
								<img src="images/salad.jpg" />
								<div className="title">
									<p>green veg</p>
									<i className="icon icon-expand"></i>
								</div>
							</Link>
						</figure>
					</div>

					<div className="col-lg-3 p-0">
						<figure>
							<Link className="fancybox" data-fancybox-group="gallery" href="#">
								<img src="images/food4.jpg" />
								<div className="title">
									<p>green veg</p>
									<i className="icon icon-expand"></i>
								</div>
							</Link>
						</figure>
					</div>

					<div className="col-lg-3 p-0">
						<figure>
							<Link className="fancybox" data-fancybox-group="gallery" href='#'>
								<img src={require('../../assets/img/food1.jpg')} />
								<div className="title">
									<p>green veg</p>
									<i className="icon icon-expand"></i>
								</div>
							</Link>
						</figure>
					</div>

					<div className="col-lg-3 p-0">
						<figure>
							<Link className="fancybox" data-fancybox-group="gallery" href="#">
								<img src="images/platter.jpg" />
								<div className="title">
									<p>green veg</p>
									<i className="icon icon-expand"></i>
								</div>
							</Link>
						</figure>
					</div>

					<div className="col-lg-3 p-0">
						<figure>
							<Link className="fancybox" data-fancybox-group="gallery" href="#">
								<img src="images/salad.jpg" />
								<div className="title">
									<p>green veg</p>
									<i className="icon icon-expand"></i>
								</div>
							</Link>
						</figure>
					</div>

				</div>

				<Link href="#" className="button btn-effect">View gallery</Link>
			</section>

		</>
	)
}
export default Index