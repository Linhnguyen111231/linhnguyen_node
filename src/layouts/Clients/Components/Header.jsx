import Nav from "./Nav";

import { useEffect, useState } from "react";

const Header = ()=> {
    const [text, setText] = useState('');
    
    return (
        <>
        <header id="header-wrap">
			<div className="container">
				<div className="row">
					<Nav/>
				</div>

			</div>
		</header>
        <div className="page-banner">

			<div className="text-content bright heading text-center light">
				<h1 className="section-title"><strong>We love it</strong> when you love it</h1>
					<div className="divider mb-4">
						<div className="icon-wrap">
							<i className="icon icon-spoon"></i>
						</div>
					</div>
			</div>
		
		</div>
        </>
    )
}
export default Header