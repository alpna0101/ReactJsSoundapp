import React, { useState } from 'react';
// import { connect } from "react-redux";
// import store from '../store';
 import {  Button } from 'react-bootstrap' 
import { Field, reduxForm, SubmissionError } from 'redux-form'
import {config} from '../../config/config'
import axios from 'axios';
import upload_img from '../../images/upload_img.png';
import arrow from '../../images/right_arrow.png';
import account_logo from '../../images/account_logo.png';
import $ from "jquery";
import {MultiselectProps, Multiselect} from "react-bootstrap-multiselect-ts";
import Select, { components } from "react-select";
interface fieldInterface {
    input: any;
    label: string;
    type: string;
    value:string;
    meta: {
        touched: boolean;
        error: string;
    };
}


const access_token = localStorage.getItem('admin_access_token');
let config1 = {
  headers: {
    'access_token':access_token
  }
  }
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

const submit = (values: any,  keyword_id: any,mood_id:any,subgenres_id:any,image:any,song_file_wave:any,soundlike_id:any) => {
 

  values.subgenre = subgenres_id
  values.soundslike = soundlike_id
  values.keyword_id = keyword_id
  values.mood = mood_id
  values.image = image
  values.song_file_wave = song_file_wave
 console.log(values);

 if (validateForm(values)) {
  $(".my_loader").css('display','block');
  $('body').addClass('modal-open')
  return sleep(1000).then(() => {
 

    var formData = new FormData();
   
    formData.append("playlist_id", values.genre);
    formData.append("song_file", image);
    formData.append("song_file_wave", song_file_wave);
    formData.append("song_name", values.songname);
    formData.append("mood", values.mood);
    formData.append("soundslike", values.soundslike);
    formData.append("genre_id", values.genre);
    formData.append("subGenre_id", values.subgenre);
    formData.append("tempo", values.tempo);
    formData.append("producer", values.producer);
    
    formData.append("song_url", values.url);
    formData.append("key", values.key);
    formData.append("price", values.price);
    const access_token = localStorage.getItem('admin_access_token');
   
    const headers = {
      headers: { 'content-type': 'multipart/form-data', 'access_token':access_token }
    }
    
   
     axios
      .post(`${config.apiUrl}/songs/addSongs`, formData,headers)
      .then(response => {
        console.log(response);
        if(response.data.status==false){
          alert(response.data.message);
          $(".my_loader").css('display','none');
          $('body').removeClass('modal-open')
        }else{
          alert(response.data.message);
          $(".my_loader").css('display','none');
          $('body').removeClass('modal-open')
          window.location.href = `${config.appurl}/admin/songs`; 
        }
        // window.location.href = `${config.appurl}/purchase`; 
      })
      .then(json => {
       
       
      })
      .catch(error => {
        console.log(error);
        alert(`An Error Occured! ${error}`);
      
      });
  
})
}
}


const validateForm= (data:any) => {
  console.log("testttt");
   let fields = data;
   let errors :any = [];
   let formIsValid = true;

   if (!fields["songname"]) {
     formIsValid = false;     throw new SubmissionError({ songname: 'Name field required', _error: '' })
   
   }
   if (typeof fields["songname"] !== "undefined") {
    // if (!fields["songname"].match(/^[a-zA-Z0-9 ]*$/)) {
    //   formIsValid = false;
    // throw new SubmissionError({ songname: 'Please enter alphanumeric characters only.', _error: ' failed!' })
    // }
    // else if(fields["songname"].length>15){
    //   formIsValid = false;
    //   throw new SubmissionError({ songname: 'Name must be 15 characters or less.', _error: ' failed!' })
    // }
  }
  if (!fields["price"]) {
    formIsValid = false;
    throw new SubmissionError({ price: 'Price field required', _error: '' })
  
  }else if (isNaN(Number(fields["price"]))) {
    throw new SubmissionError({ price: 'Price Must be a number', name_error: '' })

  } 

   if (!fields["soundslike"]) {
    formIsValid = false;
    throw new SubmissionError({ soundslike: 'Sound Like field required', _error: '' })
  
  }
  if (!fields["producer"]) {
    formIsValid = false;
    throw new SubmissionError({ producer: 'Producer field required', _error: '' })
  
  }
   
  if (!fields["key"]) {

    formIsValid = false;
    throw new SubmissionError({ key: 'Please select a keyword', _error: '' })
  
  }
 if (!fields["tempo"]) {
    formIsValid = false;
    throw new SubmissionError({ tempo: 'Please select a tempo', _error: '' })
  
  }
  if (!fields["mood"]) {
    formIsValid = false;
    throw new SubmissionError({ mood: 'Please select  mood', _error: 'Please select  mood' })
  
  }
  if (!fields["genre"]) {
    formIsValid = false;
    throw new SubmissionError({ genre: 'Please select  genre', _error: '' })
  
  }
  if (!fields["subgenre"]) {
    formIsValid = false;
    throw new SubmissionError({ subgenre: 'Please select  subgenre', _error: '' })
  
  }
  //  if (!fields["url"]) {
  //    formIsValid = false;
  //    throw new SubmissionError({ url: 'Please enter song url.', _error: 'Please enter song url' })
  //  }
 if (!fields["image"]) {
     formIsValid = false;
     // errors["password"] = "*Please enter your password.";
     throw new SubmissionError({ img_file: 'Please upload your song file.', _error: 'Please upload your song file' })
   }

  
   if (fields["image"]) {
    // openModal(false)
   
    var get_ext = fields["image"].name.split('.');
    var exts = ['mp3'];
    get_ext = get_ext.reverse();
    if ( $.inArray ( get_ext[0].toLowerCase(), exts ) > -1 ){
      // alert( 'Allowed extension!' );
    } else {
      formIsValid = false;
      throw new SubmissionError({ img_file: 'Please select mp3  file',_error: 'Please select mp3 file' })
    }
  
  
    
   }
   if (!fields["song_file_wave"]) {
    formIsValid = false;
    // errors["password"] = "*Please enter your password.";
    throw new SubmissionError({ song_file_wave: 'Please upload your song file.', _error: 'Please upload your song file' })
  }
   if (fields["song_file_wave"]) {
    // openModal(false)
   
    var get_ext = fields["song_file_wave"].name.split('.');
    var exts = ['wav'];
    get_ext = get_ext.reverse();
    if ( $.inArray ( get_ext[0].toLowerCase(), exts ) > -1 ){
      // alert( 'Allowed extension!' );
    } else {
      formIsValid = false;
      throw new SubmissionError({ song_file_wave: 'Please select wave file',_error: 'Please select wave file' })
    }
  
  
    
   }
   return formIsValid;


 }

 const renderField = ({ input, label, type,value, meta: { touched, error } }: fieldInterface) => (
  <div className="form-group">
      <label>{label}</label>
      
        <input {...input} placeholder={label} type={type} value={value} className="form-control" />
        {touched && error && <span>{error}</span>}
      
    </div>
  )
  const Songs = (props: any) => {
    const { error, handleSubmit, pristine, reset, submitting } = props
    const [modalVisible, setmodalVisible] = useState(false);
    const [Style, setStyle] = useState();
    const [artists, setartists] = useState([]);
    const [artists_id, setartists_id] = useState([]);
    const [style, setstyle] = useState({display:'none'});
    const [genres, setgenres] = useState([]);
    const [subgenres, setsubgenres] = useState([]);
    const [subgenres_id, setsubgenres_id] = useState([]);
    const [soundlike_id, setsoundlike_id] = useState([]);
    const [mood, setmood] = useState([]);
    const [pro, setpro] = useState();
    const [keywords, setkeyword] = useState([]);
    const [keyword_id, setkeyword_id] = useState([]);
    const [mood_id, setmood_id] = useState([]);
    const [image, setimage] = useState([]);
    const [song_file_wave, setSongFile] = useState([]);
    const [sounds, setsound] = useState([]);
    const [price, setprice] = useState(79);
    
    const [tempo, settempo] = useState([]);
    
    React.useEffect(() => {

      getdropdown();
      getkeyword();
      getmood();
      gettempo();
      getpro();
      getsounds();
    }, []);

    const handleChange =(selectedOptions:any)=>{
      const options1 : any= [];
        if(selectedOptions!=null){
          Object.keys(selectedOptions).map(function(key: any,value:any) {
            return  options1.push(selectedOptions[key]['value']);
          })
        }
        // setartists_id(options1.toString())
     
    }
    const handleChangeKey =(selectedOptions:any)=>{
      const optionskey : any= [];
        if(selectedOptions!=null){
          Object.keys(selectedOptions).map(function(key: any,value:any) {
            return  optionskey.push(selectedOptions[key]['value']);
          })
        }
        setkeyword_id(optionskey.toString())
     
    }
    const handleChangeMood =(selectedOptions:any)=>{
      const optionskey1 : any= [];
        if(selectedOptions!=null){
          Object.keys(selectedOptions).map(function(key: any,value:any) {
            return  optionskey1.push(selectedOptions[key]['value']);
          })
        }
        setmood_id(optionskey1.toString())
     
    }
    const handleChange1 =(selectedOptions:any)=>{
      console.log(selectedOptions);
      const options2 : any= [];
      Object.keys(selectedOptions).map(function(key: any,value:any) {
        return  options2.push(selectedOptions[key]['value']);
       
      })
      setsubgenres_id(options2.toString())
    }
    const handleChangesound =(selectedOptions:any)=>{
      console.log(selectedOptions);
      const options2 : any= [];
      Object.keys(selectedOptions).map(function(key: any,value:any) {
        return  options2.push(selectedOptions[key]['value']);
       
      })
      setsoundlike_id(options2.toString())
    }

    const getsounds = () => {
      axios.get(`${config.apiUrl}/sounds/getsounds`,config1)
       .then(async (response) => {
           console.log(response);
           setsound(response.data.sound);
          }).catch(error => {
         if(error.response.status==401){
           alert("Login token has been expired!!Login again")
           localStorage.removeItem('auth_token');
         }
         console.error(`An Error Occuredd! ${error}`);
       })
       }
    const getpro = () => {
      axios.get(`${config.apiUrl}/producers/getProducer`,config1)
       .then(async (response) => {
           console.log(response);
           setpro(response.data.producer);
          }).catch(error => {
         if(error.response.status===401){
           alert("Login token has been expired!!Login again")
           localStorage.removeItem('auth_token');
         }
         console.error(`An Error Occuredd! ${error}`);
       })
       }
    
    const gettempo = () => {
       
      axios.get(`${config.apiUrl}/tempos/getTempo`)
      .then(async (response) => {
       console.log("tempo====="+response);
        settempo(response.data.tempo);
      }).catch(error => {
        if(error.response.status==401){
          alert("Login token has been expired!!Login again")
          localStorage.removeItem('auth_token');
        }
        console.error(`An Error Occuredd! ${error}`);
      })
      }
     
    
      const getkeyword = () => {
       
      axios.get(`${config.apiUrl}/keys/getKeys`)
      .then(async (response) => {
       console.log(response);
        setkeyword(response.data.key);
        
      //  SetInitialValues(response.data.artist);
      }).catch(error => {
        if(error.response.status==401){
          alert("Login token has been expired!!Login again")
          localStorage.removeItem('auth_token');
        }
        console.error(`An Error Occuredd! ${error}`);
      })
      }
      const getmood = () => {
       
        axios.get(`${config.apiUrl}/moods/getMood`)
        .then(async (response) => {
      
          console.log(response);
          setmood(response.data.tempo);
          
        //  SetInitialValues(response.data.artist);
        }).catch(error => {
          if(error.response.status==401){
            alert("Login token has been expired!!Login again")
            localStorage.removeItem('auth_token');
          }
          console.error(`An Error Occuredd! ${error}`);
        })
        }
const getdropdown = () => {
  sleep(1000).then(() => {
axios.get(`${config.apiUrl}/users/dropDown`)
.then(async (response) => {
  console.info('====', response.data)
  setartists(response.data.Artist);
  setgenres(response.data.Genre);
 
  
//  SetInitialValues(response.data.artist);
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
  console.log(id);
  sleep(1000).then(() => {
    axios.get(`${config.apiUrl}/subgenres/getSubGenre/`+id)
  .then(function (response) {
    setstyle({display:'block'})
    setsubgenres(response.data.subgenre);
      
  })
})
}  






  var tifOptionskey: any[] = [];
  const optionskeyword : any[]= [];
    if(keywords.length!=0){
      tifOptionskey = Object.keys(keywords).map(function(key: any,value:any) {
        // return  optionskeyword.push({ value: keywords[key]['_id'], label: keywords[key]['key_name'] });
          return <option value={keywords[key]['_id']} key={key}>{keywords[key]['key_name']}</option>
        
    });
     
    }
    var soundoptions: any[] = [];
   
      if(sounds.length!=0){
        Object.keys(sounds).map(function(key: any,value:any) {
           return  soundoptions.push({ value: sounds[key]['_id'], label: sounds[key]['sound_name'] });
            // return <option value={sounds[key]['_id']} key={key}>{sounds[key]['sound_name']}</option>
          
      });
       
      }
    var tifOptionsmood: any[] = [];
    const optionsmood : any[]= [];
      if(mood.length!=0){
        
        tifOptionsmood = Object.keys(mood).map(function(key: any,value:any) {
        
          // return <option value={mood[key]['_id']} key={key}>{mood[key]['mood_name']}</option>
          return  optionsmood.push({ value: mood[key]['_id'], label: mood[key]['mood_name'] });
          //  return <option value={artists[key]['_id']} key={key}>{artists[key]['artist_name']}</option>
          
      });
       
      }
      var tifOptionspro: any[] = [];
      const prooption : any[]= [];
        if(pro){
          
          tifOptionspro = Object.keys(pro).map(function(key: any,value:any) {
          
            // return <option value={mood[key]['_id']} key={key}>{mood[key]['mood_name']}</option>
            return      <option value={pro[key]['_id']} key={key}>{pro[key]['producer_name']}</option>
            //  return <option value={artists[key]['_id']} key={key}>{artists[key]['artist_name']}</option>
            
        });
         
        }
  var genreOptions: any[] = [];

  if(genres.length!=0){
    genreOptions = Object.keys(genres).map(function(key: any,value:any) {
      if(genres[key]['_id']!="5d70fb3277e3f3361dcc580a"){
       return <option value={genres[key]['_id']} key={key}>{genres[key]['name']}</option>
      }
  });
   
  }

  var tempoOptions: any[] = [];

  if(tempo.length!=0){
    tempoOptions = Object.keys(tempo).map(function(key: any,value:any) {
    
       return <option value={tempo[key]['_id']} key={key}>{tempo[key]['tempo_name']}</option>
      
  });
   
  }
  var subgenreOptions: any[] = [];
  const subgenreoptions : any[]= [];
  if(subgenres.length!=0){
    console.log(subgenres);
    subgenreOptions = Object.keys(subgenres).map(function(key: any,value:any) {
      if(subgenres[key]['_id']!="5d70fb3277e3f3361dcc580a"){
        // return <option value={subgenres[key]['_id']} key={key}>{subgenres[key]['name']}</option>
        return  subgenreoptions.push({ value: subgenres[key]['_id'], label: subgenres[key]['name'] });
      }
      
  });
   
  }

  
    return (
<>
<div id="page-wrapper">
  <div className="user_table user-form">
       <div className="row">
       <div className="col-lg-12">
       <h3>Add Song</h3>
		<div className="inner_form song_form_inner">
    {/* <div className="form_inner"> */}
      <form onSubmit={handleSubmit((val: any) => submit(val, keyword_id,mood_id,subgenres_id,image,song_file_wave,soundlike_id))} encType="multipart/form-data" id="myform">
      
      <div className="col-md-4">
		  <div className="form-group">
				     <Field
           name="songname"
           type="text"
           component={renderField}
           label="Name"  placeholder="Enter Name"  id="songname"
           rules="checkUser|required|string|between:5,15"
        /> 
        </div></div>
			 {/* <Field
          name="url"
          type="text"
          component={renderField}
          label="Url"
          rules = "required|email|string|between:5,20"
        /> */}
          <div className="col-md-4">
		  <div className="form-group">
        	 <Field
          name="price"
          type="text"
          value="79"
          component={renderField}
          label="Price"
         
          rules = "required|email|string|between:5,20"
        />
        </div>
        </div>
        <div className="col-md-4">
        <div className="form-group">
          <label>Sounds like</label>
          <div className="multi_select">
          <Select name="soundslike" placeholder="Select a sound like..."
                isMulti
              options={soundoptions}
              onChange={handleChangesound} />
          {/* <Field name="soundslike" component="select" label="genre" className="form-control"  >
            <option value="">Select a sound like...</option>
          
           {soundoptions}
            </Field> */}
            
          </div>

        </div>
          	 {/* <Field
          name="soundslike"
          type="text"
          component={renderField}
          label="Sounds like"
          rules = "required|email|string|between:5,20"
        /> */}
      
        </div>
    
        <div className="col-md-4">
        <div className="form-group">
          <label>Producer</label>
          <div className="multi_select">
          <Field name="producer" component="select" className="form-control"  >
            <option value="">Select a producer...</option>
          
           {tifOptionspro}
            </Field>
        
          </div>

        </div>
        </div>
   <div className="col-md-4">
        <div className="form-group">
          <label>Key</label>
          <div className="multi_select">
          <Field name="key" component="select" label="genre" className="form-control"  >
            <option value="">Select a key...</option>
          
           {tifOptionskey}
            </Field>
            
          </div>

        </div>
        </div>
     
        <div className="col-md-4">
        <div className="form-group">
        <label>Tempo</label>
            <Field name="tempo" component="select" label="genre" className="form-control"  >
            <option value="">Select a tempo...</option>
          
           {tempoOptions}
            </Field>
            </div>
            </div>

         

           
        <div className="col-md-4">
		  <div className="form-group">
      <label>Select Song(Mp3 file)</label>
      <input type='file' id="imageUpload" name ="img_file" onChange={ (e:any) => setimage(e.target.files[0]) }  />

      </div>
      </div>
      <div className="col-md-4">
		  <div className="form-group">
      <label>Select Song(Wave file)</label>
      <input type='file' id="imageUpload2" name ="song_file_wave" onChange={ (e:any) => setSongFile(e.target.files[0]) }  />

      </div>
      </div>
      <div className="col-md-4">
        <div className="form-group">
        <label>Mood</label>
        <div className="multi_select">
        <Select name="mood" placeholder="Select Mood"
                isMulti
              options={optionsmood}
              onChange={handleChangeMood} /> 
          
  
  

        </div>
        </div>
        </div>
            <div className="col-md-4">
        <div className="form-group">
          <label>Genre</label>
            <Field name="genre" component="select" label="genre" className="form-control" onChange={ (e:any) => getSubgenre(e.target.value) } >
            <option value="">Select a genre...</option>
          
           {genreOptions}
            </Field>
            </div>
            </div>
            
            <div className="col-md-4">
            <div className="form-group seclt_optn" style={style} id="one">
            <label>Subgenre</label>
            <div className="multi_select">
            <Select name="subgenre" placeholder="Select a sub genre..."
                isMulti
              options={subgenreoptions}
              onChange={handleChange1} /> 
              </div>
          
            
            {/* <Field name="subgenre" component="select" label="genre" className="form-control" onChange={handleChange1} >
            <option value="">Select a sub genre...</option>
          
           {subgenreOptions}
            </Field> */}
 </div>
           
            </div>

        
			
        {error && <span>{error}</span>}
        <div className="col-md-12">
				<div className="accunt_btn text-center">
        <div className="col-md-4">
                <a className="btn" id="back_btn" href="javascript: history.go(-1)">Back</a>
                </div>
                <div className="col-md-4">
          <Button type="submit" disabled={submitting}  className="btn">
          Add Song
         </Button>
         </div>
      	</div>
			</div>
		


</form>
{/* </div> */}
     
			<p className="coypright_txt text-center">© 2019, All Rights Reserved.</p>
		</div>
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

  export default reduxForm({
    form: 'loginForm' // a unique identifier for this form
  })(Songs)