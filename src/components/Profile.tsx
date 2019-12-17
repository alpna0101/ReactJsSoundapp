
import React, { useState,useEffect,useContext,useCallback,useRef } from 'react';
// import ReactDOM from "react-dom";
import PropTypes, { func } from "prop-types";
import Moment from 'react-moment';
// import { connect } from "react-redux";
import store from '../store';
import Count from './Count'
import { Container, Row, Col,Modal,Button } from 'react-bootstrap' 
import profl_bg from '../images/profl_bg.png';
import prof_img from '../images/prof_img.png';

import editpng from '../images/edit_bg.png';
import play from '../images/play.png';
import close from '../images/close.png';
import { AuthContext } from '../contexts/AuthContext';
import {config} from '../config/config'
import axios from 'axios';
import ReactPlayer from 'react-player'
import singer_img from '../images/singer_img.png';
import active_song from '../images/active_wave.png';
import inactive_song from '../images/unactive_wave.png';
import pause from '../images/pause.png';
import leftplay from '../images/playleft_arrow.png';
import rightplay from '../images/right_arrow_song.png';
import play_icon from '../images/play_icon.png';
import pause_icon from '../images/pause_icon.png';
import $ from "jquery";
import Cropper from 'react-easy-crop'
import getCroppedImg from './cropImage'
import {MusicContext} from '../contexts/MusicContext'


const hanldleClick = (type: string) => {
  store.dispatch({type});
  // console.log(store.getState().counter)
}
interface fieldInterface {
  input: any;
  label: string;
  type: string;
  meta: {
      touched: boolean;
      error: string;
  };
}

const Profile = () => { 
  const [users, setUsers] = useState();
  const [cover, setcover] = useState();
  const [cover_pic, setcover_pic] = useState();
  const [show, setShow] = useState(false);
  const [modalVisible, setmodalVisible] = useState(false);
  const [modalVisible2, setmodalVisible2] = useState(false);
  const [Style, setStyle] = useState();
  const [Style1, setStyle1] = useState();
  const userInfo: any = useContext(AuthContext);
  const [playsongs, setPlaysongs] = useState([]);
  const [plans, setplans] = useState([]);
  const [count, setCount] = useState(userInfo)
  const [cart_song, setCartsong] = useState();
  const [cartdata, setcart] = useState([]);
  const [recieptdata, setrecieptdata] = useState([]);
  const [songval, setsongval] = useState([]);
  
  const [playedtime, setplayedtime] = useState();
  const [totaltime, settotaltime] = useState();
  const [myvolume, setvolume] = useState(0.1);
  const [songname, setsongname] = useState();
  const [playing, setPlaying] = useState(false);
  const [audio, setaudio] = useState();

  const [rating, setrating] = useState();
  const [playing_id, setplaying_id] = useState();
  const [myval, setmyval] = useState();
  const [songurl, setSongurl] = useState();
  const [addurl, setAddurl] = useState();
  const [addplaying, setAddPlaying] = useState(false);
  const [purchase_id, setpurchase_id] = useState();

  const [activePage, setactivepage] = useState(1);
  const {currentSong,Addsong,changeCurrentSong,changeCurrentSongName,changeSong,isPlaying,setBarPlaying,currentSongId,changeCurrentSongId} = useContext(MusicContext);

  const inputEl = useRef(null);
  const playerRef = React.useRef<HTMLElement>(null);
  // const divOrNullishRef = React.useRef<HTMLDivElement>();
  const access_token = localStorage.getItem('access_token');
  let config1 = {
	  headers: {
		  'access_token':access_token
	  }
  }

  // $( document ).ready(function() {
  //   var x = $("#idTd").position();
  //   // alert("Top: " + x.top + " Left: " + x.left);
  //   $("#idDiv").css({left: x.left});
  // });
  // $( window ).resize(function() {
  //   var x = $("#idTd").position();
  //   // alert("Top: " + x.top + " Left: " + x.left);
  //   $("#idDiv").css({left: x.left});
  // });
  const [rate, setrate] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [rotation, setRotation] = useState(0)
  const [croppedImage, setCroppedImage] = useState()
  const [croppedFor, setCroppedFor] = useState()
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])
  let i=0;

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        croppedFor,
        croppedAreaPixels,
        rotation
      )
      console.log('donee', { croppedImage })
      setCroppedImage(croppedImage)
      // blob2file(croppedImage)
      $('#imagePreview').css('background-image', 'url('+croppedImage +')');
      $('#cropImg').css('display', 'none');
      $('#cropImg').removeClass('in');
      updatecoverpic(croppedImage)
    } catch (e) {
      console.error(e)
    }
  }, [croppedAreaPixels, rotation])

  

  function readURL(input:any) {
    if (input.files && input.files[0]) {
      
        checkfile(input.files[0])
        var reader = new FileReader();
        reader.onload = function(e:any) {
   
          setCroppedFor(e.target.result)
         $("#cropImg").css("display","block");
         $("#cropImg").addClass("in");
            // $('#imagePreview').css('background-image', 'url('+croppedFor +')');
            $('#imagePreview').hide();
            $('#imagePreview').fadeIn(650);
        }
        reader.readAsDataURL(input.files[0]);
    }
}

$("#imageUpload2").change(function() {
 readURL(this);
 
});
localStorage.removeItem('login_count');
  const handlechangepic = (e:any) =>{
    console.log(e);
   var get_ext = e.name.split('.');

     var exts = ['png','jpg','jpeg','gif'];
      get_ext = get_ext.reverse();
      console.log( $.inArray ( get_ext[0].toLowerCase(), exts ) > -1)
      if ( $.inArray ( get_ext[0].toLowerCase(), exts ) > -1 ){

        var reader = new FileReader();

          reader.onload = function(e:any) {
            alert(e.target.result);
        setcover(e);
       
          }
        // $('#cropImg').css('display', 'block');
        // $('#cropImg').addClass('in');
      
     
      } else {
        alert("'Please select a valid image file")
       return false;
      }
   
  }

const updatecoverpic=(croppedImage:any)=>{

  var formData = new FormData();
  formData.append("cover_pic", croppedImage);
  const access_token = localStorage.getItem('access_token');

  const headers = {
    headers: { 'access_token': access_token }
  }
  axios
    .put(`${config.apiUrl}/users/editProfiles`, formData,headers)
    .then(response => {
     console.log(response.data.result);
     setcover_pic(response.data.result.cover_pic);
    //  window.location.href = `${config.appurl}/login`; 
    })
    .then(json => {
     
     
    })
    .catch(error => {
    console.log(error);
    alert(`An Error Occured! ${error}`);
    
    });
}

  const onClose = useCallback(() => {
    setCroppedImage(null)
  }, [])
    useEffect(() => {
     
    //   $('.hidden_play').css('display',"block");
    //   setPlaying(true)
    //  setSongurl(localStorage.getItem('songurl'));
    //  console.log(playerRef)
    //  playerRef.seekTo(Math.min(22, 22 - 0.5))
     
      if(userInfo.data) {
      if(userInfo.data.cover_pic) {
        console.log(userInfo.data.cover_pic);
        setcover_pic(userInfo.data.cover_pic);
        
      }else{
        setcover_pic(profl_bg);
      }
      
    }
    
    getdropdown()
 
      }, [userInfo]);
//   song play code start
$("#profileli").addClass('active')
$("#volume_control").unbind('click').click(function(){
  if(myvolume==0){
    setvolume(0.1);
    $(this).addClass('fa-volume-up')
    $(this).removeClass('fa-volume-off')
  }else{
    setvolume(0);
    $(this).removeClass('fa-volume-up')
    $(this).addClass('fa-volume-off')
  }
})
const handleInputChange = (e:any) => {
	
	setmyval(e)

	axios.post(`${config.apiUrl}/songs/searchSuggestion`, {
        soundslike:e
       
    }).then(function (response) {
      if(response.data.status==false){
        alert(response.data.message);
      }else{
		setsongval(response.data.result)
	// 	songitem1 = Object.keys(response.data.result).map(function(key: any,value:any) {
	// console.log( response.data.result[key]['song_name']);
	// 		songitem.push({label: response.data.result[key]['song_name']});
			
		
		  
	// 	 });
       }
    })
	
	
  }

  
	const handleChange = (val:any) =>
	{

		
		var player = $('#myplayer audio');
    if(val/100==0){
      $("#volume_control").removeClass('fa-volume-up')
      $("#volume_control").addClass('fa-volume-off')
    }else{
      $("#volume_control").removeClass('fa-volume-off')
      $("#volume_control").addClass('fa-volume-up')
    }
		setvolume(val/100);
	
  }
  
  $(".rating_close").click(function(){
    $("#rating_pop").css('display',"none");
    setPlaying(true) 
	})
 

  const onProgress= (data:any)=> {
  // rating+watermark
  var playseconds = Math.round(data.playedSeconds);
	 
  if(playseconds>0){
  hanldleClick('INCREMENT')
  }
   var custome_timer =  $("#custome_timer").text();
    if(playseconds!=i && playseconds<23){
  playseconds = i; 
  
  }

if(parseInt(custome_timer)>=60){
  var minutes = Math.floor( parseInt(custome_timer) / 60);

  var divisor_for_seconds = parseInt(custome_timer) % 60;
  var seconds = Math.ceil(divisor_for_seconds);
  var minsec =""
  if(seconds<10){
     minsec = minutes+":0"+seconds;	
  }else{
     minsec = minutes+":"+seconds;
  }
  
  setplayedtime(minsec);
}else{
   if(parseInt(custome_timer)<10){
  setplayedtime("0:0"+custome_timer)
 }else{
  setplayedtime("0:"+custome_timer)
 }
  
}
var widthpersectond =  100/data.loadedSeconds*data.playedSeconds+"%";
 $(".active_wave").css("width",widthpersectond)
if(data.playedSeconds===data.loadedSeconds){
  changessong("nextsong")	
}

/* player watermark and rating*/


 
if((parseInt(custome_timer)%22==0) && parseInt(custome_timer)>0 ){
//  setPlaying(false)	
 setAddPlaying(true)
$(".tableplayer").addClass('disabled');
}




if(parseInt(custome_timer)==30 && access_token){

  if(rate==false){
  $("#rating_pop").css('display',"block");
  // setPlaying(false) 
  setrate(true)
  }
}

  }
  const onDuration = (duration:any) => {
//	console.log('onDuration', duration)
	settotaltime((duration/60).toFixed(2))
  }
  const currentplaylist = (playlist_id:any,currentsong_id:any) => {
    let tracks:any = [];
 
   
    if(playlist_id=="purchase"){
      let tracks:any = [];
      Object.keys(userInfo.Purchase).map(function(key: any,value:any) {

      if(userInfo.Purchase[key]['song_id'][0]['_id']===currentsong_id){

        localStorage.setItem('current_pos',key);
        tracks['current_pos'] =key;
        if(key+1<=userInfo.Purchase.length){
          tracks['next'] =parseInt(key)+1;
        }
        if(key-1>=0){
        tracks['prev'] =key-1;
         } 
      }
    tracks.push({name:userInfo.Purchase[key]['song_id'][0]['song_name'],song_file:userInfo.Purchase[key]['song_id'][0]['song_file'],song_id:userInfo.Purchase[key]['song_id'][0]['_id']});
    
    
    
            })
   localStorage.setItem('tracks', JSON.stringify(tracks))
    }else if(playlist_id=="personal") {
      const access_token = localStorage.getItem('access_token');
    let config1 = {
      headers: {
        'access_token': access_token,
      
      }
      }
     
      axios.get(`${config.apiUrl}/songs/personal/`+activePage,config1).then(response => response.data)
      .then((data) => {
      localStorage.setItem('totalkeys',"5");
      Object.keys(data.songDetails).map(function(key: any,value:any) {
      if(key<=4){
         if(data.songDetails[key]['_id']===currentsong_id){
         localStorage.setItem('current_pos',key);
           tracks['current_pos'] =key;
           if(key+1<=data.songDetails.length){
             tracks['next'] =parseInt(key)+1;
           }
           if(key-1>=0){
           tracks['prev'] =key-1;
          } 
         }
      tracks.push({name:data.songDetails[key]['song_name'],song_file:data.songDetails[key]['song_file'],song_id:data.songDetails[key]['_id']});
       
        }
     
             })
  
        localStorage.setItem('tracks', JSON.stringify(tracks))
    
       })
  
    }
    
  }
  const purchaseplaysong=(e:any,playlist_id:any)=>{
    var  id = e.id;
     hanldleClick('RESET')
    setrate(false)
    
  //  alert($('.oinner_puchs_tbl tr.active').children().children().children().attr('id')+"=============="+e.id)
     // if($('.jukesonglist ul .active').children().children().attr('id')==e.id){
   
  if($('.oinner_puchs_tbl tr.active').children().children().children().attr('id')==e.id){
       if(isPlaying==false) {
        
        $('.hidden_play').css('display',"block");
        $("#"+id).attr("src",pause);
        setBarPlaying(true)
        setPlaying(true) 
       }else{
        setBarPlaying(false)
         $("#"+id).attr("src",play);
         setPlaying(false)  
        //  $('.hidden_play').css('display',"none");
        
     
       }
  
     }else{
     $(".click_meplay").attr("src",play);
     $('.oinner_puchs_tbl tr').removeClass('active')
     $('.jukesonglist ul li').removeClass('active')
  
     setsongname($("#"+id).attr("data-name"));

     $("#"+id).parent().parent().parent().addClass("active")
     let myurl = $("#"+id).attr("data-url");
  
     let song_id = $("#"+id).attr("data-id");
     $("#"+id).attr("src",pause);
     $("#"+id).addClass("play");
     changeCurrentSong(myurl ? myurl : "")
     changeCurrentSongId(song_id ? song_id : "")
     let mysongname = $("#"+id).attr("data-name");
     localStorage.setItem('songurl',(myurl ? myurl : ""));
     localStorage.setItem('currentSongname',(mysongname ? mysongname : ""));
     changeCurrentSongName(mysongname ? mysongname : "")
     currentplaylist(playlist_id,song_id)
     setplaying_id(song_id);
     streamsong(song_id);
     var d = new Date();
     setSongurl(myurl+"?"+d);
  
  
      
         if($("#"+id).hasClass("showing")){
         
           //   $('.hidden_play').toggle();
          }else{
        $('.click_meplay').removeClass("showing");
           $("#"+id).addClass("showing");
           setPlaying(true) 
           setBarPlaying(true)
           $('.hidden_play').css('display',"block");
          }
         }
   }

  const playsong=(e:any,playlist_id:any)=>{
    var  id = e.id;
     hanldleClick('RESET')
    setrate(false)
    
   
     // if($('.jukesonglist ul .active').children().children().attr('id')==e.id){
      if(playlist_id=='purchase' && $('.oinner_puchs_tbl tr.active').children().children().attr('id')==e.id){




      }
      
  if($('.paly_table_lstng tr.active').children().children().attr('id')==e.id){
       if(isPlaying==false) {
        
        $('.hidden_play').css('display',"block");
        $("#"+id).attr("src",pause);
        setBarPlaying(true)
        setPlaying(true) 
       }else{
        setBarPlaying(false)
         $("#"+id).attr("src",play);
         setPlaying(false)  
        //  $('.hidden_play').css('display',"none");
        
     
       }
  
     }else{
     $(".click_meplay").attr("src",play);
     $('.paly_table_lstng tr').removeClass('active')
     $('.jukesonglist ul li').removeClass('active')
  
     setsongname($("#"+id).attr("data-name"));

     $("#"+id).parent().parent().addClass("active")
     let myurl = $("#"+id).attr("data-url");
  
     let song_id = $("#"+id).attr("data-id");
     $("#"+id).attr("src",pause);
     $("#"+id).addClass("play");
     changeCurrentSong(myurl ? myurl : "")
     changeCurrentSongId(song_id ? song_id : "")
     let mysongname = $("#"+id).attr("data-name");
     localStorage.setItem('songurl',(myurl ? myurl : ""));
     localStorage.setItem('currentSongname',(mysongname ? mysongname : ""));
     changeCurrentSongName(mysongname ? mysongname : "")
     currentplaylist(playlist_id,song_id)
     setplaying_id(song_id);
     streamsong(song_id);
     var d = new Date();
     setSongurl(myurl+"?"+d);
  
     
      
         if($("#"+id).hasClass("showing")){
         
           //   $('.hidden_play').toggle();
          }else{
        $('.click_meplay').removeClass("showing");
           $("#"+id).addClass("showing");
           setPlaying(true) 
           setBarPlaying(true)
           $('.hidden_play').css('display',"block");
          }
         }
   }

  const playsongsnext=(e:any)=>{

	let id = e;
  setPlaying(true) 
  setsongname($("#"+id).attr("data-name"));
   $("#"+id).parent().parent().addClass("active")
	let myurl = $("#"+id).attr("data-url");
	let song_id = $("#"+id).attr("data-id");

  setplaying_id(song_id);
	streamsong(song_id);
  
  var d = new Date();
  setSongurl(myurl+"?"+d);
		if(playing==false) {
		  setPlaying(true) 
	      $('.hidden_play').css('display',"block");
	  }
	
	   
  }
  const onEndedSong= ()=> {
    hanldleClick('RESET')
  }
  const changessong = (e:any) =>{
    hanldleClick('RESET')
	$(".click_meplay").attr("src",play);
	   stopAudio();
		 if(e==="nextsong"){
      
			var next = $('.paly_table_lstng tr.active').next();
			if (next.length == 0) {
				next = $('.paly_table_lstng tr:first-child');
				} 
		 }else{
			var next = $('.paly_table_lstng tr.active').prev();
			if (next.length == 0) {
				next = $('.paly_table_lstng tr:last-child');
				} 
		 }
		 var id = next.children().children().attr('id');
		 $("#"+id).attr("src",pause);
			$('.paly_table_lstng tr').removeClass('active')
		
			
			playsongsnext(next.children().children().attr('id'));

  }
  function stopAudio() {
  setPlaying(false) 
  $('.paly_table_lstng tr.active  img').attr("src",play); 
	}

	function startAudio() {
    $('.paly_table_lstng tr.active  img').attr("src",pause);
		setPlaying(true)  
		}
		$(".ratesong").unbind('click').click(function(){
			setrating($(this).val());
			})
		// r
const ratesong = (playing_id:any,rating:any)=>{
	if(access_token){

		if(rating){

  axios.post(`${config.apiUrl}/ratings/addRating`, {
	  song_id:playing_id,
	  rating: rating
	 
  }, config1).then(function (response) {
	if(response.data.status==false){
	  alert(response.data.message);
	
	}else{
		// alert(response.data.message);
		setPlaying(true) 
	  $("#rating_pop").css('display',"none")

	 }
  })
}else{
	$(".rating_err").html("Please select rating")
	
}
}else{
	
	$("#rating_pop").css('display',"none")
	alert("Please login to rate song")
}

}

 //   song play code End




      const getdropdown = () => {
       
        axios.get(`${config.apiUrl}/users/dropDown`).then(async (response) => {
        // setartists(response.data.Artist);
      
        setplans(response.data.Plans);
        }).catch(error => {
        if(error.response.status==401){
          alert("Login token has been expired!!Login again")
          localStorage.removeItem('auth_token');
        }
       // console.error(`An Error Occuredd! ${error}`);
      });
     
    }
  const openModal=(modalVisible: any)=> {
   // console.log("Open modal called ",modalVisible);
     const modalVisible1 = !modalVisible;
   setmodalVisible(modalVisible1);
   setStyle(modalVisible
 ? { display: "block",opacity:'1'}: { display: "none" })

  }
  const add_to_cart=(song_id: any)=> {

    const headers = {
      headers: { 'access_token': userInfo.data.access_token }
    }
     axios.post(`${config.apiUrl}/carts/addToCart`, {
      song_id:song_id}, headers).then(function (response) {
      
      if(response.data.status==false){
        alert(response.data.message);
      }else{
        $(".success_message").html(response.data.message);
        setTimeout( () => {
          $(".success_message").html('');
      }, 5000);
        $(".cart_count").html(response.data.count)
        getcart();
       }
    })
       
  }
  $(".continue_shop").click(function(){
    openModal2(false);
  })
  const openModal2=(modalVisible2: any)=> {
   // console.log("Open modal called ",modalVisible2);
     const modalVisible3 = !modalVisible2;
   setmodalVisible2(modalVisible3);
   setStyle1(modalVisible2
? { display: "block",opacity:'1' }
: { display: "none" })
  if(modalVisible2==false){
    $(".modal").removeClass('in')
    $(".modal").css("display","none");
    $(".modal-backdrop").css("display","none");
      $(".modal-backdrop.fade.in").css("z-index", "unset");
  }else{
    $(".modal-backdrop").css("display","block");
    $(".modal-backdrop.fade.in").css("z-index", "9999");
  }
  }
  const cancel_membership=(plan_id: any)=> {
  
    openModal(false);
  }

  const getcart = ()=>{
    let config1 = {
      headers: {
        'access_token': access_token,
      
      }
      }
    axios.get(`${config.apiUrl}/carts/getFromCart`,config1).then(response => response.data).then((data) => {
    setcart(data.cart);
     })
  }
  function checkfile(file_img:any){
    var get_ext = file_img.name.split('.');
   // console.log(file_img.name)
     var exts = ['png','jpg','jpeg','gif'];
      get_ext = get_ext.reverse();
      if ( $.inArray ( get_ext[0].toLowerCase(), exts ) > -1 ){
        // alert( 'Allowed extension!' );
      } else {
        alert("'Please select a valid image file")
       return false;
      }
  }
  
  const streamsong = (song_id:any)=>{

     
		axios.post(`${config.apiUrl}/streams/addStreamInfo`, {
			song_id: song_id
			 	},config1).then(function (response) {
					 console.log(response.data)
			if(response.data.status==false){
			  alert(response.data.message);
			 
			 }else{
			
			  
			  
			  
			 }
		  })	
	}
	
  React.useEffect(() => {
    getsong();
     
   

    }, []); // Pass empty array to only run once on mount.
    $(document).ready(function() {
  	  
      $(".license-btn").unbind('click').click(function(e) {
    
        if(access_token){
       getcart();
 
       setCartsong($(this).attr('id'));
       var dataid =  $(this).attr('data-id')
       //console.log(dataid)
         $("#"+dataid).addClass('in')
        $(".modal-backdrop.fade.show").css("z-index", "9999");
         $("#"+dataid).css("display","block");
         $("#"+dataid).css("z-index", "99999");
        $(".modal-backdrop").css("display","block");
     }else{
       alert("Please login to purchase a track")
     }
     
   });
   $(".lincense-close").click(function() {
    var dataid =  $(this).attr('data-id')
    $("#"+dataid).removeClass('in')
		$("#"+dataid).css("display","none");
		$(".modal-backdrop").css("display","none");
		$(".modal-backdrop.fade.in").css("z-index", "unset");
	  });
     $(".change_acc").click(function(){
      $("body").addClass("modal-open");
      $("#change_status").addClass('in')
      //   $(".modal-backdrop.fade.show").css("z-index", "9999");
        $("#change_status").css("display","block");
        $("#change_status").css("z-index", "99999");
      $(".modal-backdrop").css("display","block");
      
     });
  
     
    $(".closerecp").click(function(){
      $("#view_recpt_modal").removeClass('in')
      //   $(".modal-backdrop.fade.show").css("z-index", "9999");
        $("#view_recpt_modal").css("display","none");
  
      $(".modal-backdrop").css("display","none");
      
     });
    $(".close_pop").click(function(){
      $("#change_status").removeClass('in')
      $("body").removeClass("modal-open");
      //   $(".modal-backdrop.fade.show").css("z-index", "9999");
        $("#change_status").css("display","none");
  
      $(".modal-backdrop").css("display","none");
      
     });
     $(".close_pop_crop").click(function(){
      setCroppedFor('');
      $("#cropImg").removeClass('in')
      //   $(".modal-backdrop.fade.show").css("z-index", "9999");
        $("#cropImg").css("display","none");
  
      $(".modal-backdrop").css("display","none");
      
     });
        $(".change_member").click(function(){
              $('body').addClass('modal-open')
          $("#myModal").addClass('in')
          //   $(".modal-backdrop.fade.show").css("z-index", "9999");
            $("#myModal").css("display","block");
            $("#myModal").css("z-index", "99999");
          $(".modal-backdrop").css("display","block");
          $("#change_status").css("display","none");
        })
  
        $(".plan_close").click(function(){
       
          $("#myModal").removeClass('in')
          //   $(".modal-backdrop.fade.show").css("z-index", "9999");
            $("#myModal").css("display","none");
           
          $(".modal-backdrop").css("display","none");
        })
        
    // $(".license-btn").click(function() {
    //    var dataid =  $(this).attr('data-id')
    //   $("#"+dataid).addClass('in')
    //       $(".modal-backdrop.fade.show").css("z-index", "9999");
    //       $("#"+dataid).css("display","block");
    //       $("#"+dataid).css("z-index", "99999");
    //     $(".modal-backdrop").css("display","block");
       
    //   });
    $(".closerecp").click(function(){
      $("#view_recpt_modal").removeClass('in')
      //   $(".modal-backdrop.fade.show").css("z-index", "9999");
        $("#view_recpt_modal").css("display","none");
   
      $(".modal-backdrop").css("display","none");
      
     });
  
     
      $(".lincense-close").click(function() {
        var dataid =  $(this).attr('data-id');
        $("#"+dataid).removeClass('in')
        $("#"+dataid).css("display","none");
        $(".modal-backdrop").css("display","none");
        $(".modal-backdrop.fade.in").css("z-index", "unset");
      });
    });
    
    const getsong =()=>{
      const access_token = localStorage.getItem('access_token');
      let config1 = {
        headers: {
          'access_token': access_token,
        
        }
        }
        axios.get(`${config.apiUrl}/songs/personal/1`,config1).then(response => response.data)
        .then((data) => {
  
             setPlaysongs(data.songDetails);
             setAddurl(data.song_url);
             localStorage.setItem('watermark', data.song_url);
         })
    }
    var myplaylistsong: any[] = [];
    if(playsongs.length!=0){
     
      myplaylistsong = Object.keys(playsongs).map(function(key: any,value:any){
        let newid = "myplayModal"+key;
        let newid1 = "myplayModalsi"+playsongs[key]['_id'];
        let nn = parseInt(key)+1;
        let nextid = "myplayModalsi"+nn;
        // console.log(nextid,"===nextid")
        let previd = "";
        if(key<=4){
        if(key>0){
          let keynew = key-1
          let previd = "myplayModalsi"+keynew;
        }
        var songimg = play;
		 if(currentSongId == playsongs[key]['_id']){
			songimg = pause;
		   }else{
			songimg = play; 
		   }
        let mood = "";
        Object.keys(playsongs[key]['mood']).map(function(key1: any,value1:any){
        
          mood += playsongs[key]['mood'][key1]['mood_name']+","
         })
         let subgenre = "";
         Object.keys(playsongs[key]['subGenre_id']).map(function(key1: any,value1:any){
         
        subgenre += playsongs[key]['subGenre_id'][key1]['name']+", "
        })
        subgenre = subgenre.replace(/,\s*$/, "");
         return <> <tr key={key} id={playsongs[key]["_id"]} className="trplay">
        <td><img className="click_meplay" style={{maxWidth: 'unset'}} id= {newid1} data-next={nextid}  data-name={playsongs[key]["song_name"]} data-des={playsongs[key]['description']} data-prev={previd} data-id= {playsongs[key]["_id"]} onClick={e => playsong(e.target,"personal")} data-url={playsongs[key]['song_file'] }src={songimg}/></td><td>{playsongs[key]['song_name'] }</td>
         <td>{playsongs[key]['genre_id']['name'] }</td>
         
       
       <td>{subgenre}</td>
       
         <td>{playsongs[key]['tempo']['tempo_name']}</td>
         <td>{playsongs[key]['key']['key_name']}</td>
         <td>
       {mood}
        </td>
      
         <td><button data-toggle="modal" data-id="myModal2" id={playsongs[key]['_id']}  onClick={() => {add_to_cart(playsongs[key]['_id'])}} className="btn license-btn">lICENSE</button></td></tr>
          
         </>
         
    
       
        }
      
       });
     
    }

 const delete_cart = (id:any) => {
  const access_token = localStorage.getItem('access_token');
  axios.delete(`${config.apiUrl}/carts/removeFromCart`,{headers: {
    'access_token':access_token },data:{cart_id:id }}
).then(function (response) {
  if(response.data.status==false){
  alert(response.data.message);
  }else{
    alert(response.data.message);
    getcart();
    $(".cart_count").html(response.data.count)
  }
  })
}
var today = new Date();
var songli: any = '';
const getreciept =(id:any)=>{
  const access_token = localStorage.getItem('access_token');
  $("#songsli").html("");
  setpurchase_id(id)
  axios.get(`${config.apiUrl}/orders/getReceipt/`+id,{headers: {
    'access_token':access_token}}).then(response => response.data)
  .then((data) => {
    //console.log(data);
    const dateTime =data.details[0]['placed_on'];
     const parts = dateTime.split(/[- : T]/);
     //console.log(parts);
   const wanted = `${parts[2]}/${parts[1]}/${parts[0]} ${parts[3]}:${parts[4]}`;
       setrecieptdata(data.details[0])
    
      $("#rname").text(data.details[0]['name'])
      $("#raddress").text(data.details[0]['address'])
      $("#rcity").text(data.details[0]['city'])
      $("#rcountry").text(data.details[0]['country'])
      $("#rcode").text(data.details[0]['postal'])
      // $("#rtrans").text(data.details[0]['trans'])
      $("#rdate").text(wanted)
      
  //console.log(data.details['trans'],"=======");
var pp = 0;
var discount  =  0;
let addonprice: number = 0
let addontr = [];
  if(data.details[0].song_id && data.details[0].status=="A"){
    songli = Object.keys(data.details[0].song_id).map(function(key: any,value:any) {
     pp = pp+parseInt(data.details[0].song_id[key]['price']);

      $("#songsli").append( "<li><h3>"+data.details[0].song_id[key]['song_name']+"<span>$"+data.details[0].song_id[key]['price']+"</span></h3></li>")
      let addons ="";
      addontr = Object.keys(data.details[0].cart_id[key]['addon_id']).map(function(key1: any,value1:any) {
          addonprice =  addonprice + parseInt(data.details[0].cart_id[key]['addon_id'][key1]['price']);
          addons += "<p>"+data.details[0].cart_id[key]['addon_id'][key1]['addon_name']+"<span>$"+ data.details[0].cart_id[key]['addon_id'][key1]['price']+"</span></p>"
      }) 
  });

  if(data.details[0].amount<pp){
    discount = pp-parseInt(data.details[0].amount)
  }
  }
  let amount: number = 0
  let myamount: number = 0
  let song_price: number = 0
  

  if(data.details[0].status=="P"){
    console.log(data.details[0]);
    songli = Object.keys(data.details[0].cart_id).map(function(key: any,value:any) {
     
      let addontr = [];
      let addons ="";
      addontr = Object.keys(data.details[0].cart_id[key]['addon_id']).map(function(key1: any,value1:any) {
          addonprice =  addonprice + parseInt(data.details[0].cart_id[key]['addon_id'][key1]['price']);
          addons += "<p>"+data.details[0].cart_id[key]['addon_id'][key1]['addon_name']+"<span>$"+ data.details[0].cart_id[key]['addon_id'][key1]['price']+"</span></p>"
      })
    
      myamount = myamount + parseInt(data.details[0].cart_id[key]['song_id']['price']);
      amount = myamount
      song_price = parseInt(data.details[0].cart_id[key]['song_id']['price']);
      // myamount = myamount+addonprice;

   $("#songsli").append("<li><h3>"+data.details[0].cart_id[key]['song_id']['song_name']+ "<span>$"+data.details[0].cart_id[key]['song_id']['price']+"</span></h3>"+addons+"</li>")
    
    
});
myamount = myamount+addonprice;

if(data.details[0].amount<myamount){
  discount = myamount-parseInt(data.details[0].amount)
}


  }
 
 if(songli.length>0){
  $("#songsli").append("<li><h3>Add On<span id='rtrans'>$"+addonprice +"</span></h3></li>");
  $("#songsli").append("<li><h3>Discount<span id='rtrans'>$"+discount+"</span></h3></li>");
  $("#songsli").append("<li><h3>Total Transaction<span id='rtrans'>$"+data.details[0].amount+"</span></h3></li>");
  $("#view_recpt_modal").addClass('in')
  $("#view_recpt_modal").css("display","block");
  $("#view_recpt_modal").css("z-index", "99999");
  $(".modal-backdrop").css("display","block");
 }
 
   })
}
  const onEnded= ()=> {

   setPlaying(true)	
  setAddPlaying(false)	
	$(".tableplayer").removeClass('disabled');

  }
 
const downloadreciept = ()=>{

      
  axios.get(`${config.apiUrl}/orders/getPdfReceipt/`+purchase_id,config1).then(async (response) => {
    // setartists(response.data.Artist);
    // console.log(response.data.file)
 window.open(response.data.file)
 $("#view_recpt_modal").removeClass('in')
 $("#view_recpt_modal").css("display","none");
 $(".modal-backdrop").css("display","none");
 

    }).catch(error => {
    if(error.response.status==401){
      alert("Login token has been expired!!Login again")
      localStorage.removeItem('auth_token');
    }
   // console.error(`An Error Occuredd! ${error}`);
  });
 
}
  const onDuration1 = (duration:any) => {
	console.log('onDuration', duration)
	// settotaltime((duration/60).toFixed(2))
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
    // alert(response.data.message);
      window.location.href = `${config.appurl}/purchase`; 
     }
  })
}

const cancelsubscription = (id:any)=>{
  const access_token = localStorage.getItem('access_token');
  const headers = {
    headers: { 'access_token': access_token}
  }
   axios.put(`${config.apiUrl}/subscriptions/cancelnewSubscription`, {
   }, headers).then(function (response) {
      // console.log(response.data);
    if(response.data.status==false){
      alert(response.data.message);
    }else{
      window.location.href = `${config.appurl}/profile`; 
     alert(response.data.message);
       
     }
  })
}
	var carttr: any = [];
	let pp:number = 0;
	  if(cartdata){
      //console.log(cartdata)

		carttr = Object.keys(cartdata).map(function(key: any,value:any) {
		 
			
			pp = pp + parseInt(cartdata[key]['song_id']['price']);
			
		
		   return <li  key={key}><h4>{cartdata[key]['song_id']['song_name']}</h4>
			<button className="btn" onClick={() => {delete_cart(cartdata[key]['_id'])}}><span aria-hidden="true">&times;</span></button>
								</li>
		 });
	
	  }
  var subgenreli: any = [];

  if(userInfo.data){
    subgenreli = Object.keys(userInfo.data.sub_genre).map(function(key: any,value:any) {
    
       return  <li key={key}><button className="btn">{userInfo.data.sub_genre[key]['name']}</button></li>
       
   
      
  });
   
  }


  var purchase: any = [];

  if(userInfo.Purchase){  
 
    purchase = Object.keys(userInfo.Purchase).map(function(key: any,value:any) {
      //console.log(userInfo.Purchase[key]);
      let newid = "myplayPModal"+key;
      let newid1 = "myplayPModalsi"+key;
      var songimg = play;
      if(currentSongId == userInfo.Purchase[key]['song_id'][0]['_id']){
        songimg = pause;
         }else{
        songimg = play; 
         }
      return   <tr  key={key}>
          <td style={{width:"90px",minWidth:"70px"}}>
            <div className="song_name">
                <img className="click_meplay" id= {newid1}   data-name={userInfo.Purchase[key]['song_id'][0]['song_name']}  data-id= {userInfo.Purchase[key]['song_id'][0]["_id"]} onClick={e => purchaseplaysong(e.target,"purchase")} data-url={userInfo.Purchase[key]['song_id'][0]['song_file'] }src={songimg}/>
            </div>
            
            
           </td>
    <td style={{textAlign:"left"}}>{userInfo.Purchase[key]['song_id'][0]['song_name'] }</td>
      <td><Moment format="DD-MM-YYYY">
      {userInfo.Purchase[key]['placed_on']}
           </Moment></td>
    
      <td><button className="btn view_rec"  onClick={() => {getreciept(userInfo.Purchase[key]['_id'])}}>VIEW RECEIPT</button></td>
      </tr>
      
   
    
   
    
   
      
  });
   
  }
  var planOptions: any[] = [];
    if(plans.length!=0){
      
      planOptions = Object.keys(plans).map(function(key: any,value:any) {
     
        return <>
          
           {(userInfo.data && userInfo.data.plan_id._id!=plans[key]['_id'])?(
            <div className="col-md-6 col-sm-6" key={key}>
                <div className="pricbg_inner">
                <div className="prcing_outr">
                <div className="price_headg">
                <img src={require("../images/price_shape.png")}/>
                <div>
                <h5>{plans[key]['plan_name']}</h5>
                <h1>${plans[key]['amount']}</h1>
                </div>
                </div>
  
                {(plans[key]['amount']==0)?(
                <ul>
                <li><img src={require("../images/bullsets.png")}/><span>Personalized Playlist</span></li>
                </ul>
                ):(plans[key]['amount']==49)?(
                <>
                <p className="text-center">Choose this option if you want 1download credit per month to help stay inspired writing and releasing your music</p>
                <ul>
                <li><img src={require("../images/bullsets.png")}/><span>1 Free Credit Per Month</span></li>
                <li><img src={require("../images/bullsets.png")}/><span>38% Discount Off Normal Rate</span></li>
                <li><img src={require("../images/bullsets.png")}/><span>Personalized Playlist</span></li>
                <li><img src={require("../images/bullsets.png")}/><span>1 Free Credit Just for Joining</span></li>
                </ul>
                </>
                ):(
                <>
                <p className="text-center">Choose this option if you want to save on a membership paid up front annually</p>
                <ul>
                <li><img src={require("../images/bullsets.png")}/><span>15 Credits Per Year (Deposited Right Away)</span></li>
                <li><img src={require("../images/bullsets.png")}/><span>58% Discount Off Normal Rate</span></li>
                <li><img src={require("../images/bullsets.png")}/><span>Personalized Playlist</span></li>
                <li><img src={require("../images/bullsets.png")}/><span>10% off Exclusive Licenses</span></li>
                </ul>
                </>
                )}
  
                </div>
                {(plans[key]['amount']==0)?(
                        <a className="btn"onClick={ (e:any) => updateplan(plans[key]['_id']) }>Select Plan</a>
                       ):(
			 <button className="btn" onClick={ (e:any) => updateplan(plans[key]['_id']) }>Select Plan</button>
			 )}
                </div>
                </div>
                 ):(
                   <></>
                 )}
               </>
                
                
                 
               })
      
              
    }
    // $(document).ready(function(){
    //   $(".my_loader").css('display','block');
    //   setTimeout(function(){ 
    //     $(".my_loader").css('display','none');
    //   },1000)
    // })


    return (
   
        <div>

<div className="my_loader">
          <div className="loading_img">
         <div className="loader_txt"> <img src={require("../images/loading_img.gif")}/>
           <h3>Loading....</h3>
          </div>
      </div>
      <div className="loader_overly"></div>
      </div>
    
           <section className="profie_bnner">
                    <div className="container-fluid paddg_0">
                        <div className="avatar-upload">
                            <div className="avatar-edit">
                            <input type='file' className="imageUpload two" id="imageUpload2" accept=".png, .jpg, .jpeg" onChange={ (e:any) => handlechangepic(e.target.files[0]) } />
                            <label htmlFor="imageUpload2"><img src={require("../images/edit.png")}/>Change Cover Image</label>
                            </div>
                            <div className="avatar-preview">
                             <div className="imagepreview" id="imagePreview2" style={ { backgroundImage: "url("+cover_pic+")" } }>
                             </div>
                            </div>
                        </div>
                    </div>
                </section>
                
                {userInfo.data ? (
             
                <section className="profile_sction">
               
                <div className="container">
                
                    <div className="row">
                    <div className="col-md-5 col-sm-12">
                    <div className="profle_chng">
                    <div className="upld_ims">
                        <div className="avatar-upload">
                        <div className="avatar-edit">
                        <input type='file' className="imageUpload three" id="imageUpload3" accept=".png, .jpg, .jpeg" />

                        </div>
                        {userInfo.data ? (
                     
                        <div className="avatar-preview">
                         
                        <div className="imagepreview" id="imagePreview3" style={ { backgroundImage:`url(${userInfo.data.profile_pic})` } }>
                        </div>
                        </div>
                        ):(
                          <div className="avatar-preview">
                          <div className="imagepreview" id="imagePreview3" style={ { backgroundImage: "url("+prof_img+")" } }>
                          </div>
                          </div>
                        )}
                        </div>
                        <div className="user_biodata text-center">
                        <h2>{userInfo.data.name}<span><a href="/edit_profile"><img src={editpng}/></a></span></h2>
                        <h4>{userInfo.data.email}</h4>
                        <h3>{userInfo.data.artist_name}</h3>
                        </div>
                        <div className="gen_type">
                        <h4>Genre</h4>
                        <ul>
                        <li><button className="btn">{userInfo.data.genre.name}</button></li>
                      
                        </ul>
                        <h4>Sub Genre</h4>
                        <ul>
                       {subgenreli}
                        </ul>
                        </div>
                    </div>
                    </div>
                    </div>
                    <div className="col-md-7 col-sm-12">
                    <div className="right_profle">
                    <div className="currnt_subs">
                    <h5>Current subscription</h5>
                    <div className="plan_tabl">
                    <div className="table-responsive">
                    <table className="table">
                    <tbody>
                    {userInfo.Subscribe ? (
                      <>
                    <tr>
                    <th>Plan:</th>
                    <td>{userInfo.data.plan_id.plan_name}</td>
                    <th>Status:</th>
                   
                     
                    <td>Active</td>
                    {/* {userInfo.Subscribe.status==true?(
                    ):(
                  <td>In Active</td>

                    )} */}
                 
                    </tr>
                    <tr>
                    <th>Start Date:</th>
                    <td><Moment format="DD-MM-YYYY">
                    {userInfo.Subscribe.start_time}
            </Moment></td>
                    <th>Next Billing Date:</th>
                    <td><Moment format="DD-MM-YYYY">
                    {userInfo.Subscribe.next_billing_date}
            </Moment></td>
                    </tr>
                    </>
                       ):(
                       <>
                       <tr>
                       <th>Plan:</th>
                       <td>{userInfo.data.plan_id.plan_name}</td>
                       <th>Status:</th>
                       <td>Active</td>
                       
                       </tr>
                       <tr>
                    <th>Start Date:</th>
                    <td>00-00-0000</td>
                    <th>Next Billing Date:</th>
                    <td>00-00-0000
                   </td>
                    </tr>
                       </>
                      )}
                    </tbody>
                    </table>
                    <div>
                    </div>

                    </div>
                    </div>
                    <ul>
                    <li>
                    <h5>Credits Available</h5>
                    <p>{userInfo.data.credit_score}</p>
                    <Button variant="primary"   className="btn change_acc">
                    Change Account Status
                              </Button>
                
                    </li>
                    </ul>
                    </div>
                    <div className="purch_table">
                    <div className="banner_listg_headg">
                    <h3>Purchase History<span><a href="/purchase_history">View All</a></span></h3>
                    </div>
                    {purchase.length==0?(
                       <div className="oinner_puchs_tbl">
                  <h4>No purchase History found</h4>
                  </div>
                    
                    ):(
                    <div className="oinner_puchs_tbl tableresponsive">
                    <div className="table-responsive">
                    <table className="table">
                    <thead>
                    <tr>
                    <th colSpan={2}>Title</th>
                    <th>Purchased Date</th>
                    <th style={{textAlign:"center"}}>View Receipt</th>
                    </tr>
                    </thead>
                    <tbody>
                   {purchase}
               
                    </tbody>
                    </table>
                    </div>
                    </div>
                     )}
                    </div>
                    </div>
                  </div>
                  </div>
                  </div>
                </section>
 ):(
  <section className="profile_sction">
   
  </section>
 )}
    <section className="paly_table_lstng recmnd_sctn">

    <div id="paypal-button-container"></div>
					
	     <div className="col-md-12 paddg_0">
			<h2 className="text-center">Recommended For You</h2>
			<div className="inner_table_listng">
				<div className="table-responsive">
					  <table className="table">
						<thead>
						  <tr>
                <th></th>
							<th>Title</th>
							<th>Genre</th>
							<th>Sub Genre</th>
							<th>Tempo</th>
							<th>Key</th>
							<th>Mood</th>
							<th></th>
						  </tr>
						</thead>
						<tbody>
					{	myplaylistsong}
						
						 
						 
						</tbody>
					</table>
                    </div>
            </div>
			</div>
		</section>
  


    <div className="modal fade plans_popup" id="myModal" role="dialog">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
        <div className="modal-header">
        <button className="button close plan_close" data-dismiss="modal" ><img src={require("../images/close.png")}></img></button>
        </div>
        <div className="modal-body">
        <div className="pricng">
        <h4 className="modal-title text-center">Subscription plan</h4>
        <div className="row">
        {planOptions}

        </div>
        </div>
        </div>
        </div>
      </div>
</div>


<div className="modal right fade" id= "myModal2"  role="dialog" aria-labelledby="myModalLabel2">
       <div className="modal-dialog lic" role="document">
         <div className="modal-content">
   
         
         <div className="modal-header">
         <h4 className="modal-title" id="myModalLabel2">	License Song</h4>
             {/* <button type="button" className="close lincense-close" data-id="myModal2" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button> */}
             
           </div>
           
       
           <div className="modal-body">
           <h4><i className="success_message"></i></h4>
           <div className="innre_listng license_song">
               <ul>
               {carttr}
               </ul>
             </div>
             <div className="summry_cart chkout_user">
             <div className="summry_btns">
               <a data-dismiss="modal" aria-label="Close"   className="btn add_cart continue_shop">Continue Shopping</a>
               <a className="btn" href="/cart">Checkout</a>
             </div>
             </div>
   
           </div>
   
         </div>
       </div>
     </div>




    <div className="modal fade plans_popup" id="change_status" role="dialog"  >
    <div className="modal-dialog modal-sm">
      <div className="modal-content">
       <div className="modal-header">
          <button type="button" className="close close_pop" data-dismiss="modal"  onClick={() => {openModal(false)}}><img src={close}/></button>
        </div>
        <div className="modal-body">
			<div className="chng_status">
           <h4 className="modal-title text-center">Current Plan</h4>
		   <h5 className="text-center">You are subscribed to the monthly membership plan.</h5>
		   <ul className="text-center">
				<li><button className="btn"  onClick={cancelsubscription}>Cancel a Membership</button></li>
				<li><button className="btn change_member" >Change Membership</button></li>
		   </ul>
		   </div>
        </div>
       
      </div>
    </div>
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
          aspect={1827 / 487}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
          // cropShape="round"
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
  <div className="modal fade plans_popup " id="cropImg1" role="dialog" style={Style}>
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
          aspect={1827 / 487}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
          // cropShape="round"
          showGrid={false}
          id="crop"
        />
        
       
      </div>
         
       
    
        </div>
        <Button
          onClick={showCroppedImage}
         
          color="primary"
         style={{zIndex:9999999999999999}}
        >
          Show Result
        </Button>
        </div>
      </div>
</div>
  <div className="modal fade" id="view_recpt_modal" role="dialog" >
  <div className="modal-dialog">
    <div className="modal-content">
       
      <div className="modal-body">
   <button type="button" className="close closerecp" data-dismiss="modal">×</button>
    <div className="col-md-6 padding_0_re">
      <div className="left_recpt_contnt">
        <div className="top_recpt_logo">
          <img src={require("../images/logo_white.png")}/>
        </div>
        <ul>
          <li>
            <h4>Name</h4>
            <p id="rname">Amrita</p>
          </li>
          <li>
            <h4>Address</h4>
            <p id="raddress">#1232 New street, US</p>
          </li>
          <li>
            <h4>City</h4>
            <p id="rcity">Abcdef</p>
          </li>
          <li>
            <h4>Zip or Postal code</h4>
            <p id="rcode">123456</p>
          </li>
          <li>
            <h4>Country</h4>
            <p id="rcountry">Abcdef</p>
          </li>
        </ul>
      </div>
    </div>
    <div className="col-md-6 padding_0_re">
      <div className="ryt_recpt_contnt">
        <h3>Receipt<span id="rdate">7-06-2019</span></h3>
        <ul id="songsli">
    
          
          </ul>
          <div className="text-center dwnld_recipt">
          <button className="btn"  onClick={downloadreciept}>DOWNLOAD RECEIPT</button>
          </div>
      </div>
    </div>
      </div>
    
    </div>
  </div>
</div>
  </div>

 
    )
}

export default Profile;

