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
    meta: {
        touched: boolean;
        error: string;
    };
}

let values = {};
const access_token = localStorage.getItem('admin_access_token');
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

const submit = (val:any,values: any,  keyword_id: any,mood_id:any,subgenres_id:any,image:any,song_file_wave:any,producer_id:any,genre_id:any,tempo_id:any,price:any,name:any,soundlike_id:any,id:any) => {
 
  //  alert(mood_id);
  //  return false;
  values.id = id
  values.subgenre = subgenres_id
  values.key = keyword_id
  values.mood = mood_id
  values.genre = genre_id
  values.tempo = tempo_id
  values.producer = producer_id
  values.image = image
  values.song_file_wave = song_file_wave
  values.songname = name
  values.soundslike = soundlike_id
  values.price = price

 console.log(values,"===================values");
//  return false;
 if (validateForm(values)) {
  $(".my_loader").css('display','block');
  $('body').addClass('modal-open')
  return sleep(1000).then(() => {
 

    var formData = new FormData();
   
    formData.append("id", values.id);
    formData.append("playlist_id", values.genre);
    // formData.append("song_file", image);
    // formData.append("song_file_wave", song_file_wave);
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
    
    const headers = {
      headers: { 'content-type': 'multipart/form-data',"access_token":access_token }
    }
    
   
     axios
      .put(`${config.apiUrl}/songs/editSong`, formData,headers)
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
  // console.log("testttt");
   let fields = data;
   let errors :any = [];
   let formIsValid = true;

   if (!fields["songname"]) {
     formIsValid = false;     throw new SubmissionError({ songname: 'Name field required', _error: '' })
   
   }
  //  if (typeof fields["songname"] !== "undefined") {
  //   if (!fields["songname"].match(/^[a-zA-Z ]*$/)) {
  //     formIsValid = false;
  //   throw new SubmissionError({ songname: 'Please enter alphabet characters only.', _error: ' failed!' })
  //   }else if(fields["songname"].length>15){
  //     formIsValid = false;
  //     throw new SubmissionError({ songname: 'Name must be 15 characters or less.', _error: ' failed!' })
  //   }
  // }
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
//  if (!fields["image"]) {
//      formIsValid = false;
//      // errors["password"] = "*Please enter your password.";
//      throw new SubmissionError({ img_file: 'Please upload your song file.', _error: 'Please upload your song file' })
//    }

  
  //  if (fields["image"]) {
  //   // openModal(false)
   
  //   var get_ext = fields["image"].name.split('.');
  //   var exts = ['mp3'];
  //   get_ext = get_ext.reverse();
  //   if ( $.inArray ( get_ext[0].toLowerCase(), exts ) > -1 ){
  //     // alert( 'Allowed extension!' );
  //   } else {
  //     formIsValid = false;
  //     throw new SubmissionError({ img_file: 'Please select mp3  file',_error: 'Please select mp3 file' })
  //   }
  
  
    
  //  }
  //  if (!fields["song_file_wave"]) {
  //   formIsValid = false;
  //   // errors["password"] = "*Please enter your password.";
  //   throw new SubmissionError({ song_file_wave: 'Please upload your song file.', _error: 'Please upload your song file' })
  // }
  //  if (fields["song_file_wave"]) {
  //   // openModal(false)
   
  //   var get_ext = fields["song_file_wave"].name.split('.');
  //   var exts = ['wav'];
  //   get_ext = get_ext.reverse();
  //   if ( $.inArray ( get_ext[0].toLowerCase(), exts ) > -1 ){
  //     // alert( 'Allowed extension!' );
  //   } else {
  //     formIsValid = false;
  //     throw new SubmissionError({ song_file_wave: 'Please select wave file',_error: 'Please select wave file' })
  //   }
  
  
    
  //  }
   return formIsValid;


 }

 const renderField = ({ input, label, type, meta: { touched, error } }: fieldInterface) => (
  <div className="form-group">
      <label>{label}</label>
      
        <input {...input} placeholder={label} type={type} className="form-control" />
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
    const [mood, setmood] = useState([]);
    const [pro, setpro] = useState();
    const [keywords, setkeyword] = useState([]);
    const [keyword_id, setkeyword_id] = useState([]);
    const [genre_id, setgenre_id] = useState([]);
    const [tempo_id, settempo_id] = useState([]);
    const [price, setprice] = useState([]);
    const [soundlike, setsoundlike] = useState([]);
    
    const [producer_id, setproducer_id] = useState([]);
    const [mood_id, setmood_id] = useState([]);
    const [image, setimage] = useState([]);
    const [song_file_wave, setSongFile] = useState([]);
    const [selectedval, setselectedval] = useState([]);
    const [songdetail, setsongdetail] = useState();
    const [tempo, settempo] = useState([]);
    const [songname, setsongname] = useState('');
    const [selectedtempo, setselectedtempo] = useState({});
    const [keyselected, setkeyselected] = useState({});
    const [selectedmood, setselectedmood] = useState([]);
    const [selectedgenre, setselectedgenre] = useState({});
    const [selectedsubgenre, setselectedsubgenre] = useState({});
    const [selectedsoundlike, setselectedsoundlike] = useState({});
    const [soundlike_id, setsoundlike_id] = useState({});
    const [id, setid] = useState();
    
    const [sounds, setsound] = useState([]);
    const [producer, setproducer] = useState();
  
    React.useEffect(() => {
getsongdetail();
      getdropdown();
      getkeyword();
      getmood();
      gettempo();
      getpro();
      getsounds();
      
    }, []);
 
    let selectedoptions1: any = [];
   
    let songdetail1: any = {};
    
      
    const getsounds = () => {
      axios.get(`${config.apiUrl}/sounds/getsounds`)
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
      
 
    const getsongdetail = () =>{
        let id = props.match.params.id;
        selectedoptions1 = [];
     
        setselectedval(selectedoptions1);
  
      axios.get(`${config.apiUrl}/songs/getSongById/`+id)
      .then(async (response) => {
     console.log(response)
        setsongdetail(response.data.songDetails)
      
        setsongname(response.data.songDetails.song_name);
        // setsongname(response.data.songDetails.song_name);
        setproducer({label: response.data.songDetails.producer.producer_name, value: response.data.songDetails.producer._id});
        setproducer_id(response.data.songDetails.producer._id)
        setkeyword_id(response.data.songDetails.key._id)
        setgenre_id( response.data.songDetails.genre_id._id)
        // setsubgenres_id(response.data.songDetails.subGenre_id._id)
        settempo_id(response.data.songDetails.tempo._id)
        // setsoundlike(response.data.songDetails.soundslike)
        setprice(response.data.songDetails.price)
        const optionskey1 : any= [];
        if(response.data.songDetails.mood!=null){
    
         
          Object.keys(response.data.songDetails.mood).map(function(key: any,value:any) {
     
        
        selectedoptions1.push({value: response.data.songDetails.mood[key]['_id'], label:  response.data.songDetails.mood[key]['mood_name']});
        return  optionskey1.push(response.data.songDetails.mood[key]['_id']);
          })
        }
      let  selectedsubgenre : any = [];
      const optionskeysub : any= [];
      if(response.data.songDetails.mood!=null){
      Object.keys(response.data.songDetails.subGenre_id).map(function(key: any,value:any) {
 
        selectedsubgenre.push({value: response.data.songDetails.subGenre_id[key]['_id'], label:  response.data.songDetails.subGenre_id[key]['name']});
      return  optionskeysub.push(response.data.songDetails.subGenre_id[key]['_id']);
        })
      }
      let  selectedsounds : any = [];
      const optionskeysound : any= [];
      if(response.data.songDetails.mood!=null){
      Object.keys(response.data.songDetails.soundslike).map(function(key: any,value:any) {
 
        selectedsounds.push({value: response.data.songDetails.soundslike[key]['_id'], label:  response.data.songDetails.soundslike[key]['sound_name']});
      return  optionskeysound.push(response.data.songDetails.soundslike[key]['_id']);
        })
      }
    
      setsoundlike_id(optionskeysound.toString())
        setid(id)
        setmood_id(optionskey1.toString())
        setsubgenres_id(optionskeysub.toString())
        setselectedmood(selectedoptions1);
        setselectedtempo({label:  response.data.songDetails.tempo.tempo_name,value: response.data.songDetails.tempo._id});
        setkeyselected({label:  response.data.songDetails.key.key_name,value: response.data.songDetails.key._id});
       setselectedgenre({label:response.data.songDetails.genre_id.name,value: response.data.songDetails.genre_id._id});
       getSubgenre(response.data.songDetails.genre_id._id);
       setselectedsubgenre(selectedsubgenre)
       setselectedsoundlike(selectedsounds)
    
      
        }).catch(error => {
        if(error.response.status==401){
          alert("Login token has been expired!!Login again")
          localStorage.removeItem('auth_token');
        }
        // console.error(`An Error Occuredd! ${error}`);
      })
    }


    const handleChangeKey = (selectedOptions:any)=>{
		  
      const optionskey : any= [];
     setkeyword_id(selectedOptions.value)
    
        setkeyselected(selectedOptions);
        
      
  
     }
  
    const handleChangeMood =(selectedoptions1:any)=>{
      let selectedmoodval:any= [];
      const optionskey1 : any= [];
        if(selectedoptions1!=null){
          Object.keys(selectedoptions1).map(function(key: any,value:any) {
             selectedmoodval.push({ label: selectedoptions1[key]['label'], value: selectedoptions1[key]['value'] });
            return  optionskey1.push(selectedoptions1[key]['value']);
          })
        }
        setmood_id(optionskey1.toString())
        setselectedmood(selectedmoodval)
     
    }
    const handleChange1 =(selectedoptions1:any)=>{
      let selectedmoodval:any= [];
      const optionskey1 : any= [];
        if(selectedoptions1!=null){
          Object.keys(selectedoptions1).map(function(key: any,value:any) {
             selectedmoodval.push({ label: selectedoptions1[key]['label'], value: selectedoptions1[key]['value'] });
            return  optionskey1.push(selectedoptions1[key]['value']);
          })
        }
        setsubgenres_id(optionskey1.toString())
        setselectedsubgenre(selectedmoodval)
     
      // setsubgenres_id(selectedOptions.value)
      // setselectedsubgenre(selectedOptions);
    }
    const handleChangesound =(selectedoptions1:any)=>{
      let selectedmoodval:any= [];
      const optionskey1 : any= [];
        if(selectedoptions1!=null){
          Object.keys(selectedoptions1).map(function(key: any,value:any) {
             selectedmoodval.push({ label: selectedoptions1[key]['label'], value: selectedoptions1[key]['value'] });
            return  optionskey1.push(selectedoptions1[key]['value']);
          })
        }
        setsoundlike_id(optionskey1.toString())
        setselectedsoundlike(selectedmoodval)
    
      // setsubgenres_id(selectedOptions.value)
      // setselectedsubgenre(selectedOptions);
    }
    const handleChangepro =(selectedOptions:any)=>{
      // console.log(selectedOptions);
      setproducer_id(selectedOptions.value)
    
      setproducer(selectedOptions);
    }
    const handleChangegen =(selectedOptions:any)=>{
      getSubgenre(selectedOptions.value)
      // console.log(selectedOptions);
      setgenre_id(selectedOptions.value)
    
      setselectedgenre(selectedOptions);
    }
    const handleChangetempo =(selectedOptions:any)=>{
     
      settempo_id(selectedOptions.value)
    
      setselectedtempo(selectedOptions);
    }
    const handelchangename = (e:any) =>{
  
      setsongname(e.target.value)
      }
      const handelchangeprice = (e:any) =>{
        setprice(e.target.value)
        }
        const handelchangesound = (selectedOptions:any) =>{
          setsoundlike(selectedOptions.value)
          // console.log(selectedOptions);
          setselectedsoundlike(selectedOptions)
          }
    const getpro = () => {
      axios.get(`${config.apiUrl}/producers/getProducer`)
       .then(async (response) => {
          //  console.log(response);
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
      //  console.log("tempo====="+response);
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
      //  console.log(response);
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
      
          // console.log(response);
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
  // console.info('====', response.data)
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
  // console.log(id);
  sleep(1000).then(() => {
    axios.get(`${config.apiUrl}/subgenres/getSubGenre/`+id)
  .then(function (response) {
    setstyle({display:'block'})
    setsubgenres(response.data.subgenre);
      
  })
})
}  

  function readURL(input:any) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e:any) {
            $('#imagePreview').css('background-image', 'url('+e.target.result +')');
            $('#imagePreview').hide();
            $('#imagePreview').fadeIn(650);
        }
        reader.readAsDataURL(input.files[0]);
    }
}
$("#imageUpload").change(function() {

  readURL(this);
 
});



  var tifOptionskey: any[] = [];
  const optionskeyword : any[]= [];
    if(keywords.length!=0){
      tifOptionskey = Object.keys(keywords).map(function(key: any,value:any) {
        return  optionskeyword.push({ value: keywords[key]['_id'], label: keywords[key]['key_name'] });
          // return <option value={keywords[key]['_id']} key={key}>{keywords[key]['key_name']}</option>
        
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



      const options : any[]= [];
      var tifOptionspro: any[] = [];
      if(genres.length!=0){
        tifOptionspro = Object.keys(pro).map(function(key: any,value:any) {
          
          if(songdetail){
       
          return  options.push({ value: pro[key]['_id'], label: pro[key]['producer_name'] });
         
          }
         
        
        });
      }
    
      // var tifOptionspro: any[] = [];
      // const prooption : any[]= [];
      //   if(pro){
          
      //     tifOptionspro = Object.keys(pro).map(function(key: any,value:any) {
            
      //     if(songdetail){
          
      //     if(songdetail.producer._id == pro[key]['_id']){
      //       alert(songdetail.producer._id)
      //       alert(pro[key]['_id'])
      //       alert("daskdjksjd")
      //       return      <option value={pro[key]['_id']} key={key} selected>{pro[key]['producer_name']}</option>
      //     }else{
      //       return      <option value={pro[key]['_id']} key={key}>{pro[key]['producer_name']}</option>
      //     }
          
      //     }
      //       // return <option value={mood[key]['_id']} key={key}>{mood[key]['mood_name']}</option>
           
      //       //  return <option value={artists[key]['_id']} key={key}>{artists[key]['artist_name']}</option>
            
      //   });
         
      //   }
  var genreOptions: any[] = [];

  if(genres.length!=0){
    Object.keys(genres).map(function(key: any,value:any) {
      if(genres[key]['_id']!="5d70fb3277e3f3361dcc580a"){
        return  genreOptions.push({ value: genres[key]['_id'], label: genres[key]['name'] });
       }
  });
   
  }

  var tempoOptions: any[] = [];

  if(tempo.length!=0){
   Object.keys(tempo).map(function(key: any,value:any) {
      return  tempoOptions.push({ value: tempo[key]['_id'], label: tempo[key]['tempo_name'] });
   });
   
  }
  var subgenreOptions: any[] = [];
  const subgenreoptions : any[]= [];
  if(subgenres.length!=0){
    // console.log(subgenres);
   Object.keys(subgenres).map(function(key: any,value:any) {
    if(subgenres[key]['_id']!="5d70fb3277e3f3361dcc580a"){
      // return <option value={subgenres[key]['_id']} key={key}>{subgenres[key]['name']}</option>
      return  subgenreOptions.push({ value: subgenres[key]['_id'], label: subgenres[key]['name'] });
    }
    	
     
      
  });
   
  }

    return (
      
<>
<div id="page-wrapper">
  <div className="user_table user-form">
       <div className="row">
       <div className="col-lg-12">
       <h3>Update Song</h3>
		<div className="inner_form song_form_inner">
    {/* <div className="form_inner"> */}
      {/* <form onSubmit={handleSubmit((val: any) => submit(val, keyword_id,mood_id,subgenres_id,image,song_file_wave))} encType="multipart/form-data" id="myform"> */}
      <form>
      <div className="col-md-4">
		  <div className="form-group">
      <label htmlFor="email">Enter Name</label>
					<input type="text"  name="songname"  placeholder="Name"  value={songname} onChange={handelchangename} className="form-control" />
				   
        </div></div>
		
          <div className="col-md-4">
		  <div className="form-group">
      <label htmlFor="price">price</label>
    
      <input type="text"  name="price"  placeholder="e.g79"  value={price}   onChange={handelchangeprice} className="form-control" />
 
        </div>
        </div>
        <div className="col-md-4">
		  <div className="form-group">
      <label htmlFor="email">Sounds like</label>
      
      <div className="multi_select">
          	 <Select
              name="soundslike"
       isMulti
	  options={soundoptions}
	  
	  value={selectedsoundlike}
	 onChange={handleChangesound}
      />
         
          </div>
      {/* <input type="text"  name="soundslike"  placeholder="e.g79"  value={soundlike}   onChange={handelchangesound}  className="form-control" /> */}
    
        </div>
        </div>
    
        <div className="col-md-4">
        <div className="form-group">
          <label>Producer</label>
          <div className="multi_select">
          	 <Select
      
	  options={options}
	  
	  value={producer}
	 onChange={handleChangepro}
      />
          {/* <Field name="producer" component="select" className="form-control" value="5d6f98d781f8992afa90f945" >
            <option value="">Select a producer...</option>
          
           {tifOptionspro}
            </Field>
         */}
          </div>

        </div>
        </div>
   <div className="col-md-4">
        <div className="form-group">
          <label>Key</label>
          <div className="multi_select">
          <Select name="key" placeholder="Select Key"
                
                value={keyselected}
              options={optionskeyword}
              onChange={handleChangeKey}/> 
          {/* <Field name="key" component="select" label="genre" className="form-control"  >
            <option value="">Select a key...</option>
          
           {tifOptionskey}
            </Field> */}
        
          </div>

        </div>
        </div>
     
        <div className="col-md-4">
        <div className="form-group">
        <label>Tempo</label>
        <Select name="tempo" placeholder="Select tempo"
               value={selectedtempo}
              options={tempoOptions}
              onChange={handleChangetempo}
           /> 
        
            </div>
            </div>

         

{/*            
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
      </div> */}
      <div className="col-md-4">
        <div className="form-group">
        <label>Mood</label>
        <div className="multi_select">
        <Select name="mood" placeholder="Select Mood"
                isMulti
                value={selectedmood}
              options={optionsmood}
              onChange={handleChangeMood}/> 
           
  
  

        </div>
        </div>
        </div>
            <div className="col-md-4">
        <div className="form-group">
          <label>Genre</label>
          <Select name="genre" placeholder="Select Genre"
                
                value={selectedgenre}
              options={genreOptions}
              onChange={handleChangegen}/> 
          
            </div>
            </div>
            
            <div className="col-md-4">
            <div className="form-group seclt_optn" id="one">
            <label>Subgenre</label>
            <Select name="subgenre" placeholder="Select subgenre"
                 isMulti
                value={selectedsubgenre}
              options={subgenreOptions}
              onChange={handleChange1}/> 
          
 </div>
           
            </div>

        
			
        {error && <span>{error}</span>}
        <div className="col-md-12">
				<div className="accunt_btn text-center">
        <div className="col-md-4">
                <a className="btn" id="back_btn" href="javascript: history.go(-1)">Back</a>
                </div>
                <div className="col-md-4">
                <Button type="button" className="btn"    onClick={(val:any) => submit(val,values,keyword_id,mood_id,subgenres_id,image,song_file_wave,producer_id,genre_id,tempo_id,price,songname,soundlike_id,props.match.params.id)}>
          Update Song
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

  export default Songs