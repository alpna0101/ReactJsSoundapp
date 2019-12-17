import React from 'react';
// import { connect } from "react-redux";
// import store from '../store';
import { Container, Row, Col } from 'react-bootstrap' 
import about_img from '../images/about_img.png';
const About = () => { 
    return (
		<>
		<section className="about_us">
	<div className="container">
		<div className="col-md-12">
			<div className="about_headg">
				<h1>About Us</h1>
			</div>
		</div>
	</div>
</section>
		<section className="about_cnnt">
		<div className="container">
			<div className="row">
				<div className="col-lg-6 col-md-6 col-sm-12">
					<div className="abut_lft">
						<p>Introducing Sounds Sphere. A boutique, upscale production marketplace tailored to your specific style. We’ve combined 3 key features to deliver a first of its kind, high quality platform that serves songwriters and artists in a way that actually makes sense.</p>
						<h3>Top-notch Tracks</h3>
						<p>We’ve gathered a huge library of top-notch tracks from producers all over the world. Each track is hand-picked to ensure we have the highest quality available online. These tracks are then categorized and separated into 5 main genre playlists, with sub-genres in each. </p>
						<h3>Personalized Experience</h3>
						<p>We leverage technology to create a personalized experience for all of our users by serving them a unique playlist of tracks recommended for them. No user has the same playlist because no two artists are the same.</p>
						<h3>More power and flexibility to the artist</h3>					
						<p>Our standardized contract makes it easy to understand what you can and cannot do with the track if you decide to license it. While the basic license is non-exclusive, we have options for exclusivity that give more power and flexibility to the artist.  In this new digital age, we’re making it possible to save money on production so you can focus on being the artist you want to be, all with professionalism, quality, and community throughout the process.</p>
						<p>Yes, we realize the music industry is complicated, and it seems like the rules require a PHD to understand, but Sounds Sphere has done the hard work for you. We’ve created a system that works for everyone and provides a great experience finding production for artists and songwriters. Welcome to the Sounds Sphere.</p>
					</div>
				</div>
				<div className="col-lg-6 col-md-6 col-sm-12">
					<div className="abut_right">
						<img src={about_img}/>
					</div>
				</div>
			</div>
		</div>
	</section>
	</>
    )
}


export default About;