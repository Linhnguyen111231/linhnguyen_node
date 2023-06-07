const Footer = ()=> {
    return (
        <>
        <footer id="footer">
		<div className="container">
			<div className="row">

				<div className="col-6 col-md-3">
					<div className="footer-menu">
						<h4 className="widget-title">Contact info</h4>
						<ul id="footer-menu" className="list-unstyled">
							<li><i className="icon icon-map-marker"></i>PO Box 1612 Collin Street, NYC</li>
							<li><i className="icon icon-mobile"></i>(+801) - 2345 - 6789</li>
							<li><i className="icon icon-envelope"></i><a href="#">support@hungerhunt.com</a></li>
						</ul>
					</div>
				</div>

				<div className="col-6 col-md-2">
					<div className="footer-menu">
						<h4 className="widget-title">Support</h4>
						<ul id="footer-menu" className="list-unstyled">
							<li><a href="#">FAQ</a></li>
							<li><a href="#">Delivery</a></li>
							<li><a href="#">Payment Options</a></li>
							<li><a href="#">Returns & Refunds</a></li>
						</ul>
					</div>
				</div>

				<div className="col-6 col-md-2">
					<div className="footer-menu">
						<h4 className="widget-title">Shop</h4>
						<ul id="footer-menu" className="list-unstyled">
							<li><a href="#">Non-Veg</a></li>
							<li><a href="#">Veg</a></li>
							<li><a href="#">Salads</a></li>
							<li><a href="#">Desserts</a></li>
							<li><a href="#">Appetizers</a></li>
						</ul>
					</div>
				</div>

				<div className="col-6 col-md-2">
					<div className="footer-menu">
						<h4 className="widget-title">Information</h4>
						<ul id="footer-menu" className="list-unstyled">
							<li><a href="#">Home</a></li>
							<li><a href="#">About Us</a></li>
							<li><a href="#">Blogs</a></li>
							<li><a href="#">Contact Us</a></li>
						</ul>
					</div>
				</div>

				<div className="col-6 col-md-2">
					<div className="footer-menu">
						<h4 className="widget-title">My Account</h4>
						<ul id="footer-menu" className="list-unstyled">
							<li><a href="#">Your Account</a></li>
							<li><a href="#">Check Out</a></li>
							<li><a href="#">Login</a></li>
							<li><a href="#">Register</a></li>
						</ul>
					</div>
				</div>

				<div className="col-6 col-md-2">
					<div className="social-icon">
						<h4 className="widget-title">Find u on</h4>
						<ul className="list-unstyled d-flex">
							<li><a href="#"><i className="icon icon-facebook"></i></a></li>
							<li><a href="#"><i className="icon icon-twitter"></i></a></li>
							<li><a href="#"><i className="icon icon-instagram"></i></a></li>
						</ul>
					</div>
				</div>

				<div className="col-6 col-md-3">
					<div className="footer-menu">
						<h4 className="widget-title">newsletter</h4>
						<form>
							<div className="form-group">
								<input type="email" className="form-control" id="email" name="email address"
									placeholder="Your email address"/>
								<button type="submit" className="searchbtn"><i className="icon icon-paper-plane"></i></button>
							</div>
						</form>

					</div>
				</div>

			</div>
		</div>
	</footer>

	<div className="footer-bottom">
		<div className="container">
			<div className="content">
				<div className="copyright">
					<p>© 2022 - Free HTML Template By <a href="https://templatesjungle.com/"
							target="_blank">TemplatesJungle</a></p>
				</div>
				<div className="payment-card">
					<img src="images/visa.png" className="cardImg"/>
					<img src="images/american-express.png" className="cardImg"/>
					<img src="images/master-card.png" className="cardImg"/>
				</div>
			</div>
		</div>
	</div></>
    )
}
export default Footer