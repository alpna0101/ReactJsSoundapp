import React, { useState,useContext, useEffect,useCallback } from 'react';
// import { connect } from "react-redux";
// import store from '../store';

import profl_bg from '../images/upload_img.png';
import account_logo from '../images/account_logo.png';
import play from '../images/play.png';
import { AuthContext } from '../contexts/AuthContext';
import {MultiselectProps, Multiselect} from "react-bootstrap-multiselect-ts";
import Select, { components } from "react-select";

import $ from "jquery";

import { Field, reduxForm, SubmissionError } from 'redux-form'
import {config} from '../config/config'
import axios from 'axios';
import Cropper from 'react-easy-crop'
import getCroppedImg from './cropImage'



interface fieldInterface {
    input: any;
    label: string;
    type: string;
    meta: {
        touched: boolean;
        error: string;
    };
}

	   const renderField = ({ input, label, type, meta: { touched, error } }: fieldInterface) => (
		<div className="form-group">
			<label>{label}</label>
			
			  <input {...input} placeholder={label} type={type} className="form-control" />
			  {touched && error && <span>{error}</span>}
			
		  </div>
		)
	   
const EditProfile = (props: any,touched:boolean) => { 
	const { error, handleSubmit, pristine, reset, submitting } = props
  const [show, setShow] = useState(false);
  const [showsecond, setshowsecond] = useState(false);
  const [selectedval, setselectedval] = useState([]);
  const userInfo: any = useContext(AuthContext);
  const [genres, setgenres] = useState([]);
  const [style, setstyle] = useState({display:'none'});
  const [email, setemail] = useState([]);
  const [names, setnames] = useState('');
  const [artist_name, setartist_name] = useState('');
  const [genre_id, setgenre_id] = useState('');
  const [profile, setprofile] = useState();
 
  const [subgenres, setsubgenres] = useState([]);
  const [subgenres_id, setsubgenres_id] = useState([]);
  const [subgenre_id, setsubgenre_id] = useState();
  const [genre, setgenre] = useState({});
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClose1 = () => setshowsecond(false);
  const handleShow1 = () => setshowsecond(true);
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [rotation, setRotation] = useState(0)
  const [croppedImage, setCroppedImage] = useState(null)
  const [croppedFor, setCroppedFor] = useState()
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
	setCroppedAreaPixels(croppedAreaPixels)
  }, [])
 
  const showCroppedImage = useCallback(async () => {
	try {
	  const croppedImage = await getCroppedImg(
		croppedFor,
		croppedAreaPixels,
		rotation
	  )
	  console.log('donee', { croppedImage })
	  setCroppedImage(croppedImage)
	   $('#imagePreview3').css('background-image', 'url('+croppedImage +')');
	//   $('#imagePreview').css('background-image', 'url('+croppedImage +')');
	  $('#cropImg').css('display', 'none');
	  $('#cropImg').removeClass('in');
	} catch (e) {
	  console.error(e)
	}
  }, [croppedAreaPixels, rotation])





  const renderField = ({ input, label, type, meta: { touched, error } }: fieldInterface) => (
	<div className="form-group">
		<label>{label}</label>
		
		  <input {...input} placeholder={label} type={type} className="form-control" />
		  {touched && error && <span>{error}</span>}
		
	  </div>
	)
	


	$(".close_pop_crop").click(function(){
		setCroppedFor('');
		$("#cropImg").removeClass('in')
		//   $(".modal-backdrop.fade.show").css("z-index", "9999");
		  $("#cropImg").css("display","none");
	
		$(".modal-backdrop").css("display","none");
		
	   });


	const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

	const submit = (profile:any,croppedImage:any,email:any,genre_id:any,subgenre_id:any, e: any,names:any,artist_name:any) => {
	 const values: any = {};
	e.preventDefault();
	 
	  values.genre_id = genre_id
	  values.email = email
	  values.subgenre_id = subgenre_id
	  values.name = names
	  values.artist_name = artist_name
	  
	   
	  return sleep(1000).then(() => {
	  
		if (validateForm(values)) {
		var formData = new FormData();
	     formData.append("newEmail", values.email);
		if(names)
		formData.append("name", values.name);
		if(artist_name)
		formData.append("artist_name", values.artist_name);
		
		if(genre_id)
		formData.append("genre", values.genre_id);
	   
	  if(croppedImage)
		formData.append("profile_pic", croppedImage);
	
		if(subgenre_id)
		formData.append("sub_genre", subgenre_id);
	
		const access_token = localStorage.getItem('access_token');
	
		const headers = {
		  headers: { 'access_token': access_token }
		}
		
	   
		 axios.put(`${config.apiUrl}/users/editProfiles`, formData,headers)
		  .then(response => {
			if(response.data.status==false){
				alert(response.data.message);
				
			}if(response.data.status==true){
				$("#success_message").html(response.data.message)
				$("#success_model").css("display","block")
				$("#success_model").addClass("in")
				
			  }
			}).then(json => {
			  }).catch(error => {
			  console.log(error);
			  alert(`An Error Occured! ${error}`);
			});
		
		 }
	})
	}
	$(".success_btns").click(function(){
		$("#success_model").css("display","none")
		$("#success_model").removeClass("in")
		window.location.href = `${config.appurl}/profile`; 
	})
	const validateForm= (data:any) => {
			
			 let fields = data;
			 let errors :any = [];
			 let formIsValid = true;
		 
	
			//  if (!fields["subgenre_id"]) {
			// 	formIsValid = false;
			// 	throw new SubmissionError({ subgenre_id: 'Please select your subgenre.', _error: 'Updation failed!' })
				
			//   }
			if (profile) {
				// openModal(false)
				console.log(profile.name);
				var get_ext = profile.name.split('.');
				var exts = ['png','jpg','jpeg','gif'];
				get_ext = get_ext.reverse();
				if ( $.inArray ( get_ext[0].toLowerCase(), exts ) > -1 ){
				  // alert( 'Allowed extension!' );
				} else {
				  formIsValid = false;
				  throw new SubmissionError({ img_file: 'Please select a valid image file',_error: 'Please select a valid image file' })
				}
			  
			  
				
			   }
			   if (!fields["name"]) {
				formIsValid = false;
				$("#name_error").html("Name field required")
				throw new SubmissionError({ name: 'Name field required', name_error: 'Name field required' })
			   }

			   if (typeof fields["name"] !== "undefined") {
  
				if (!fields["name"].match(/^[a-zA-Z ]*$/)) {
					$("#name_error").html("Please enter alphabet characters only")
				  formIsValid = false;
				throw new SubmissionError({ name: 'Please enter alphabet characters only.', _error: 'Register failed!' })
				}else if (fields["name"].length > 16) {
					$("#name_error").html("Name must be 15 characters or less")
				  throw new SubmissionError({ name: 'Name must be 15 characters or less.', _error: 'Register failed!' })
				  
				}else if (fields["name"].length < 3 ) {
					$("#name_error").html("Name must be atleast 3 characters")
				  throw new SubmissionError({ name: 'Name must be atleast 3 characters.', _error: 'Register failed!' })
				  
				}else if (fields["name"].trim()=="" ) {
					$("#name_error").html("Please enter a valid input")
				  throw new SubmissionError({ name: 'Please enter a valid input.', _error: 'Register failed!' })
				  
				}
			 } 
			 if (!fields["artist_name"]) {
				formIsValid = false;
				$("#Aname_error").html("Artist Name field required")
				// openModal(false)
				throw new SubmissionError({ name: 'Name field required', name_error: 'Name field required' })
			   }

			 if (typeof fields["artist_name"] !== "undefined") {
		  
			  if (!fields["artist_name"].match(/^[a-zA-Z ]*$/)) {
				formIsValid = false;
				$("#Aname_error").html("Please enter alphabet characters only")
			  throw new SubmissionError({ artist_name: 'Please enter alphabet characters only.', _error: 'Register failed!' })
			  }else if (fields["artist_name"].length > 16) {
				$("#Aname_error").html("Artist Name must be 15 characters or less")
				throw new SubmissionError({ artist_name: 'Artist Name must be 15 characters or less.', _error: 'Register failed!' })
				
			  }else if (fields["artist_name"].length < 3 ) {
				$("#Aname_error").html("Artist Name must be atleast 3 characters")
				throw new SubmissionError({ name: 'Artist Name must be atleast 3 characters.', _error: 'Register failed!' })
				
			  }else if (fields["artist_name"].trim()=="" ) {
				$("#Aname_error").html("Please enter a valid input")
				throw new SubmissionError({ name: 'Please enter a valid input.', _error: 'Register failed!' })
				
			  }
		   } 
			 if (!fields["email"]) {
				$("#email_error").html("Please enter your email-ID")
			   formIsValid = false;
			   throw new SubmissionError({ email: 'Please enter your email-ID.', _error: '' })
			   
			 }
		 
			 if (typeof fields["email"] !== "undefined") {
			
			   var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
			   if (!pattern.test(fields["email"])) {
				 formIsValid = false;
			 	$("#email_error").html("Please enter valid email-ID.")
				 throw new SubmissionError({ email: 'Please enter valid email-ID.', _error: '' })
			   }
			 }
		 
			 if($(".css-1hwfws3").children().hasClass('css-1wa3eu0-placeholder')){
				formIsValid = false;
				$(".subgenre_err").html("Please select atleast one subgenre!")
				// throw new SubmissionError({ subgenre_id: 'Please select your subgenre.', _error: 'Please select atleast one subgenre!' })
				 }
			
			 return formIsValid;
		 
		 
		   }
	
	

let selectedoptions1: any = [];
let selectedsubgen: any = [];
	
	
	var genreOptions1: any = [];
	const updateSelectedVal = () => {
		selectedoptions1 = [];
		selectedsubgen = [];
		if(userInfo.data){
		
		setselectedval(selectedoptions1);
		Object.keys(userInfo.data.sub_genre).map(function(key: any,value:any) {
			
			selectedsubgen.push({ value: userInfo.data.sub_genre[key]['_id'], label: userInfo.data.sub_genre[key]['name'] });
		
	});
	setsubgenres_id(selectedsubgen);
		}
	}

	useEffect(() => {
		getdropdown();
		$("#imageUpload").change(function() {
			readURL(this);
			
		   });
	},[])
	
	useEffect(() => {
	
		console.log('**user',userInfo.data);
		if(userInfo.data) {
			updateSelectedVal();
			setemail(userInfo.data.email);
			setnames(userInfo.data.name)
			setartist_name(userInfo.data.artist_name)
			
			setgenre({label: userInfo.data.genre.name, value: userInfo.data.genre._id});
			getSubgenre( userInfo.data.genre._id)
		// 	const optionssub1 : any= [];
		// 	if(userInfo.data.sub_genre){
		// 	Object.keys(userInfo.data.sub_genre).map(function(key: any,value:any) {
		// 		optionssub1.push(userInfo.data.sub_genre[key]['_id']);
		// 	})
		// 	setsubgenres_id(optionssub1)
		// }
		}
	  }, [userInfo]);


	 const getSubgenre = (id:any) => {
	
		sleep(1000).then(() => {
		  axios.get(`${config.apiUrl}/subgenres/getSubGenre/`+id)
		.then(function (response) {
		  setstyle({display:'block'})
		  $('.my_loader').css('display','none');
		  setsubgenres(response.data.subgenre);
			
		})
	  })
	  } 
	  const handleChangesubgen = (selectedOptions:any)=>{
		  
		const options11 : any= [];
		// setselectedval([]);
		selectedsubgen = [];
		if(selectedOptions!=null) {
		   Object.keys(selectedOptions).map(function(key: any,value:any) {
			   console.log({ value: selectedOptions[key]['value'], label: selectedOptions[key]['label'] })
			   options11.push(selectedOptions[key]['value']);
			   return selectedsubgen.push({ value: selectedOptions[key]['value'], label: selectedOptions[key]['label'] });
				 
			 });

		   
	
		  }else{
			setsubgenre_id(null); 
		  }
		  setsubgenres_id(selectedsubgen);
		  
		  setsubgenre_id(options11.toString())

	 }
	const handleChange =(selectedOptions:any)=>{

	const options1 : any= [];
	// setselectedval([]);
	selectedoptions1 = [];
	if(selectedOptions) {
	   Object.keys(selectedOptions).map(function(key: any,value:any) {
		   console.log({ value: selectedOptions[key]['value'], label: selectedOptions[key]['label'] })
		   options1.push(selectedOptions[key]['value']);
		   return selectedoptions1.push({ value: selectedOptions[key]['value'], label: selectedOptions[key]['label'] });
			 
		 });
	
	   
	  
	  }
	  setselectedval(selectedoptions1);
	}
	const handleChangegen =(selectedOptions:any)=>{
		$('.my_loader').css('display','block');
		setstyle({display:'block'})
		let options2 : any= '';
	selectedoptions1 = [];
		if(selectedOptions) {
		   Object.keys(selectedOptions).map(function(key: any,value:any) {
			   console.log( selectedOptions['value'])
			   options2 = selectedOptions['value']
			
			//    return selectedoptions1.push({ value: selectedOptions[key]['value'], label: selectedOptions[key]['label'] });
			 });
		 }
		 getSubgenre(options2);
		 setgenre_id(options2);
		 setsubgenres_id([]);
		//   setgenre_id(options2.toString())
		  setgenre(selectedOptions)
  }
  const handleChangeemail =(e:any)=>{
	  setemail(e.target.value)
   }
   const handleChangename =(e:any)=>{
	setnames(e.target.value)
 }
 
  
   
 const handleChangeAname =(e:any)=>{
	setartist_name(e.target.value)
 }
	
	const getdropdown = () => {
	
	  axios.get(`${config.apiUrl}/users/dropDown`)
	  .then(async (response) => {
		console.info('====', response.data)
	
		setgenres(response.data.Genre);
	
		
	  //  SetInitialValues(response.data.artist);
	  }).catch(error => {
		if(error.response.status==401){
		  alert("Login token has been expired!!Login again")
		  localStorage.removeItem('auth_token');
		}
		console.error(`An Error Occuredd! ${error}`);
	  });
	  
	  }

	  const options : any[]= [];
	var genreOptions: any[] = [];
	if(genres.length!=0){
	 genreOptions = Object.keys(genres).map(function(key: any,value:any) {
		  
		  if(userInfo.data){
			if(genres[key]['_id']!="5d70fb3277e3f3361dcc580a"){
			return  options.push({ value: genres[key]['_id'], label: genres[key]['name'] });
			 }
		  }
	   
		
	  });
	}

	var subgenreOptions: any[] = [];
	const subgenreoptions : any[]= [];
	// const optionssub : any= [];

	if(subgenres.length!=0){
	 
	  subgenreOptions = Object.keys(subgenres).map(function(key: any,value:any) {
		if(subgenres[key]['_id']!="5d70fb3277e3f3361dcc580a"){
		  return  subgenreoptions.push({ value: subgenres[key]['_id'], label: subgenres[key]['name'] });
		}
		
	});
	// setsubgenre_id(optionssub.toString())
	
	}
	function checkfile(file_img:any){
		var get_ext = file_img.name.split('.');
		console.log(file_img.name)
		 var exts = ['png','jpg','jpeg','gif'];
		  get_ext = get_ext.reverse();
		  if ( $.inArray ( get_ext[0].toLowerCase(), exts ) > -1 ){
			// alert( 'Allowed extension!' );
			return true;
		  } else {
			alert("'Please select a valid image file")
		   return false;
		  }
	  }
	function readURL(input:any) {
		if (input.files && input.files[0]) {
			var reader = new FileReader();
			var filetype = checkfile(input.files[0]);
			if(filetype==true){
			reader.onload = function(e:any) {
				$("#cropImg").css("display","block");
				$("#cropImg").addClass("in");

				setCroppedFor(e.target.result)
			
				$('#imagePreview3').hide();
				$('#imagePreview3').fadeIn(650);
			}
			reader.readAsDataURL(input.files[0]);
		}
		}
	}
	

    return (

<section className="main_section forgt signup">
	<div className="container">
	{userInfo.data ? (
		
	<form>
		<div className="inner_form">
			
			<div className="form_inner">
				  <div className="form-group">
					<div className="avatar-upload">
						<div className="avatar-edit">
						<input type='file' id="imageUpload" name="imageUpload" accept=".png, .jpg, .jpeg" onChange={ (e:any) => setprofile(e.target.files[0]) } required />
							<label htmlFor="imageUpload"></label>
						</div>
						{userInfo.data ? (
                     
					 <div className="avatar-preview">
					  
					 <div className="imagepreview" id="imagePreview3" style={ { backgroundImage:`url(${userInfo.data.profile_pic})` } }>
					 </div>
					 </div>
					 ):(
					   <div className="avatar-preview">
					   <div className="imagepreview" id="imagePreview3" style={ { backgroundImage: "url("+profl_bg+")" } }>
					   </div>
					   </div>
					 )}
					</div>
				<h4 className="text-center">Upload Profile Picture</h4>
				</div>
				<div className="form-group">
					<label htmlFor="email">Email</label>
					<input type="email" name="email"  placeholder="oliver07@gmail.com"  value={email}    onChange={handleChangeemail} className="form-control" id="email" />
					<span className="error" id="email_error"></span>
				</div>
				<div className="form-group">
					<label htmlFor="name">Name</label>
					<input type="text" name="name" placeholder="David"  value={names}    onChange={handleChangename} className="form-control" id="email" />
					<span className="error" id="name_error"></span>
				</div>
				<div className="form-group">
					<label htmlFor="artist_name">Artist Name</label>
				    <input type="text" name="artist_name"  placeholder="David"  value={artist_name}    onChange={handleChangeAname} className="form-control" id="email" />
				    <span className="error" id="Aname_error"></span>
				</div>
			    <div className="multi_select"  id="one">
		 <label>Genre</label>
		 <div className="form-group">
		 <Select
      
	  options={options}
	  
	  value={genre}
	  onChange={handleChangegen}
      />
	
	</div>
                </div>
				<div className="multi_select"  id="ones">
				<div className="form-group seclt_optn" id="onse">
            <label>Subgenre</label>
            <Select name="sub_genre"  onChange={handleChangesubgen}
			  isMulti
	
	        value={subgenres_id}
            options={subgenreoptions}
             />
           
            </div>
			<div className="errors"> <strong style={{color: "#F20000"}} className="subgenre_err"></strong></div> 
            </div>
				<div className="accunt_btn text-center">
					
				<button onClick={(e) => submit(profile,croppedImage,email,genre_id,subgenre_id,e,names,artist_name)} className="btn">update</button>
				</div>
				
			</div>
			
		</div>
		</form>
		 ):(
			  <section className="profile_sction">
  </section>
 )}
	</div>
	<div className="modal fade plans_popup" id="cropImg" role="dialog"  >
    <div className="modal-dialog modal-sm">
      <div className="modal-content">
       <div className="modal-header">
      
        </div>
        <div className="modal-body">
			<div className="chng_status">
           <h4 className="modal-title text-center">Current Plan</h4>
		  
           <div className="crop-container">
        <Cropper
          image={croppedFor}
          crop={crop}
          zoom={zoom}
          aspect={1}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
          cropShape="round"
          showGrid={false}
          id="crop"
        />
        
       
      </div>
		   <ul className="text-center">
				<li><button className="btn close_pop_crop">Close</button></li>
				<li><button className="btn"  onClick={showCroppedImage} >Done</button></li>
		   </ul>
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
</section>
)
}
export default EditProfile
// export default reduxForm({
//     form: 'editForm' // a unique identifier for this form
//   })(EditProfile)
