import React, { createContext, useState, useEffect } from 'react';
import {config} from '../config/config'
import axios from 'axios';
import $ from "jquery";
import pause from '../images/pause.png';
interface MusicContextInterface {
        currentSong: string,
        currentSongname: string,
        Addsong: string,
        changeCurrentSong: (file: string) => void,
        changeCurrentSongName: (name: string) => void,
        changeCurrentSongId: (id: string) => void,
        changeSong: (key: any) => void,
        isPlaying: boolean,
        setBarPlaying: (status: boolean) => void,
        currentSongId: string,
        cartListing: any,
        getCartListing: () => void
    }



    var AWS = require('aws-sdk');
    var credentials = {
      accessKeyId:"AKIA2ONH5LP6ZCWEOBSE",
      secretAccessKey: "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",
      region: "us-east-2"
    };
    var s3 = new AWS.S3(credentials);



export const MusicContext = createContext({} as MusicContextInterface);

const MusicContextProvider = (props: any) => {
        const [currentSong, setCurrentsong] = useState("");
        const [currentSongname, setCurrentsongName] = useState("");
        const [currentSongId, setCurrentSongId] = useState("");
        const [Addsong, setAddsong] = useState("");
        const [isPlaying, setIsPlaying] = useState(true);
        const [cartListing, setCartListing] = useState([]);

        const access_token = localStorage.getItem('access_token');
		let config1 = {
			headers: {
				'access_token': access_token,
			
			}
          }
            const s3data = (params:any,file:any) => { //Not working
            // s3.getObject(params).
            // on('httpData', function(chunk:any) { file.write(chunk); }).
            // on('httpDone', function() { file.end(); }).send();

           
            s3.getSignedUrl('getObject', params, function (err:any, url:any) {
              if(err){
                  console.log('Signed err: ' + err);    
              }
            
              setCurrentsong(url)
             
            //  console.log('Signed URL: ' + url);
              localStorage.setItem('currentSong', file);
            });
          }
        const changeCurrentSong = (file: string) => {
                   
            var params = {Bucket:'soundsphere', Key: file , Expires: 10};
            // alert(file);
            // s3client("igetest",file)
              s3data(params,file)
              var songid = localStorage.getItem('currentSongId');
            
            //   var id = $("#"+songid).children().children().attr('id');
          
            //   $("#myplayModalsi"+songid).attr('src',pause)
                // setCurrentsong(file)
                // localStorage.setItem('currentSong', file);
            }
            const changeCurrentSongName = (name: string) => {
              
                setCurrentsongName(name)
                localStorage.setItem('currentSongname', name);
            }
            const changeCurrentSongId = (id: string) => {
              
                setCurrentSongId(id)
                localStorage.setItem('currentSongId', id);
            }
        const getCartListing = () => {
            axios.get(`${config.apiUrl}/carts/getFromCart`,config1).then(response => response.data).then((data) => {
                setCartListing(data.cart);
            
                 })
        }
       const changeSong = (key:any)=>{
        var tracks =JSON.parse(localStorage.getItem("tracks") as string);

       if(tracks.length>1 && key!="nextsong" && key<tracks.length){
          if(tracks[key]['song_file']){
            changeCurrentSong(tracks[key]['song_file']);
            changeCurrentSongName(tracks[key]['name']);
            setCurrentSongId(tracks[key]['song_id'])
            changeCurrentSongId(tracks[key]['song_id'])
            $(".trplay").removeClass('active')
            $("#"+tracks[key]['song_id']).addClass('active')
            // var next = $('.paly_table_lstng tr.active')
            var songid =  localStorage.getItem('currentSongId');
         
            var id = $("#"+songid).children().children().attr('id');
            $("#"+id).attr('src',pause)
            // $('.click_meplay').removeClass("showing");
            // $("#myplayModalsi"+tracks[key]['song_id']).addClass('play')
            // $("#myplayModalsi"+tracks[key]['song_id']).addClass('showing')
           
          }
        
       }
        
       }

       const setBarPlaying = (status: boolean) => {
        setIsPlaying(status);
       }
            useEffect(() => {
                const currSong = localStorage.getItem('currentSong');
                const currSongname = localStorage.getItem('currentSongname');
                const currSongId = localStorage.getItem('currentSongId');
                const addsong = "http://18.188.75.114:3000/images/sound/SoundsSphereTAG.wav";
             
                setAddsong(addsong ? addsong : Addsong);
                changeCurrentSong(currSong ? currSong : currentSong)
                changeCurrentSongName(currSongname ? currSongname : currentSongname)
                changeCurrentSongId(currSongId ? currSongId : currentSongId);
               
                getCartListing()
            }, [])
            return(
            <MusicContext.Provider value={{currentSong,Addsong,changeCurrentSong,changeCurrentSongName,changeSong,currentSongname,isPlaying,setBarPlaying,currentSongId,changeCurrentSongId,cartListing,getCartListing}}>
                { props.children }
            </MusicContext.Provider>
            )
}

export default MusicContextProvider;