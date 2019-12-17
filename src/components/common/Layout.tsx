import React from 'react';
import Header from './Header';
import LoginHeader from './LoginHeader';
import AdminHeader from './AdminHeader';
import Footer from './Footer';
import AuthContextProvider from '../../contexts/AuthContext';
//  import Player from './Player'
// import { Redirect } from 'react-router-dom'
// import { userInfo } from 'os';
// console.log(AuthContextProvider);
// const value = useContext(AuthContextProvider)
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import $ from "jquery";
  import {config} from '../../config/config'
 
export const Layout = (props: any) => {
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

    if(props.type === 'wrap') {
// alert( access_token)

		if(access_token==null || access_token==undefined){
     
			logout();
		   return <Redirect to='/login' />
		 }
      return (
        <AuthContextProvider>
          <div className="main">
              <LoginHeader/>
              {props.children}
              {/* <Player/> */}
            <Footer/>
          </div>
        </AuthContextProvider>
      )
    } else if(props.type === 'homewrap') {
      return (
        <AuthContextProvider>
          <div className="main">
              <Header/>
              {props.children}
              {/* <Player/> */}
            <Footer/>
          </div>
        </AuthContextProvider>
      )
    } else if(props.type === 'wrapadmin') { 
    return ( <AuthContextProvider>
     <div id="wrapper">
          <AdminHeader/>
          {props.children}
      
      </div>
    </AuthContextProvider>)
    } else {
      return (
        <AuthContextProvider>
          <div className="main">
              {props.children}
          </div>
        </AuthContextProvider>
      )
    }
}


