
import "../../assets/css/Admin/demo.css";
import "../../assets/css/Admin/atlantis.min.css";
import "../../assets/img/imgAdmin/icon.ico";
import { Link } from "react-router-dom";
import stl from  "../../assets/css/Admin/fixforminput.module.css";

const Sidebar = () => {
  return (
    
	<div className="sidebar sidebar-style-2" data-background-color="dark2">
	<div className="sidebar-wrapper scrollbar scrollbar-inner">
		<div className="sidebar-content">
			<div className={'user ' + stl.user}>
				<div className="avatar-sm float-left mr-2">
					<img src={require('../../assets/img/imgAdmin/profile.jpg')} alt="..." className="avatar-img rounded-circle"/>
				</div>
				<div className="info">
					<Link data-toggle="collapse" to="#collapseExample" aria-expanded="true">
						<span>
							Hizrian
							<span className="user-level">Administrator</span>
							<span className="caret"></span>
						</span>
					</Link>
					<div className="clearfix"></div>

					<div className="collapse in" id="collapseExample">
						<ul className="nav">
							<li>
								<Link to="/admin/profile">
									<span className="link-collapse">My Profile</span>
								</Link>
							</li>
							<li>
								<Link to="#edit">
									<span className="link-collapse">Edit Profile</span>
								</Link>
							</li>
							<li>
								<Link to="#settings">
									<span className="link-collapse">Settings</span>
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<ul className="nav nav-primary">
				<li className="nav-item active">
					<Link  data-toggle="collapse" to="/admin/index" className="collapsed" aria-expanded="false">
						<i className="fas fa-home"></i>
						<p>Dashboard</p>
						<span className="caret"></span>
					</Link>
				</li>
				<li className="nav-section">
					<span className="sidebar-mini-icon">
						<i className="fa fa-ellipsis-h"></i>
					</span>
					<h4 className="text-section">Components</h4>
				</li>
				<li className="nav-item">
					<Link data-toggle="collapse" to="profile">
						<i className="fas fa-layer-group"></i>
						<p>Profile</p>
					</Link>
					
				</li>
				<li className="nav-item">
					<Link data-toggle="collapse" to="category">
						<i className="fas fa-th-list"></i>
						<p>Manage Categories</p>
					</Link>
					
				</li>
				<li className="nav-item">
					<Link data-toggle="collapse" to="foods">
						<i className="fas fa-pen-square"></i>
						<p>Manage Products</p>
					</Link>
				</li>
				<li className="nav-item">
					<Link data-toggle="collapse" to="#tables">
						<i className="fas fa-table"></i>
						<p>Tables</p>
						<span className="caret"></span>
					</Link>
					<div className="collapse" id="tables">
						<ul className="nav nav-collapse">
							<li>
								<Link to="tables/tables.html">
									<span className="sub-item">Basic Table</span>
								</Link>
							</li>
							<li>
								<Link to="tables/datatables.html">
									<span className="sub-item">Datatables</span>
								</Link>
							</li>
						</ul>
					</div>
				</li>
				<li className="nav-item">
					<Link data-toggle="collapse" to="#maps">
						<i className="fas fa-map-marker-alt"></i>
						<p>Maps</p>
						<span className="caret"></span>
					</Link>
					<div className="collapse" id="maps">
						<ul className="nav nav-collapse">
							<li>
								<Link to="maps/jqvmap.html">
									<span className="sub-item">JQVMap</span>
								</Link>
							</li>
						</ul>
					</div>
				</li>
				<li className="nav-item">
					<Link data-toggle="collapse" to="#charts">
						<i className="far fa-chart-bar"></i>
						<p>Charts</p>
						<span className="caret"></span>
					</Link>
					<div className="collapse" id="charts">
						<ul className="nav nav-collapse">
							<li>
								<Link to="charts/charts.html">
									<span className="sub-item">Chart Js</span>
								</Link>
							</li>
							<li>
								<Link to="charts/sparkline.html">
									<span className="sub-item">Sparkline</span>
								</Link>
							</li>
						</ul>
					</div>
				</li>
				<li className="nav-item">
					<Link to="widgets.html">
						<i className="fas fa-desktop"></i>
						<p>Widgets</p>
						<span className="badge badge-success">4</span>
					</Link>
				</li>
				<li className="nav-item">
					<Link data-toggle="collapse" to="#submenu">
						<i className="fas fa-bars"></i>
						<p>Menu Levels</p>
						<span className="caret"></span>
					</Link>
					<div className="collapse" id="submenu">
						<ul className="nav nav-collapse">
							<li>
								<Link data-toggle="collapse" to="#subnav1">
									<span className="sub-item">Level 1</span>
									<span className="caret"></span>
								</Link>
								<div className="collapse" id="subnav1">
									<ul className="nav nav-collapse subnav">
										<li>
											<Link to="#">
												<span className="sub-item">Level 2</span>
											</Link>
										</li>
										<li>
											<Link to="#">
												<span className="sub-item">Level 2</span>
											</Link>
										</li>
									</ul>
								</div>
							</li>
							<li>
								<Link data-toggle="collapse" to="#subnav2">
									<span className="sub-item">Level 1</span>
									<span className="caret"></span>
								</Link>
								<div className="collapse" id="subnav2">
									<ul className="nav nav-collapse subnav">
										<li>
											<Link to="#">
												<span className="sub-item">Level 2</span>
											</Link>
										</li>
									</ul>
								</div>
							</li>
							<li>
								<Link to="#">
									<span className="sub-item">Level 1</span>
								</Link>
							</li>
						</ul>
					</div>
				</li>
				<li className="mx-4 mt-2">
					<Link to="http://themekita.com/atlantis-bootstrap-dashboard.html" className="btn btn-primary btn-block"><span className="btn-label mr-2"> <i className="fa fa-heart"></i> </span>Buy Pro</Link> 
				</li>
			</ul>
		</div>
	</div>
</div>
  );
};
export default Sidebar;
