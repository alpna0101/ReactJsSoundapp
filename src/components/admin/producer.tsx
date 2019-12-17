import React, { useState } from 'react';
// import { connect } from "react-redux";
// import store from '../store';
// 


// import { Container, Row, Col, Form, Button } from 'react-bootstrap' 


// import account_logo from '../../images/account_logo.png';
import axios from 'axios';
import $ from "jquery";
import { css } from 'react-select/src/components/Control';
import {config} from '../../config/config'
import Pagination from "react-js-pagination";
interface RouterProps {
  match: any;
}
  const Mood = (props: any) => {

    const [activePage, setactivepage] = useState(1);
    const [itemPerPage, setitemPerPage] = useState(10);
    const [totalcount, settotalcount] = useState(10);
    const  handlePageChange=(pageNumber:any)=>{
    
      setactivepage(pageNumber);
      getmood(pageNumber)
    }
    const access_token = localStorage.getItem('admin_access_token');
    let config1 = {
      headers: {
        'access_token':access_token
      }
      }
    const [mood, setmood] = useState([]);
  
    React.useEffect(() => {
        getmood('1');
       
      }, []);
      const getmood = (page:any) => {
       axios.get(`${config.apiUrl}/producers/getProducer/`+page,config1)
        .then(async (response) => {
            console.log(response);
          setmood(response.data.producer);
          settotalcount(response.data.totalCount)
           }).catch(error => {
          if(error.response.status===401){
            alert("Login token has been expired!!Login again")
            localStorage.removeItem('auth_token');
          }
          console.error(`An Error Occuredd! ${error}`);
        })
        }
var all_genres: any[] = [];
if(mood.length!==0){
    all_genres = Object.keys(mood).map(function(key: any,value:any) {
    return <tr key={key}>
         <td>{parseInt(key)+1}</td> 
       
        <td>{mood[key]['producer_name']}</td>
      
       <td>
         <div className="dropdown">
            <button className="dropdown-toggle btn btn-default action" data-toggle="dropdown" >Action
            <span className="caret"></span></button>
            <ul className="dropdown-menu">
            <li><a href={`/admin/edit_producer/`+mood[key]['_id']}>Edit</a></li>
           
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
              <div className="admin_haedg">
              <h3>Producers</h3>
               <span><a  className="btn btn_admin" href="/admin/add_producer">Add Producer</a></span>
               </div>

        
                <div className="table-responsive">
                  <table id="second-morris-table" className="table">
                    <thead>
                      <tr>
                        <th>S.No</th>
                 
                        <th>Name</th>
                        
						            <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                     {all_genres}
                    
                     
                     
                    </tbody>
                  </table>
                  
                </div>
                <Pagination
          activePage={activePage}
          itemsCountPerPage={itemPerPage}
          totalItemsCount={totalcount}
          pageRangeDisplayed={10}
          onChange={handlePageChange}
        />
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
  
  export default Mood;