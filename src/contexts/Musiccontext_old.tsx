import React, { createContext, useState, useEffect } from 'react';
import {config} from '../config/config'
import axios from 'axios';
import $ from "jquery";
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
          
        const changeCurrentSong = (file: string) => {
                setCurrentsong(file)
                localStorage.setItem('currentSong', file);
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
           
            $(".trplay").removeClass('active')
            $("#"+tracks[key]['song_id']).addClass('active')
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
                changeCurrentSongId(currSongId ? currSongId : currentSongId)
                getCartListing()
            }, [])
            return(
            <MusicContext.Provider value={{currentSong,Addsong,changeCurrentSong,changeCurrentSongName,changeSong,currentSongname,isPlaying,setBarPlaying,currentSongId,changeCurrentSongId,cartListing,getCartListing}}>
                { props.children }
            </MusicContext.Provider>
            )
}

export default MusicContextProvider;