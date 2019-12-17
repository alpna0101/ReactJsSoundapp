import React, { useEffect } from 'react';
// import { connect } from "react-redux";
// import store from '../store';
import { Container, Row, Col } from 'react-bootstrap' 
import faq_img from '../images/faq_img.png';
import $ from "jquery";


const Home = () => { 
 
  $('ducument').ready(function(){
    $(".my_data").click(function(){
    // $(".my_data").addClass('collapsed')
    $(".panel-collapse").removeClass('show')
     var id = $(this).attr('aria-controls')
     if($(this).hasClass('collapsed')==true){
      //  alert("colla")
     
      $("#"+id).removeClass('show')
     }else{
      $(".my_data").addClass('collapsed')
      $("#"+id).addClass('show')
     
     }
    
    })
  })
  
    return (
       <>
       <section className="faq_sctn">
	<div className="container">
		<div className="col-md-12">
			<div className="faq_headg">
				<h1>FAQ</h1>
			</div>
		</div>
	</div>
</section>
<section className="faq_cntnt">
	<div className="container">
		<div className="row">
			<div className="col-lg-6 col-md-6 col-sm-12">
				  <div className="faq_lft">
	             <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
                  <div className="panel panel-default">
                    <div className="panel-heading" role="tab" id="panelhead1">
                      <h4 className="panel-title">
                        <a className="collapsed my_data" role="button" data-toggle="collapse" data-parent="#accordion" href="#panel1" aria-expanded="false" aria-controls="panel1">
                          <span className="plus-minus"></span>Who are the producers on the site, and why aren’t their names displayed?
                        </a>
                      </h4>
                    </div>
                    <div id="panel1" className="panel-collapse collapse" role="tabpanel" aria-labelledby="panelhead1">
                      <div className="panel-body">
                        <p>Sounds Sphere has partnered with top producers from all over the world to deliver the highest quality, most radio-ready tracks possible. Our producers have worked with thousands of independent artists and major label artists alike. Usher, Skillet, and Young Thug are just some of the credits our producers have. We don’t list producer names on our tracks because we believe an artist should connect with a track because of the music, not the producer’s name. Keeping everything under the Sounds Sphere brand makes a more consistent experience. While we prioritize a consistent, music-first experience, producers’ names are in all of our contracts, so artists will know who produced a track once they license it. </p>
                      </div>
                    </div>
                  </div>


                  <div className="panel panel-default">
                    <div className="panel-heading" role="tab" id="panelhead2">
                      <h4 className="panel-title">
                        <a className="collapsed my_data" role="button" data-toggle="collapse" data-parent="#accordion" href="#panel2" aria-expanded="false" aria-controls="panel2">
                          <span className="plus-minus"></span>Why do you require a non-exclusive license be purchased prior to an exclusive license?
                        </a>
                      </h4>
                    </div>
                    <div id="panel2" className="panel-collapse collapse" role="tabpanel" aria-labelledby="panelhead2">
                      <div className="panel-body">
                        <p>We believe all of our artists can be successful without spending unnecessary money. It no longer makes sense for an independent artist to spend thousands of dollars on production when she can get the same quality production for less, see how her song performs, then decide to go exclusive. We also want to make sure our producers are taken care of - their hard work producing tracks should be rewarded properly. In order to do both, we created a system that benefits both the artist, who can see what happens with a song prior shelling out money for an exclusive, and the producer, who is protected from selling exclusive rights to a track and then no song being made.  We’ve still made it easy to obtain an exclusive license, though. Simply purchase a non-exclusive license, make your song, and then request the exclusive license by submitting your song. In the near future, we will allow artists to apply for “Fast Track” status, allowing them to purchase exclusive licenses right away without submitting their song first.</p>
                      </div>
                    </div>
                  </div>


                  <div className="panel panel-default">
                    <div className="panel-heading" role="tab" id="panelhead3">
                      <h4 className="panel-title">
                        <a className="collapsed my_data" role="button" data-toggle="collapse" data-parent="#accordion" href="#panel3" aria-expanded="false" aria-controls="panel3">
                          <span className="plus-minus"></span>What rights do I have to my song and what can I do with it?
                        </a>
                      </h4>
                    </div>
                    <div id="panel3" className="panel-collapse collapse" role="tabpanel" aria-labelledby="panelhead3">
                      <div className="panel-body">
                        <p>The headlines from our standard non-exclusive contract are:<br></br>

Distribute and stream up to 100,000 times<br></br>
Synch with approval of Sounds Sphere for film/tv<br></br>
1 radio station airplay <br></br>
1 music video up to 100,000 streams<br></br>
Our non-exclusive licenses never expire, so you don’t have to worry about taking the song down after a period of time.<br></br>
The main restrictions apply to music libraries or so-called “micro licensing” sites and monetization on YouTube or other video websites. Extended use licenses are available for an additional $79 per extendable event, for example going over 100,000 streams. Under a non-exclusive license, rights are split 50/50 with the producer. This includes writer’s share of publishing, publisher’s share of publishing, and master revenue. The producer always retains 50%, so if more than one artist or writer is involved with the song, those multiple people would split the other 50% between them. For example, a song with two writers would result in 25% each for the writers. </p>
                      </div>
                    </div>
                  </div>

                   <div className="panel panel-default">
                    <div className="panel-heading" role="tab" id="panelhead4">
                      <h4 className="panel-title">
                        <a className="collapsed my_data" role="button" data-toggle="collapse" data-parent="#accordion" href="#panel4" aria-expanded="false" aria-controls="panel4">
                          <span className="plus-minus"></span>Can I register my song with a PRO?
                        </a>
                      </h4>
                    </div>
                    <div id="panel4" className="panel-collapse collapse" role="tabpanel" aria-labelledby="panelhead4">
                      <div className="panel-body">
                        <p>Yes, registration with a PRO (Performance Rights Organization) is allowed and encouraged, but must include the producers writer’s information and publisher information as defined in the contract. Once under contract, we encourage our producers to be communicative with the artists regarding their songs and any potential placements that might be available so they can co-promote and help with releases.  </p>
                      </div>
                    </div>
                  </div>


                  <div className="panel panel-default">
                    <div className="panel-heading" role="tab" id="panelhead5">
                      <h4 className="panel-title">
                        <a className="collapsed my_data" role="button" data-toggle="collapse" data-parent="#accordion" href="#panel5" aria-expanded="false" aria-controls="panel5">
                          <span className="plus-minus"></span>What happens if I have a film or TV placement opportunity?
                        </a>
                      </h4>
                    </div>
                    <div id="panel5" className="panel-collapse collapse" role="tabpanel" aria-labelledby="panelhead5">
                      <div className="panel-body">
                        <p>Placement opportunities must be approved by Sounds Sphere to make sure the administration and contracts are valid according to the standard non-exclusive agreement. Email us at sync@Sounds Sphere.com with the specific details. We’re here to help, and we want to promote songs to their full potential. Making sure to register the song with proper splits is the best way to ensure a speedy process getting it signed and placed. All placements must be non-exclusive, expire after two years or less, and cannot include a sync of the instrumental.</p>
                      </div>
                    </div>
                  </div>


                  <div className="panel panel-default">
                    <div className="panel-heading" role="tab" id="panelhead6">
                      <h4 className="panel-title">
                        <a className="collapsed my_data" role="button" data-toggle="collapse" data-parent="#accordion" href="#panel6" aria-expanded="false" aria-controls="panel6">
                          <span className="plus-minus"></span>Can I put my song on Spotify, iTunes, Apple Music, Tidal, and other streaming services?
                        </a>
                      </h4>
                    </div>
                    <div id="panel6" className="panel-collapse collapse" role="tabpanel" aria-labelledby="panelhead6">
                      <div className="panel-body">
                    <p>Yes, absolutely! We recommend <a href="https://distrokid.com/vip/seven/705868">DistroKid</a> for distribution because of its automatic revenue splitting feature. This feature automates the process of paying out the producer’s 50% share of master revenue. Artists can distribute songs however they want, but 50% of all master revenue is owed to the producer under our standard non-exclusive contract.  </p>
                      </div>
                    </div>
                  </div>

                   <div className="panel panel-default">
                    <div className="panel-heading" role="tab" id="panelhead7">
                      <h4 className="panel-title">
                        <a className="collapsed my_data" role="button" data-toggle="collapse" data-parent="#accordion" href="#panel7" aria-expanded="false" aria-controls="panel7">
                          <span className="plus-minus"></span>What if I need to own the full rights to the track?  Does Sounds Sphere have a buyout option?
                        </a>
                      </h4>
                    </div>
                    <div id="panel7" className="panel-collapse collapse" role="tabpanel" aria-labelledby="panelhead7">
                      <div className="panel-body">
                        <p>We offer two price points for our exclusive license, both of which include a full buyout of the master with a small master revenue percentage of 5% owed to the producer. Included with our higher price point buyout option is monetization of all pre-existing non-exclusive songs using the same instrumental. If you have questions about exclusive licensing, it’s best to get in touch to discuss your specific situation.</p>
                      </div>
                    </div>
                  </div>


                   <div className="panel panel-default">
                    <div className="panel-heading" role="tab" id="panelhead8">
                      <h4 className="panel-title">
                        <a className="collapsed my_data" role="button" data-toggle="collapse" data-parent="#accordion" href="#panel8" aria-expanded="false" aria-controls="panel8">
                          <span className="plus-minus"></span>Does Sounds Sphere offer custom production?
                        </a>
                      </h4>
                    </div>
                    <div id="panel8" className="panel-collapse collapse" role="tabpanel" aria-labelledby="panelhead8">
                      <div className="panel-body">
                        <p>Yes, simply email us with the details of your project and we’ll have one of our producers respond within three days.</p>
                      </div>
                    </div>
                  </div>


                   <div className="panel panel-default">
                    <div className="panel-heading" role="tab" id="panelhead9">
                      <h4 className="panel-title">
                        <a className="collapsed my_data" role="button" data-toggle="collapse" data-parent="#accordion" href="#panel9" aria-expanded="false" aria-controls="panel9">
                          <span className="plus-minus"></span>What if I’m a producer and want to submit tracks to Sounds Sphere?
                        </a>
                      </h4>
                    </div>
                    <div id="panel9" className="panel-collapse collapse" role="tabpanel" aria-labelledby="panelhead9">
                      <div className="panel-body">
                        <p>We’re always looking to add great producers to our team. Send us a streaming link with three of your best tracks to: <a href="mailto:submit@Sounds Sphere.com">submit@Sounds Sphere.com</a> and you can expect a response in 48-72 hours.  </p>
                      </div>
                    </div>
                  </div>


                   <div className="panel panel-default">
                    <div className="panel-heading" role="tab" id="panelhead10">
                      <h4 className="panel-title">
                        <a className="collapsed my_data" role="button" data-toggle="collapse" data-parent="#accordion" href="#panel10" aria-expanded="false" aria-controls="panel10">
                          <span className="plus-minus"></span>Can I cancel or change my membership?
                        </a>
                      </h4>
                    </div>
                    <div id="panel10" className="panel-collapse collapse" role="tabpanel" aria-labelledby="panelhead10">
                      <div className="panel-body">
                        <p>Yes, if you are a monthly or yearly member you can upgrade or downgrade your membership at any time. If you decide to cancel a membership, the most recent payment will be the last payment made and you will retain all credits from that payment. For example, if you cancel a monthly membership, you will not be charged for the next month, and you'll retain the credit for the current month that's already been paid for. When you upgrade from a monthly membership to a yearly membership, we will immediately deposit your fifteen yearly credits on top of however many credits are in your account already. Downgrades from a monthly membership account will simply change the status to a free account, which will maintain the history of the account. You can always re-upgrade your membership status at a later time.</p>
                      </div>
                    </div>
                  </div>


                  <div className="panel panel-default">
                    <div className="panel-heading" role="tab" id="panelhead11">
                      <h4 className="panel-title">
                        <a className="collapsed my_data" role="button" data-toggle="collapse" data-parent="#accordion" href="#panel11" aria-expanded="false" aria-controls="panel11">
                          <span className="plus-minus"></span>Do my credits expire or rollover?
                        </a>
                      </h4>
                    </div>
                    <div id="panel11" className="panel-collapse collapse" role="tabpanel" aria-labelledby="panelhead11">
                      <div className="panel-body">
                        <p>Credits are rolled over for up to one year, but expire after twelve months if not used.</p>
                      </div>
                    </div>
                  </div>


                  <div className="panel panel-default">
                    <div className="panel-heading" role="tab" id="panelhead12">
                      <h4 className="panel-title">
                        <a className="collapsed my_data" role="button" data-toggle="collapse" data-parent="#accordion" href="#panel12" aria-expanded="false" aria-controls="panel12">
                          <span className="plus-minus"></span>Does Sounds Sphere offer refunds?
                        </a>
                      </h4>
                    </div>
                    <div id="panel12" className="panel-collapse collapse" role="tabpanel" aria-labelledby="panelhead12">
                      <div className="panel-body">
                        <p>Because our deliverables are untagged WAV files delivered right away upon purchase, Sounds Sphere cannot currently offer refunds of purchases made on platform. Please be sure you want to purchase a track before completing checkout. </p>
                      </div>
                    </div>
                  </div>
                  <div className="panel panel-default">
                    <div className="panel-heading" role="tab" id="panelhead13">
                      <h4 className="panel-title">
                        <a className="collapsed my_data" role="button" data-toggle="collapse" data-parent="#accordion" href="#panel13" aria-expanded="false" aria-controls="panel13">
                          <span className="plus-minus"></span>What are the details of the various add-ons offered by Sounds Sphere?
                        </a>
                      </h4>
                    </div>
                    <div id="panel13" className="panel-collapse collapse" role="tabpanel" aria-labelledby="panelhead13">
                      <div className="panel-body">
                        <p>Sounds Sphere offers three add-ons available for purchase at checkout. These include: track stems, which is one zipped file including all the parts of the track separated out into individual WAV files. Song mixing, which is taking the vocals you record and have mixed with effects (or "wet") and blending them with the instrumental session - but not doing any mixing work on the vocals themselves. And song mixing with vocal production, which is a full mix session including vocal mixing for your dry, recorded vocals.  </p>
                      </div>
                    </div>
                  </div>
               

                </div>
	         </div>
			</div>
			<div className="col-lg-6 col-md-6 col-sm-12">
				<div className="faq_right">
					<img src={faq_img}/>
				</div>
			</div>
		</div>
	</div>
</section>
	   </>
    )
}


export default Home;