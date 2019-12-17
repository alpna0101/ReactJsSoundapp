import React, { useState,useRef,useContext } from 'react';
// import { connect } from "react-redux";
import store from '../store';
import Count from './Count';
// import { Container, Row, Col,Modal,Button } from 'react-bootstrap' 
import leftplay from '../images/playleft_arrow.png';
import rightplay from '../images/right_arrow_song.png';
import play_icon from '../images/play_icon.png';
import pause_icon from '../images/pause_icon.png';
import img1 from '../images/img1.png';

import play from '../images/play.png';
// import icon from '../images/icon.png';
// import vibes from '../images/vibes.png';
import sound from '../images/sound.png';
import axios from 'axios';
import {config} from '../config/config'
import ReactPlayer from 'react-player'
import $ from "jquery";
import 'bootstrap/dist/js/bootstrap.js';
import Pagination from "react-js-pagination";
import ReactAutocomplete from 'react-autocomplete';
import singer_img from '../images/singer_img.png';
import active_song from '../images/active_wave.png';
import inactive_song from '../images/unactive_wave.png';
import pause from '../images/pause.png';
import {MusicContext} from '../contexts/MusicContext'
import { AuthContext } from '../contexts/AuthContext';

const hanldleClick = (type: string) => {
	store.dispatch({type});
	
  }
const access_token = localStorage.getItem('access_token');
let config1 = {
	headers: {
		'access_token':access_token
	}
  }
const Playlist = () => {
const [playsongs, setPlaysongs] = useState([]);
const [personalsongs, setpersonalsongs] = useState([]);
const [playlistId, setPlaylistId] = useState("");
const [playing, setPlaying] = useState(false);
const [audio, setaudio] = useState();
const [cartdata, setcart] = useState([]);
const [rating, setrating] = useState();
const [playing_id, setplaying_id] = useState();
const [songurl, setSongurl] = useState();
const valueRef = useRef();
const [activePage, setactivepage] = useState(1);
const [itemPerPage, setitemPerPage] = useState();
const [totaldata, settotaldata] = useState();
const [myval, setmyval] = useState();
const [songval, setsongval] = useState([]);
const [cart_song, setCartsong] = useState();
const [playedtime, setplayedtime] = useState();
const [totaltime, settotaltime] = useState();
const [myvolume, setvolume] = useState(0.1);
const [songname, setsongname] = useState();
const [songs, setSongs] = useState([]);
const [playlist_name, setplaylist_name] = useState();
const [playlist_name1, setplaylist_name1] = useState();
const [playlist_img, setplaylist_img] = useState();
const [addurl, setAddurl] = useState();
const [addplaying, setAddPlaying] = useState(false);
const [playlist_des, setplaylist_des] = useState();
const [rate, setrate] = useState(false);
const {currentSong,Addsong,changeCurrentSong,changeCurrentSongName,changeSong,isPlaying,setBarPlaying,currentSongId,changeCurrentSongId,cartListing, getCartListing} = useContext(MusicContext);
const userInfo: any = useContext(AuthContext);
const  handlePageChange=(pageNumber:any)=>{
	setactivepage(pageNumber);

   if(playlistId=="personal"){
   getsong(pageNumber)
	}else{
		
		getsongs(playlistId,pageNumber);
	}	// console.log(`active page is ${pageNumber}`);

	
  }

  var songitem: any = [];
  var songitem1: any = [];

  $( document ).ready(function() {
	$("#personalli").addClass('active')

	var x = $("#idTd").position();

	$("#idDiv").css({left: x.left});
});
$( window ).resize(function() {
	var x = $("#idTd").position();

	$("#idDiv").css({left: x.left});
});

//   song play code start
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

  const access_token = localStorage.getItem('access_token');
  let config1 = {
	  headers: {
		  'access_token':access_token
	  }
	}
  





  const streamsong = (song_id:any)=>{

     
	axios.post(`${config.apiUrl}/streams/addStreamInfo`, {
		song_id: song_id
			 },config1).then(function (response) {
				//  console.log(response.data)
		if(response.data.status==false){
		  alert(response.data.message);
		 
		 }else{
		
		  
		  
		  
		 }
	  })	
}







  $(".rating_close").click(function(){
	$("#rating_pop").css('display',"none");
	setPlaying(true) 
 })
  const onDuration = (duration:any) => {
	// console.log('onDuration', duration)
	settotaltime((duration/60).toFixed(2))
  }


  const currentplaylist = (playlist_id:any,currentsong_id:any,activePage:any) => {
	
	let tracks:any = [];
	if(playlist_id==="personal"){
	
		Object.keys(personalsongs).map(function(key: any,value:any) {
		
			if(personalsongs[key]['_id']===currentsong_id){
			  localStorage.setItem('current_pos',key);
				tracks['current_pos'] =key;
				if(key+1<=personalsongs.length){
					tracks['next'] =parseInt(key)+1;
				}
				if(key-1>=0){
				tracks['prev'] =key-1;
			   } 
			}
		tracks.push({name:personalsongs[key]['song_name'],song_file:personalsongs[key]['song_file'],song_id:personalsongs[key]['_id']});
		
		
		
					  })
	}else{
		Object.keys(playsongs).map(function(key: any,value:any) {
		
			if(playsongs[key]['_id']===currentsong_id){
			  localStorage.setItem('current_pos',key);
				tracks['current_pos'] =key;
				if(key+1<=playsongs.length){
					tracks['next'] =parseInt(key)+1;
				}
				if(key-1>=0){
				tracks['prev'] =key-1;
			   } 
			}
		tracks.push({name:playsongs[key]['song_name'],song_file:playsongs[key]['song_file'],song_id:playsongs[key]['_id']});
		
		
		
					  })
	}


			//   alert(playlist_id)
		  console.log(tracks,"============"+playlist_name)
			  localStorage.setItem('totalkeys',tracks.length);
			  localStorage.setItem('tracks', JSON.stringify(tracks));
			  localStorage.setItem('currentplaylist',playlist_id);
			  
			  localStorage.setItem('activePage',activePage);
			  
			}
  const currentplaylist1 = (playlist_id:any,currentsong_id:any) => {
	  
	let tracks:any = [];
	if(playlist_id==="jukebox"){
		axios.get(`${config.apiUrl}/songs/getSongJuke/`+activePage).then(response => response.data)
		.then((data) => {
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
         console.log(tracks,"============jukebox")
				localStorage.setItem('tracks', JSON.stringify(tracks));
		 
		 })
	}else if(playlist_id=="personal") {
		const access_token = localStorage.getItem('access_token');
	let config1 = {
		headers: {
			'access_token': access_token,
		
		}
	  }
	 
    axios.get(`${config.apiUrl}/songs/personal/`+activePage,config1).then(response => response.data)
    .then((data) => {
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
					 console.log(data.songDetails,"============personal1")
					 console.log(playsongs,"============playsongs")
					 
					 console.log(tracks,"============personal")
			localStorage.setItem('tracks', JSON.stringify(tracks))
	
     })

	}else if(playlist_name!=="The Jukebox" && playlist_id!="personal"){
		axios.get(`${config.apiUrl}/songs/getSong/`+playlist_id+`/`+activePage).then(response => response.data)
		.then((data) => {
		
   
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
					  console.log(tracks,"============"+playlist_name)
			 localStorage.setItem('tracks', JSON.stringify(tracks));
		  })
	}
	
}





 
const playsong=(e:any,playlist_id:any)=>{
	var  id = e.id;
	 hanldleClick('RESET')
	setrate(false)
	if(playlist_name1=="Personalized Playlist"){
		playlist_id = "personal"
	}
	if(playlist_name=="The Jukebox"){
		playlist_id = "jukebox"
	}

	 setPlaylistId(playlist_id)
	 const currSongId = localStorage.getItem('currentSongId');
//   alert($('.paly_table_lstng tr.active').children().children().attr('id')+"=="+e.id)
//  alert($("#"+id).attr('data-id')+"==="+currentSongId)
if($('.paly_table_lstng tr.active').children().children().attr('id')==e.id && currentSongId==$("#"+id).attr('data-id')){

	if(isPlaying==false) {
		setPlaying(true) 
		setBarPlaying(true)
	   $('.hidden_play').css('display',"block");
	   $("#"+id).attr("src",pause);
	 
	 }else{
		 setBarPlaying(false)
		 $("#"+id).attr("src",play);
	   setPlaying(false)  
	  }
   
	  
		
   }else{

   $(".click_meplay").attr("src",play);
   $('.paly_table_lstng tr').removeClass('active')
   $('.jukesonglist ul li').removeClass('active')
  
   setsongname($("#"+id).attr("data-name"));
//    console.log(id)
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
   currentplaylist(playlist_id,song_id,activePage)
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

$(document).ready(function() {
	$(".license-btn").unbind('click').click(function(e) {
		setCartsong($(this).attr('id'));
		getcart();
		var dataid =  $(this).attr('data-id')
		$("#"+dataid).addClass('in')
		  $(".modal-backdrop.fade.show").css("z-index", "9999");
		  $("#"+dataid).css("display","block");
		  $("#"+dataid).css("z-index", "99999");
		$(".modal-backdrop").css("display","block");
	   
	  });
	
	  $(".lincense-close").click(function() {
		var dataid =  $(this).attr('data-id')
		$("#"+dataid).css("display","none");
		$(".modal-backdrop").css("display","none");
		$(".modal-backdrop.fade.in").css("z-index", "unset");
	  });
	  $(".playlist_btn").click(function() {
		$(".modal-backdrop.fade.show").css("z-index", "9999");
		$("#personl_playlist").addClass('in');
		$("#personl_playlist").css("display","block");
		$("#personl_playlist").css("z-index", "99999");
		$("#personl_playlist").css("display","block");
		$(".modal-backdrop").css("display","block");
	});
	});

	
	const add_to_cart=(song_id: any)=> {
			const headers = {
			headers: { 'access_token': access_token}
			}
			axios.post(`${config.apiUrl}/carts/addToCart`, {
			song_id:song_id}, headers).then(function (response) {
			// console.log(response);
			if(response.data.status==false){
				alert(response.data.message);
				
			}else{
			$(".success_message").html(response.data.message);
			$(".cart_count").html(response.data.count)
			getcart();
			// $( ".lincense-close" ).trigger( "click" );
			}
			})
			
	  }
	  $(".continue_shop").click(function(){
		$("body").removeClass('model-openplay')
		var dataid =  $(this).attr('data-id')
		$("#"+dataid).css("display","none");
		$(".modal-backdrop").css("display","none");
		$(".modal-backdrop.fade.in").css("z-index", "unset");
	})
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
   const getcart = ()=>{
		axios.get(`${config.apiUrl}/carts/getFromCart`,config1).then(response => response.data).then((data) => {
        setcart(data.cart);
	     })
	}
	$(document).ready(function() {
	

	});

	$(".heart.fa").click(function() {
		$(this).toggleClass("fa-heart fa-heart-o");
	  });
	
React.useEffect(() => {
	// $('.hidden_play').css('display',"block");
	// setPlaying(true)

	// setSongurl(localStorage.getItem('songurl'))
	$("#personalli").click(function(){

		getsong(1)
	})
		
	getsong(1);
	axios.get(`${config.apiUrl}/carts/getFromCart`,config1).then(response => response.data)
	.then((data) => {
	  setcart(data.cart);
		 })

		 axios.get(`${config.apiUrl}/genres/getGenre`).then(response => response.data)
		 .then((data) => {
			
			 setSongs(data.genre);
		  })

		 
	}, []); 

	React.useEffect(() => {
		//getCartListing()
		setcart(cartListing)
	},[cartListing])


	const getjukebox =(page:any)=>{
	
		setplaylist_name("The Jukebox")
		setplaylist_name1("The Jukebox")
		setactivepage(page)
		setplaylist_des("A collection of the hottest tracks currently available on Sounds Sphere.")
		axios.get(`${config.apiUrl}/songs/getSongJuke/`+page).then(response => response.data)
		.then((data) => {
			setitemPerPage(data.getSongs)
			settotaldata(data.totalSongs)
		   setPlaysongs(data.songDetails);
		   setAddurl(data.song_url);
		   localStorage.setItem('watermark', data.song_url);
		 
		 })
	}
const getsong =(activePage:any)=>{
	setplaylist_name1("Personalized Playlist")
	setactivepage(activePage)
	if(userInfo.data){
		setplaylist_name("Recommended For "+userInfo.data.artist_name)
	
	}
	
	setPlaylistId("personal");
	setplaylist_des("");
	setplaylist_img(img1)
	const access_token = localStorage.getItem('access_token');
	let config1 = {
		headers: {
			'access_token': access_token,
		
		}
	  }
	  let personalsong:any = []
    axios.get(`${config.apiUrl}/songs/personal/1`,config1).then(response => response.data)
    .then((data) => {
		// console.log(data,"get song");
		setitemPerPage(data.getSongs)
		settotaldata(data.totalSongs)
      setpersonalsongs(data.songDetails)
		
		var total = data.getSongs*activePage;
		var start = total-data.getSongs;
	    let personalsong:any = []
         for(var i=start;i<=total-1;i++){
			
			 if(data.songDetails[i]){
				personalsong.push(data.songDetails[i])
			 }
				 
			 
           
		 }
		
		

		 setPlaysongs(personalsong);

		 localStorage.setItem('watermark', data.song_url);
	
		 $("#personl_playlist").removeClass('in');
		 $("#personl_playlist").removeClass('show');
		 $(".modal-backdrop").removeClass('show');
	
		 $("#personl_playlist").css("display","none");

		 $("#personl_playlist").css("display","none");
		 $(".modal-backdrop").css("display","none");
	
     })
}
$(".ratesong").click(function(){
setrating($(this).val());
})
var carttr: any = [];
let pp:number = 0;
  if(cartdata){
    carttr = Object.keys(cartdata).map(function(key: any,value:any) {
	 
		
		pp = pp + parseInt(cartdata[key]['song_id']['price']);
		// console.log(pp);
	
       return <li key={key}><h4>{cartdata[key]['song_id']['song_name']}</h4>
		<button className="btn" onClick={() => {delete_cart(cartdata[key]['_id'])}}><span aria-hidden="true">&times;</span></button>
							</li>
	 });

  }
var myplaylistsong: any[] = [];
if(playsongs.length!=0){
  myplaylistsong = Object.keys(playsongs).map(function(key: any,value:any){
		let newid = "myplayModal"+key;
		let newid1 = "myplayModalsi"+playsongs[key]['_id'];
		let nn = parseInt(key)+1;
		let nextid = "myplayModalsi"+nn;
	    let previd = "";
		if(key>0){
			let keynew = key-1
			let previd = "myplayModalsi"+keynew;
		}
		var songimg = play;
		
		if (currentSongId ==playsongs[key]['_id']){
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
	  <td><img className="click_meplay" style={{maxWidth: 'unset'}}  id= {newid1} data-next={nextid}  data-name={playsongs[key]["song_name"]} data-des={playsongs[key]['description']} data-prev={previd} data-id= {playsongs[key]["_id"]} onClick={e => playsong(e.target,playsongs[key]['genre_id']['_id'])} data-url={playsongs[key]['song_file'] } src={songimg}/></td><td>{playsongs[key]['song_name'] }</td>
	   <td>{playsongs[key]['genre_id']['name'] }</td>
	   
	
	 <td>{subgenre}</td>
	
	   <td>{playsongs[key]['tempo']['tempo_name']}</td>
	   <td>{playsongs[key]['key']['key_name']}</td>
	   <td>
	 {mood}
	  </td>
	
	   <td><button data-toggle="modal" data-id="myModal2" id={playsongs[key]['_id']} className="btn license-btn" onClick={() => {add_to_cart(playsongs[key]['_id'])}}>lICENSE</button></td></tr>
	    
	   </>
	  });
 
}
const getsongs =(playlist_id:any,activePage:any)=>{
	
	setPlaylistId(playlist_id)
	// setPlaylistId(activePage)
	setactivepage(activePage)

	if(playlist_id==="5d70fb3277e3f3361dcc580a" || playlist_id=='jukebox'){
		getjukebox(activePage);
		$( "#playlist_close" ).trigger( "click" );
	}else{
	setplaylist_name($("#"+playlist_id).attr("data-name"))
	setplaylist_des($("#"+playlist_id).attr("data-des"))
	setplaylist_img($("#"+playlist_id).attr("data-image"))
// 	$("#myModalplay").addClass('in')
//  $('#myModalplay').css("display","block");
setplaylist_name1($("#"+playlist_id).attr("data-name"))
    axios.get(`${config.apiUrl}/songs/getSong/`+playlist_id+`/`+activePage).then(response => response.data)
    .then((data) => {
		setitemPerPage(data.getSongs)
		settotaldata(data.totalSongs)
		 setPlaysongs(data.songDetails);
		 $( "#playlist_close" ).trigger( "click" );
	 })
	}
}

								
			

var myplaylists: any[] = [];
if(songs.length!=0){
	myplaylists = Object.keys(songs).map(function(key: any,value:any){
	 return <li key={key} style={ { cursor:`pointer`} }>
	 <a data-dismiss="modal"  data-image={songs[key]['image']} onClick={ (e:any) => getsongs(songs[key]['_id'],1) } data-name={songs[key]['name']} data-des={songs[key]['description']} id={songs[key]['_id']}>
	 <h4><img className="click_me" src={songs[key]['image'] } width="100" height="100"/>{songs[key]['name'] }</h4>
	 </a>
 </li>
  
   });
 
}

	// playlists/getPlaylist
    return (
        <>
       <section className="playlist_banr">
	<div className="container-fluid">
		<div className="row">
			<div className="col-lg-2 col-md-3 col-sm-3 col-sm-12">
				<div className="playlist_img">
				<a data-toggle="modal" data-target="#personl_playlist" id="playlist_btn" className="btn">View All Playlists</a>
					<img src={playlist_img}/>
				</div>
			</div>
			<div className="col-lg-10 col-md-9 col-sm-9 col-sm-12">
				<div className="palylst_cntnt">
					<h4>PLAYLIST</h4>
					<h3>{playlist_name}</h3>
					<h5>{playlist_des}</h5>
					<div className="seach_bar">
					 <ReactAutocomplete className="form-control"
  getItemValue={(item:any) => item.soundslike}
  items={songval}
  renderItem={(item:any, isHighlighted:any) =>
    <div style={{ background: isHighlighted ? 'lightgray' : 'white' }} >
      {item.soundslike}
    </div>
  }
  inputProps={{ placeholder: 'Search here' , id: 'mysearch' }}
 
  value={myval}
  onChange={ (e:any) => handleInputChange(e.target.value) }
  onSelect={(val:any) => selectvalue(val)}
/> 
						{/* <input className="form-control"  onChange={ (e:any) => handleInputChange(e.target.value) }   placeholder="Search here" type="text"/> */}
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
<section className="paly_table_lstng">
	<div className="col-md-12 paddg_0">
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
						  {myplaylistsong}
					
						</tbody>
					</table>
				</div>
		</div>
	</div>
	<Pagination
          activePage={activePage}
          itemsCountPerPage={10}
          totalItemsCount={totaldata}
          pageRangeDisplayed={10}
          onChange={handlePageChange}
        />
</section>


<div className="modal right fade playlist_pop" id="personl_playlist"  role="dialog" aria-labelledby="myplalists">
		<div className="modal-dialog" role="document">
			<div className="modal-content">

		
			<div className="modal-header">
			<div className="summry_cart chkout_user">
					<div className="summry_btns">
						<a  style={ { width:`100%`} }  onClick={() => {getsong(1)}}  data-dismiss="modal" aria-label="Close" className="btn">	My Personalized Playlist</a>
						
					</div>
					</div>
					
					<button type="button" className="close" id="playlist_close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
					<h4 className="modal-title" id="myplalists">Other Playlist</h4>
				</div>
				
		
				<div className="modal-body">
					
				<div className="innre_listng">
						<ul>
							{myplaylists}
						</ul>
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
  <div className="modal right fade" id="myModal2"  role="dialog" aria-labelledby="myModalLabel2">
		<div className="modal-dialog lic" role="document">
			<div className="modal-content">

			
			<div className="modal-header">
			<h4 className="modal-title" id="myModalLabel2">	License Song</h4>
					{/* <button type="button" className="close lincense-close" data-id="myModal2" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button> */}
					
				</div>
				
		
				<div className="modal-body">
					
				<div className="innre_listng license_song">
						<ul>
							{carttr}
						
						</ul>
					</div>
					<div className="summry_cart chkout_user">
					<div className="summry_btns">
						<a data-dismiss="modal" aria-label="Close"  data-id="myModal2"  className="btn continue_shop">Continue Shopping</a>
						<a className="btn" href="/cart">Checkout</a>
					</div>
					</div>

				</div>

			</div>
		</div>
	</div>
        </>


    )


}

export default Playlist;