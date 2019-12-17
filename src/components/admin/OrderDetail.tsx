
import React, { useState,useEffect,useContext } from 'react';
// import ReactDOM from "react-dom";
import PropTypes, { func } from "prop-types";
import Moment from 'react-moment';
// import { connect } from "react-redux";
// import store from '../store';
import { Container, Row, Col,Modal,Button } from 'react-bootstrap' 
import profl_bg from '../../images/profl_bg.png';
import prof_img from '../../images/prof_img.png';

import editpng from '../../images/edit_bg.png';
import play from '../../images/play.png';
import close from '../../images/close.png';

import {config} from '../../config/config'
import axios from 'axios';
import ReactPlayer from 'react-player'
import singer_img from '../../images/singer_img.png';
import active_song from '../../images/active_wave.png';
import inactive_song from '../../images/unactive_wave.png';
import pause from '../../images/pause.png';
import leftplay from '../../images/playleft_arrow.png';
import rightplay from '../../images/right_arrow_song.png';
import play_icon from '../../images/play_icon.png';
import pause_icon from '../../images/pause_icon.png';
import $ from "jquery";
interface fieldInterface {
  input: any;
  label: string;
  type: string;
  meta: {
      touched: boolean;
      error: string;
  };
}

const Profile = (props:any) => { 

  const [orderinfo, setorderinfo] = useState();

  const [cartdata, setcart] = useState([]);
  const [paidamount, setpaid] = useState(0);
  const access_token = localStorage.getItem('admin_access_token');
  let config1 = {
		headers: {
			'access_token':access_token
		}
	  }

    useEffect(() => {
     
        getorder();
   
    
  
 
      }, []);
      const getorder =()=>{
        axios.get(`${config.apiUrl}/orders/adminOrderById/`+props.match.params.id,config1)
        .then((response) => {
            console.log(response.data.result);
            setorderinfo(response.data.result)
            setcart(response.data.result[0].cart_id)
            setpaid(response.data.result[0].amount);
          
     
               
        }).catch((e) => {
            setorderinfo([])
        })
    
       
      }
      var carttr: any = [];
      var usertr: any = [];
	  let amount: number = 0
	  let myamount: number = 0
	  let song_price: number = 0
	  let addonprice: number = 0
      if(cartdata){
        carttr = Object.keys(cartdata).map(function(key: any,value:any) {
            let addontr = [];
            addontr = Object.keys(cartdata[key]['addon_id']).map(function(key1: any,value1:any) {
                addonprice =  addonprice + parseInt(cartdata[key]['addon_id'][key1]['price']);
                return <p>{cartdata[key]['addon_id'][key1]['addon_name']} <span>$ {cartdata[key]['addon_id'][key1]['price']}</span></p>
            })
            amount = amount + parseFloat(cartdata[key]['song_id']['price']);
            song_price = parseFloat(cartdata[key]['song_id']['price']);
            amount = amount+addonprice;
           return <li key={key}>
           <h4>{cartdata[key]['song_id']['song_name']} <span>${cartdata[key]['song_id']['price']}</span></h4>
          {addontr}
       </li>
          
           
      });
    
      }


     
		// r


 //   song play code End






  

 
    

var today = new Date();
var songli: any = '';
const getreciept =(id:any)=>{
  const access_token = localStorage.getItem('access_token');
 
  axios.get(`${config.apiUrl}/orders/getReceipt/`+id,{headers: {
    'access_token':access_token}}).then(response => response.data)
  .then((data) => {
    const dateTime =data.details[0]['placed_on'];
     const parts = dateTime.split(/[- : T]/);
     console.log(parts);
   const wanted = `${parts[2]}/${parts[1]}/${parts[0]} ${parts[3]}:${parts[4]}`;
      
      $("#rname").text(data.details[0]['name'])
      $("#raddress").text(data.details[0]['address'])
      $("#rcity").text(data.details[0]['city'])
      $("#rcountry").text(data.details[0]['country'])
      $("#rcode").text(data.details[0]['postal'])
      // $("#rtrans").text(data.details[0]['trans'])
      $("#rdate").text(wanted)
      
  //console.log(data.details['trans'],"=======");

  if(data.details[0].song_id){
    songli = Object.keys(data.details[0].song_id).map(function(key: any,value:any) {
     

      $("#songsli").append( "<li><h3>"+data.details[0].song_id[key]['song_name'] +" "+"<span>$"+data.details[0].song_id[key]['price']+"</span></h3></li>")
      
  });
 
  }

 
   })
}

const updateplan = (id:any)=>{
  const access_token = localStorage.getItem('access_token');
  const headers = {
    headers: { 'access_token': access_token}
  }
   axios.put(`${config.apiUrl}/subscriptions/changeSubscription`, {
    plan_id: id,
     
   }, headers).then(function (response) {
      // console.log(response.data);
    if(response.data.status==false){
      alert(response.data.message);
    }else{
      alert(response.data.message);
      window.location.href = `${config.appurl}/purchase`; 
     }
  })
}


// 	var carttr: any = [];
// 	let pp:number = 0;
// 	  if(cartdata){
// 		carttr = Object.keys(cartdata).map(function(key: any,value:any) {
		 
			
// 			pp = pp + parseInt(cartdata[key]['song_id']['price']);
// 			console.log(pp);
		
// 		   return <li  key={key}><h4><img className="click_me" src={play}/>{cartdata[key]['song_id']['song_name']}</h4>
			
// 								</li>
// 		 });
	
// 	  }
//   var subgenreli: any = [];

//   if(userInfo){
//     subgenreli = Object.keys(userInfo.data.sub_genre).map(function(key: any,value:any) {
    
//        return  <li key={key}><button className="btn">{userInfo.data.sub_genre[key]['name']}</button></li>
       
   
      
//   });
   
//   }
var subgenreli: any = [];
if(orderinfo){
         
    subgenreli   =  <><li>
 <span> <label> Name:</label>{orderinfo[0].cart_id[0].user_id.name}</span>
  
</li>
<li>
 <span> <label> Email:</label>{orderinfo[0].cart_id[0].user_id.email}</span>
  
</li>
<li>
 <span> <label> Address:</label>{orderinfo[0].address}</span>
  
</li>
<li>
 <span> <label> City:</label>{orderinfo[0].city}</span>
 
</li>
<li>
 <span> <label> Postal Code:</label>{orderinfo[0].postal}</span>
 
</li>
</>
   
    


}
  var purchase: any = [];

//   if(userInfo){  
//     purchase = Object.keys(userInfo.Purchase).map(function(key: any,value:any) {
  
//       return   <tr  key={key}>
//       <td><img className="click_me" src={play} />{userInfo.Purchase[key]['song_id'][0]['song_name']}</td>
//       <td><Moment format="DD-MM-YYYY">
//       {userInfo.Purchase[key]['placed_on']}
//            </Moment></td>
    
//       <td><button className="btn view_rec"  onClick={() => {getreciept(userInfo.Purchase[key]['_id'])}}>VIEW RECEIPT</button></td>
//       </tr>
      
   
    
   
    
   
      
//   });
   
//   }
  
    return (
   
        <>
        <div id="page-wrapper">
        
               <div className="row">
               <div className="col-lg-12">
               <h3>Order Detail</h3>
               <div className="col-lg-12 orderdetail_h">
               <div className="col-md-6">
               <h2>Customer Detail</h2>
               </div>
               <div className="col-md-6">
               <h2 >Order Detail</h2>
               </div>
               </div>
               <div className="col-md-6">
              
               <ul>{subgenreli}</ul>
               </div>
         
              <div className="col-md-6">
                
              <ul>{carttr}
              <li>
 <span> <label> Total Paid :</label>{paidamount}</span>
 
</li>
              
              </ul></div>
                 
                </div>
            </div>
            <div className="col-md-8">
                <div className="accunt_btn text-center">
                <div className="col-md-2">
              
              </div>
                <div className="col-md-4">

                <a className="btn" id="back_btn" href="javascript: history.go(-1)">Back</a>
                </div>
                <div className="col-md-2">
              
              </div>
                </div>
                </div>
        </div>
      
        
        
        <div className="my_loader">
                  <div className="loading_img">
                 <div className="loader_txt"> <img src={require("../../images/loading_img.gif")}/>
                   <h3>Loading....</h3>
                  </div>
              </div>
              <div className="loader_overly"></div>
              </div>
        
        
        
        </>
        

 
    )
}

export default Profile;

