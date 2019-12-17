import React, { useState,useEffect,useContext,useRef,createRef } from 'react';
// import { Col,Row } from 'react-bootstrap'
// import { Field, reduxForm, SubmissionError } from 'redux-form'
// import axios from 'axios';

import singer_img from '../images/singer_img.png';
import active_song from '../images/active_wave.png';
import inactive_song from '../images/unactive_wave.png';

import axios from 'axios';
import {config} from '../config/config'
import $ from "jquery";
import ReactPlayer from 'react-player'

 import store from '../store';
import Count from './Count'
import Duration from './common/Duration'
import leftplay from '../images/playleft_arrow.png';
import rightplay from '../images/right_arrow_song.png';
import play_icon from '../images/play_icon.png';
import pause_icon from '../images/pause_icon.png';
import play from '../images/play.png';
import pause from '../images/pause.png';
import { MusicContext } from '../contexts/MusicContext';
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
    const [playing, setPlaying] = useState(true);
    const [addplaying, setAddPlaying] = useState(false);
    const [playedtime, setplayedtime] = useState();
    const [totaltime, settotaltime] = useState();
    const [myvolume, setvolume] = useState(1);
    const [my_volume, setmyvolume] = useState(0.2);
    const [seeking, setseeking] = useState();
    const [playlist_name, setplaylist_name] = useState();
    const [played, setplayed] = useState(1);
    const [songval, setsongval] = useState([]);
    const [timecount, settimecount] = useState();
    let [timeri, settimeer] = useState(0);
    const [rate, setrate] = useState(false);
    const access_token = localStorage.getItem('access_token');
    const [cartdata, setcart] = useState([]);
    const [durations, sedurations] = useState();
    const {currentSong,Addsong,changeSong,currentSongname,isPlaying,changeCurrentSong,currentSongId, changeCurrentSongId} = useContext(MusicContext);

    const playerref = React.useRef(null);
  let player:any;
    let config1 = {
        headers: {
            'access_token':access_token
        }
      }
      React.useEffect(() => {
        if(currentSong){
          $('.hidden_play').css('display',"block");
          setplayed(0)
     
        }
        setrate(false);
        setPlaying(isPlaying)
        setplaying_id(currentSongId)
        localStorage.getItem('songurl');
   var tracks =JSON.parse(localStorage.getItem("tracks") as string);
   console.log(tracks,"=====@@@@========####################");
  if(tracks){
    setSongurl(tracks['songurl'])
  
    // var key =   localStorage.getItem('current_pos') as string;
 
    // if(key){
    //   setAddurl(tracks['watermark'])
    // //  if(!songurl){
    //   var songfile =  localStorage.getItem('songurl');
   
    //   var custome_timer =  $("#custome_timer").text();
    //   //  player.seekTo(custome_timer, "seconds")
   
    //   setSongurl(songfile)
    //   setsongname(tracks[key]['song_name']);
    //   setPlaying(true);
   
      
    // }
   
  }
   }, [currentSong,isPlaying]);
          
  const handleSeekMouseUp = (e:any) => {
    setseeking(false)
    player.seekTo(parseFloat(e.target.value))
    var seektime = <Duration seconds={durations * played} />;
    if(totaltime==seektime){
      changeSong("nextsong")
    }
    setplayedtime(<Duration seconds={durations * played} />)
    
}

const handleSeekMouseDown = (e:any) => {
  setseeking(true)

}
const handleDuration = (durations:any) => {
  console.log('onDuration', durations)
  sedurations(durations )
  settotaltime((durations/60).toFixed(2))
}
const handleSeekChange = (e:any) => {
  setplayed(parseFloat(e.target.value))

}

const handleClose = () => {
  $(".play_song.hidden_play").hide();
  setPlaying(false) 
  setplayed(0)
  stopAudio()
  changeCurrentSong("")
  changeCurrentSongId("")
}

    const onProgress= (data:any)=> {
	
       
      
        //timer();
    
        var playseconds = Math.round(data.playedSeconds);
        var loadseconds = Math.round(data.loadedSeconds);
        //  console.log(playseconds);
          if(playseconds>0){
            hanldleClick('INCREMENT')
          }
           var custome_timer =  $("#custome_timer").text();
           var myseconds ;
          if(playseconds>=60){
            // setplayedtime((parseInt(custome_timer) / 60).toFixed(2))
            // var myseconds = (playseconds / 60).toFixed(2)
             myseconds =  (playseconds / 60).toFixed(3).slice(0,-1)
          
            // console.log(myseconds)
             var newsecond =  myseconds.split(".");
             if(myseconds>totaltime){
              setplayedtime(totaltime)
             }else{
            setplayedtime(newsecond[0]+":"+newsecond[1]);
             }
        }else{
         if(playseconds<10){
            setplayedtime("0:0"+playseconds)
         }else{
        
            setplayedtime("0:"+playseconds)
          
           
         }
       }
     var   myseconds1 =  (playseconds / 60).toFixed(3).slice(0,-1)
     var   loadseconds1 =  (loadseconds / 60).toFixed(3).slice(0,-1)
     
      var widthpersectond =  100/data.loadedSeconds*data.playedSeconds+"%";
         $(".active_wave").css("width",widthpersectond)
        //  console.log(myseconds1)
        //  console.log(loadseconds1)
        if(myseconds1==loadseconds1){
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
 
    
      const changessong = (e:any) =>{
        hanldleClick('RESET')

        $(".click_meplay").attr("src",play);
      
         if(e==="nextsong"){
        
          let keyval =   localStorage.getItem("current_pos") ;
          let totalkeys =   localStorage.getItem("totalkeys") ;
          var newkey =  keyval?parseInt(keyval)+1:"";
          var totals =  totalkeys?parseInt(totalkeys):"";
          var currentkey = keyval?parseInt(keyval):0;
          if(currentkey<totals){
           if(totals>newkey){
            changeSong(newkey);
           }
           localStorage.setItem('current_pos',newkey as string);
          }
       }else{
              let keyval =   localStorage.getItem("current_pos") ;
              var currentkey = keyval?parseInt(keyval):0;
       if(currentkey>0){
              var newkey =  keyval?parseInt(keyval)-1:"";
             
              if(newkey>=0){
                changeSong(newkey);
              }
              localStorage.setItem('current_pos',newkey as string);  
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
        if($('.oinner_puchs_tbl tr').hasClass('active')){
          var next = $('.oinner_puchs_tbl tr.active');
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
            if($('.oinner_puchs_tbl tr').hasClass('active')){
              var next = $('.oinner_puchs_tbl tr.active');
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
    
     
    const onEnded= ()=> {

        setPlaying(true)	
       setAddPlaying(false)	
         $(".tableplayer").removeClass('disabled');
     
       }
       const onEndedSong= ()=> {
         hanldleClick('RESET')
           changessong("nextsong")
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
      
    
       $(".rating_close").click(function(){
        $("#rating_pop").css('display',"none");
        setPlaying(true) 
       })
       const handleChange = (val:any) =>
       {
         console.info('---------------', val)
       var player = $('#myplayer audio');
       if(val/100==0){
           $("#volume_control").removeClass('fa-volume-up')
           $("#volume_control").addClass('fa-volume-off')
       }else{
           $("#volume_control").removeClass('fa-volume-off')
           $("#volume_control").addClass('fa-volume-up')
       }
       setmyvolume(val/330)
       console.info(';:;;;;;;;;;;;;', my_volume)
           setvolume(val/100);
       
       }
       $("#volume_control").unbind('click').click(function(){
        if(myvolume==0){
          setvolume(0.7);
          $(this).addClass('fa-volume-up')
          $(this).removeClass('fa-volume-off')
        }else{
          setvolume(0);
          $(this).removeClass('fa-volume-up')
          $(this).addClass('fa-volume-off')
        }
      })
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
  const  ref = (myplayer:any) => {
     player = myplayer
  }
    return (
        <div>
        
        <div style={{display:'none'}}>  
    <span id="custome_timer"><Count/></span> 
<ReactPlayer
             
						className='react-player'
						url={Addsong}
                        id="adv"
						width="100%"
						height="20%"
						
						playing={addplaying}
						onEnded={onEnded}
						onDuration={onDuration1}
						
						controls
						volume={my_volume}
						
						/>
						 </div> 
            
    <section className="play_song hidden_play" style={{display:" none"}}> 
	<div className="col-md-12 paddg_0">
		
		<div className="inner_table_listng">
			<div className="table-responsive">
				<table className="table tableplayer">
					<tbody>
          <tr>
          <td>
            <div className="singer_title">
            <img src={singer_img}/>
            <p>{currentSongname}</p>

            </div>
            </td>
          <td style={{minWidth:"162px"}}  id="idTd">
						<div className="star_rtng text-center player_rating">
          <fieldset className="rating">
          <form>
    <input type="radio" id="star5" name="rating" className="ratesong" value="5" /><label className = "full " htmlFor="star5" title="Awesome - 5 stars" onClick={() => {ratesong(playing_id,5)}}></label>
    <input type="radio" id="star4half" name="rating" value="4.5" className="ratesong" /><label className="half " htmlFor="star4half" title="Pretty good - 4.5 stars" onClick={() => {ratesong(playing_id,4.5)}}></label>
    <input type="radio" id="star4" name="rating" value="4" className="ratesong" /><label className = "full " htmlFor="star4" title="Pretty good - 4 stars" onClick={() => {ratesong(playing_id,4)}}></label>
    <input type="radio" id="star3half" name="rating" value="3.5" className="ratesong" /><label className="half " htmlFor="star3half" title="Meh - 3.5 stars" onClick={() => {ratesong(playing_id,3.5)}}></label>
    <input type="radio" id="star3" name="rating" value="3" className="ratesong" /><label className = "full " htmlFor="star3" title="Meh - 3 stars" onClick={() => {ratesong(playing_id,3)}}></label>
    <input type="radio" id="star2half" name="rating" value="2.5" className="ratesong" /><label className="half " htmlFor="star2half" title="Kinda bad - 2.5 stars" onClick={() => {ratesong(playing_id,2.5)}}></label>
    <input type="radio" id="star2" name="rating" value="2" className="ratesong" /><label className = "full " htmlFor="star2" title="Kinda bad - 2 stars" onClick={() => {ratesong(playing_id,2)}}></label>
    <input type="radio" id="star1half" name="rating" value="1.5" className="ratesong" /><label className="half " htmlFor="star1half" title="Meh - 1.5 stars" onClick={() => {ratesong(playing_id,1.5)}}></label>
    <input type="radio" id="star1" name="rating" value="1" className="ratesong" /><label className = "full" htmlFor="star1" title="Sucks big time - 1 star" onClick={() => {ratesong(playing_id,1)}}></label>
    <input type="radio" id="starhalf" name="rating" value="half" className="ratesong"/><label className="half" htmlFor="starhalf" title="Sucks big time - 0.5 stars" onClick={() => {ratesong(playing_id,0.5)}}></label>
	</form>
</fieldset>

<div className="note_box" id="rating_pop">
	
         <div className="note">
		 <a  className="rating_close"><i className="fa fa-times" aria-hidden="true"></i> </a>
	
			<p>Please rate this song. Your feedback is very helpful for us.</p>
        
     </div>
</div></div>
						</td>
          <td> 
          <ReactPlayer
          className='react-player'
          url={currentSong}
          ref={ref}
          width="100%"
          height="20%"
          id="myplayer"
          playing={playing}
          onProgress={onProgress}
          onDuration={handleDuration}
          onEnded={onEndedSong}
          controls
          volume={myvolume}
          /> 

          </td>

          <td className="text-center" style={{minWidth:"180px"}}><img id="prevsong" onClick={() => {changessong("prevsong")}}  src={leftplay}/>	{

          (() => { if(playing==false) return(<img id="play" src={play_icon}  onClick={() => {startAudio()}} />); else return(<img id="play" src={pause_icon} onClick={() => {stopAudio()}} />)  })()
          }<img id="nextsong" onClick={() => {changessong("nextsong")}} src={rightplay}/></td>
          <td className="text-center" ><div className="music_wavesarea">
          <span className="music_start_time">{playedtime}</span>
          <div className="music_waves">
          <img src={inactive_song} alt="" />
          <div className="active_wave">
          <img src={active_song} alt="" />
          </div>
          <input
                    type='range' min={0} max={1} step='any'
                    value={played}
                    onMouseDown={handleSeekMouseDown}
                    onChange={handleSeekChange}
                    onMouseUp={handleSeekMouseUp} />
{/* <progress max={1} value={played} /> */}
          </div>
          <span className="music_end_time">{totaltime}</span>
          </div></td>
          <td className="text-center" style={{minWidth:"160px"}}><i  style={{ cursor:'pointer'}} id="volume_control" className="fa fa-volume-up"></i><input onChange={(e:any) => {handleChange(e.target.value)}} id="vol-control" type="range" min="0" max="100" step="1" value={myvolume*100}  /></td>
          <td><button id={playing_id} data-id="myModal2" className="btn  license-btn" onClick={() => {add_to_cart(playing_id)}}>LICENSE</button></td>
          </tr>
					</tbody>
				</table>
        <span className="playerClose" onClick={handleClose}><i className="fa fa-times" aria-hidden="true"></i></span>
			</div>
		</div>
	</div>

</section> 
  </div>
  
    )
}

export default Player