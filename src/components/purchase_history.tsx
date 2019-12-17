
import React, { useState,useEffect} from 'react';
// import { connect } from "react-redux";
// import store from '../store';

import {config} from '../config/config'
import account_logo from '../images/account_logo.png';
import axios from 'axios';
import $ from "jquery";
import play from '../images/play.png';
import Moment from 'react-moment';
import Pagination from "react-js-pagination";
  const History = (props: any) => {
    const [purchase, setpurchase] = useState();
    var songli: any = '';
    const [activePage, setactivepage] = useState(1);
    const [itemPerPage, setitemPerPage] = useState();
    const [totaldata, settotaldata] = useState();
    const  handlePageChange=(pageNumber:any)=>{
        console.log(`active page is ${pageNumber}`);
        setactivepage(pageNumber);
      }
    useEffect(() => {
        const access_token = localStorage.getItem('access_token');
        let config1 = {
            headers: {
                'access_token':access_token
            }
          }
        axios.get(`${config.apiUrl}/orders/getInfoById`,config1).then(async (response) => {
            // setartists(response.data.Artist);
          console.log(response.data.result,"========")
            setpurchase(response.data.result);
            }).catch(error => {
            if(error.response.status==401){
              alert("Login token has been expired!!Login again")
              localStorage.removeItem('auth_token');
            }
            console.error(`An Error Occuredd! ${error}`);
          });
   
        }, []);
        $(".closerecp").click(function(){
            $("#view_recpt_modal").removeClass('in')
            //   $(".modal-backdrop.fade.show").css("z-index", "9999");
              $("#view_recpt_modal").css("display","none");
        
            $(".modal-backdrop").css("display","none");
            
           });
    const getreciept =(id:any)=>{
      const access_token = localStorage.getItem('access_token');
     
      axios.get(`${config.apiUrl}/orders/getReceipt/`+id,{headers: {
        'access_token':access_token}}).then(response => response.data)
      .then((data) => {
        const dateTime =data.details[0]['placed_on'];
         const parts = dateTime.split(/[- : T]/);
         console.log(parts);
       const wanted = `${parts[2]}/${parts[1]}/${parts[0]} ${parts[3]}:${parts[4]}`;
          $("#rname").text(data.details[0]['name'])
          $("#raddress").text(data.details[0]['address'])
          $("#rcity").text(data.details[0]['city'])
          $("#rcountry").text(data.details[0]['country'])
          $("#rcode").text(data.details[0]['postal'])
          // $("#rtrans").text(data.details[0]['trans'])
          $("#rdate").text(wanted)
          setitemPerPage(10)
          settotaldata(data.totalCount)
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
    



    var purchase1: any = [];

    if(purchase){  
      purchase1 = Object.keys(purchase).map(function(key: any,value:any) {
    
        return   <tr>
        <td><img className="click_me" src={play} />{purchase[key]['song_id'][0]['song_name']}</td>
        <td><Moment format="DD-MM-YYYY">
        {purchase[key]['placed_on']}
             </Moment></td>
      
        <td><button className="btn view_rec"  onClick={() => {getreciept(purchase[key]['_id'])}}>VIEW RECEIPT</button></td>
        </tr>
        
     
      
     
      
     
        
    });
     
    }
    return (
        <>
        <section className="paly_table_lstng recmnd_sctn purchase_history">
        <div className="col-md-12 paddg_0">
                <h2 className="text-center">Purchase History</h2>
                <div className="inner_table_listng history_list">
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
                                {purchase1}
                                    
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
    </section>
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
          <button className="btn">DOWNLOAD RECEIPT</button>
          </div>
      </div>
    </div>
      </div>
    
    </div>
  </div>
</div>
    </>
       )
  }
  
  export default  History;
  













