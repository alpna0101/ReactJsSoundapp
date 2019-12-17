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
import ReactAutocomplete from 'react-autocomplete';
import Pagination from "react-js-pagination";
  const Users = (props: any) => {

    const [orders, setorders] = useState();
    const [activePage, setactivepage] = useState(1);
    const [itemPerPage, setitemPerPage] = useState(10);
    const [pageNumber, setpagenumber] = useState(1);
    const [total_item, setTotalItem] = useState(1);
   

   const  handlePageChange=(pageNumber:any)=>{
    setpagenumber(pageNumber)
      setactivepage(pageNumber);
      getusers(pageNumber)
       
    }
  
    React.useEffect(() => {
        getusers(pageNumber)
       
      }, []);
      const access_token = localStorage.getItem('admin_access_token');
      let config1 = {
        headers: {
          'access_token':access_token
        }
        }
      const getusers =(pageNumber:any)=>{

        axios.get(`${config.apiUrl}/orders/adminOrder/`+pageNumber,config1).then(response => response.data)
        .then((data) => {
            console.log(data.result,"=====");
            setorders(data.result);
         setTotalItem(data.total_count)
             })
      }
     
      const changestatus =(user_id:any)=>{
        axios.get(`${config.apiUrl}/orders/updateAdminOrder/`+user_id,config1).then(function (response) {
              // console.log(response.data);
            if(response.data.status==false){
              alert(response.data.message);
            }else{
                alert(response.data.message);
             window.location.href = `${config.appurl}/admin/orders`; ; 
             }
          })
      }
 
      

      var indexOfLastTodo = activePage * itemPerPage;
      var indexOfFirstTodo = indexOfLastTodo - itemPerPage;
      // console.log(indexOfFirstTodo,"=======",indexOfLastTodo)
    //   var renderedProjects = genres.slice(indexOfFirstTodo, indexOfLastTodo);
      // console.log(renderedProjects)
   var all_genres: any[] = [];
   if(orders){
       console.log(orders,"==========orders");
    all_genres = Object.keys(orders).map(function(key: any,value:any) {
        var username ="";
        if(orders[key].cart_id[0]){
             username = orders[key].cart_id[0].user_id.name;
        }
       
       
    return <tr key={key}>
         <td>{parseInt(key)+1}</td> 
        <td>{orders[key]['_id'] }</td>
         <td>{username}</td>
        <td>{orders[key]['placed_on']}</td>

        <td><a  href={"/admin/order_detail/"+orders[key]['_id']}>View Detail</a></td>
       <td>
         <div className="dropdown">
            <button className="dropdown-toggle btn btn-default action" data-toggle="dropdown" >Action
            <span className="caret"></span></button>
            <ul className="dropdown-menu">
            <li><a onClick={() => {changestatus(orders[key]['_id'])}}>Completed</a></li>
        
            
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
          
        <div className="admin_haedg">
        <h3>Users</h3>
      
        </div>
                <div className="table-responsive">
                  <table id="second-morris-table" className="table">
                    <thead>
                      <tr>
                        <th>S.No</th>
                        <th>OrderId</th>
                        <th>Placed By</th>
                        <th>Placed On</th>
                        <th>Detail</th>
                    
						<th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                     {all_genres}
                    
                     
                     
                    </tbody>
                  </table>
                  
                </div>
              </div>
            </div>

          
            <Pagination
          activePage={activePage}
          itemsCountPerPage={10}
          totalItemsCount={total_item}
          pageRangeDisplayed={10}
          onChange={handlePageChange}
        />
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
  
  export default Users;