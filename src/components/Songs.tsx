import React, { useState,useEffect } from 'react';
import { connect } from "react-redux";
import store from '../store';
// import Count from './Count'
import {config} from '../config/config'
import ReactPlayer from 'react-player'

import { Container, Row, Col, Button } from 'react-bootstrap' 
import axios, {
    AxiosRequestConfig,
    AxiosResponse,
    AxiosError,
    AxiosInstance,
    AxiosAdapter,
    Cancel,
    CancelToken,
    CancelTokenSource,
    Canceler
  } from 'axios';


 
const hanldleClick = (type: string) => {
    store.dispatch({type});
    console.log(store.getState().counter)
}
const auth_token = localStorage.getItem('auth_token');
var supportsAudio = !!document.createElement('audio').canPlayType;
if (supportsAudio) {
   
    let index = 0;
    let playing = false;
    let  mediaPath = 'https://archive.org/download/mythium/';
    let   extension = '';
    let  tracks = [{
            "track": 1,
            "name": "All This Is - Joe L.'s Studio",
            "duration": "2:46",
            "file": "JLS_ATI"
        }, {
            "track": 2,
            "name": "The Forsaken - Broadwing Studio (Final Mix)",
            "duration": "8:30",
            "file": "BS_TF"
        }, {
            "track": 3,
            "name": "All The King's Men - Broadwing Studio (Final Mix)",
            "duration": "5:01",
            "file": "BS_ATKM"
        }, {
            "track": 4,
            "name": "The Forsaken - Broadwing Studio (First Mix)",
            "duration": "8:31",
            "file": "BSFM_TF"
        }, {
            "track": 5,
            "name": "All The King's Men - Broadwing Studio (First Mix)",
            "duration": "5:05",
            "file": "BSFM_ATKM"
        }, {
            "track": 6,
            "name": "All This Is - Alternate Cuts",
            "duration": "2:48",
            "file": "AC_ATI"
        }, {
            "track": 7,
            "name": "All The King's Men (Take 1) - Alternate Cuts",
            "duration": "5:44",
            "file": "AC_ATKMTake_1"
        }, {
            "track": 8,
            "name": "All The King's Men (Take 2) - Alternate Cuts",
            "duration": "5:26",
            "file": "AC_ATKMTake_2"
        }, {
            "track": 9,
            "name": "Magus - Alternate Cuts",
            "duration": "5:46",
            "file": "AC_M"
        }, {
            "track": 10,
            "name": "The State Of Wearing Address (fucked up) - Alternate Cuts",
            "duration": "5:25",
            "file": "AC_TSOWAfucked_up"
        }, {
            "track": 11,
            "name": "Magus - Popeye's (New Years '04 - '05)",
            "duration": "5:53",
            "file": "PNY04-05_M"
        }, {
            "track": 12,
            "name": "On The Waterfront - Popeye's (New Years '04 - '05)",
            "duration": "4:40",
            "file": "PNY04-05_OTW"
        }, {
            "track": 13,
            "name": "Trance - Popeye's (New Years '04 - '05)",
            "duration": "13:15",
            "file": "PNY04-05_T"
        }, {
            "track": 14,
            "name": "The Forsaken - Popeye's (New Years '04 - '05)",
            "duration": "8:12",
            "file": "PNY04-05_TF"
        }, {
            "track": 15,
            "name": "The State Of Wearing Address - Popeye's (New Years '04 - '05)",
            "duration": "7:02",
            "file": "PNY04-05_TSOWA"
        }, {
            "track": 16,
            "name": "Magus - Popeye's (Valentine's Day '05)",
            "duration": "5:43",
            "file": "PVD_M"
        }, {
            "track": 17,
            "name": "Trance - Popeye's (Valentine's Day '05)",
            "duration": "10:45",
            "file": "PVD_T"
        }, {
            "track": 18,
            "name": "The State Of Wearing Address - Popeye's (Valentine's Day '05)",
            "duration": "5:36",
            "file": "PVD_TSOWA"
        }, {
            "track": 19,
            "name": "All This Is - Smith St. Basement (01/08/04)",
            "duration": "2:48",
            "file": "SSB01_08_04_ATI"
        }, {
            "track": 20,
            "name": "Magus - Smith St. Basement (01/08/04)",
            "duration": "5:46",
            "file": "SSB01_08_04_M"
        }, {
            "track": 21,
            "name": "Beneath The Painted Eye - Smith St. Basement (06/06/03)",
            "duration": "13:07",
            "file": "SSB06_06_03_BTPE"
        }, {
            "track": 22,
            "name": "Innocence - Smith St. Basement (06/06/03)",
            "duration": "5:16",
            "file": "SSB06_06_03_I"
        }, {
            "track": 23,
            "name": "Magus - Smith St. Basement (06/06/03)",
            "duration": "5:46",
            "file": "SSB06_06_03_M"
        }, {
            "track": 24,
            "name": "Madness Explored - Smith St. Basement (06/06/03)",
            "duration": "4:51",
            "file": "SSB06_06_03_ME"
        }, {
            "track": 25,
            "name": "The Forsaken - Smith St. Basement (06/06/03)",
            "duration": "8:43",
            "file": "SSB06_06_03_TF"
        }, {
            "track": 26,
            "name": "All This Is - Smith St. Basement (12/28/03)",
            "duration": "3:00",
            "file": "SSB12_28_03_ATI"
        }, {
            "track": 27,
            "name": "Magus - Smith St. Basement (12/28/03)",
            "duration": "6:09",
            "file": "SSB12_28_03_M"
        }, {
            "track": 28,
            "name": "Madness Explored - Smith St. Basement (12/28/03)",
            "duration": "5:05",
            "file": "SSB12_28_03_ME"
        }, {
            "track": 29,
            "name": "Trance - Smith St. Basement (12/28/03)",
            "duration": "12:32",
            "file": "SSB12_28_03_T"
        }, {
            "track": 30,
            "name": "The Forsaken - Smith St. Basement (12/28/03)",
            "duration": "8:56",
            "file": "SSB12_28_03_TF"
        }, {
            "track": 31,
            "name": "All This Is (Take 1) - Smith St. Basement (Nov. '03)",
            "duration": "4:55",
            "file": "SSB___11_03_ATITake_1"
        }, {
            "track": 32,
            "name": "All This Is (Take 2) - Smith St. Basement (Nov. '03)",
            "duration": "5:45",
            "file": "SSB___11_03_ATITake_2"
        }, {
            "track": 33,
            "name": "Beneath The Painted Eye (Take 1) - Smith St. Basement (Nov. '03)",
            "duration": "14:05",
            "file": "SSB___11_03_BTPETake_1"
        }, {
            "track": 34,
            "name": "Beneath The Painted Eye (Take 2) - Smith St. Basement (Nov. '03)",
            "duration": "13:25",
            "file": "SSB___11_03_BTPETake_2"
        }, {
            "track": 35,
            "name": "The Forsaken (Take 1) - Smith St. Basement (Nov. '03)",
            "duration": "8:37",
            "file": "SSB___11_03_TFTake_1"
        }, {
            "track": 36,
            "name": "The Forsaken (Take 2) - Smith St. Basement (Nov. '03)",
            "duration": "8:36",
            "file": "SSB___11_03_TFTake_2"
        }]
        
      
     var playlists: any[] = [];
     if(tracks.length!=0){
       playlists = Object.keys(tracks).map(function(key: any,value:any){
          return  <li key={key}> 
                  <div className="plItem"> 
                      <span className="plNum">{tracks[key]['track'] }</span> 
                       <span className="plTitle">{tracks[key]['name'] }</span> 
                      <span className="plLength">{tracks[key]['duration'] }</span> 
                 </div> 
               </li>
       
        });
      
     }
      
       const trackCount = tracks.length;
   
 }
 const useAudio = (url:any) => {
     console.log(url);
    const [audio] = useState(new Audio(url));
    const [playing, setPlaying] = useState(false);
  
    const toggle = () => setPlaying(!playing);
  
    useEffect(
      () => {
        playing ? audio.play() : audio.pause();
      },
      [playing]
    );
  
    return [playing, toggle];
  };
const Songs =  (url:any) => {

    const [playing, toggle] = useAudio('https://geekanddummy.com/wp-content/uploads/2014/02/central-locking-Ford-Mondeo-Mk-3.mp3');
  
  
    
    return (
      
        <Container>

<div className="column add-bottom">
        <div id="mainwrap">
            <div id="nowPlay">
                <span id="npAction">Paused...</span><span id="npTitle"></span>
            </div>
         
                
     <div id="tracks">
      <div className='player-wrapper'>
        <ReactPlayer
          className='react-player'
          url='https://geekanddummy.com/wp-content/uploads/2014/02/central-locking-Ford-Mondeo-Mk-3.mp3'
          style={{"display":" block"}}
         width="100%"
         height="20%"
          controls
        />
        </div>
         <a id="btnPrev">&larr;</a><a id="btnNext">&rarr;</a>
          <div id="plwrap">
                <ul id="plList">{playlists}</ul>
            </div>
        </div>
            
           
        </div>
    </div>
    <div className="column add-bottom center">
        <p>Music by <a href="http://www.mythium.net/">Mythium</a></p>
        <p>Download: <a href="https://archive.org/download/mythium/mythium_vbr_mp3.zip">zip</a> / <a href="https://archive.org/download/mythium/mythium_archive.torrent">torrent</a></p>
    </div>
      </Container>
    )
}

export default connect()(Songs);