
import React, {useContext } from 'react'
import {  Navbar} from 'react-bootstrap'
import { Link } from "react-router-dom";
import logo from '../../images/logo.png';
import axios from 'axios';
  import {config} from '../../config/config'
  import { AuthContext } from '../../contexts/AuthContext';
  import { Redirect } from 'react-router-dom';
  import $ from "jquery";
const access_token = localStorage.getItem('access_token');

const logout=()=>{
	
	axios
	.get(`${config.apiUrl}/users/logout`,  {headers: {
	  'access_token':access_token
	  }})
	.then(response => {
	  localStorage.removeItem('access_token');
	  localStorage.removeItem('user_type');
	  window.location.href = `${config.appurl}/login`;
	})
	.then(json => {
	})
}
var sections = $('.all_sctn')
, nav = $('nav')
, nav_height = nav.outerHeight();

nav.find('a').on('click', function () {
  var $el = $(this)
	var id = $el.attr('href');
  
//   $('html, body').animate({
// 	// scrollTop: $(id).offset().top - 90
//   }, 500);
  
  
  return false;
});

$(function(){
	var shrinkHeader = 50;
	 $(window).scroll(function() {
	   var scroll = getCurrentScroll();
		 if ( scroll >= shrinkHeader ) {
			  $('.header').addClass('shrink');
		   }
		   else {
			   $('.header').removeClass('shrink');
		   }
	 });
   function getCurrentScroll() {
	   return window.pageYOffset || document.documentElement.scrollTop;
	   }
	  
   });
const Header = () => {
	const userInfo: any = useContext(AuthContext);

	// const [cartcount, setcartcount] = useState(userInfo.count);

    return (
		<>


	   
   <header className="main_header header home_header">
		  <div className="container">
		  <Navbar className="navbar">
			  <div className="navbar-header">
				<button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
				  <span className="icon-bar"></span>
				  <span className="icon-bar"></span>
				  <span className="icon-bar"></span>                        
				</button>
				<Link className="navbar-brand" to="/"><img src={logo}></img></Link>
			  </div>
			  <div className="collapse navbar-collapse" id="myNavbar"><ul className="nav navbar-nav">
		  <li className="scrollnav" data-id="playlist"><Link to="/#playlist">Playlists</Link></li>
		  <li className="scrollnav"  data-id="features">  <Link  to="/#features">Features</Link></li>
		  <li className="scrollnav" data-id="Membership1">  <Link  to="/#Membership1">Membership</Link></li>
		  <li className="scrollnav" data-id="pricing">  <Link  to="/#pricing">Pricing</Link></li>
		  <li className="scrollnav" data-id="Contact_us">  <Link  to="/#Contact_us">Contact Us</Link></li>
		  <li className="login" ><Link  to="/login">Login</Link></li>
  </ul>	</div>
		  </Navbar>
	  </div>
	 </header>
		       
		
		
       
</>)
}

export default Header