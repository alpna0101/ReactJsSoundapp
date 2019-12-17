import React, { useState,useContext } from 'react';
// import ReactDOM from 'react-dom';
// import { connect } from "react-redux";
// import store from '../store';
import { Field, reduxForm, SubmissionError } from 'redux-form'
// const  { DOM: { input, select, textarea } } = React

import { Container, Row, Col,Modal,Button } from 'react-bootstrap' 
import img1 from '../images/img1.png';
import editpng from '../images/edit.png';
import play from '../images/play.png';
import icon from '../images/icon.png';
import paypal from '../images/pay_pall.png';
import card_img from '../images/cards.png';
import card_img1 from '../images/card_img.png';
import button_paypall from '../images/button_paypall.png';
import axios from 'axios';
import $ from "jquery";
import {config} from '../config/config'
import  '../config/alltypes.d.ts'
import { AuthContext } from '../contexts/AuthContext';
import PaypalExpressBtn from 'react-paypal-express-checkout';
import SmartPaymentButtons, { PayPalSDKWrapper }  from 'react-smart-payment-buttons';
import { PayPalButton } from "react-paypal-button-v2";
interface fieldInterface {
    input: any;
    label: string;
    placeholder: string;
    type: string;
    id: string;
    meta: {
        touched: boolean;
        error: string;
        error1: string;
    };
}



const script = document.createElement("script");
//live
 script.src = "https://www.paypal.com/sdk/js?client-id=AUztIYzo5vynprQ8ZPM1f2G8YTSw-mmQN6pH1I-2kf3CGubvZyr1uuW_vGXzm3O00zDgcYMpWzhUMvX-&currency=USD";
//sandbox
// script.src = "https://www.paypal.com/sdk/js?client-id=AQJE9Ac8_LCNT6_Q04y1lFQbYgoGfxjOApOc4j5tunhSjcawzxbB4nqw8znd6ZrEr3Dj2FAJEV_HttAm&currency=USD";
script.async = true;
  
document.body.appendChild(script);

const access_token = localStorage.getItem('access_token');
const credit_apply = localStorage.getItem('credit_apply');


const renderField = ({ input, label,placeholder, type, meta: { touched, error,error1 } }: fieldInterface) => (
	<div className="form-group">
		<label>{label}</label>
		
		  <input {...input} placeholder={placeholder} type={type} className="form-control" />
		  {touched && error && <span>{error}</span>}
		
	  </div>
	)

	let config1 = {
		headers: {
			'access_token': access_token,
		
		}
	  }
	const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

    const submit = (values: any,amount:any,credit_apply:any) => {
	   values.amount = amount
	 
	   var today = new Date();
	 
	   values.create_time = today
	 
      return sleep(1000).then(() => {
         if (validateForm(values)) {
			axios.post(`${config.apiUrl}/orders/paypal`, {
				given_name: values.first_name,
					surname: values.last_name,
					address_line_1: values.address_line_1,
					address_line_2 :values.address_line_2,
					admin_area_1: values.state,
					admin_area_2:values.city,
					postal_code:values.postal,
				  	country_code:values.country,
				    create_time:values.create_time,
					email_address:values.email_address,
				    amount:amount,
					creditVerify:credit_apply,
				
			},config1).then(function (response) {
			  if(response.data.status==false){
				alert(response.data.message);
			  }else{
				localStorage.setItem('credit_apply',"false");
				alert(response.data.message);
				window.location.href = `${config.appurl}`; 
				
			   }
			})
          }else{
        
          }
    
       
      })
	}
	

	const validateForm= (data:any) => {
       
		let fields = data;
		let errors :any = [];
		let formIsValid = true;
	  
	   if (!fields["first_name"]) {
		  formIsValid = false;
		  throw new SubmissionError({ email: 'Please enter Name.', _error: 'Order failed!' })
		  // errors["email"] = "*Please enter your email-ID.";
		}
		if (typeof fields["name"] !== "undefined") {
			if (!fields["name"].match(/^[a-zA-Z ]*$/)) {
			  formIsValid = false;
			throw new SubmissionError({ name: 'Please enter alphabet characters only.', _error: 'Register failed!' })
			}
		
		  }
		
		if (!fields["address_line_1"]) {
		  formIsValid = false;
		  // errors["password"] = "*Please enter your password.";
		  throw new SubmissionError({ address: 'Please enter your address.', _error: 'Register failed!' })
		}
	  
	  	
		if (!fields["city"]) {
			formIsValid = false;
			// errors["password"] = "*Please enter your password.";
			throw new SubmissionError({ city: 'Please enter your city.', _error: 'Register failed!' })
		  }
		  if (!fields["postal"]) {
			formIsValid = false;
			// errors["password"] = "*Please enter your password.";
			throw new SubmissionError({ postal: 'Please enter your postal.', _error: 'Register failed!' })
		  }
		  if (!fields["country"]) {
			formIsValid = false;
			// errors["password"] = "*Please enter your password.";
			throw new SubmissionError({ country: 'Please enter your country.', _error: 'Register failed!' })
		  }
		  if (!fields["card"]) {
			formIsValid = false;
			// errors["password"] = "*Please enter your password.";
			throw new SubmissionError({ card: 'Please enter your card.', _error: 'Register failed!' })
		  }
		return formIsValid;
	  
	  
	  }

const Billing = (props:any) => { 
	const [cartdata, setcart] = useState([]);
	const [cartcount, setcartcount] = useState(0);
	const [pricedata, setprice] = useState([]);
	const { error, handleSubmit, pristine, reset, submitting } = props
	const userInfo: any = useContext(AuthContext);
	const access_token = localStorage.getItem('access_token');
	// const [credit, setcredit] = useState(0);
	// const [discount, setdiscount] = useState(0);
	let config1 = {
		headers: {
			'access_token':access_token
		}
	  }


	  const paypalOptions = {
	
		intent: 'capture'
	  }
	 
	  const buttonStyles = {
		layout: 'vertical',
		shape: 'rect',
	  }
	React.useEffect(() => {
		$(".playerClose").trigger("click");
		$(".my_loader").css('display','block');
		$('body').addClass('modal-open')
		axios.get(`${config.apiUrl}/carts/getFromCart`,config1).then(response => response.data)
	.then((data) => {
		setTimeout(function(){ 
	
		$(".my_loader").css('display','none');
		$('body').removeClass('modal-open')
	},1500)
	setcart(data.cart);
	setcartcount(data.cart.length)
		 })

	
	  }, []);
	
	 

	  var carttr: any = [];
	  let amount: number = 0
	  let myamount: number = 0
	  let song_price: number = 0

	  let discount: number = 0
	  let credit: number = 0
	  let usedcredit: number = 0

	  var songprice: number = 0;
	  if(userInfo.data){
	// 	if(credit_apply=="false"){
	//    if(cartdata.length==2 && userInfo.data.plan_id.amount==0){
	// 	  songprice = 149
	//    }
	// 	if(cartdata.length==5 && userInfo.data.plan_id.amount==0){
	// 	  songprice = 249
	//    }
	// }


	// _______________________________
	if(userInfo.data.credit_score==0 && userInfo.data.plan_id.amount==0){
		 	
		if(cartdata.length>1 ){
	   
			var length  = Math.round(cartdata.length);
		   
			
		   if(length<5){
			   var z = length % 2;
			   if(z==0){
				z = length /2 ;
			   }
			   var left =length-(z*2);  
			   songprice = (z*149)+(left*79);
	   
	   
		   }else{
			   var remainder = length % 5;
		   
			   var t;
			   if(remainder==0){
				   t = length /5 ;
				  }else{
				   t = (length-remainder) /5 ;
				  }
			   
			   var newlength =  remainder;
			   if(newlength>1){
				   var remaind = newlength % 2;
			   
				   var z = 0
				   if(remaind==0){
					   z = newlength /2 ;
					  }else{
					   z  = (newlength-remaind) /2 ;
					  }
					 
					  var left = newlength-(z*2);    
					
			   
			   }else{
				   var z= 0;
			   
				   var left = newlength;
			   }
			   
			   songprice = (z*149)+ (t*249)+(left*79);
	   
		   }
		   
		}
	   
		 }

	// _______________________________
	  }

		
		 let addonprice:any = 0;
		if(cartdata){
			carttr = Object.keys(cartdata).map(function(key: any,value:any) {
				let addontr = [];
				addontr = Object.keys(cartdata[key]['addon_id']).map(function(key1: any,value1:any) {
					addonprice =  addonprice + parseInt(cartdata[key]['addon_id'][key1]['price']);
					return <p>{cartdata[key]['addon_id'][key1]['addon_name']}<span>$ {cartdata[key]['addon_id'][key1]['price']}</span></p>
				})
				amount = amount + parseFloat(cartdata[key]['song_id']['price']);
				song_price = parseFloat(cartdata[key]['song_id']['price']);
				amount = parseFloat((amount).toFixed(2));
			   return <li key={key}>
			   <h3>{cartdata[key]['song_id']['song_name']}<span>$ {cartdata[key]['song_id']['price']}</span></h3>
			  {addontr}
		   </li>
			  
			   
		   
			  
		  });
		if(addonprice>0){
			songprice=0;
		}
		  }
		
	  if(credit_apply=="true" && userInfo.data){
		credit = userInfo.data.credit_score;
		  localStorage.setItem('credit_apply', "true");
		  const credit_apply = localStorage.getItem('credit_apply');
		  if(userInfo.data.credit_score==1){
			discount = Math.round(song_price)
			usedcredit = 1;
		  }else if(userInfo.data.credit_score>=cartdata.length){
  
			discount =	Math.round(cartdata.length*song_price)
			usedcredit = cartdata.length;
		  }else if(userInfo.data.credit_score<cartdata.length){
			discount = Math.round(userInfo.data.credit_score*song_price)
			usedcredit = userInfo.data.credit_score;
		  }else{
		
		  }
		  }
		  if(songprice==0){
		
			  myamount = Math.round(amount-discount)
		
		  
		}else{
		  myamount = songprice  
		}

	


	  const handlechange=(e:any)=>{
       if(e.target.checked==true){
		 $(".paypal_btn").removeClass("disabled");
		 $("#place_order").removeAttr("disabled")
	    }else{
			$(".paypal_btn").addClass("disabled");
			$("#place_order").attr("disabled","disabled")
		}
	}
	  var minOffset = 0, maxOffset = 30; // Change to whatever you want
	  var thisYear = (new Date()).getFullYear();
	  var select = $('#year');
	  
	  for (var i = minOffset; i <= maxOffset; i++) {
		  var year = thisYear + i;
		  $('<option>', {value: year, text: year}).appendTo(select);
	  }
	 
	  let env = 'sandbox'; // you can set here to 'production' for production
	  let currency = 'USD'; // or you can set this value from your props or state
	  let total = 1; 
	//   let 	client= 'ATk2gOsegLotCU5bcE1rGitvxisPEMa4LFIX5L0_js3KcTVcZiR5NADonlXU7rg6bbrk6prfeSdtr1ez';
	//   const client = {
	// 	 sandbox:    'AQJE9Ac8_LCNT6_Q04y1lFQbYgoGfxjOApOc4j5tunhSjcawzxbB4nqw8znd6ZrEr3Dj2FAJEV_HttAm',
	
	// }

	//Live
	const client = {
		live:    'AUztIYzo5vynprQ8ZPM1f2G8YTSw-mmQN6pH1I-2kf3CGubvZyr1uuW_vGXzm3O00zDgcYMpWzhUMvX-',
	    
   }
	  const onSuccess = (payment:any) => {
		// Congratulation, it came here means everything's fine!
				console.log("The payment was succeeded!", payment);
				// You can bind the "payment" object's value to your state or props or whatever here, please see below for sample returned data
	}

	const onCancel = (data:any) => {
		// User pressed "cancel" or close Paypal's popup!
		console.log('The payment was cancelled!', data);
		// You can bind the "data" object's value to your state or props or whatever here, please see below for sample returned data
	}

	const onError = (err:any) => {
		// The main Paypal's script cannot be loaded or somethings block the loading of that script!
		console.log("Error!", err);
		// Because the Paypal's main script is loaded asynchronously from "https://www.paypalobjects.com/api/checkout.js"
		// => sometimes it may take about 0.5 second for everything to get set, or for the button to appear
	}
	$(document).ready(function(){
	$("#place_order").click(function(){
		if($('#agree').is(":checked")){
			$("#licenseError").hide();
			$("#billing_info").addClass("in");
			$("body").addClass("modal-open");
		$("#billing_info").css("display","block");
		} else {
			$("#licenseError").show();
		}
		
	})
	$("#close_billing").click(function(){
		$("#billing_info").removeClass("in");
		$("body").removeClass("modal-open");
		$("#billing_info").css("display","none");
	})

})
$(".summry_cart").click(function() {
	if($('#agree').is(":checked")){
		$("#licenseError").hide();
	} else {
		$("#licenseError").show();
	}
})

$(".ok_btn").click(function(){
window.location.href = `${config.appurl}`; 
})
$(".success_btns").click(function(){
	$("#success_model").css("display","none")
	$("#success_model").removeClass("in")
})
	const place_order =()=>{

		var fname = $("#first_name").val();
		var lname = $("#last_name").val();
		var email = $("#email").val();
		
		var address = $("#address").val();
		var city = $("#city").val();
		var state = $("#state").val();
		var postal_code = $("#postal_code").val();
		var country = $("#country").val();
		var valid = true;
		if(!fname){
		alert("Please Enter your first name");
		valid = false; 
		}else if(!lname){
		alert("Please Enter your last name");
		valid = false; 
	}else if(!email){
		alert("Please Enter your email ");
		valid = false; 
		}else if(!address){
			alert("Please Enter your last name");
			valid = false; 
			}
			else if(!city){
				alert("Please Enter your city name");
				valid = false; 
				}else if(!state){
					alert("Please Enter your state name");
					valid = false; 
					}
					else if(!postal_code){
						alert("Please Enter your postal_code ");
						valid = false; 
						}
						else if(!country){
							alert("Please Enter your country name");
							valid = false; 
							}else{
								valid=true
							}
				
			if(valid==true){
				var today = new Date();
				
				console.log(today,"##############################");
				axios.post(`${config.apiUrl}/orders/paypal`, {
					given_name: fname,
						surname: lname,
						address_line_1:address,
						// address_line_2:details.purchase_units[0]['shipping'].address.address_line_2,
						admin_area_1:state,
						admin_area_2:city,
						postal_code:postal_code,
						country_code:country,
						create_time:today,
						email_address:email,
				        amount:myamount,
				       creditVerify:credit_apply,
					   usedcredit:usedcredit,
				},config1).then(function (response) {
					console.log(response.data,"##############################");
				  if(response.data.status==false){
					alert(response.data.message);
				  }else{
					localStorage.setItem('credit_apply',"false");
					alert(response.data.message);
					window.location.href = `${config.appurl}`; 
					
				   }
				})
			}
			}
		
    return (
        <>
    
<section className="cart_sctn billing_detail billing-new">
	<div className="container-fluid">
		<div className="row">
		
	
   <div className="row">
		
			<div className="col-md-4 col-md-offset-4">
				<div className="summry_cart">
					<h4>Cart Summary</h4>
					<h6>{cartdata.length} items</h6>
					<ul>
					{carttr}


					{songprice==0 ? (
							<>
								<li>
								<h5>Total Add-On<span>$ {addonprice}</span></h5></li>
								<li>
							<h5>Total<span>$ {amount+addonprice}</span></h5>
							
							{ userInfo.data && credit_apply=="true" ? (
								
							<h3>Discount<span>-$ {discount}</span></h3>
							):(
                          <h3></h3>
							)}
						</li>
						<li>
						{ userInfo.data? (
							<h5>Grand Total<span>${(myamount+addonprice)}</span></h5>
							):(
								<h3></h3>
								  )}
						</li>
						</>
								
							):(
								<>
									<li>
								<h5>Total Add-On<span>$ {addonprice}</span></h5></li>
								<li>
								<h5>Total<span>${amount+addonprice}</span></h5>
								{userInfo.data ? (
									
								<h3>Discount<span id="my_credit">-$ {(amount-songprice).toFixed(2)}</span></h3>
								):(
							   <h3>Credit<span>-$ 0</span></h3>
								)}
							</li>
								<li> <h5>Grand Total<span>$ {songprice+addonprice}</span></h5></li>
								</>
							)}
					
					</ul>
					<p className="chckbx">
						<label className="container_box">I agree to <a href = "http://18.188.75.114:3000/document/liscense.pdf" target = "_blank"><span>license agreement</span></a>
						  <input type="checkbox"  onChange={handlechange} id="agree"/>
						  <span className="checkmark"></span>
						</label>
						<p id="licenseError" style={{color: 'red', display: 'none'}}>You must read and agree to the license agreement.</p>
					</p>
					{myamount!==0 ? (
					<div className="paypal_btn disabled" >
					 <PayPalButton
                     

createOrder={(data:any, actions:any) => {
	return actions.order.create({
	  purchase_units: [{
		amount: {
		  currency_code: "USD",
		  value: myamount+addonprice
		}
	  }]
	});
  }}
  onApprove={(data:any, actions:any) => {
	// Capture the funds from the transaction
	let discountamount = 0;
	if(credit_apply=="true"){
		discountamount = 	userInfo.data.credit_score
	}
	$(".my_loader").css('display','block');
	$('body').addClass('modal-open')
	return actions.order.capture().then(function(details:any) {
	  // Show a success message to your buyer
	  let addonStatus:boolean = false;
             if(addonprice>0){
				addonStatus = true
			 }
			 
	  axios.post(`${config.apiUrl}/orders/paypal`, {
		given_name: details.payer.name.given_name,
			surname: details.payer.name.surname,
			address_line_1:details.purchase_units[0]['shipping'].address.address_line_1,
			address_line_2:details.purchase_units[0]['shipping'].address.address_line_2,
			admin_area_1:details.purchase_units[0]['shipping'].address.admin_area_1,
			admin_area_2:details.purchase_units[0]['shipping'].address.admin_area_2,
			postal_code:details.purchase_units[0]['shipping'].address.postal_code,
			country_code:details.purchase_units[0]['shipping'].address.country_code,
			create_time:data.create_time,
			email_address:details.payer.email_address,
			id:data.id,
			amount:details.purchase_units[0].amount.value,
			creditVerify:credit_apply,
			usedcredit:usedcredit,
			addonStatus:addonStatus

		
	},config1).then(function (response) {
	  if(response.data.status==false){
		alert(response.data.message);
		$(".my_loader").css('display','none');
		$('body').removeClass('modal-open')
	  }else{
		$(".my_loader").css('display','none');
		$('body').removeClass('modal-open')
		localStorage.setItem('credit_apply',"false");
		$("#success_message").html(response.data.message)
				$("#success_model").css("display","block")
				$("#success_model").addClass("in")
		
		
		
	   }
	})




    
	});
  }}

      
        options={{
			client: {client}
        }}
      /> 
		</div>

):(
	<></>
	 )}
	 {myamount==0 ? (
		 
		 	<button className="btn" id="place_order" >Continue</button>
		 ):(
		<></>
				 )}

				</div>
			</div> 
			<div className="col-lg-2 col-md-4"> 
		 </div>
		 </div>
		
		</div>
	</div>
</section>


	<div className="modal fade plans_popup" id="billing_info" role="dialog" >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
        <div className="modal-header">
        <button className="button close"  id="close_billing" data-dismiss="modal" ><a href="/profile"><img src={require("../images/close.png")}></img></a></button>
        </div>
        <div className="modal-body">
        <div className="pricng">
        <h4 className="modal-title text-center">Billing Info</h4>
        <div className="row">
	
			
			{/* <div className="billng_info1"> */}
			<div className="col-lg-2 col-md-3">
			</div>
				<div className="col-lg-8 col-md-6">
					
					
						<div className="form-group">
							<label>First Name</label>
							<input type="text"  placeholder="Enter First Name" id="first_name" className="form-control"/>
						</div>

						<div className="form-group">
							<label>Last Name</label>
							<input type="text"  placeholder="Enter Last Name" id="last_name" className="form-control"/>
						</div>
						<div className="form-group">
							<label>Email</label>
							<input type="text"  placeholder="Enter Email" id="email" className="form-control"/>
						</div>
						<div className="form-group">
							<label>Address</label>
							<input type="text" placeholder="Enter Address" id="address" className="form-control"/>
						</div>
						<div className="form-group">
							<label>City</label>
							<input type="text" placeholder="Enter City" id="city" className="form-control"/>
						</div>
						<div className="form-group">
							<label>State</label>
							<input type="text" placeholder="Enter State" id="state" className="form-control"/>
						</div>
						<div className="form-group">
							<label>Zip or Postal code</label>
							<input type="email" placeholder="Enter Zip or Postal code" id="postal_code" className="form-control"/>
						</div>
						<div className="form-group">
							<label>Country</label>
							<input type="text" placeholder="Enter Country" id="country" className="form-control"/>
						</div>
						<button className="btn success_btns" id="final_order" onClick={place_order} >Place Order</button>
				
				</div>
				
			{/* </div> */}
			
		

        </div>
        </div>
        </div>
        </div>
      </div>
</div>

<div className="modal fade plans_popup signup_completed" id="success_model" role="dialog" >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
        <div className="modal-header">
        {/* <button className="button close" onClick={() => {openModal(false)}} data-dismiss="modal" ><img src={require("../images/close.png")}></img></button> */}
        </div>
        <div className="modal-body">
      
        <h4 className="modal-title text-center">Success</h4>
        <div className="row">
        <div className="col-md-12 col-sm-6 text-center">
         <h3 id="success_message"></h3>
         <button  className="btn success_btns ok_btn" >Ok</button> 
         </div>
       
        </div>
    
        </div>
        </div>
      </div>
</div>
<div className="my_loader">
          <div className="loading_img">
         <div className="loader_txt"> <img src={require("../images/loading_img.gif")}/>
           <h3>Loading....</h3>
          </div>
      </div>
      <div className="loader_overly"></div>
      </div>
        </>


    )


}

export default reduxForm({
    form: 'billingForm' // a unique identifier for this form
  })(Billing)
