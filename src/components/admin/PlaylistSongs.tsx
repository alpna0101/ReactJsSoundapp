import React, { useState } from 'react';

import Pagination from "react-js-pagination";
import axios from 'axios';
import $ from "jquery";
import { Field, reduxForm, SubmissionError } from 'redux-form'
import { css } from 'react-select/src/components/Control';
import {config} from '../../config/config'
interface RouterProps {
  match: any;
}
  const Songs = (props: any) => {
	const [activePage, setactivepage] = useState(1);
	const [itemPerPage, setitemPerPage] = useState();
	const [totaldata, settotaldata] = useState();
    const [songs, setsongs] = useState([]);
    const [titleclass, settitleclass] = useState();
    const [ratingclass, setratingclass] = useState();
    const [streamclass, setstreamclass] = useState();
    const [purchaseclass, setpurchaseclass] = useState();
    const [sortvar, setsortvar] = useState();
    const [plalistid, setplaylistid] = useState();
	const [genres, setgenres] = useState([]);
	const [sortby, setsortby] = useState();
	const [field, setfield] = useState();
    React.useEffect(() => {
		setfield('title')
		setsortby("asc")
		setplaylistid('A');
		getsong('A',1,'asc','title');
		setsortvar('asc')
		settitleclass('fa fa-sort')
		setstreamclass('fa fa-sort')
		setratingclass('fa fa-sort')
		setpurchaseclass('fa fa-sort')
		getdropdown();
	  }, []);
	  
	  const  handlePageChange=(pageNumber:any)=>{
		
		setactivepage(pageNumber);
		getsong(plalistid,pageNumber,sortby,field);
		
	  }
	  const  handleChangetitle=(value:any)=>{
		setstreamclass('fa fa-sort')
		setratingclass('fa fa-sort')
		setfield('song_name')
		setsortby(value);
		setactivepage(1);
		if(value=="asc"){
			setsortvar('des')
			settitleclass('fa fa-sort-desc')
		}else{
			setsortvar('asc')
			settitleclass('fa fa-sort-asc')
		}
		getsong(plalistid,1,value,"song_name");
	 }
	 const  handleChangerating=(value:any)=>{
		settitleclass('fa fa-sort')
		setstreamclass('fa fa-sort')
		setactivepage(1);
		setsortby(value);
		setfield('avg_rate')
		if(value=="asc"){
			setsortvar('des')
			setratingclass('fa fa-sort-desc')
		}else{
			setsortvar('asc')
			setratingclass('fa fa-sort-asc')
		}
		getsong(plalistid,1,value,"avg_rate");
	 }
	 const  handleChangepurchase=(value:any)=>{
		settitleclass('fa fa-sort')
		setstreamclass('fa fa-sort')
		setpurchaseclass('fa fa-sort')
		setactivepage(1);
		setsortby(value);
		setfield('purchase_count')
		if(value=="asc"){
			setsortvar('des')
			setpurchaseclass('fa fa-sort-desc')
		}else{
			setsortvar('asc')
			setpurchaseclass('fa fa-sort-asc')
		}
		getsong(plalistid,1,value,"purchase_count");
	 }
	 const  handleChangestream=(value:any)=>{
		settitleclass('fa fa-sort')
		setratingclass('fa fa-sort')
		setfield('stream_count')
		setactivepage(1);
		setsortby(value);
		if(value=="asc"){
			setsortvar('des')
			setstreamclass('fa fa-sort-desc')
		}else{
			setsortvar('asc')
			setstreamclass('fa fa-sort-asc')
		}
		getsong(plalistid,1,value,"stream_count");
	 }
	  const  handleChange=(e:any)=>{
		
		console.log(e.target.value);
		setplaylistid(e.target.value)
		 getsong(e.target.value,1,"asc",'song_name');
		
	  }
	  
	  const getdropdown = () => {
	
	  axios.get(`${config.apiUrl}/users/dropDown`)
	  .then(async (response) => {
		console.info('====', response.data)
	
		setgenres(response.data.Genre);
	   
		
	  //  SetInitialValues(response.data.artist);
	  }).catch(error => {
		if(error.response.status==401){
		  alert("Login token has been expired!!Login again")
		  localStorage.removeItem('auth_token');
		}
		console.error(`An Error Occuredd! ${error}`);
	  });
	 
	  }	
	
	  var genreOptions: any[] = [];

	  if(genres.length!=0){
		genreOptions = Object.keys(genres).map(function(key: any,value:any) {
			if(genres[key]['_id']!="5d70fb3277e3f3361dcc580a"){
		   return <option value={genres[key]['_id']} key={key}>{genres[key]['name']}</option>
		  }
	  });
	   
	  }
	



var all_genres: any[] = [];
console.log(songs.length);
if(songs.length!==0){
	console.log(songs)
    all_genres = Object.keys(songs).map(function(key: any,value:any) {
		let mood = "";
		Object.keys(songs[key]['mood']).map(function(key1: any,value1:any){
		
			mood += songs[key]['mood'][key1]['mood_name']+", "
	   })
	   mood = mood.replace(/,\s*$/, "");
	   let subgenre = "";
	   Object.keys(songs[key]['subGenre_id']).map(function(key1: any,value1:any){
	   
		subgenre += songs[key]['subGenre_id'][key1]['name']+", "
	  })
	  subgenre = subgenre.replace(/,\s*$/, "");
    return <tr key={key}>
         <td>{parseInt(key)+1}</td> 
       
        <td>{songs[key]["song_name"]}</td>
		{ songs[key]['genre_id']? (
        <td>{songs[key]['genre_id']['name'] }</td>
		):(
			<td></td>
			 )}
		
	 <td>{subgenre}</td>
	
       <td>{songs[key]['tempo']['tempo_name']}</td>
	   <td>{songs[key]['key']['key_name']}</td>
      
	   <td>
	 {mood}
	  </td>
	  <td>{songs[key]["stream_count"]}</td>
	  <td>{songs[key]["avg_rate"]}</td>
	  <td>{songs[key]["purchase_count"]}</td>
	  <td>
         <div className="dropdown">
            <button className="dropdown-toggle btn btn-default action" data-toggle="dropdown" >Action
            <span className="caret"></span></button>
            <ul className="dropdown-menu">
            <li><a href={`/admin/edit_song/`+songs[key]['_id']}>Edit</a></li>
           
              <li><a onClick={ (e:any) => delete_song(songs[key]['_id']) }>Delete</a></li>
            </ul>
          </div>
    </td>
  </tr>
    
    
    
    
    
           });
 
}
const delete_song= (song_id:any) =>{
	const access_token = localStorage.getItem('admin_access_token');
	let config1 = {
		headers: {
			'access_token':access_token
		}
	  }
	axios.delete(
        `${config.apiUrl}/songs/`,
        {headers: {
			'access_token':access_token,
			'Content-Type':'application/json'
        },
        data:{
			song_id:song_id
        }}
	  ) .then(function (response) {
		window.location.href = `${config.appurl}/admin/songs/`;
	  })
	

}
const getsong = (playlist_id:any,pageNumber:any,sortby:any,field:any) => {
	const access_token = localStorage.getItem('admin_access_token');
	let config1 = {
		headers: {
			'access_token':access_token
		}
	  }
	axios.get(`${config.apiUrl}/songs/getSongs/`+playlist_id+"/"+field+'/'+sortby+'/'+pageNumber,config1)
	.then(response => response.data)
	.then((data) => {
	//  console.log('_________',data);
		 setitemPerPage(data.getSongs)
		 settotaldata(data.totalSongs)
		 setsongs(data.songDetails);
		}).catch(error => {
	
	   console.error(`An Error Occuredd! ${error}`);
	 })
	 }
		 
    const { error, handleSubmit, pristine, reset, submitting } = props
    return (
      <>
      <div id="page-wrapper">
  <div className="user_table">
  <div className="row topselect">
  <div className="col-md-1">
  <label>Playlist:</label>
  </div>
  <div className="col-md-4">
        <div className="form-group">
   <Field name="genre" component="select" label="genre" className="form-control chosen-select"  onChange={handleChange} >
         
		 <option value="A">All</option>
	   
		{genreOptions}
		 </Field>
		 </div>
		 </div>
		 </div>
       <div className="row">
              <div className="col-lg-12">
			
              <div className="admin_haedg">
              <h3>Songs</h3>
               <span><a  className="btn btn_admin" href="/admin/addsong">Add Songs</a></span>
               </div>

			
                <div className="table-responsive">
                  <table id="second-morris-table" className="table">
                    <thead>
                      <tr>
					  <th>#</th>
					       <th><i  style={ { cursor:`pointer`} } className={titleclass} onClick={() => {handleChangetitle(sortvar)}} aria-hidden="true"></i> Title </th>
							<th>Playlist</th>
							<th>Sub Genre</th>
							<th>Tempo</th>
							<th>Key</th>
							<th>Mood</th>
							<th><i  style={ { cursor:`pointer`} } className={streamclass} onClick={() => {handleChangestream(sortvar)}} aria-hidden="true"></i> Stream count</th>
							<th><i  style={ { cursor:`pointer`} } className={ratingclass} onClick={() => {handleChangerating(sortvar)}} aria-hidden="true"></i> Rating</th>
							<th><i  style={ { cursor:`pointer`} } className={purchaseclass} onClick={() => {handleChangepurchase(sortvar)}} aria-hidden="true"></i> Sales</th>
							<th>Action</th>
						
                      </tr>
                    </thead>
                    <tbody>
                     {all_genres}
                    
                     
                     
                    </tbody>
                  </table>
                  
                </div>
              </div>
            </div>

  
			<Pagination
          activePage={activePage}
          itemsCountPerPage={itemPerPage}
          totalItemsCount={totaldata}
          pageRangeDisplayed={10}
          onChange={handlePageChange}
        />
  </div>
  </div>
     
       
     </>
    )
  }


// $(function() {
//     $(window).bind("load resize", function() {
//         var topOffset = 50;
//         var width = (this.window.innerWidth > 0) ? this.window.innerWidth : this.screen.width;
//         if (width < 768) {
//             $('div.navbar-collapse').addClass('collapse');
//             topOffset = 100; // 2-row-menu
//         } else {
//             $('div.navbar-collapse').removeClass('collapse');
//         }

//         var height = ((this.window.innerHeight > 0) ? this.window.innerHeight : this.screen.height) - 1;
//         height = height - topOffset;
//         if (height < 1) height = 1;
//         if (height > topOffset) {
//             $("#page-wrapper").css("min-height", (height) + "px");
//         }
//     });

//     var url = window.location;

// });

  export default reduxForm({
    form: 'Songs' // a unique identifier for this form
  })(Songs)