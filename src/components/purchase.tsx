import React, {useContext,useState } from 'react';
// import { connect } from "react-redux";
// import store from '../store';
import { Field, reduxForm, SubmissionError } from 'redux-form'
// import { Container, Row, Col,Modal,Button } from 'react-bootstrap' 
import img1 from '../images/img1.png';
import editpng from '../images/edit.png';
import play from '../images/play.png';
import icon from '../images/icon.png';
import paypal from '../images/pay_pall.png';
import card_img from '../images/cards.png';
import card_img1 from '../images/card_img.png';
import button_paypall from '../images/button_paypall.png';
import { AuthContext } from '../contexts/AuthContext';
import  '../config/alltypes.d.ts'
import axios from 'axios';
import $ from "jquery";
import {config} from '../config/config'
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
const renderField = ({ input, label,placeholder, type, meta: { touched, error,error1 } }: fieldInterface) => (
	<div className="form-group">
		<label>{label}</label>
		
		  <input {...input} placeholder={placeholder} type={type} className="form-control" />
		  {touched && error && <span>{error}</span>}
		
	  </div>
	)
	const script = document.createElement("script");

script.src = "https://www.paypal.com/sdk/js?client-id=ATk2gOsegLotCU5bcE1rGitvxisPEMa4LFIX5L0_js3KcTVcZiR5NADonlXU7rg6bbrk6prfeSdtr1ez&vault=true";
script.async = true;
 
// document.body.appendChild(script);
let env = 'sandbox'; // you can set here to 'production' for production
let currency = 'USD'; // or you can set this value from your props or state
let total = 1; 
//   let 	client= 'ATk2gOsegLotCU5bcE1rGitvxisPEMa4LFIX5L0_js3KcTVcZiR5NADonlXU7rg6bbrk6prfeSdtr1ez';
const client = {
  sandbox:    'ATk2gOsegLotCU5bcE1rGitvxisPEMa4LFIX5L0_js3KcTVcZiR5NADonlXU7rg6bbrk6prfeSdtr1ez',
  
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
const Purchase = () => { 
	
  const [username, setUsername] = useState();
  const [Month, setMonth] = useState();
  const [Year, setYear] = useState();
  const [Cvv, setCvv] = useState();
  const [Card, setCard] = useState();
//   const [showsecond, setshowsecond] = useState(false);

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);
//   const handleClose1 = () => setshowsecond(false);
//   const handleShow1 = () => setshowsecond(true);
const userInfo: any = useContext(AuthContext);
$(document).ready(function(){
  // if(!userInfo.data){
  //   window.location.href = `${config.appurl}/profile`; 
  // }
	// $(".my_loader").css('display','block');
	setTimeout(function(){ 
		$(".my_loader").css('display','none');
	},5500)
})
const access_token = localStorage.getItem('access_token');
let config1 = {
  headers: {
    'access_token': access_token,
  
  }
  }
  
  const changesubscribe=()=>{
    var plan_id  =  $("#myplan_id").val()
    $(".my_loader").css('display','block');
    axios.put(`${config.apiUrl}/subscriptions/changenewSubscription`, {
      new_plan: plan_id,
      // name: username,
      // card_number: Card,
      // cvc: Cvv,
      // exp_month: Month,
      // exp_year: Year,
    
       },config1).then(function (response) {
      
      if(response.data.status==false){
        $(".my_loader").css('display','none');
        alert(response.data.message);
      }else{
       
        alert(response.data.message);
        setTimeout(function(){ 
          $(".my_loader").css('display','none');
        },100)
        window.location.href = `${config.appurl}/profile`; 
       }
      })
  }
const subscribe = (username:any,Month:any,Year:any,Cvv:any,Card:any)=>{
  var plan_id  =  $("#myplan_id").val()
 let values:any ={}
 values.plan_id= plan_id;
 values.name= username;
 values.card_number= Card;
 values.cvc= Cvv;
 values.exp_month= Month;
 values.exp_year= Year;

  if (validateForm(values)) {
  $(".my_loader").css('display','block');


	axios.post(`${config.apiUrl}/subscriptions/add`, {
		plan_id: plan_id,
		name: username,
		card_number: Card,
		cvc: Cvv,
		exp_month: Month,
		exp_year: Year,
	
	   },config1).then(function (response) {
    
		if(response.data.status==false){
      alert(response.data.message);
      $(".my_loader").css('display','none');

		}else{
   
      alert(response.data.message);
      setTimeout(function(){ 
        $(".my_loader").css('display','none');
      },100)
      window.location.href = `${config.appurl}/profile`; 
		 }
	  })
  }
}
const validateForm= (data:any) => {
       
  let fields = data;
  let errors :any = [];
  let formIsValid = true;

 if (!fields["card_number"]) {
    formIsValid = false;
    $("#card").html("Please enter your card number")
  }

  if (typeof fields["card_number"] !== "undefined") {
    //regular expression for email validation
    var pattern = new RegExp(/^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/i);
    if (!pattern.test(fields["card_number"])) {
      formIsValid = false;
      $("#card").html("Please enter valid card")
      // throw new SubmissionError({ email: 'Please enter valid email-ID.', _error: 'Register failed!' })
    }
  }
  
 if (!fields["name"]) {
    formIsValid = false;
    $("#username").html("Please enter your name")
  }
  if (!fields["exp_month"]) {
    formIsValid = false;
    $("#month").html("Please select month")
  }
  if (!fields["exp_year"]) {
    formIsValid = false;
    $("#year").html("Please select year")
  }
  if (!fields["cvc"]) {
    formIsValid = false;
    $("#cvv").html("Please enter your cvv number")
  }
 


  return formIsValid;


}
const handleChange=(e:any)=>{
  setUsername(e.target.value)
}
const handleChangeMonth=(e:any)=>{
  setMonth(e.target.value)
}
const handleChangeYear=(e:any)=>{
  setYear(e.target.value)
}
const handleChangeCvv=(e:any)=>{
  setCvv(e.target.value)
}
const handleChangeCard=(e:any)=>{
  setCard(e.target.value)
}
    return (
        <>
    
<section className="cart_sctn">
	<div className="container-fluid">
		<div className="row">
	
		<div className="col-md-4 col-md-offset-4">
			
				<div className="summry_cart" style={{minHeight:"575px"}}>
			
					<h4>Plan Detail</h4>
					{userInfo.data ? (
            <>
							<form>
							<ul>
								<li><input type="hidden" id="myplan_id" value={userInfo.data.newplan_id._id} />
                
							<h3>Plan:<span>{userInfo.data.newplan_id.plan_name}</span></h3>	</li>
							<li>	<h3>Amount:<span>${userInfo.data.newplan_id.amount}</span></h3>	</li>
              	</ul>
              </form>
              {userInfo.data.plan_id.amount==0 ? (
        
					<div className="pay_optn">
						
					
							  <div className="panel-group" id="accordion">
								<div className="panel panel-default">
							
								  <div id="collapseOne" className="panel-collapse collapse in">
									<div className="panel-body">
										<div className="crd_etl">
                    <div className="card_input">
												<label>Card Holder Name</label>
												
                      <input type="text" placeholder="Enter Card Holder Name" onBlur={handleChange} className="form-control" />
											<span className="error" id="username"></span>
                      </div>
											<div className="card_input">
												<label>Card Number:</label>
												<input type="" maxLength={20} placeholder="Enter Card Number" onBlur={handleChangeCard} className="form-control" required />
										     <span className="error" id="card"></span>
                    	</div>
											<div className="exp_sctn">
												<div className="inner_exprtn">
													<label>Card Expiration Date:</label>
													<select className="form-control" onChange={handleChangeMonth}>
                           <option>Month</option>
														<option value="01">January</option>
														<option value="02">Feberuary</option>
														<option value="03">March</option>
														<option value="04">April</option>
														<option value="05">May</option>
														<option value="06">June</option>
														<option value="07">July</option>
														<option value="08">August</option>
														<option value="09">September</option>
														<option value="10">October</option>
														<option value="11">November</option>
														<option value="12">December</option>
													</select>
                    
													<select className="form-control" onChange={handleChangeYear}>
														<option>Year</option>
														<option value="2019">2019</option>
														<option value="2020">2020</option>
														<option value="2021">2021</option>
														<option value="2022">2022</option>
														<option value="2023">2023</option>
														<option value="2024">2024</option>
														<option value="2025">2025</option>
														<option value="2026">2026</option>
														<option value="2027">2027</option>
														<option value="2028">2028</option>
														<option value="2029">2030</option>
													</select>
                          <span className="error" id="month"></span>
                        <span style={{marginLeft: "71px"}} className="error" id="year"></span>
												</div>
                       
												<div className="cvv_no">
													<label>CVV</label>
													<input type="" placeholder="Cvv" maxLength={3} className="form-control" onBlur={handleChangeCvv} />
                          <span className="error" id="cvv"></span>
                        </div>
											</div>
									
                      <button  className="btn btn_submt btn_rating" onClick={() => {subscribe(username,Month,Year,Cvv,Card)}}>Subscribe</button>
										</div>
									</div>
								  </div>
								</div>
						
							
								
								
							  </div>
							 
							  
				
					</div>
          	):(  <button  className="btn btn_submt btn_rating" onClick={changesubscribe}>Update Plan</button>)}
          </>
						):(<ul>
							<li>
              <li><input type="hidden" id="myplan_id" value="0"/></li>
						<h3>No Plan<span>$0</span></h3>	</li>
            </ul>)}
					
					
          
                 
					
					{/* <a className="btn">Subscribe Now</a> */}
			
				</div>
			</div>
		</div>
	</div>


</section>
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
         <button  className="btn success_btns" >Ok</button> 
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
    form: 'loginForm' // a unique identifier for this form
  })(Purchase)