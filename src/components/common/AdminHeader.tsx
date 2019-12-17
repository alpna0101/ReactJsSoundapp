import React, { useState,useContext }  from 'react';

import {  Navbar } from 'react-bootstrap'
import { Link } from "react-router-dom";
import logo from '../../images/account_logo.png';
import axios from 'axios';
import {config} from '../../config/config'
import { Redirect } from 'react-router-dom'


const access_token = localStorage.getItem('admin_access_token');

const logout=()=>{

	axios
	.get(`${config.apiUrl}/admins/logoutAdmin`,  {headers: {
	  'access_token':access_token
	  }})
	.then(response => {
    localStorage.removeItem('admin_access_token');
    localStorage.removeItem('user_type');
	  localStorage.clear();
	  window.location.href = `${config.appurl}/admin/login`;
	})
	.then(json => {
	})
}
const checkadmin=()=>{

	axios
	.get(`${config.apiUrl}/admins/token`,  {headers: {
	  'access_token':access_token
	  }})
	  .then(function (response) {
		
		// 
		if(response.data.status==false){
		//   alert(response.data.message);
		  window.location.href = `${config.appurl}/admin/login`;
		}else{
		
		
	
		 
		}
	})
}

const Header = () => {



	React.useEffect(() => {
		
		checkadmin()
	}, []);
    return (
		<>
	 {
    (() => {
      if (window.location.pathname!='/login' && window.location.pathname!='/admin/login' && window.location.pathname!='/register' && window.location.pathname!='/' && window.location.pathname!='/forgot') {
        const access_token = localStorage.getItem('admin_access_token');

        if(access_token==null){
        
          return <Redirect to='/admin/login' />
        }
        
      }
    })()
  }
		<Navbar className="navbar navbar-default navbar-static-top" role="navigation" >
		  <div className="navbar-header">
			<button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
						  <span className="sr-only">Toggle navigation</span>
						  <span className="icon-bar"></span>
						  <span className="icon-bar"></span>
						  <span className="icon-bar"></span>
					  </button>
			<a className="navbar-brand" href="/admin/dashboard"><img src={logo}/></a>
		  </div>
	  
		  <ul className="nav navbar-top-links navbar-right">
			<li className="dropdown">
			  <a className="dropdown-toggle" data-toggle="dropdown" href="#">
				Admin <i className="fa fa-user fa-fw"></i> <i className="fa fa-caret-down"></i>
			  </a>
			  <ul className="dropdown-menu dropdown-user">
				{/* <li><a href="#"><i className="fa fa-user fa-fw"></i> User Profile</a>
				</li>*/}
				<li><a href="/admin/changepassword"><i className="fa fa-gear fa-fw"></i>Change Password</a>
				</li> 
				
				<li><a onClick={logout}><i className="fa fa-sign-out fa-fw"></i> Logout</a>
				</li>
			  </ul>
			</li>
		  </ul>
	  
		  <div className="navbar-default sidebar" role="navigation">
			<div className="sidebar-nav navbar-collapse">
			  <ul className="nav" id="side-menu">
				{/* <li className="sidebar-search">
				  <div className="input-group custom-search-form">
					<input type="text" className="form-control" placeholder="Search..."/>
					<span className="input-group-btn">
									  <button className="btn btn-default" type="button">
										  <i className="fa fa-search"></i>
									  </button>
								  </span>
				  </div>
				</li> */}
				<li>
				  <a href="/admin/dashboard"><i className="fa fa-dashboard fa-fw"></i> Dashboard</a>
				</li>
				<li>
				  <a href="/admin/users"><i className="fa fa-users fa-fw"></i> Users</a>
				</li>
			   <li>
				  <a href="/admin/addsong"> <i className="fa fa-music" ></i> Add Song</a>
				</li>  
				<li>
				  <a href="/admin/songs"><i className="fa fa-music"></i> Songs</a>
				</li>
				 <li>
				  <a href="/admin/playlists"><i className="fa fa-film"></i> Playlists</a>
				</li>
				<li>
			    <a href="/admin/mood"><i className="fa fa-smile-o" aria-hidden="true"></i> Mood</a>
				</li>
				<li>
				  <a href="/admin/key"><i className="fa fa-key"></i> Key</a>
				</li>
				<li>
				  <a href="/admin/tempo"><i className="fa fa-sliders"></i> Tempo</a>
				</li>
				<li>
				  <a href="/admin/producers"><i className="fa fa-user"></i> Producer</a>
				</li>
				<li>
				  <a href="/admin/soundlike"><i className="fa fa-music"></i> Sounds Like</a>
				</li>
				<li>
				  <a href="/admin/orders"><i className="fa fa-shopping-cart" aria-hidden="true"></i> Add On Orders</a>
				</li>
			  </ul>
			</div>
		   
		  </div>
		  
		</Navbar>
       
</>

    )
}

export default Header