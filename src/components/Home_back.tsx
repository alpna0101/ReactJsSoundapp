
import React, { useState,useContext,useEffect } from 'react';
import { connect } from "react-redux";
import store from '../store';
import Count from './Count'
import {config} from '../config/config'
import play from '../images/play.png';
import pause from '../images/pause.png';
import leftplay from '../images/playleft_arrow.png';
import rightplay from '../images/right_arrow_song.png';
import play_icon from '../images/play_icon.png';
import pause_icon from '../images/pause_icon.png';
import img1 from '../images/img1.png';
import img2 from '../images/img2.png';
import img3 from '../images/img3.png';
import img4 from '../images/img4.png';
import img5 from '../images/img5.png';
import img6 from '../images/img6.png';
import img8 from '../images/img8.png';
import img7 from '../images/img7.png';
import img9 from '../images/img9.png';
import img10 from '../images/img10.png';
import img11 from '../images/img11.png';
import img12 from '../images/img12.png';
import img13 from '../images/img13.png';
import img14 from '../images/img14.png';
import img15 from '../images/img15.png';
import icon from '../images/icon.png';
import vibes from '../images/vibes.png';
import sound from '../images/sound.png';
import download from '../images/download.png';
import sale from '../images/sale.png';
import music from '../images/music.png';
import bullsets from '../images/bullsets.png';
import price_shape from '../images/price_shape.png';
import singer_img from '../images/singer_img.png';
import active_song from '../images/active_wave.png';
import inactive_song from '../images/unactive_wave.png';
import ReactPlayer from 'react-player'
import AOS from 'aos';

import $ from "jquery";
import { Container, Row, Col, Button, SplitButton } from 'react-bootstrap' 
import Pagination from "react-js-pagination";
import axios from 'axios';
// import WavePlayer from 'waveplayer';
import moment, { relativeTimeRounding } from 'moment';
import Wavesurfer from 'react-wavesurfer';
import { unwatchFile } from 'fs';
import ReactAutocomplete from 'react-autocomplete';
import {MusicContext} from '../contexts/MusicContext'

var onetime= false;
var jukeload= false;
var loadlist =false
const hanldleClick = (type: string) => {
    store.dispatch({type});
    // console.log(store.getState().counter)
}
const auth_token = localStorage.getItem('auth_token');






const HomePage = () => {
	var i =0
	const [myval, setmyval] = useState();
  const [songs, setSongs] = useState([]);
  const [playsongs, setPlaysongs] = useState([]);
  const [jukesongs, setJukesongs] = useState([]);
  const [playlist_id, setplaylist_id] = useState([]);
  const [cartdata, setcart] = useState([]);
  const [activePage, setactivepage] = useState(1);
  const [itemPerPage, setitemPerPage] = useState();
  const [totaldata, settotaldata] = useState();
 
const [cart_song, setCartsong] = useState();
const [plans, setplans] = useState([]);
const [modalVisible, setmodalVisible] = useState(false);
const [Style, setStyle] = useState();
const [rating, setrating] = useState();
const [playing_id, setplaying_id] = useState();
const [songurl, setSongurl] = useState();
const [addurl, setAddurl] = useState();
const [playing, setPlaying] = useState(true);
const [addplaying, setAddPlaying] = useState(false);
const [playedtime, setplayedtime] = useState();
const [totaltime, settotaltime] = useState();
const [myvolume, setvolume] = useState(0.1);
const [my_volume, setmyvolume] = useState(0.1);
const [songname, setsongname] = useState();
const [playlist_name, setplaylist_name] = useState();
const [playlist_des, setplaylist_des] = useState();
const [playlist_img, setplaylist_img] = useState();
const [songval, setsongval] = useState([]);
const [timecount, settimecount] = useState();
let [timeri, settimeer] = useState(0);
const [rate, setrate] = useState(false);
const [loaddata, setloaddata] = useState(false);
const [current_playlist, setCurrentPlaylist] = useState();

const {currentSong,Addsong,changeCurrentSong,changeCurrentSongName,changeSong,setBarPlaying,changeCurrentSongId,cartListing,getCartListing} = useContext(MusicContext);

var playaddsong = true;
$( document ).ready(function() {
	var x = $("#idTd").position();
	if(x){
		$("#idDiv").css({left: x.left});
	}
	// alert("Top: " + x.top + " Left: " + x.left);
	
});
$( window ).resize(function() {
	var x = $("#idTd").position();
	// alert("Top: " + x.top + " Left: " + x.left);
	if(x){
		$("#idDiv").css({left: x.left});
	}
});


  const access_token = localStorage.getItem('access_token');
  let config1 = {
	  headers: {
		  'access_token':access_token
	  }
	}
	$("#mysearch").focus(function(){
		$(this).next().addClass("Myautocomlpte")
	  })
	$("#volume_control").unbind('click').click(function(){
		if(myvolume==0){
			setvolume(my_volume);
			$(this).addClass('fa-volume-up')
			$(this).removeClass('fa-volume-off')
		}else{
			setvolume(0);
			$(this).removeClass('fa-volume-up')
			$(this).addClass('fa-volume-off')
		}
	})

	

	const streamsong = (song_id:any)=>{

     
		axios.post(`${config.apiUrl}/streams/addStreamInfo`, {
			song_id: song_id
			 	},config1).then(function (response) {
					 console.log(response.data)
			if(response.data.status==false){
			  alert(response.data.message);
			  // $(".my_loader").css('display','none');
			  // $('body').removeClass('modal-open')
			 }else{
				// alert(response.data.message);
			  // $(".my_loader").css('display','none');
			  // $('body').removeClass('modal-open')
	  
			  // $("#success_message").html(response.data.message)
			  // 		$("#success_model").css("display","block")
			  // 		$("#success_model").addClass("in")
			  
			  
			  
			 }
		  })	
	}
	

	const currentplaylist = (playlist_id:any,currentsong_id:any) => {
		let tracks:any = [];

		axios.get(`${config.apiUrl}/songs/getTopSong`).then(response => response.data)
		.then((data) => {
			// alert(data.songDetails.length)
			localStorage.setItem('totalkeys',data.songDetails.length);
			Object.keys(data.songDetails).map(function(key: any,value:any) {
			
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
				})
   
				localStorage.setItem('tracks', JSON.stringify(tracks));
		 
		 })

		
		// if(playlist_id==="5d70fb3277e3f3361dcc580a"){
		// 	axios.get(`${config.apiUrl}/songs/getSongJuke/`+activePage).then(response => response.data)
		// 	.then((data) => {
		// 		localStorage.setItem('totalkeys',data.songDetails.length);
		// 		Object.keys(data.songDetails).map(function(key: any,value:any) {
				
		// 		   if(data.songDetails[key]['_id']===currentsong_id){
		// 			 localStorage.setItem('current_pos',key);
		// 			   tracks['current_pos'] =key;
		// 			   if(key+1<=data.songDetails.length){
		// 				   tracks['next'] =parseInt(key)+1;
		// 			   }
		// 			   if(key-1>=0){
		// 			   tracks['prev'] =key-1;
		// 			  } 
		// 		   }
		// 		 tracks.push({name:data.songDetails[key]['song_name'],song_file:data.songDetails[key]['song_file'],song_id:data.songDetails[key]['_id']});
		// 			})
	   
		// 			localStorage.setItem('tracks', JSON.stringify(tracks));
			 
		// 	 })
		// }else if(playlist_id=="personal") {
		// 	const access_token = localStorage.getItem('access_token');
		// let config1 = {
		// 	headers: {
		// 		'access_token': access_token,
			
		// 	}
		//   }
		 
		// axios.get(`${config.apiUrl}/songs/personal/`+activePage,config1).then(response => response.data)
		// .then((data) => {
		// 	localStorage.setItem('totalkeys',data.songDetails.length);
		// 	Object.keys(data.songDetails).map(function(key: any,value:any) {
			
		// 	   if(data.songDetails[key]['_id']===currentsong_id){
		// 		 localStorage.setItem('current_pos',key);
		// 		   tracks['current_pos'] =key;
		// 		   if(key+1<=data.songDetails.length){
		// 			   tracks['next'] =parseInt(key)+1;
		// 		   }
		// 		   if(key-1>=0){
		// 		   tracks['prev'] =key-1;
		// 		  } 
		// 	   }
		//   tracks.push({name:data.songDetails[key]['song_name'],song_file:data.songDetails[key]['song_file'],song_id:data.songDetails[key]['_id']});
		   
		  
		 
		// 				 })
	
		// 		localStorage.setItem('tracks', JSON.stringify(tracks))
		
		//  })
	
		// }else{
		// 	axios.get(`${config.apiUrl}/songs/getSong/`+playlist_id+`/`+activePage).then(response => response.data)
		// 	.then((data) => {
	   
		// 	  localStorage.setItem('totalkeys',data.songDetails.length);
		// 	 Object.keys(data.songDetails).map(function(key: any,value:any) {
			 
		// 		if(data.songDetails[key]['_id']===currentsong_id){
		// 		  localStorage.setItem('current_pos',key);
		// 			tracks['current_pos'] =key;
		// 			if(key+1<=data.songDetails.length){
		// 				tracks['next'] =parseInt(key)+1;
		// 			}
		// 			if(key-1>=0){
		// 			tracks['prev'] =key-1;
		// 		   } 
		// 		}
		//    tracks.push({name:data.songDetails[key]['song_name'],song_file:data.songDetails[key]['song_file'],song_id:data.songDetails[key]['_id']});
			
		   
		  
		// 				  })
	
		// 		 localStorage.setItem('tracks', JSON.stringify(tracks));
		// 	  })
		// }
		
	}
	
 

	const playsong=(e:any,playlist_id:any)=>{
		var  id = e.id;
		 hanldleClick('RESET')
		setrate(false)
		if(playlist_name=="Personalized Playlist"){
			playlist_id = "personal"
		}
	    if($('.jukesonglist ul .active').children().children().attr('id')==e.id){
	//if($('.paly_table_lstng tr.active').children().children().attr('id')==e.id){
		   if(playing==false) {
			   setPlaying(true) 
			   setBarPlaying(true)
			  $('.hidden_play').css('display',"block");
			  $("#"+id).attr("src",pause);
			 }else{
				 
				 $("#"+id).attr("src",play);
			   setPlaying(false)  
			   setBarPlaying(false)
			   //$('.hidden_play').css('display',"none");
			  
		 
			 }
	
	   }else{
	   $(".click_meplay").attr("src",play);
	   $('.paly_table_lstng tr').removeClass('active')
	   $('.jukesonglist ul li').removeClass('active')
	
	   setsongname($("#"+id).attr("data-name"));
	   console.log(id)
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
  $("#playlist_btn").click(function() {
$(".modal-backdrop.fade.show").css("z-index", "9999");
	$("#personl_playlist").addClass('in');
	$("#personl_playlist").css("display","block");
	$("#personl_playlist").css("z-index", "99999");
	
	$(".modal-backdrop").css("display","block");
});
  const playsongsnext=(e:any)=>{

	let id = e;
	setPlaying(true) 
	setBarPlaying(true)
	
	$(".tableplayer").removeClass('pause');
   $("#"+id).parent().parent().addClass("active")
   var d = new Date();
	let myurl = $("#"+id).attr("data-url");
	let song_id = $("#"+id).attr("data-id");
	setsongname($("#"+id).attr("data-name"));
	setplaying_id(song_id);
	streamsong(song_id);

	setSongurl(myurl+"?"+d);
		if(playing==false) {
		  setPlaying(true) 
		  setBarPlaying(true)
	      $('.hidden_play').css('display',"block");
	  }
	
	   
  }

  const changessong = (e:any) =>{
	hanldleClick('RESET')
	// var data_type = $("#"+id).attr("data-tyye")
	$(".click_meplay").attr("src",play);
      stopAudio();
     if(e==="nextsong"){
      if($('.paly_table_lstng tr').hasClass('active')){ 
				var next = $('.paly_table_lstng tr.active').next();
				if (next.length == 0) {
					next = $('.paly_table_lstng tr:first-child');
					} 
					var id = next.children().children().attr('id');
					$("#"+id).attr("src",pause);
					   $('.paly_table_lstng tr').removeClass('active')
				     playsongsnext(next.children().children().attr('id'));
		   
		  	 }
			 if($('.jukesonglist ul li').hasClass('active')){
				var next = $('.jukesonglist ul  .active').next();
				// alert(next.length)
				if (next.length == 0) {
					next = $('.jukesonglist ul li:first');
					} 
					console.log(next);
					var id = next.children().children().attr('id');
					
					$("#"+id).attr("src",pause);
					   $('.jukesonglist ul li').removeClass('active')
				   
					   
					   playsongsnext(next.children().children().attr('id'));
		   
			 }
		 }else{
			if($('.paly_table_lstng tr').hasClass('active')){
			var next = $('.paly_table_lstng tr.active').prev();
			
			if (next.length == 0) {
				next = $('.paly_table_lstng tr:last-child');
				} 
				var id = next.children().children().attr('id');
					$("#"+id).attr("src",pause);
				playsongsnext(next.children().children().attr('id'));
		 }
		 if($('.jukesonglist ul li').hasClass('active')){
			var next = $('.jukesonglist ul .active').prev();
		
			if (next.length == 0) {
				next = $('.jukesonglist ul li:last');
				} 
				var id = next.children().children().attr('id');
				$("#"+id).attr("src",pause);
			playsongsnext(next.children().children().attr('id'));
		 }
		
  }
}
  function stopAudio() {
	$(".tableplayer").addClass('pause');
	if($('.paly_table_lstng tr').hasClass('active')){
		var next = $('.paly_table_lstng tr.active');
		var id = next.children().children().attr('id');
		$("#"+id).attr("src",play);

	}
	if($('.jukesonglist ul li').hasClass('active')){
		var next = $('.jukesonglist ul  .active');
		var id = next.children().children().attr('id');
		$("#"+id).attr("src",play);
	}
	setPlaying(false)  
	setBarPlaying(false)
	}

	function startAudio() {
		$(".tableplayer").removeClass('pause');
		if($('.paly_table_lstng tr').hasClass('active')){
			var next = $('.paly_table_lstng tr.active')
		var id = next.children().children().attr('id');
		$("#"+id).attr("src",pause);
			}
			if($('.jukesonglist ul li').hasClass('active')){
				var next = $('.jukesonglist ul  .active');
				var id = next.children().children().attr('id');
				$("#"+id).attr("src",pause);
			}
			setPlaying(true)
			setBarPlaying(true)  
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
		setBarPlaying(true)
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

 
 
 
 
 
 
 
  const getcart = ()=>{
	axios.get(`${config.apiUrl}/carts/getFromCart`,config1).then(response => response.data).then((data) => {
	setcart(data.cart);
	$(".cart_count").html(data.cart.count)

	 })
}

	const add_to_cart=(song_id: any)=> {
	   if(access_token){
			const headers = {
			headers: { 'access_token': access_token}
			}
			axios.post(`${config.apiUrl}/carts/addToCart`, {
			song_id:song_id}, headers).then(function (response) {
			console.log(response);
			if(response.data.status==false){
				alert(response.data.message);
			}else{
				$(".success_message").html(response.data.message);
				setTimeout( () => {
					$(".success_message").html('');
				}, 5000);
				getcart();
			    $(".cart_count").html(response.data.count)
			
			}
			})
		}
	  }

   const delete_cart = (id:any) => {
		const access_token = localStorage.getItem('access_token');
		axios.delete(`${config.apiUrl}/carts/removeFromCart`,{headers: {
			'access_token':access_token },data:{cart_id:id }}
	).then(function (response) {
		if(response.data.status==false){
		alert(response.data.message);
		}else{
			$(".success_message").html(response.data.message);
			$(".cart_count").html(response.data.count)
			getcart();
		
		}
		})
}
  $(document).ready(function() {
	$('.click_me').click(function(event) {
		$('.hidden_play').toggle();
    });
 

	$(function(){
		var shrinkHeader = 50;
		 $(window).scroll(function() {
		   var scroll = getCurrentScroll();
			 if ( scroll >= shrinkHeader ) {
				  $('.header').addClass('shrink');
			   }
			   else {
				   $('.header').removeClass('shrink');
			   }
		 });
	   function getCurrentScroll() {
		   return window.pageYOffset || document.documentElement.scrollTop;
		   }
		//    AOS.init({
		
		// 	duration: 2000,
		//     disable: function() {
		// 		var maxWidth = 800;
		// 		return window.innerWidth < maxWidth;
		// 	  }
		//   })
	   });
	  
	   AOS.init({
		// Global settings:
		disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
		startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
		initClassName: 'aos-init', // class applied after initialization
		animatedClassName: 'aos-animate', // class applied on animation
		useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
		// disableMutationObserver: false, // disables automatic mutations' detections (advanced)
		// debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
		// throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)
	
	
		// Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
		offset: 120, // offset (in px) from the original trigger point
		delay: 100, // values from 0 to 3000, with step 50ms
		duration: 1200, // values from 0 to 3000, with step 50ms
		easing: 'ease', // default easing for AOS animations
		once: false, // whether animation should happen only once - while scrolling down
		mirror: false, // whether elements should animate out while scrolling past them
		anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
	
	});
	  $(".license-btn").unbind('click').click(function(e) {
	
	   if(access_token){
		getcart();
		var dataid =  $(this).attr('data-id');
		setCartsong($(this).attr('id'));
		$("#"+dataid).addClass('in')
		//   $(".modal-backdrop.fade.show").css("z-index", "9999");
		  $("#"+dataid).css("display","block");
		  $("#"+dataid).css("z-index", "99999");
		$(".modal-backdrop").css("display","block");
	}else{

		alert("Please login to purchase a track")
		window.location.href = `${config.appurl}/login`; 
	}
	
    });
	
	 
	});
  $(document).ready(function (){

	$(".scrollnav").click(function (){
		var id = $(this).attr('data-id');
		var new_position = $("#"+id).offset();

		if(new_position){
		
			$('html, body').stop().animate({ scrollTop: new_position.top-52 }, 1000);
		}
	});
	$(".navli").removeClass('active');
 $("#homeli").addClass('active');
	
});
// $(".my_loader").css('display','block');
// $(".modal-backdrop").css('display','block');
// setTimeout(function(){ 
// 	$(".my_loader").css('display','none');
// },2000)
 useEffect(() => {

		const login_count = localStorage.getItem('login_count');
    if(login_count){
		setTimeout(function(){
				$('body').addClass('modal-open')
				$("#myModalplan").addClass('in')
			$("#myModalplan").css("display","block"); }, 1000);
		 }



    // getcart();
    axios.get(`${config.apiUrl}/genres/getGenre`).then(response => response.data)
    .then((data) => {
       console.log(data.genre);
        setSongs(data.genre);
	 })
	

	 getjukeboxtop();
	 getdropdown();
	
	

	



	 

	}, []); // Pass empty array to only run once on mount.
	// alert(access_token);
	useEffect(() => {
		setcart(cartListing)
	},[cartListing])
	const updateplan = (id:any)=>{
		localStorage.removeItem('login_count');
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
			// $("#myModalplan").removeClass('in')
			// $("#myModalplan").css("display","none");
			//  $(".modal-backdrop").css("display","none");
			 window.location.href = `${config.appurl}/purchase`; 
		   }
		})
	  }
	  
	const getdropdown = () => {
	
		axios.get(`${config.apiUrl}/users/dropDown`).then(async (response) => {
		// setartists(response.data.Artist);
	
		setplans(response.data.Plans);
		}).catch(error => {
	
		if(error && error.response && error.response.status==401){
		  alert("Login token has been expired!!Login again")
		  localStorage.removeItem('auth_token');
		}
		console.error(`An Error Occuredd! ${error}`);
	  });

	}
		
	const openmyModal=(modalVisible: any)=> {
		
		
		const modalVisible1 = !modalVisible;
		setmodalVisible(modalVisible1);
         setStyle(modalVisible ? { display: "block",opacity:'1'}: { display: "none" })
		if(modalVisible==true){
			alert("modalVisible")
		  $(".modal-backdrop").css("display","block");
	      $("#myModalplan").addClass('in')
	     $("#myModalplan").css("opacity","1")
		$('body').addClass('modal-open')
		}else{
		
			localStorage.removeItem('login_count');
		  $(".modal-backdrop").css("display","none");
		  $("#myModalplan").removeClass('in')
		  $('body').removeClass('modal-open')
		}
	  }
const getsong =(playlist_id:any,page:any)=>{
	setCurrentPlaylist(playlist_id)
	if($("#"+playlist_id).attr("data-name")=='The Jukebox'){
		getjukebox(page)
		return
  
   }
	$("body").addClass('model-openplay')

	setplaylist_name($("#"+playlist_id).attr("data-name"))

	setplaylist_des($("#"+playlist_id).attr("data-des"))
	
	setplaylist_img($("#"+playlist_id).attr("data-image"))
	$("#myModalplay").addClass('in')
   $('#myModalplay').css("display","block");
 
    axios.get(`${config.apiUrl}/songs/getSong/`+playlist_id+`/`+activePage).then(response => response.data)
    .then((data) => {
		console.log(data)
		setitemPerPage(data.getSongs)
		settotaldata(data.totalSongs)
		 setPlaysongs(data.songDetails);
		 setAddurl(data.song_url);
		 localStorage.setItem('watermark', data.song_url);

     })
}

const getsong1 =(playlist_id:any,page:any)=>{
	setCurrentPlaylist(playlist_id)
	if($("#"+playlist_id).attr("data-name")=='The Jukebox'){
		getjukebox(page)
		return
  
   }
	// $("body").addClass('model-openplay')

	setplaylist_name($("#"+playlist_id).attr("data-name"))

	setplaylist_des($("#"+playlist_id).attr("data-des"))
	
	setplaylist_img($("#"+playlist_id).attr("data-image"))
// 	$("#myModalplay").addClass('in')
//    $('#myModalplay').css("display","block");
 
    axios.get(`${config.apiUrl}/songs/getSong/`+playlist_id+`/`+activePage).then(response => response.data)
    .then((data) => {
		console.log(data)
		setitemPerPage(data.getSongs)
		settotaldata(data.totalSongs)
		 setPlaysongs(data.songDetails);
		 setAddurl(data.song_url);
		 localStorage.setItem('watermark', data.song_url);
	$(".modal-backdrop.fade.show").css("z-index", "0000");
		 $("#personl_playlist").removeClass('in');
		 $("#personl_playlist").css("display","none");
		//  $("#personl_playlist").css("z-index", "99999");
		 
		 $(".modal-backdrop").css("display","none"); 
	 })
	 
}
const getjukeboxtop =()=>{

	
	axios.get(`${config.apiUrl}/songs/getTopSong`).then(response => response.data)
    .then((data) => {
	
		setitemPerPage(data.getSongs)
		settotaldata(data.totalSongs)
	   setJukesongs(data.songDetails);
	   setAddurl(data.song_url);
	   localStorage.setItem('watermark', data.song_url);
	 
     })

 
}
const getjukebox =(page:any)=>{
	
	setplaylist_name("The Jukebox")

	setplaylist_des("A collection of the hottest tracks currently available on Sounds Sphere.")
    axios.get(`${config.apiUrl}/songs/getSongJuke/`+page).then(response => response.data)
    .then((data) => {
		setitemPerPage(data.getSongs)
		settotaldata(data.totalSongs)
	   setPlaysongs(data.songDetails);
	   $(".modal-backdrop.fade.show").css("z-index", "0000");
	   $("#personl_playlist").removeClass('in');
	   $("#personl_playlist").css("display","none");
	  //  $("#personl_playlist").css("z-index", "99999");
	   
	   $(".modal-backdrop").css("display","none"); 
     })
}
$("#playlist_close").click(function(){
	$(".modal-backdrop.fade.show").css("z-index", "0000");
	$("#personl_playlist").removeClass('in');
	$("#personl_playlist").css("display","none");
   //  $("#personl_playlist").css("z-index", "99999");
	
	$(".modal-backdrop").css("display","none"); 	
})
	// $(".back_to").click(function(){
	// 	$("#myModalplay").removeClass('in')
	// 	$("body").removeClass('model-openplay')
	//  $('#myModalplay').css("display","none");
	// })
	var carttr: any = [];
	let pp:number = 0;
	  if(cartdata){
		carttr = Object.keys(cartdata).map(function(key: any,value:any) {
		 pp = pp + parseInt(cartdata[key]['song_id']['price']);
			console.log(pp);
		
		   return <li key={key}><h4>{cartdata[key]['song_id']['song_name']}</h4>
			<button className="btn" onClick={() => {delete_cart(cartdata[key]['_id'])}}><span aria-hidden="true">&times;</span></button>
								</li>
		 });
	
	  }
		var myplaylists: any[] = [];
		if(songs.length!=0){
			myplaylists = Object.keys(songs).map(function(key: any,value:any){
				let fn:any;
				let pid = "playlists/"+songs[key]['_id'];
			 return <div className="col-md-4 col-sm-6" key={key}>
				
			 <a  href={pid} style={{ cursor:'pointer'}} data-image={songs[key]['image']}  data-name={songs[key]['name']}  data-des={songs[key]['description']} id={songs[key]['_id']}>
				 <div className="play_sctn_inner text-center">
					 <div className="play_img">
						 <img src={songs[key]['image'] }></img>
					 </div>
					 <h3>{songs[key]['name'] }</h3>
				 </div>
			 </a>
		 </div>
		  
		   });
		 
		}
		
var myplaylists1: any[] = [];
if(songs.length!=0){
	myplaylists1 = Object.keys(songs).map(function(key: any,value:any){
	 return <li key={key} style={ { cursor:`pointer`} }>
	 <a  data-image={songs[key]['image']} onClick={ (e:any) => getsong1(songs[key]['_id'],1) } data-name={songs[key]['name']} id={songs[key]['_id']}>
	 <h4><img className="click_me" src={songs[key]['image'] } width="100" height="100"/>{songs[key]['name'] }</h4>
	 </a>
 </li>
  
   });
 
}
		$(".continue_shop").click(function(){
			$("body").removeClass('model-openplay')
			var dataid =  $(this).attr('data-id')
			$("#"+dataid).css("display","none");
			$(".modal-backdrop").css("display","none");
			$(".modal-backdrop.fade.in").css("z-index", "unset");
		})
		
  var playlists: any[] = [];
  if(songs.length!=0){
    playlists = Object.keys(songs).map(function(key: any,value:any){
       return  <ol key={key}
                 style={{
                  padding: 15,
                  border: "1px solid #cccccc",
                  width: 250,
                  textAlign: "left",
                  marginBottom: 15,
                  marginLeft: "auto",
                  marginRight: "auto"
                }} ><p><img src={`${config.imgurl}`+songs[key]['image']}></img></p><p>{songs[key]['name']}</p></ol>
     });
   
  }
  var planOptions1: any[] = [];
  if(plans.length!=0){
	planOptions1 = Object.keys(plans).map(function(key: any,value:any) {
	  return <div className="col-md-4 col-sm-6" key={key}>
			  <div className="pricbg_inner">
			  <div className="prcing_outr">
			  <div className="price_headg">
			  <img src={require("../images/price_shape.png")}/>
			  <div>
			  {(plans[key]['amount']==0)?(
				  <>
			  <h5>One Off License</h5>
			  <h1>$79</h1>
			  </>
			   ):(
				   <>
				<h5>{plans[key]['plan_name']}</h5>
				<h1>${plans[key]['amount']}</h1>
				</>
				)}
			  </div>
			  </div>

			  {(plans[key]['amount']==0)?(
			 <>
			 <p className="text-center">Choose this option if you want just one license to make one song</p>
			 <ul>
			 <li><img src={require("../images/bullsets.png")}/><span>Commercial Release</span></li>
			 <li><img src={require("../images/bullsets.png")}/><span>100,000 Streams</span></li>
			 <li><img src={require("../images/bullsets.png")}/><span>Sync Licensing</span></li>
		 </ul>
			 </>
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
                        <a className="btn" href="/profile">Select Plan</a>
                       ):(
			 <button className="btn" onClick={ (e:any) => updateplan(plans[key]['_id']) }>Select Plan</button>
			 )}
			  </div>
			  </div>
			 });
   
  }



  var myplaylistsong: any[] = [];
  if(playsongs.length!=0){
	 

		
	
	  myplaylistsong = Object.keys(playsongs).map(function(key: any,value:any){
		// console.log("Keysssss",playsongs[key]['key']['key_name']);
		let newid = "myplayModal"+key;
		let newid1 = "myplayModalsi"+playsongs[key]["_id"];
		let trid = "tr"+playsongs[key]["_id"];
		let nn = parseInt(key)+1;
		let nextid = "myplayModalsi"+nn;
		if(playing_id===playsongs[key]["_id"] && playing==true){
		
			$("#"+newid1).attr("src",pause);
		}else{
			$("#"+newid1).attr("src",play);
		}
	
	
		let previd = "";
		if(key>0){
			let keynew = key-1
			let previd = "myplayModalsi"+keynew;
		}
		
		let mood = "";
		Object.keys(playsongs[key]['mood']).map(function(key1: any,value1:any){
		
			mood += playsongs[key]['mood'][key1]['mood_name']+", "
	   })
	   mood = mood.replace(/,\s*$/, "");
	   return <tr key={trid} id={trid}>
	  <td><img className="click_meplay" data-type="song" id= {newid1}   data-name={playsongs[key]["song_name"]}  data-id= {playsongs[key]["_id"]} onClick={e => playsong(e.target,playsongs[key]['genre_id']['_id'])} data-url={playsongs[key]['song_file'] } src={play}/>{playsongs[key]['song_name'] }</td>
	   <td>{playsongs[key]['genre_id']['name'] }</td>
	   
	  { playsongs[key]['subGenre_id']? (
	   <td>{playsongs[key]['subGenre_id']['name']}</td>
	  ):(
	 <td></td>
	  )}
	   <td>{playsongs[key]['tempo']['tempo_name']}</td>
	   <td>{playsongs[key]['key']['key_name']}</td>
	   <td>
	 {mood}
	  </td>
	
	   <td><button data-toggle="modal" data-id="myModal2" id={playsongs[key]['_id']} className="btn license-btn" onClick={() => {add_to_cart(playsongs[key]['_id'])}}>lICENSE</button></td></tr>

	   
	  
	
	 });

  }

  var jukesongdata: any[] = [];

  if(jukesongs.length!=0){
	
	
	jukesongdata = Object.keys(jukesongs).map(function(key: any,value:any){

		// console.log("Keysssss",jukesongs[key]['key']['key_name']);
		if(key<=4){
		let newid = "myplayModals"+key;
		let newid1 = "myplayModalss"+key;
		var songimg = play;
		var activeclass = "";
		if (currentSong ==jukesongs[key]['song_file']){
			songimg = pause;
			activeclass = "active";
		   }else{
			songimg = play;
			activeclass = "";
		   }
	
	   return (
	      <li key={key} className={activeclass}>
		  <h4><img className="click_meplay"  data-type="jukebox" id= {newid1} data-id= {jukesongs[key]["_id"]} onClick={e => playsong(e.target,jukesongs[key]['genre_id']['_id'])} data-url={jukesongs[key]['song_file'] } src={songimg} data-name={jukesongs[key]['song_name']}/>{jukesongs[key]['song_name'] }</h4>
			<button data-toggle="modal" data-id="myModal2" id={jukesongs[key]['_id']} onClick={() => {add_to_cart(jukesongs[key]['_id'])}} className="btn license-btn">lICENSE</button>
		</li>
	   )
	}
	 });
	
  }

  var planOptions: any[] = [];
    if(plans.length!=0){
      planOptions = Object.keys(plans).map(function(key: any,value:any) {
		let classname = ""
		  if(key ==0){
			   classname = "fade-left"
		  }
		  if(key ==1){
			classname = "fade-up"
		  }
		  if(key ==2){
			classname = "fade-right"
		  }
        return <div className="col-md-4 col-sm-6" key={key}>
			<div className="prcing_outr" data-aos={classname}>
			<div className="price_headg">
                <img src={require("../images/price_shape.png")}/>
                <div>
                <h5>{plans[key]['plan_name']}</h5>
				{(plans[key]['amount']==0)?(
                <h1>$79</h1>
				):(
					<h1>${plans[key]['amount']}</h1>
					)}	
                </div>
                </div>
  
                {(plans[key]['amount']==0)?(
                <>
                <p className="text-center">Choose this option if you want just one license to make one song</p>
                <ul>
                <li><img src={require("../images/bullsets.png")}/><span>Commercial Release</span></li>
                <li><img src={require("../images/bullsets.png")}/><span>100,000 Streams</span></li>
                <li><img src={require("../images/bullsets.png")}/><span>Sync Licensing
</span></li>
           
                </ul>
                </>
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
				</div>
                
               });
     
    }

	const selectvalue = (e:any) => {
		setmyval(e)
	axios.post(`${config.apiUrl}/songs/search`, {
			soundslike:e
		   
		}).then(function (response) {
		  if(response.data.status==false){
			alert(response.data.message);
		  }else{
			setPlaysongs(response.data.result);
			// setsongval(response.data.result)
	
		   }
		})
		
		
	  }

    return (
  <>
<section className="banner_sctn">
	<div className="container">
		<div className="row">
			<div className="col-md-6 col-sm-6">
				<div className="banner_cntnt" data-aos="fade-top">
					<h1>Connecting You to Your Song</h1>
					<h2>RADIO READY TRACKS</h2>
					<p>Finding quality production should be easy. With this in mind,
					Sounds Sphere was created to deliver an individualized
					experience based on personal taste because your artistry is
					unique to you. We leverage real time data to significantly cut
					down the time it takes to find tracks and release your songs. 
					Create an account for free, fill out some basic information, and start seeing a personalized playlist right away.</p>
					<a className="btn start_explore" href="#playlist">start Exploring</a>
				</div>
			</div>
			<div className="col-md-6 col-sm-6">
				<div className="banner_listng" data-aos="fade-top">
					<div className="banner_listg_headg">

{(() => { if(jukesongs) 
	return(
	<h3>The Jukebox playlist<span><a href="playlists/5d70fb3277e3f3361dcc580a" style={{ cursor:'pointer'}}>View All</a></span></h3>
	)
	})()
	}
						
					</div>
					<div className="innre_listng jukesonglist">
						<ul>
					{jukesongdata}
					</ul>
					</div>  
				</div>
			</div>
		</div>
	</div>
  </section>
  <section className="play_sctn" id="playlist">
	<div className="container">
		<div className="haedg text-center">
			<h2 className="playlist_section">PLAYLISTS</h2>   
			<p>Pick a genre. Start listening. Get inspired.</p>
		</div>
		<div className="row">
			{myplaylists}
			</div>
	</div>
</section>

<section className="features_sctn" id="features" >
	<div className="container">
		<div className="haedg text-center">
			<h2>FEATURES</h2>
			<p>Get better production for your songs without sacrificing convenience or breaking the bank. Browse a personalized playlist of high quality instrumental tracks tailored to your individual style. All tracks are instantly downloadable with an automatically generated license for use.</p>
		</div>
		<div className="row">
			<div className="col-md-10 col-md-offset-1">
	 <div className="features_outr">
					<img src={img7}  data-aos="fade-left"></img>
					<div className="faeture_inner" style={ { backgroundImage: "url("+img12+")" } }  data-aos="fade-right">
						<h3>Quality Tracks</h3>
						<p>Our producers have created for some of the biggest
						names in music. Each track that makes it onto our
						platform is handpicked and must meet our track
						standards requirements.</p>
					</div>
				</div>
				<div className="features_outr odd_feat">
					 <img src={img8}   data-aos="fade-right"></img>
					<div className="faeture_inner"  style={ { backgroundImage: "url("+img13+")" } } data-aos="fade-left">
						<h3>Cutting Edge Technology</h3>
						<p>We believe you should only spend time listening to
						tracks you care about. Our custom algorithm provides a
						unique experience for each user, only showing relevant
						tracks for them</p>
					</div>
				</div>
				<div className="features_outr">
					<img src={img9} data-aos="fade-left"></img>
					<div className="faeture_inner"  style={ { backgroundImage: "url("+img14+")" } }  data-aos="fade-right">
						<h3>Contract Clarity</h3>
						<p>We understand the importance of having a clear contract.
						Our standard non-exclusive license allows you the freedom
						to do what you want with your song. </p>
						<h5>Distribute. Sync. Perform.</h5>
					</div>
				</div>
				<div className="features_outr odd_feat">
					<img src={img10} data-aos="fade-right"></img>
					<div className="faeture_inner"  style={ { backgroundImage: "url("+img15+")" } } data-aos="fade-left">
						<h3>Community Driven</h3>
					<p>We want our members to succeed. We provide helpful
						tips & tricks, music business news, and other resources
						so members can accelerate their career in music.</p>
						<h5>We’re here to help!</h5>
					</div>
				</div> 

			</div>
		</div>
	</div>
</section>
<section className="membr_sctn" id="Membership1">
	<div className="col-md-6 mmr_img">
		<img src={img11}></img>
	</div>
	<div className="col-md-6 membr_text">
		<div className="haedg text-center">
			<h2>Membership</h2>
			<p>As a monthly or yearly member of Sounds Sphere, you'll receive
			special perks to keep you motivated. Up to 58% off our standard
			licenses, a free download credit just for joining, and exclusive
			offers for members only.</p>
		</div>
		<ul className="text-center">
			<li><div><img src={download}></img></div><h4>1 Download Credit/Month</h4></li>
			<li><div><img src={sale}></img></div><h4>Special Offers & Discounts</h4></li>
			<li><div><img src={music}></img></div><h4>Personalized Playlist</h4></li>
		</ul>



		{(() => { if(!access_token)
		return(
		<div className="btn_join text-center">

			<a className="btn" href="/register">JOIN NOW</a>
		</div>
		)
		})()
		}
	</div>
</section>
<section className="pricng_sctn" id="pricing">
	<div className="container">
		<div className="haedg text-center">
			<h2>pricing</h2>
			<p>Sounds Sphere is an investment in your music. Our non-exclusive licensing options are below. Exclusive licensing available on a track by track basis.</p>
		</div>
		<div className="row">
		{planOptions}
		
		</div>
	</div>
</section>






<div className="modal right fade " id="myModal2"  role="dialog" aria-labelledby="myModalLabel2">
		<div className="modal-dialog lic home_lic" role="document">
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
						<a data-dismiss="modal" aria-label="Close"   className="btn continue_shop"  data-id="myModal2"  >Continue Shopping</a>
						<a className="btn" href="/cart">Checkout</a>
					</div>
					</div>

				</div>

			</div>
		</div>
	</div>
	<div className="modal fade plans_popup" id="myModalplan" role="dialog" style={Style}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
        <div className="modal-header">
        <button className="button close" onClick={() => {openmyModal(false)}} data-dismiss="modal" ><a href="/profile"><img src={require("../images/close.png")}></img></a></button>
        </div>
        <div className="modal-body">
        <div className="pricng">
        <h4 className="modal-title text-center">Subscription plan</h4>
        <div className="row">
        {planOptions1}

        </div>
        </div>
        </div>
        </div>
      </div>
</div>
{/* <div className="modal fade in" id="rating_pop" role="dialog"> 
    <div className="modal-dialog modal-sm">
      <div className="modal-content">
	     <div className="modal-body">
        <div className="rating_headg text-center">
          <button type="button" className="close rating_close" data-dismiss="modal">&times;</button>
			<h2>Thank you!</h2>
			<p>Please rate this song. Your feedback is very helpful for us.</p>
        </div>
     
		<div className="star_rtng text-center">
          <fieldset className="rating">
			  <form>
    <input type="radio" id="star5" name="rating" className="ratesong" value="5" /><label className = "full " htmlFor="star5" title="Awesome - 5 stars"></label>
    <input type="radio" id="star4half" name="rating" value="4.5" className="ratesong" /><label className="half " htmlFor="star4half" title="Pretty good - 4.5 stars"></label>
    <input type="radio" id="star4" name="rating" value="4" className="ratesong" /><label className = "full " htmlFor="star4" title="Pretty good - 4 stars"></label>
    <input type="radio" id="star3half" name="rating" value="3.5" className="ratesong" /><label className="half " htmlFor="star3half" title="Meh - 3.5 stars"></label>
    <input type="radio" id="star3" name="rating" value="3" className="ratesong" /><label className = "full " htmlFor="star3" title="Meh - 3 stars"></label>
    <input type="radio" id="star2half" name="rating" value="2.5" className="ratesong" /><label className="half " htmlFor="star2half" title="Kinda bad - 2.5 stars"></label>
    <input type="radio" id="star2" name="rating" value="2" className="ratesong" /><label className = "full " htmlFor="star2" title="Kinda bad - 2 stars"></label>
    <input type="radio" id="star1half" name="rating" value="1.5" className="ratesong" /><label className="half " htmlFor="star1half" title="Meh - 1.5 stars"></label>
    <input type="radio" id="star1" name="rating" value="1" className="ratesong" /><label className = "full" htmlFor="star1" title="Sucks big time - 1 star"></label>
    <input type="radio" id="starhalf" name="rating" value="half" className="ratesong"/><label className="half" htmlFor="starhalf" title="Sucks big time - 0.5 stars"></label>
	</form>
</fieldset>
</div>
<div className="errors"> <strong style={{color: "#F20000"}} className="rating_err"></strong></div> 	
<div className="btn_ok text-center">
<button  className="btn btn_submt btn_rating" onClick={() => {ratesong(playing_id,rating)}}>Ok</button>
</div>
        </div>
        
      </div>
    </div>
  </div> */}
  <div className="my_loader">
          <div className="loading_img">
         <div className="loader_txt"> <img src={require("../images/loading_img.gif")}/>
           <h3>Loading....</h3>
          </div>
      </div>
      <div className="loader_overly"></div>
      </div>


	  <div className="modal right fade playlist_pop" id="personl_playlist"  role="dialog" aria-labelledby="myplalists">
		<div className="modal-dialog" role="document">
			<div className="modal-content">

		
			<div className="modal-header">
			<div className="summry_cart chkout_user">
					<div className="summry_btns">
						<a  style={ { width:`100%`} } href ="/" aria-label="Close" className="btn">Back to home</a>
						
					</div>
					</div>
					
					<button type="button" className="close" id="playlist_close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
					<h4 className="modal-title" id="myplalists">All Playlists</h4>
				</div>
				
		
				<div className="modal-body">
					
				<div className="innre_listng">
						<ul>
							{myplaylists1}
						</ul>
					</div>
				


				</div>

			</div>
		</div>
	</div>
</>    
    )
}

export default HomePage;


