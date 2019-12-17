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
import Pagination from "react-js-pagination";
import Playlist from './PlaylistSongs';
  const Genres = (props: any) => {

    const [genres, setgenres] = useState([]);
    const [activePage, setactivepage] = useState(1);
    const [itemPerPage, setitemPerPage] = useState(10);
    // const [pageNumber, setpagenumber] = useState(1);


   const  handlePageChange=(pageNumber:any)=>{
      console.log(`active page is ${pageNumber}`);
      setactivepage(pageNumber);
    }
    const access_token = localStorage.getItem('admin_access_token');
    let config1 = {
      headers: {
        'access_token':access_token
      }
      }
    React.useEffect(() => {
        axios.get(`${config.apiUrl}/genres/getGenre`).then(response => response.data)
    .then((data) => {
       console.log(data.genre,"kkkkkkk");
        setgenres(data.genre);
         })
       
      }, []);
      var indexOfLastTodo = activePage * itemPerPage;
      var indexOfFirstTodo = indexOfLastTodo - itemPerPage;
      // console.log(indexOfFirstTodo,"=======",indexOfLastTodo)
      var renderedProjects = genres.slice(indexOfFirstTodo, indexOfLastTodo);
      // console.log(renderedProjects)
   var all_genres: any[] = [];
   if(renderedProjects.length!=0){
    all_genres = Object.keys(renderedProjects).map(function(key: any,value:any) {
      if(renderedProjects[key]['_id']!="5d70fb3277e3f3361dcc580a"){
    return <tr key={key}>
         <td>{parseInt(key)+1}</td> 
        <td><img src={renderedProjects[key]['image'] } height="100" width="100"></img></td>
        <td>{renderedProjects[key]['name']}</td>
        <td>{renderedProjects[key]['order']}</td>
        <td><a href={"/admin/subgenres/"+renderedProjects[key]['_id']}>View All</a></td>
        <td><a href={"/admin/plalist_songs/"+renderedProjects[key]['_id']}>View All Songs</a></td>
       <td>
         <div className="dropdown">
            <button className="dropdown-toggle btn btn-default action" data-toggle="dropdown" >Action
            <span className="caret"></span></button>
            <ul className="dropdown-menu">
            <li><a href={`/admin/edit_genre/`+renderedProjects[key]['_id']}>Edit</a></li>
              <li><a href="#">Delete</a></li>
            </ul>
          </div>
    </td>
  </tr>
    
    
      }
    
    
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
        <h3>Playlist</h3>
        <span><a  className="btn btn_admin" href="/admin/add_playlist">Add Playlist</a></span>
        </div>
                <div className="table-responsive">
                  <table id="second-morris-table" className="table">
                    <thead>
                      <tr>
                        <th>S.No</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Order</th>
                        
						<th>SubGenres</th>
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
          itemsCountPerPage={itemPerPage}
          totalItemsCount={genres.length}
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
  
  export default Genres;