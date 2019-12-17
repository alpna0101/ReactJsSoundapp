
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
	  localStorage.clear();
	  window.location.href = `${config.appurl}/login`;
	})
	.then(json => {
	})
}
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
$(document).ready(function (){
	$("#homeli").click(function (){
	
 $(".navli").removeClass('active');
 $(this).addClass('active');
	
	});
	
	
});
const Header = () => {
	const userInfo: any = useContext(AuthContext);

	// const [cartcount, setcartcount] = useState(userInfo.count);

    return (
		<>
      <header className="main_header header inner_head ">
		  <div className="container-fluid">
		  <Navbar className="navbar">
			  <div className="navbar-header">
				<button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
				  <span className="icon-bar"></span>
				  <span className="icon-bar"></span>
				  <span className="icon-bar"></span>                        
				</button>
				<Link className="navbar-brand" to="/"><img src={logo}></img></Link>
			  </div>
			  <div className="collapse navbar-collapse" id="myNavbar"> <ul className="nav navbar-nav">
			<li className="navli" id="homeli"><Link   to="/">Home</Link></li>
			 <li className="navli" id="profileli"><Link  to="/profile">My Profile</Link></li>
			 <li className="navli" id="personalli"><Link  to="/playlist">My Personalized Playlist</Link></li>
			 <li className="navli" id="cartli"><Link  to="/cart">My Cart	{ userInfo.count ? (
								
								<span className="cart_count">{userInfo.count}</span>
								):(
									<span className="cart_count">{userInfo.count}</span>
								)}</Link></li>
			 <li><a  onClick={logout} >Logout</a></li>
			</ul>
			</div>
		  </Navbar>
	  </div>
	 </header>	
       
</>)
}

export default Header