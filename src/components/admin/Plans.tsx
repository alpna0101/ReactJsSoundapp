import React, { useState } from 'react';
// import { connect } from "react-redux";
// import store from '../store';
// 

import { Container, Row, Col, Form, Button } from 'react-bootstrap' 


import account_logo from '../../images/account_logo.png';
import axios from 'axios';
import $ from "jquery";
import { css } from 'react-select/src/components/Control';
import {config} from '../../config/config'
 
  const Plans = (props: any) => {

    const [plans, setplans] = useState([]);
    React.useEffect(() => {
        getdropdown();
       
      }, []);
      const getdropdown = () => {
  
        axios.get(`${config.apiUrl}/users/dropDown`).then(async (response) => {
      
        setplans(response.data.Plans);
        }).catch(error => {
        if(error.response.status==401){
          alert("Login token has been expired!!Login again")
          localStorage.removeItem('auth_token');
        }
        console.error(`An Error Occuredd! ${error}`);
      });
     
    }
var planOptions: any[] = [];
if(plans.length!=0){
  planOptions = Object.keys(plans).map(function(key: any,value:any) {
    return<tr key={key}>
         <td>{parseInt(key)+1}</td>
    <td>{plans[key]['plan_name']}</td>
    <td>$ {plans[key]['amount']}</td>
   
    <td>
         <div className="dropdown">
            <button className="dropdown-toggle btn btn-default action" data-toggle="dropdown" >Action
            <span className="caret"></span></button>
            <ul className="dropdown-menu">
            <li><a href={`/admin/edit_plan/`+plans[key]['_id']}>Edit</a></li>
              <li><a href="#">Delete</a></li>
            </ul>
          </div>
    </td>
  </tr>
    
    
    
    
    
           });
 
}
    const { error, handleSubmit, pristine, reset, submitting } = props
    return (
      <>
      <div id="page-wrapper">
  <div className="user_table">
       <div className="row">
              <div className="col-lg-12">
				<h3>Plans</h3>
                <div className="table-responsive">
                  <table id="second-morris-table" className="table">
                    <thead>
                      <tr>
                        <th>S.No</th>
                        <th>Plan Name</th>
                        <th>Amount</th>
                        
						<th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                     {planOptions}
                    
                     
                     
                    </tbody>
                  </table>
                  
                </div>
              </div>
            </div>

  
 
  </div>
  </div>
     
       
     </>
    )
  }


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

});
  
  export default Plans;