import React, { useState,useEffect } from 'react';
// import { Col,Row } from 'react-bootstrap'
// import { Field, reduxForm, SubmissionError } from 'redux-form'
// import axios from 'axios';

import singer_img from '../../images/singer_img.png';
import active_song from '../../images/active_wave.png';
import inactive_song from '../../images/unactive_wave.png';

import axios from 'axios';
import {config} from '../../config/config'
import $ from "jquery";
import ReactPlayer from 'react-player'

import store from '../../store';
import Count from '../Count'
import leftplay from '../../images/playleft_arrow.png';
import rightplay from '../../images/right_arrow_song.png';
import play_icon from '../../images/play_icon.png';
import pause_icon from '../../images/pause_icon.png';
import play from '../../images/play.png';
import pause from '../../images/pause.png';
const hanldleClick = (type: string) => {
    store.dispatch({type});
    // console.log(store.getState().counter)
}
const auth_token = localStorage.getItem('auth_token');



const Player = () => {
    const [email, setemail] = useState([]);
    const [rating, setrating] = useState();
    const [playing_id, setplaying_id] = useState();
    const [songurl, setSongurl] = useState();
    const [addurl, setAddurl] = useState();
    const [playing, setPlaying] = useState(false);
    const [addplaying, setAddPlaying] = useState(false);
    const [playedtime, setplayedtime] = useState();
    const [totaltime, settotaltime] = useState();
    const [myvolume, setvolume] = useState(0.1);
    const [my_volume, setmyvolume] = useState(0.1);
    const [songname, setsongname] = useState();
    const [playlist_name, setplaylist_name] = useState();
    const [playlist_img, setplaylist_img] = useState();
    const [songval, setsongval] = useState([]);
    const [timecount, settimecount] = useState();
    let [timeri, settimeer] = useState(0);
    const [rate, setrate] = useState(false);
    const access_token = localStorage.getItem('access_token');
    const [cartdata, setcart] = useState([]);
    
    let config1 = {
        headers: {
            'access_token':access_token
        }
      }
    
      React.useEffect(() => {
        $('.hidden_play').css('display',"block");
        setPlaying(true)
        alert(localStorage.getItem('songurl'))
        setSongurl(localStorage.getItem('songurl'))

            }, []);
         
    const onProgress= (data:any)=> {
	
        /* player tomer and wave*/
      
        //timer();
    
        var playseconds = Math.round(data.playedSeconds);
         
          if(playseconds>0){
            hanldleClick('INCREMENT')
          }
           var custome_timer =  $("#custome_timer").text();
          if(parseInt(custome_timer)>=60){
            setplayedtime((parseInt(custome_timer) / 60).toFixed(2))
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
      const playsongsnext=(e:any)=>{

        let id = e;
        setPlaying(true) 
        
        $(".tableplayer").removeClass('pause');
       $("#"+id).parent().parent().addClass("active")
       var d = new Date();
        let myurl = $("#"+id).attr("data-url");
        let song_id = $("#"+id).attr("data-id");
        setsongname($("#"+id).attr("data-name"));
        setplaying_id(song_id);
        setSongurl(myurl+"?"+d);
            if(playing==false) {
              setPlaying(true) 
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
            }
            $(".ratesong").unbind('click').click(function(){
                setrating($(this).val());
                })
           
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
            // setPlaying(true) 
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
    
     
    const onEnded= ()=> {

        setPlaying(true)	
       setAddPlaying(false)	
         $(".tableplayer").removeClass('disabled');
     
       }
       const onEndedSong= ()=> {
         hanldleClick('RESET')
       }
       
       const onDuration1 = (duration:any) => {
         console.log('onDuration', duration)
         // settotaltime((duration/60).toFixed(2))
       }
      
      
       const onDuration = (duration:any) => {
         console.log('onDuration',(duration).toFixed(2))
         settimecount(Math.round(duration/60)%20);
         settotaltime((duration/60).toFixed(2))
         // var fiveMinutes = 60*5,
         //     display = $('#time');
         // startTimer(duration, display);
       }
      
      //  const playsong=(e:any)=>{
      //    hanldleClick('RESET')
      //    setrate(false)
      //    $(".tableplayer").removeClass('pause');
     
      //    var d = new Date();
      //     var  id = e.id;
     
      //    if($('.paly_table_lstng tr.active').children().children().attr('id')==e.id || $('.jukesonglist ul .active').children().children().attr('id')==e.id){
             
             
      //        if(playing==false) {
      //            setPlaying(true) 
      //           $('.hidden_play').css('display',"block");
      //           $("#"+id).attr("src",pause);
      //          }else{
                   
      //              $("#"+id).attr("src",play);
      //            setPlaying(false)  
      //            $('.hidden_play').css('display',"none");
                
           
      //          }
     
      //    }else{
      //    $(".click_meplay").attr("src",play);
      //    $('.paly_table_lstng tr').removeClass('active')
      //    $('.jukesonglist ul li').removeClass('active')
     
      //    setsongname($("#"+id).attr("data-name"));
      //    console.log(id)
      //    $("#"+id).parent().parent().addClass("active")
      //    let myurl = $("#"+id).attr("data-url");
      //    let song_id = $("#"+id).attr("data-id");
      //    $("#"+id).attr("src",pause);
      //    $("#"+id).addClass("play");
         
     
      //    setplaying_id(song_id);
     
      //   //  streamsong(song_id);
     
      //    setSongurl(myurl+"?"+d);
     
         
            
      //              if($("#"+id).hasClass("showing")){
                 
      //                //   $('.hidden_play').toggle();
      //               }else{
      //             $('.click_meplay').removeClass("showing");
      //                  $("#"+id).addClass("showing");
      //                  setPlaying(true) 
      //                  $('.hidden_play').css('display',"block");
      //               }
      //            }
      //  }
     
     
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
       setmyvolume(val/100)
           setvolume(val/100);
       
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
       const getcart = ()=>{
        axios.get(`${config.apiUrl}/carts/getFromCart`,config1).then(response => response.data).then((data) => {
        setcart(data.cart);
        $(".cart_count").html(data.cart.count)
    
         })
    }
    return (
        <div>
       <div style={{display:'none'}}>   
<span id="custome_timer"><Count/></span>
<ReactPlayer
						className='react-player'
						url={addurl}
                        id="adv"
						width="100%"
						height="20%"
						
						playing={addplaying}
						onEnded={onEnded}
						onDuration={onDuration1}
						
						controls
						volume={myvolume}
						
						/>
						 </div> 
<section className="play_song hidden_play"> 
	<div className="col-md-12 paddg_0">
		<div className="inner_table_listng">
			<div className="table-responsive">
				<table className="table tableplayer">
					<tbody>
						<tr>
						<td><img src={singer_img}/><span className="song_name_player">{songname}</span></td>
							<td> 
							<ReactPlayer
							className='react-player'
							url={songurl}
                            width="100%"
							height="20%"
							id="myplayer"
							playing={playing}
							onEnded={onEndedSong}
							onProgress={onProgress}
							onDuration={onDuration}
							
							controls
							volume={myvolume}
							/> 

							</td>

							<td className="text-center"  id="time"><img id="prevsong" onClick={() => {changessong("prevsong")}}  src={leftplay}/>	{

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
							<td className="text-center"><i style={{ cursor:'pointer'}} id="volume_control" className="fa fa-volume-up"></i><input onChange={(e:any) => {handleChange(e.target.value)}} id="vol-control" type="range" min="0" max="100" step="1"  /></td>
							<td><button id={playing_id} data-id="myModal2" className="btn  license-btn" onClick={() => {add_to_cart(playing_id)}}>LICENSE</button></td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</section>
  </div>
  
    )
}

export default Player