
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
  const [users, setUsers] = useState();
  const [cover, setcover] = useState();
  const [cover_pic, setcover_pic] = useState();
  const [show, setShow] = useState(false);
  const [modalVisible, setmodalVisible] = useState(false);
  const [modalVisible2, setmodalVisible2] = useState(false);
  const [Style, setStyle] = useState();
  const [Style1, setStyle1] = useState();

  const [playsongs, setPlaysongs] = useState([]);
  const [userInfo, setuserInfo] = useState();
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
  const access_token = localStorage.getItem('admin_access_token');
  let config1 = {
    headers: {
      'access_token':access_token
    }
    }
    useEffect(() => {
     
        getuser();
   
    
  
 
      }, []);
      const getuser =()=>{
        axios.get(`${config.apiUrl}/users/viewall/`+props.match.params.id,config1)
        .then((response) => {
          console.log(response.data)
            setuserInfo(response.data)
            setcover_pic(response.data.data.cover_pic);
     
               
        }).catch((e) => {
            setuserInfo([])
        })
    
       
      }
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
		console.log($('#myplayer audio').attr);
		console.log(player);
		setvolume(val/100);
		// console.log(val);
		// console.log('Before: ' + player.volume);
		// player.volume = val / 100;
		// console.log('After: ' + player.volume);
	}
  $(".rating_close").click(function(){
		$("#rating_pop").css('display',"none");
	})
  const onProgress= (data:any)=> {

  if(data.playedSeconds>30 && data.playedSeconds<31){
		$("#rating_pop").css('display',"block");
	}
	if(data.playedSeconds>=60){
		setplayedtime((data.playedSeconds / 60).toFixed(2))
	}else{
     if(data.playedSeconds<10){
		setplayedtime("0:0"+Math.round(data.playedSeconds))
	 }else{
		setplayedtime("0:"+Math.round(data.playedSeconds))
	 }
		
	}

	var widthpersectond =  100/data.loadedSeconds*data.playedSeconds+"%";
	// console.log(widthpersectond);
	 $(".active_wave").css("width",widthpersectond)
	if(data.playedSeconds===data.loadedSeconds){
		changessong("nextsong")	
	}
  }
  const onDuration = (duration:any) => {
	console.log('onDuration', duration)
	settotaltime((duration/60).toFixed(2))
  }
  const playsong=(e:any)=>{
	console.log(e.id)
	let id = e.id;

	
	$("#"+id).parent().parent().addClass("active")
	let myurl = $("#"+id).attr("data-url");
	let song_id = $("#"+id).attr("data-id");
	setsongname($("#"+id).attr("data-name"));
	console.log(myurl);
	setplaying_id(song_id);
	setSongurl(myurl);
		if(playing==false) {
		  setPlaying(true) 
	  
		  $('.hidden_play').css('display',"block");
	  
		}else{
		  setPlaying(false)  
	  
		}
	   
			  if($("#"+id).hasClass("showing")){
				  $('.hidden_play').toggle();
			   }else{
			 $('.click_meplay').removeClass("showing");
				  $("#"+id).addClass("showing");
				  setPlaying(true) 
				  $('.hidden_play').css('display',"block");
			   }
  }

  const playsongsnext=(e:any)=>{

	let id = e;
	setPlaying(true) 
   $("#"+id).parent().parent().addClass("active")
	let myurl = $("#"+id).attr("data-url");
	let song_id = $("#"+id).attr("data-id");

	setplaying_id(song_id);
	setSongurl(myurl);
		if(playing==false) {
		  setPlaying(true) 
	      $('.hidden_play').css('display',"block");
	  }
	
	   
  }
  const changessong = (e:any) =>{
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
	}

	function startAudio() {
		setPlaying(true)  
		}
	
		// r


 //   song play code End



  const openModal=(modalVisible: any)=> {
    console.log("Open modal called ",modalVisible);
     const modalVisible1 = !modalVisible;
   setmodalVisible(modalVisible1);
   setStyle(modalVisible
 ? { display: "block",opacity:'1'}: { display: "none" })

  }

  const openModal2=(modalVisible2: any)=> {
    console.log("Open modal called ",modalVisible2);
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

  

 
    

    var myplaylistsong: any[] = [];
    if(playsongs.length!=0){
     
      myplaylistsong = Object.keys(playsongs).map(function(key: any,value:any){
        let newid = "myplayModal"+key;
        let newid1 = "myplayModalsi"+key;
        let nn = parseInt(key)+1;
        let nextid = "myplayModalsi"+nn;
        // console.log(nextid,"===nextid")
        let previd = "";
        if(key>0){
          let keynew = key-1
          let previd = "myplayModalsi"+keynew;
        }
        
        let mood = "";
        Object.keys(playsongs[key]['mood']).map(function(key1: any,value1:any){
        
          mood += playsongs[key]['mood'][key1]['mood_name']+","
         })
         return <> <tr key={key}>
        <td><img className="click_meplay" id= {newid1} data-next={nextid}  data-name={playsongs[key]["song_name"]} data-prev={previd} data-id= {playsongs[key]["_id"]} onClick={e => playsong(e.target)} data-url={playsongs[key]['song_file'] }src={play}/>{playsongs[key]['song_name'] }</td>
         <td>{playsongs[key]['genre_id']['name'] }</td>
         
        { playsongs[key]['subGenre_id']? (
         <td>{playsongs[key]['subGenre_id']['subgenre_name']}</td>
        ):(
       <td></td>
        )}
         <td>{playsongs[key]['tempo']['tempo_name']}</td>
         <td>{playsongs[key]['key']['key_name']}</td>
         <td>
       {mood}
        </td>
      
         <td><button data-toggle="modal" data-id="myModal2" id={playsongs[key]['_id']} className="btn license-btn">lICENSE</button></td></tr>
          
         </>
         
    
       
      
      
       });
     
    }

 const delete_cart = (id:any) => {
  const access_token = localStorage.getItem('access_token');
  axios.delete(`${config.apiUrl}/carts/removeFromCart`,{headers: {
    'access_token':access_token },data:{song_id:id }}
).then(function (response) {
  if(response.data.status==false){
  alert(response.data.message);
  }else{
    alert(response.data.message);

  }
  })
}
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
       setrecieptdata(data.details[0])
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
     

      $("#songsli").append( "<li><h3>"+data.details[0].song_id[key]['song_name']+"<span>$"+data.details[0].song_id[key]['price']+"</span></h3></li>")
      
  });
 
  }
  
 if(songli.length>0){
  $("#songsli").append("<li><h3>Total<span id='rtrans'>$"+data.trans+"</span></h3></li>");
  $("#view_recpt_modal").addClass('in')
  $("#view_recpt_modal").css("display","block");
  $("#view_recpt_modal").css("z-index", "99999");
  $(".modal-backdrop").css("display","block");
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


	var carttr: any = [];
	let pp:number = 0;
	  if(cartdata){
		carttr = Object.keys(cartdata).map(function(key: any,value:any) {
		 
			
			pp = pp + parseInt(cartdata[key]['song_id']['price']);
			console.log(pp);
		
		   return <li  key={key}><h4><img className="click_me" src={play}/>{cartdata[key]['song_id']['song_name']}</h4>
			<button className="btn" onClick={() => {delete_cart(cartdata[key]['song_id']['_id'])}}><span aria-hidden="true">&times;</span></button>
								</li>
		 });
	
	  }
  var subgenreli: any = [];

  if(userInfo){

  if(userInfo.data.sub_genre){
    subgenreli = Object.keys(userInfo.data.sub_genre).map(function(key: any,value:any) {
    
       return  <li key={key}><button className="btn">{userInfo.data.sub_genre[key]['name']}</button></li>
       
   
      
  });
}
  }


  var purchase: any = [];

  if(userInfo){  
    purchase = Object.keys(userInfo.Purchase).map(function(key: any,value:any) {
  
      return   <tr  key={key}>
      <td><img className="click_me" src={play} />{userInfo.Purchase[key]['song_id'][0]['song_name']}</td>
      <td><Moment format="DD-MM-YYYY">
      {userInfo.Purchase[key]['placed_on']}
           </Moment></td>
    
      <td><button className="btn view_rec"  onClick={() => {getreciept(userInfo.Purchase[key]['_id'])}}>VIEW RECEIPT</button></td>
      </tr>
      
   
    
   
    
   
      
  });
   
  }
  
    return (
   
        <div id="page-wrapper">



           <section className="profie_bnner">
                    <div className="container-fluid paddg_0">
                        <div className="avatar-upload">
                            <div className="avatar-edit">
                            <input type='file' className="imageUpload two" id="imageUpload2" accept=".png, .jpg, .jpeg"  />
                            {/* <label htmlFor="imageUpload2"><img src={require("../../images/edit.png")}/>Change Cover Image</label> */}
                            </div>
                            <div className="avatar-preview">
                             <div className="imagepreview" id="imagePreview2" style={ { backgroundImage: "url("+cover_pic+")" } }>
                             </div>
                            </div>
                        </div>
                    </div>
                </section>
                
                {userInfo ? (
             
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
                        {/* <h2>{userInfo.data.name}<span><a href="/edit_profile"><img src={editpng}/></a></span></h2> */}
                        <h4>{userInfo.data.email}</h4>
                        {/* <h3>Oliver Jake</h3> */}
                        </div>
                        <div className="gen_type">
                        <h4>Genre</h4>
                        <ul>
                        {userInfo.data.genre ? (
                        <li><button className="btn">{userInfo.data.genre.name}</button></li>
                        ):(
                        <li></li>
                          )} 
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
                    {userInfo.Subscribe.length!=0 ? (
                      <>
                    <tr>
                    <th>Plan:</th>
                    {userInfo.data.plan_id ? (
                    <td>{userInfo.data.plan_id.plan_name}</td>
                    ):(
                      <td></td>
                      )} 
                    <th>Status:</th>
                   
                  
                       <td>Active</td>
                    </tr>
                    <tr>
                    <th>Start Date:</th>
                    <td>
                    {userInfo.Subscribe.activation_date}
          </td>
                    <th>Next Billing Date:</th>
                    <td>
                    {userInfo.Subscribe.expiration_date}
          </td>
                    </tr>
                    </>
                       ):(
                       <>
                       <tr>
                       <th>Plan:</th>
                       {userInfo.data.plan_id ? (
                       <td>{userInfo.data.plan_id.plan_name}</td>
                       ):(
                        <td></td>
                        )} 
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
                    {/* <Button variant="primary"   className="btn change_acc">
                    Change Account Status
                              </Button> */}
                
                    </li>
                    </ul>
                    </div>
                    {/* <div className="purch_table">
                    <div className="banner_listg_headg">
                    <h3>Purchase History</h3>
                    </div>
                    {purchase.length==0?(
                       <div className="oinner_puchs_tbl">
                  <h4>No purchase History found</h4>
                  </div>
                    
                    ):(
                    <div className="oinner_puchs_tbl">
                    <div className="table-responsive">
                    <table className="table">
                    <thead>
                    <tr>
                    <th>Title</th>
                    <th>Purchased Date</th>
                    <th>View Receipt</th>
                    </tr>
                    </thead>
                    <tbody>
                   {purchase}
               
                    </tbody>
                    </table>
                    </div>
                    </div>
                     )}
                    </div> */}
                    </div>
                  </div>
                  </div>
                  </div>
                </section>
 ):(
  <section className="profile_sction">
    <h3>No data found</h3>
  </section>
 )}
   
  
    
    <section className="play_song hidden_play" style={{display:" none"}}> 
	<div className="col-md-12 paddg_0">
		
		<div className="inner_table_listng">
			<div className="table-responsive">
				<table className="table">
					<tbody>
					<tr>
						<td> 
						 <ReactPlayer
          className='react-player'
          url={songurl}
		
         width="100%"
		 height="20%"
		 id="myplayer"
		 playing={playing}
		 onProgress={onProgress}
		 onDuration={onDuration}
		  controls
		  volume={myvolume}
		/> 

		</td>
							<td><img src={singer_img}/>{songname}</td>
							<td className="text-center"><img id="prevsong" onClick={() => {changessong("prevsong")}}  src={leftplay}/>	{
			
			(() => { if(playing==false) return(<img id="play" src={play_icon}  onClick={() => {startAudio()}} />); else return(<img id="play" src={pause_icon} onClick={() => {stopAudio()}} />)  })()
		}<img id="nextsong" onClick={() => {changessong("nextsong")}} src={rightplay}/></td>
							<td className="text-center"><div className="music_wavesarea">
			<span className="music_start_time">{playedtime}</span>
			<div className="music_waves">
				<img src={inactive_song} alt="" />
				<div className="active_wave">
					<img src={active_song} alt="" />
				</div>
			</div>
			<span className="music_end_time">{totaltime}</span>
		</div></td>
							<td className="text-center"><i  className="fa">&#xf028;</i><input onChange={(e:any) => {handleChange(e.target.value)}} id="vol-control" type="range" min="0" max="100" step="1"  /></td>
							<td><button id={playing_id} data-id="myModal2" className="btn  license-btn">LICENSE</button></td>
						 </tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>

</section>



   




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
				<li><button className="btn"  onClick={() => {cancel_membership(userInfo.data.plan_id._id)}}>Cancel a Membership</button></li>
				<li><button className="btn change_member" >Change Membership</button></li>
		   </ul>
		   </div>
        </div>
       
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
          <img src={require("../../images/logo_white.png")}/>
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
          <button className="btn">DOWNLOAD RECEIPT</button>
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

