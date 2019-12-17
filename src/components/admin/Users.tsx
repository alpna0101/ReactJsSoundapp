import React, { useState,useContext } from 'react';
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
  
    const [users, setusers] = useState([]);
    const [usertype, setusersType] = useState();
    const [searchval, setsearchval] = useState();
    const [activePage, setactivepage] = useState(1);
    const [itemPerPage, setitemPerPage] = useState(10);
    const [pageNumber, setpagenumber] = useState(1);
    const [total_item, setTotalItem] = useState(1);
    const [user_type, setUserType] = useState("all");
    const [user_id, setUserid] = useState();
    const [nameclass, setnameclass] = useState();
    const [emailclass, setemailclass] = useState();
    const [sortby, setsortby] = useState();
    const [field, setfield] = useState();
    const [sortvar, setsortvar] = useState();
   const  handlePageChange=(pageNumber:any)=>{
     if(usertype=="search"){
      searchuser(searchval,pageNumber)
     }else{
      getusers(pageNumber,user_type,'asc','name')
     }
      setactivepage(pageNumber);
     
       
    }
    const access_token = localStorage.getItem('admin_access_token');
    let config1 = {
      headers: {
        'access_token':access_token
      }
      }
    const  handleChangename=(value:any)=>{
      setnameclass('fa fa-sort')
      setemailclass('fa fa-sort')
      setfield('name')
      setsortby(value);
      setactivepage(1);
      if(value=="asc"){
        setsortvar('des')
        setnameclass('fa fa-sort-desc')
      }else{
        setsortvar('asc')
        setnameclass('fa fa-sort-asc')
      }
      getusers(1,user_type,value,"name");
     }
     const  handleChangeemail=(value:any)=>{
      setnameclass('fa fa-sort')
      setemailclass('fa fa-sort')
      setfield('name')
      setsortby(value);
      setactivepage(1);
      if(value=="asc"){
        setsortvar('des')
        setemailclass('fa fa-sort-desc')
      }else{
        setsortvar('asc')
        setemailclass('fa fa-sort-asc')
      }
      getusers(1,user_type,value,"email");
     }
    const  handlTypeChange=(type:any)=>{
   
      setUserType(type);
      getusers(pageNumber,type,'asc','name')
       
    }
    React.useEffect(() => {
      setfield('name')
      setsortby('asc')
      setnameclass('fa fa-sort')
      setemailclass('fa fa-sort')
      setsortvar('asc')
        getusers(pageNumber,user_type,'asc','name')
       
      }, []);
      const getusers =(pageNumber:any,user_type:any,sort:any,sort_by:any)=>{
        setactivepage(pageNumber);
        setusersType("sort");
        axios.get(`${config.apiUrl}/users/getUserByType/`+user_type+`/`+sort_by+'/'+sort+'/'+pageNumber,config1).then(response => response.data)
        .then((data) => {
       
           setusers(data.user);
           setTotalItem(data.totalUser)
             })
      }
   const searchuser = (value:any,page:any) =>{
    setactivepage(page);
    setusersType("search");
    setsearchval(value)
    axios.post(`${config.apiUrl}/users/search/`, {
       
      name: value,
      page:page
       
    }).then(response => response.data)
    .then((data) => {
   
       setusers(data.user);
       setTotalItem(data.totalUser)
         })
   }
      const suspandusers =(user_id:any,status:any)=>{
        axios.put(`${config.apiUrl}/users/suspendUser`, {
            userid: user_id,
            status: status,
         
           },config1).then(function (response) {
              // console.log(response.data);
            if(response.data.status==false){
              alert(response.data.message);
            }else{
                alert(response.data.message);
             window.location.href = `${config.appurl}/admin/users`; ; 
             }
          })
      }
      const show_pop =(user_id:any)=>{
        $("#credit").val('')
        $("#add_credit").css("display","block");
        $("#add_credit").addClass("in");
        setUserid(user_id)
        // add_credit

      }
      
      const addcredit =()=>{
      var credit = $("#credit").val()
      // let config1 = {
      //   headers: {
      //       'accept': 'application/json',
           
      //       'devicetype':'A',
      //       'version' : '1.0'
      //   }
      // }
 
      axios.put(`${config.apiUrl}/users/addCredit`, {
        credit:credit,
        userid: user_id
         
      }, config1)
      .then(function (response) {
        if(response.data.status==false){
          alert(response.data.message);
        }else{
        
          alert(response.data.message);
          $("#add_credit").css("display","none");
          $("#add_credit").removeClass("in");
          setUserid('')
          
        }
      })
    }
      var indexOfLastTodo = activePage * itemPerPage;
      var indexOfFirstTodo = indexOfLastTodo - itemPerPage;
      // console.log(indexOfFirstTodo,"=======",indexOfLastTodo)
    //   var renderedProjects = genres.slice(indexOfFirstTodo, indexOfLastTodo);
      // console.log(renderedProjects)
   var all_genres: any[] = [];
   if(users.length!=0){
    all_genres = Object.keys(users).map(function(key: any,value:any) {
    return <tr key={key}>
         <td>{parseInt(key)+1}</td> 
        <td><img src={users[key]['profile_pic'] } height="100" width="100"></img></td>
        <td>{users[key]['name']}</td>
        <td>{users[key]['email']}</td>

        
       <td>
         <div className="dropdown">
            <button className="dropdown-toggle btn btn-default action" data-toggle="dropdown" >Action
            <span className="caret"></span></button>
            <ul className="dropdown-menu">
            {
			
			(() => { if(users[key]['status']=="D") return( <li><a onClick={() => {suspandusers(users[key]['_id'],"A")}}>Active</a></li>); else return( <li><a onClick={() => {suspandusers(users[key]['_id'],"D")}}>Suspend</a></li>)  })()
		}
            <li><a onClick={() => {show_pop(users[key]['_id'])}}>Add Credit</a></li>
              <li><a href={"/admin/user_detail/"+users[key]['_id']}>View Detail</a></li>
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
      {/* <div className="col-lg-12">
              <div className="col-md-3">
              <input type="radio" name="usertype"   onClick={() => {handlTypeChange('all')}} />All
              </div>    
               <div className="col-md-3"><input type="radio" name="usertype"  onClick={() => {handlTypeChange('s')}}/> Subscribed</div>     
               <div className="col-md-3"><input type="radio" name="usertype"  onClick={() => {handlTypeChange('u')}} /> UnSubscribed </div> 
              <div className="col-md-3"><input type="radio" name="usertype" onClick={() => {handlTypeChange('a')}} />Active </div> 
        </div> */}
        <div className="filter_box">
        <div className="row">
              <div className="col-md-8">
               <div className="custom_radio">
                  <label className="container_radio"> All
                      <input type="radio" name="usertype"  onClick={() => {handlTypeChange('all')}}/>
                      <span className="checkmark"></span>
                    </label>
                </div>

                <div className="custom_radio">
                  <label className="container_radio"> Subscribe
                      <input type="radio" name="usertype"  onClick={() => {handlTypeChange('s')}}/>
                      <span className="checkmark"></span>
                    </label>
                </div>
                

              <div className="custom_radio">
                  <label className="container_radio"> Unsubscribe
                      <input type="radio" name="usertype"  onClick={() => {handlTypeChange('u')}}/>
                      <span className="checkmark"></span>
                    </label>
                </div> 

                <div className="custom_radio">
                  <label className="container_radio"> Active
                      <input type="radio" name="usertype"  onClick={() => {handlTypeChange('a')}}/>
                      <span className="checkmark"></span>
                    </label>
                </div>

                <div className="custom_radio">
                  <label className="container_radio"> Archive Users
                      <input type="radio" name="usertype"  onClick={() => {handlTypeChange('sus')}}/>
                      <span className="checkmark"></span>
                    </label>
                </div>
                </div> 

  


        
              <div className="col-md-4">
               <div className="search">
                 <input type="text" name ="search" placeholder="Search User"  onChange={(e:any) => {searchuser(e.target.value,'1')}} />
               {/* <ReactAutocomplete className="form-control"
  getItemValue={(item:any) => item.soundslike}
  items={songval}
  renderItem={(item:any, isHighlighted:any) =>
    <div style={{ background: isHighlighted ? 'lightgray' : 'white' }} >
      {item.soundslike}
    </div>
  }
  inputProps={{ placeholder: 'Search here' , id: 'mysearch' }}
 
  // value={myval}
  onChange={ (e:any) => handleInputChange(e.target.value) }
  onSelect={(val:any) => selectvalue(val)}
/>  */}
                </div>
              </div> 

        </div>

        </div>
  <div className="user_table">
       <div className="row">
              <div className="col-lg-12">
          
        <div className="admin_haedg">
        <h3>Users</h3>
        {/* <span><a  className="btn btn_admin" href="/admin/add_genres">Add Genre</a></span> */}
        </div>
                <div className="table-responsive">
                  <table id="second-morris-table" className="table">
                    <thead>
                      <tr>
                        <th>S.No</th>
                        <th>Image</th>
                        <th><i  style={ { cursor:`pointer`} } className={nameclass} onClick={() => {handleChangename(sortvar)}} aria-hidden="true"></i> Name</th>
                     
                        <th><i  style={ { cursor:`pointer`} } className={emailclass} onClick={() => {handleChangeemail(sortvar)}} aria-hidden="true"></i> Email</th>
                    
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
  <div className="modal fade " id="add_credit" role="dialog" >
      <div className="modal-dialog modal-md">
        <div className="modal-content">
        <div className="modal-header">
        <h3 className="modal-title text-center">Add Credit</h3>
        {/* <button className="button close" onClick={() => {openModal(false)}} data-dismiss="modal" ><img src={require("../images/close.png")}></img></button> */}
        </div>
        <div className="modal-body">
      
       
       <input type="text" placeholder="Add Credit" className="form-control" name="credit" id="credit"></input>
       <input type="hidden"  className="form-control" name="user_id" value={user_id} id="user_id"></input>
         
       
    
        </div>
        {/* <div className="row crop_btn" >
        <div className="col-md-2 col-sm-2 text-center">
			<button className="btn close_pop_crop"  style={{background:"#fff",color:"#30beee"}}>Close</button></div>
      <div className="col-md-2 col-sm-2 text-center"><button className="btn"  style={{background:"#30beee",color:"#fff"}} onClick={addcredit}>Add</button></div>
      <div className="col-md-4 col-sm-4 text-center">  </div>
       </div> */}

       <div className="crop_btn pop_btn">
         <ul>
           <li>
              <button className="btn close_pop_crop btn_border">Close</button>
           </li>
           <li>
              <button className="btn" onClick={addcredit}>Add</button>
           </li>
         </ul>
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
  
  export default Users;