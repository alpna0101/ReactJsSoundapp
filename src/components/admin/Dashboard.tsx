import React, { useState } from 'react';
 

import { Container, Row, Col, Form, Button } from 'react-bootstrap' 
import {config} from '../../config/config'

import account_logo from '../../images/account_logo.png';
import axios from 'axios';
import $ from "jquery";
import { css } from 'react-select/src/components/Control';
interface fieldInterface {
    input: any;
    label: string;
    type: string;
    meta: {
        touched: boolean;
        error: string;
    };
}
const access_token = localStorage.getItem('admin_access_token');
let config1 = {
  headers: {
    'access_token':access_token
  }
  }

const renderField = ({ input, label, type, meta: { touched, error } }: fieldInterface) => (
  <div className="form-group">
      <label>{label}</label>
      
        <input {...input} placeholder={label} type={type} className="form-control" />
        {touched && error && <span>{error}</span>}
      
    </div>
  )
 
  const Dashboard = (props: any) => {
    const [total_user, setTotalUser] = useState(0);
const [active_user, setActiveUser] = useState(0);
const [revenue, setRevenue] = useState(0);
    React.useEffect(() => {
      // getsong("5d6fb239e4358331fc96f18f");
      // setTotalUser(1000)
      // setActiveUser(100)
      // setRevenue(2222)
      axios.get(`${config.apiUrl}/users/countUser`,config1).then(response => response.data)
      .then((data) => {
        console.log(data);
        setTotalUser(data.totalUser)
        setActiveUser(data.activeUser)
        setRevenue(data.revenue)
         })
    
      
    
         
      }, []);


    const { error, handleSubmit, pristine, reset, submitting } = props
    return (
      <>
      <div id="page-wrapper">
  <div className="dashbord_outr">
    <div className="row">
        <div className="col-md-4">
            <div className="dashbord_inner">
            <a href="/admin/users">
            <i className="fa fa-user fa-fw bg-primary" aria-hidden="true"></i>
              <div className="info">
              <h3>Total Users</h3>
              <p>{total_user}</p>
              </div>
              </a>
            </div>
        </div>
        <div className="col-md-4">
            <div className="dashbord_inner">
              <i className="fa fa-user fa-fw bg-primary"></i>
              <div className="info">
              <h3>Active Users</h3>
              <p>{active_user}</p>
              </div>
            </div>
        </div>
        <div className="col-md-4">
            <div className="dashbord_inner">
              <i className="fa fa-usd fa-fw bg-primary"></i>
              <div className="info">
              <h3>Total Revenue</h3>
              <p>{revenue}</p>
              </div>
            </div>
        </div>
        {/* <div className="col-md-3">
            <div className="dashbord_inner">
              <i className="fa fa-envelope fa-fw bg-primary"></i>
              <div className="info">
              <h3>1,245</h3>
              <p>Lorem ipsum dolor sit amet</p>
              </div>
            </div>
        </div> */}
    </div>
  </div>
  </div>
     
       
     </>
    )
  }
  $(function() {

    // $('#side-menu').metisMenu();

});

//Loads the correct sidebar on window load,
//collapses the sidebar on window resize.
// Sets the min-height of #page-wrapper to window size
$(function() {
    $(window).bind("load resize", function() {
        var topOffset = 50;
        var width = (this.window.innerWidth > 0) ? this.window.innerWidth : this.screen.width;
        if (width < 768) {
            $('div.navbar-collapse').addClass('collapse');
            topOffset = 100; // 2-row-menu
        } else {
            $('div.navbar-collapse').removeClass('collapse');
        }

        var height = ((this.window.innerHeight > 0) ? this.window.innerHeight : this.screen.height) - 1;
        height = height - topOffset;
        if (height < 1) height = 1;
        if (height > topOffset) {
            $("#page-wrapper").css("min-height", (height) + "px");
        }
    });

    var url = window.location;
    // var element = $('ul.nav a').filter(function() {
    //     return this.href == url;
    // }).addClass('active').parent().parent().addClass('in').parent();
    // var element = $('ul.nav a').filter(function() {
    //   return this.href == url;
    // }).addClass('active').parent();

    // while(true){
    //     if (element.is('li')){
    //         element = element.parent().addClass('in').parent();
    //     } else {
    //         break;
    //     }
    // }
});
  
  export default Dashboard;