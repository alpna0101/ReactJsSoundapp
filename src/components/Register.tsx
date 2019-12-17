import React, { useState,useCallback  } from 'react';
// import { connect } from "react-redux";
// import store from '../store';
import { Button } from 'react-bootstrap' 
import { Field, reduxForm, SubmissionError } from 'redux-form'
import {config} from '../config/config'
import axios from 'axios';
import upload_img from '../images/upload_img.png';
import arrow from '../images/right_arrow.png';
import account_logo from '../images/account_logo.png';
import $ from "jquery";
// import ImgDialog from './ImgDialog'
// import {MultiselectProps, Multiselect} from "react-bootstrap-multiselect-ts";
import Select from "react-select";
// import ReactCrop from 'react-image-crop';
// import 'react-image-crop/dist/ReactCrop.css';
//  import Cropper from 'react-cropper';
 import Cropper from 'react-easy-crop'
 import getCroppedImg from './cropImage'
//  import Slider from '@material-ui/lab/Slider'
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
interface fieldInterface1 {
  input: any;
  type: string;
  meta: {
      touched: boolean;
      error: string;
      error1: string;
  };
}
  



const renderField = ({ input, label,placeholder, type,id, meta: { touched, error,error1 } }: fieldInterface) => (
  <div className="form-group">
      <label>{label}</label>
      
        <input {...input} placeholder={placeholder} type={type} id={id} className="form-control" />
        {touched && error && <span>{error}</span>}
      
    </div>
  )
  // const renderField1 = ({ input,label, type,id, meta: { touched, error,   error1 } }: fieldInterface) => (
  //   <> 
  //        <input {...input}  type={type} className="form-control"  id={id} />
      
  //        {touched && error1 && <span>{error}</span>}
  //        </>
  //  )
  // const cropper = React.createRef();
  // _crop(){
  //   // image in dataUrl
  //   console.log(this.refs.cropper.getCroppedCanvas().toDataURL());
  // }
  const Register = (props: any) => {
   
    const { error, handleSubmit, pristine, reset, submitting } = props
   
    const [modalVisible, setmodalVisible] = useState(false);
    const [Style, setStyle] = useState();
    // const [artists, setartists] = useState([]);
    // const [artists_id, setartists_id] = useState([]);
    const [style, setstyle] = useState({display:'none'});
    const [genres, setgenres] = useState([]);
    const [subgenres, setsubgenres] = useState([]);
    const [subgenres_id, setsubgenres_id] = useState([]);
  
    const [plan_id, setplanid] = useState('');
    const [profile, setprofile] = useState();
    const [genreerr, setgenreerr] = useState();
    const [cover, setcover] = useState();
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
        $('#imagePreview').css('background-image', 'url('+croppedImage +')');
        $('#cropImg').css('display', 'none');
        $('#cropImg').removeClass('in');
      } catch (e) {
        console.error(e)
      }
    }, [croppedAreaPixels, rotation])
  
 

    React.useEffect(() => {
      getdropdown();
      $("#imageUpload").change(function() {
   
        readURL(this);
        
       });
    }, []);
 
    $(".close_pop_crop").click(function(){
      setCroppedFor('');
      $("#cropImg").removeClass('in')
      //   $(".modal-backdrop.fade.show").css("z-index", "9999");
        $("#cropImg").css("display","none");
  
      $(".modal-backdrop").css("display","none");
      
     });
    $("input#Password").on({
      keydown: function(e) {
        if (e.which === 32)
          return false;
      }
    });
    const openModal=(modalVisible: any)=> {
      const modalVisible1 = !modalVisible;
      setmodalVisible(modalVisible1);
      setStyle(modalVisible ? { display: "block",opacity:'1'}: { display: "none" })
      if(modalVisible==true){
        $(".modal-backdrop").css("display","block");
        $("#myModal").addClass('in')
      $('body').addClass('modal-open')
      $(".modal-backdrop").css("display","block");
      // $(".modal-backdrop.fade.in").css("z-index", "9999");
      }else{
        $(".modal-backdrop").css("display","none");
        $("#myModal").removeClass('in')
        $('body').removeClass('modal-open')
        $(".modal-backdrop").css("display","none");
        $(".modal-backdrop.fade.in").css("z-index", "unset");
        window.location.href = `${config.appurl}/login`; 
      }
      }
     
      const [selectedOption, setselectedOption] = useState()

    const handleChange1 =(selectedOptions:any)=>{
      setselectedOption(selectedOptions)
      const options2 : any= [];
      if(selectedOptions){
       Object.keys(selectedOptions).map(function(key: any,value:any) {
        return  options2.push(selectedOptions[key]['value']);
       
      })

      setsubgenres_id(options2.toString())
       }
    }

    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
 
    const submit = (values: any,profile:any, croppedImage:any, cover: any,plan_id:any,subgenres_id:any) => {
       
      // values.artists_id = artists_id
      values.subgenres_id = subgenres_id
      console.log(values);
      return sleep(1000).then(() => {
        if (validateForm(values)) {
          $('.my_loader').css('display','block');
          var formData = new FormData();
          formData.append("email", values.email);
          formData.append("name", values.name);
          formData.append("password", values.password);
        formData.append("artist_name", values.artist_name);
          formData.append("genre", values.genre);
          formData.append("sub_genre", values.subgenres_id);
          formData.append("profile_pic", croppedImage);
          formData.append("plan_id", plan_id);
        const headers = {
            headers: { 'content-type': 'multipart/form-data' }
          }
          axios
            .post(`${config.apiUrl}/users/signup`, formData,headers)
            .then(response => {
              console.log(response.data.status)
              if(response.data.status==false){
                $('.my_loader').css('display','none');
                alert(response.data.message);
               
            }if(response.data.status==true){
              $('.my_loader').css('display','none');
               openModal(true)
                // window.location.href = `${config.appurl}/login`; 
              }
            }).then(json => {
              }).catch(error => {
              console.log(error);
              alert(`An Error Occured! ${error}`);
            });
          }else{
        
          }
    
       
      })
    }
    const validateForm= (data:any) => {
      
      let fields = data;
  
      let errors :any = [];
      let formIsValid = true;
      // if (!profile) {
      //   // openModal(false)
      //     formIsValid = false;
      //   throw new SubmissionError({ img_file: 'Please select an image',_error: 'Please select an image' })
      //  }
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
        // openModal(false)
        throw new SubmissionError({ name: 'Name field required', name_error: 'Name field required' })
       }
   
      
      if (typeof fields["name"] !== "undefined") {
  
        if (!fields["name"].match(/^[a-zA-Z ]*$/)) {
          formIsValid = false;
        throw new SubmissionError({ name: 'Please enter alphabet characters only.', _error: 'Register failed!' })
        }else if (fields["name"].length > 16) {
          throw new SubmissionError({ name: 'Name must be 15 characters or less.', _error: 'Register failed!' })
          
        }else if (fields["name"].length < 3 ) {
          throw new SubmissionError({ name: 'Name must be atleast 3 characters.', _error: 'Register failed!' })
          
        }else if (fields["name"].trim()=="" ) {
          throw new SubmissionError({ name: 'Please enter a valid input.', _error: 'Register failed!' })
          
        }
     } 
     if (typeof fields["artist_name"] !== "undefined") {
  
      if (!fields["artist_name"].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
      throw new SubmissionError({ artist_name: 'Please enter alphabet characters only.', _error: 'Register failed!' })
      }else if (fields["artist_name"].length > 16) {
        throw new SubmissionError({ artist_name: 'Artist Name must be 15 characters or less.', _error: 'Register failed!' })
        
      }else if (fields["artist_name"].length < 3 ) {
        throw new SubmissionError({ artist_name: 'Artist Name must be atleast 3 characters.', _error: 'Register failed!' })
        
      }else if (fields["artist_name"].trim()=="" ) {
        throw new SubmissionError({ artist_name: 'Please enter a valid input.', _error: 'Register failed!' })
        
      }
   } 
      if (!fields["email"]) {
        formIsValid = false;
        throw new SubmissionError({ email: 'Please enter your email-ID.', _error: 'Register failed!' })
        // openModal(false)
      }
  
      if (typeof fields["email"] !== "undefined") {
        //regular expression for email validation
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (!pattern.test(fields["email"])) {
          formIsValid = false;
          // openModal(false)
          throw new SubmissionError({ email: 'Please enter valid email-ID.', _error: 'Register failed!' })
        }
      }
      
  
      if (!fields["password"]) {
        formIsValid = false;
        throw new SubmissionError({ password: 'Please enter your password.' })
      } else if (fields["password"].trim().length==0) {
        throw new SubmissionError({ password: 'Please enter a valid password.' })
      }else if (fields["password"].length < 6) {
        throw new SubmissionError({ password: 'Password should have minimum 6 character.' })
      }

     if (!fields["cpassword"]) {
        formIsValid = false;
        throw new SubmissionError({ cpassword: 'Please Re_enter your password.', _error: 'Register failed!' })
        if(fields["cpassword"] == fields["password"]){
          throw new SubmissionError({ cpassword: 'Please enter your password.', _error: 'Register failed!' })
        }
      }
      if (fields["cpassword"]) {
       
        
       
        if(fields["cpassword"] != fields["password"]){
          // openModal(false)
          formIsValid = false;
          throw new SubmissionError({ cpassword: 'Your Confirm Password do not match with password.', _error: 'Register failed!' })
        }
      }
     if (!fields["genre"]) {
      formIsValid = false;
      // openModal(false)
      setgenreerr('Please select a genre')
      throw new SubmissionError({ genre: 'Please select a genre.', _error: '' })
    }
  
    if (fields["subgenres_id"].length==0) {
      formIsValid = false;
      // openModal(false)
      setgenreerr('Please select a sub_genre')
      throw new SubmissionError({ sub_genre: 'Please select a sub_genre.', _error: '' })
    }
   
      return formIsValid;
   }
    const getdropdown = () => {
      sleep(1000).then(() => {
      axios.get(`${config.apiUrl}/users/dropDown`).then(async (response) => {
      // setartists(response.data.Artist);
      setgenres(response.data.Genre);
      // setplans(response.data.Plans);
      }).catch(error => {
      if(error.response.status==401){
        alert("Login token has been expired!!Login again")
        localStorage.removeItem('auth_token');
      }
      console.error(`An Error Occuredd! ${error}`);
    });
    })
  }
  
  const getSubgenre = (id:any) => {

    setselectedOption(null);
    $("#sub_genre").val('')
    $('.my_loader').css('display','block');
     sleep(1000).then(() => {
        axios.get(`${config.apiUrl}/subgenres/getSubGenre/`+id)
      .then(function (response) {
        setgenreerr('')
        setstyle({display:'block'})
     
        $('.my_loader').css('display','none');
      
        setsubgenres(response.data.subgenre);
          
      })
    })
  }  
  function checkfile(file_img:any){
    var get_ext = file_img.name.split('.');
    
     var exts = ['png','jpg','jpeg','gif'];
      get_ext = get_ext.reverse();
      if ( $.inArray ( get_ext[0].toLowerCase(), exts ) > -1 ){
        // alert( 'Allowed extension!' );
        return true;
      } else {
        setprofile('')
        alert("Please select a valid image file")
       return false;
      }
  }
  
    function readURL(input:any) {
      if (input.files && input.files[0]) {
        
          var filetype = checkfile(input.files[0]);
         if(filetype==true){
            var reader = new FileReader();
          reader.onload = function(e:any) {
     
            setCroppedFor(e.target.result)
           $("#cropImg").css("display","block");
           $("#cropImg").addClass("in");
              // $('#imagePreview').css('background-image', 'url('+e.target.result +')');
              $('#imagePreview').hide();
              $('#imagePreview').fadeIn(650);
          }
          reader.readAsDataURL(input.files[0]);
        }
      }
  }
  

  // var tifOptions: any[] = [];
  // const options1 : any[]= [];
  //   if(artists.length!=0){
  //      tifOptions = Object.keys(artists).map(function(key: any,value:any) {
  //       return  options1.push({ value: artists[key]['_id'], label: artists[key]['artist_name'] });
  //      });
  //   }
  
    var genreOptions: any[] = [];
    if(genres.length!=0){
      genreOptions = Object.keys(genres).map(function(key: any,value:any) {
        if(genres[key]['_id']!="5d70fb3277e3f3361dcc580a"){
          return <option value={genres[key]['_id']} key={key}>{genres[key]['name']}</option>
        }
      
     });
    }
  
  
    var subgenreOptions: any[] = [];
    const subgenreoptions : any[]= [];
    if(subgenres.length!=0){
     subgenreOptions = Object.keys(subgenres).map(function(key: any,value:any) {
      if(subgenres[key]['_id']!="5d70fb3277e3f3361dcc580a"){
        return  subgenreoptions.push({ value: subgenres[key]['_id'], label: subgenres[key]['name'] });
      }
        });
    }
  
    // function CropDemo({ src: any }) {
    //   const [crop, setCrop] = useState({ aspect: 16 / 9 });
    //   return <ReactCrop src={src} crop={crop} onChange={newCrop => setCrop(newCrop)} />;
    // }
   

    return (
      <>

      <div className="controls">
        {/* <Slider
          value={zoom}
          min={1}
          max={3}
          step={0.1}
          aria-labelledby="Zoom"
          onChange={(e, zoom) => setZoom(zoom)}
          classes={{ container: 'slider' }}
        /> */}
      </div>
 
      <div className="modal-backdrop fade in" style={{display:"none"}}></div>
     <section className="main_section signup">
          <div className="container">
         
            <div className="inner_form">
              <div className="logo_img text-center">
              <a href="/"><img src={account_logo}></img></a>
                <h5>Create your Sounds Sphere Account</h5>
              </div>
              <form onSubmit={handleSubmit((val: any) => submit(val,profile, croppedImage, cover,plan_id,subgenres_id))}  encType="multipart/form-data" id="myform">
              <div className="form_inner">
              <div className="form-group">
					<div className="avatar-upload">
						<div className="avatar-edit">
            {/* <ReactCrop src="path/to/image.jpg" crop={crop} /> */}
            <input type='file' id="imageUpload" name ="img_file" accept=".png, .jpg, .jpeg" onChange={ (e:any) => setprofile(e.target.files[0]) }  />
            
						   <label htmlFor="imageUpload"></label>
						</div>
            {profile ? (
              <div className="avatar-preview">
              <div id="imagePreview" style={ { backgroundImage: "url("+profile+")" } }>
              </div>
              </div>
            ):(
              <div className="avatar-preview">
              <div id="imagePreview" style={ { backgroundImage: "url("+upload_img+")" } }>
              </div>
              </div>
             )}
           </div>
         
				    <h4 className="text-center">Upload Profile Picture</h4>
				</div>
              


       <div className="errors"> {error && <strong style={{color: "#F20000"}}>{error}</strong>}</div> 
              <Field
                  name="name"
                  type="text"
                  component={renderField}
                label="Name"
                placeholder="Enter Name"
                />
                 <Field
                  name="email"
                  type="text"
                  component={renderField}
                label="Email"
                placeholder="Enter Email Address"
                />
              <Field
          name="password"
          type="password"
          component={renderField}
          label="Password"
          id="Password"
          rules="required|string|between:5,20"
          placeholder="Enter Password"
        />
             
        <Field
          name="cpassword"
          type="password"
          component={renderField}
          label=" Confirm Password"
          id=" ConfirmPassword"
          rules="required|string|between:5,20|same:password"
          placeholder="Re-Enter Password"
        />

                 <Field
                  name="artist_name"
                  type="text"
                  component={renderField}
                label="Artist Name"
                placeholder="Enter Artist Name"
                />
{/* <label>Producer</label>
          <div className="multi_select">
            <Select name="artist_id[]" placeholder="Select Artist"
              isMulti
            options={options1}
            onChange={handleChange} /> 
           </div> */}
           <div className="form-group">
        <label>Genre</label>
            <Field name="genre" component="select" label="genre" className="form-control" onChange={ (e:any) => getSubgenre(e.target.value) } >
            <option value="">Select a genre...</option>
             {genreOptions}
            </Field>
            </div>
            {/* <div className="errors"> {genreerr && <strong style={{color: "#F20000"}}>{genreerr}</strong>}</div> */}
           
            <div className="multi_select" style={style} id="one">
            <label>Subgenre</label>
           <Select name="sub_genre" id="sub_genre" onChange={handleChange1}
           value={selectedOption} 
              isMulti options={subgenreoptions}  
               />
            </div>
            <div className="errors"> {genreerr && <strong style={{color: "#F20000"}}>{genreerr}</strong>}</div>
          

              
                <div className="accunt_btn text-center">
                <button  disabled={submitting} className="btn" >SIGN UP</button>
            {/* <Button variant="primary"  onClick={() => {openModal(true)}}  className="btn">
            Next
          </Button> */}
  
				</div>
   
				<div className="bottom_links text-center">
					<ul>
						<li><a href="/login"> Login<img src={arrow}></img></a></li>
            <li></li>
					</ul>
				</div>
              </div>
     
              </form>
              <p className="coypright_txt text-center">© 2019, All Rights Reserved.</p>
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
      </section>
     
        <div className="modal fade plans_popup " id="cropImg" role="dialog" >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
        <div className="modal-header">
        {/* <button className="button close" onClick={() => {openModal(false)}} data-dismiss="modal" ><img src={require("../images/close.png")}></img></button> */}
        </div>
        <div className="modal-body">
      
        <h4 className="modal-title text-center">Crop image</h4>
       
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
         
       
    
        </div>
        <div className="row crop_btn" >
        <div className="col-md-4 col-sm-4 text-center">  </div>
        <div className="col-md-2 col-sm-2 text-center">
			<button className="btn close_pop_crop"  style={{background:"#fff",color:"#30beee"}}>Close</button></div>
      <div className="col-md-2 col-sm-2 text-center"><button className="btn"  onClick={showCroppedImage} style={{background:"#30beee",color:"#fff"}}>Done</button></div>
      <div className="col-md-4 col-sm-4 text-center">  </div>
       </div>
		 
        </div>
      </div>
</div>
      <div className="modal fade plans_popup signup_completed" id="myModal" role="dialog" style={Style}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
        {/* <div className="modal-header">
        {<button className="button close" onClick={() => {openModal(false)}} data-dismiss="modal" ><img src={require("../images/close.png")}></img></button>}
        </div> */}
        <div className="modal-body">
      
        <h4 className="modal-title text-center">Sign Up Completed</h4>
        <div className="row">
        <div className="col-md-12 col-sm-6 text-center">
         <h5>You have successfully created your account! To begin using the site you need to activate your account via the email we have just sent to your address.</h5>
         <button  className="btn success_btns" onClick={ (e:any) => openModal(false) }>Ok</button> 
         </div>
       
        </div>
    
        </div>
        </div>
      </div>
</div>
      </>
       )
  }
  
  export default reduxForm({
    form: 'loginForm' // a unique identifier for this form
  })(Register)