import * as React from 'react';
import { Col,Row } from 'react-bootstrap'
import footer_logo from '../../images/footer_logo.png';
const Footer = () => {
    return (
        
        <div>
            <div className="modal-backdrop fade in" style={{display:"none"}}></div>
            <section className="footer_sctn" id="Contact_us">
	<div className="container">
		<div className="col-md-12">
			<div className="top_mail text-center">
				<h4>If you have any questions about licensing, membership, or want to submit tracks to Sounds Sphere, please contact us at:</h4>
				<h3><a href="mailto:info@soundssphere.com">info@soundssphere.com</a></h3>
				<h5>Join Our Newsletter</h5>
				<div className="form-group">
					<div className="search_bar">
						<input type="email" placeholder="Enter Email Address"/>
						<button className="btn">Submit</button>
					</div>
				</div>
			</div>
			<div className="bottom_link text-center">
            <a href="index.html"><img src={footer_logo}/></a>
				<ul>
                <li><a href="/about">About Us</a></li>
                        <li><a href="/faq">FAQ</a></li>
                        <li><a href="License.html">License Agreement</a></li>
				</ul>
				<ul>
					<li><a href=""><i className="fa fa-facebook" aria-hidden="true"></i></a></li>
					<li><a href=""><i className="fa fa-instagram" aria-hidden="true"></i></a></li>
					<li><a href=""><i className="fa fa-twitter" aria-hidden="true"></i></a></li>
					<li><a href=""><i className="fa fa-youtube-play" aria-hidden="true"></i></a></li>
				</ul>
				<p className="text-center">© 2019, All Rights Reserved.</p>
			</div>
		</div>
	</div>
</section>
        {/* <section className="footer_sctn" id="Contact_us">
        <div className="container">
            <div className="col-md-12">
                <div className="bottom_link text-center">
                    <a href="index.html"><img src={footer_logo}/></a>
                    <ul>
                        <li><a href="/about">About Us</a></li>
                        <li><a href="/faq">FAQ</a></li>
                        <li><a href="License.html">License Agreement</a></li>
                    </ul>
                    <ul>
                        <li><a href=""><i className="fa fa-facebook" aria-hidden="true"></i></a></li>
                        <li><a href=""><i className="fa fa-instagram" aria-hidden="true"></i></a></li>
                        <li><a href=""><i className="fa fa-twitter" aria-hidden="true"></i></a></li>
                        <li><a href=""><i className="fa fa-youtube-play" aria-hidden="true"></i></a></li>
                    </ul>
                    <p className="text-center">© 2019, All Rights Reserved.</p>
                </div>
            </div>
        </div>
    </section> */}
  
  
  </div>
  
    )
}

export default Footer