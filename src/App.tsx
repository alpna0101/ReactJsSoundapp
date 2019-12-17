import React, {useContext } from 'react'
// import 'bootstrap/dist/css/bootstrap.min.css';


import './App.scss';
import './css/App.css';

// import './js/cropper.js';

import 'bootstrap/dist/js/bootstrap.js';
// import AOS from 'aos';
import store from './store';
import { Provider } from 'react-redux'





import { Layout } from './components/common/Layout'


import Home from './components/Home'
import About from './components/About'
import Faq from './components/Faq'
import Login from './components/Login'
import Register from './components/Register'
import Profile from './components/Profile'
import Logout from './components/Logout'
import Forgot from './components/Forgot'
import Songsa from './components/Songs'
import Playlist from './components/playlist'
import Cart from './components/cart'
import Billing from './components/billing_info'
import Edit from './components/edit_profile'
import Purchase from './components/purchase'
import PurchaseHistory from './components/purchase_history'
import ChangePassword from './components/change_password'

import Dashboard from './components/admin/Dashboard'
import AdminLogin from './components/admin/Login'
import AddSong from './components/admin/AddSong'

import Plans from './components/admin/Plans'
import Genres from './components/admin/Genres'
import SubGenres from './components/admin/SubGenres'
import AddGenre from './components/admin/AddGenre'
import AddSubGenre from './components/admin/AddSubGenre'
import Mood from './components/admin/Mood'
import Keyword from './components/admin/Keyword'
import Tempo from './components/admin/Tempo'
import AddTempo from './components/admin/AddTempo'
import AddMood from './components/admin/AddMood'
import AddKeyword from './components/admin/AddKeyword'
import EditKeyword from './components/admin/EditKeyword'
import EditMood from './components/admin/EditMood'
import EditTempo from './components/admin/EditTempo'
import EditGenre from './components/admin/EditGenre'
import EditPlan from './components/admin/EditPlan'
import Users from './components/admin/Users'
import UserDetail from './components/admin/UserDetail'
import OrderDetail from './components/admin/OrderDetail'
import PlaylistSongs from './components/admin/PlaylistSongs'
import AddProducer from './components/admin/AddProducser'
import Producer from './components/admin/producer'
import Songs from './components/admin/PlaylistSongs'
import EditProducer from './components/admin/EditProducer'
import EditSong from './components/admin/EditSong'
import EditSoundLike from './components/admin/EditSoundLike'
import AddSoundLike from './components/admin/AddSoundLike'
import SoundLike from './components/admin/SoundLike'
import AdminChangePassword from './components/admin/ChangePassword'

import MusicContextProvider from './contexts/MusicContext';
import Player from './components/Player';

import AddOn_orders from './components/admin/AddOn_orders'
import TwoFa from './components/admin/TwoFa'
import AllPlaylist from './components/AllPlaylist'



import $ from "jquery";
// import Web from './components/Web'



import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import EditSubGenre from './components/admin/EditSubGenre';


const access_token = localStorage.getItem('access_token');

const NotFoundPage = () => 
  <div className="notFoundPage">
    <h1>404</h1>
    <h2>Page not found</h2>
  </div>

const WithHeader = (props: any) => {
  return(
    <Layout type="wrap">
      {props.children}
    </Layout>
  )
}
    const WithHomeHeader = (props: any) => 
 
        <Layout type="homewrap">
        {props.children}
      </Layout>
      
    
    
const WithadminHeader = (props: any) => 
<Layout type="wrapadmin">
  {props.children}
</Layout>

const WithoutHeader = (props: any) => 
    <Layout type="nowrap">
      {props.children}
    </Layout>

const App: React.FC = () => {
  $(document).keydown(function(e){
    if(e.which === 123){
       return false;
    }
});
  return (
    <MusicContextProvider>
    <Provider store={store}>
       
 
       <Router>
          <Switch>
          { access_token ? (
					
                <Route exact={true} path="/" component={() => <WithHeader>{<Home/>}</WithHeader>} />
                ):(
                  <Route exact={true} path="/" component={() => <WithHomeHeader>{<Home/>}</WithHomeHeader>} />
                  
                )}
                     { access_token ? (
					
          <Route exact={true} path="/faq" component={() => <WithHeader>{<Faq/>}</WithHeader>}/>
          ):(
            <Route exact={true} path="/faq" component={() => <WithHomeHeader>{<Faq/>}</WithHomeHeader>}/>
            
          )}
                     { access_token ? (
					
          <Route exact={true} path="/about" component={() => <WithHeader>{<About/>}</WithHeader>}/>
          ):(
            <Route exact={true} path="/about" component={() => <WithHomeHeader>{<About/>}</WithHomeHeader>}/>
            
          )}
            {/* <Route exact={true} path="/" component={() => <WithHomeHeader>{<Home/>}</WithHomeHeader>} /> */}
            { access_token ? (
					 <Route exact={true} path="/playlists/:id" component={(props: any) => <WithHeader>{<AllPlaylist {...props}/>}</WithHeader>} />
         
          ):(
            <Route exact={true} path="/playlists/:id" component={(props: any) => <WithHomeHeader>{<AllPlaylist {...props}/>}</WithHomeHeader>} />
            
          )}
            <Route exact={true} path="/register" component={Register} />
            <Route exact={true} path="/login" component={Login} />
            <Route exact={true} path="/forgot" component={Forgot} />
            <Route exact={true} path="/change_password" component={ChangePassword} />
            
            <Route exact={true} path="/admin/login" component={AdminLogin} />
            <Route exact={true} path="/admin/two-factor-authentication" component={TwoFa} />
            <Route exact={true} path="/profile" component={() => <WithHeader>{<Profile/>}</WithHeader>} />
            <Route exact={true} path="/playlist"component={() => <WithHeader>{<Playlist/>}</WithHeader>} />
            <Route exact={true} path="/cart" component={() => <WithHeader>{<Cart/>}</WithHeader>} />
            <Route exact={true} path="/billing" component={() => <WithHeader>{<Billing/>}</WithHeader>}/>
            <Route exact={true} path="/edit_profile" component={() => <WithHeader>{<Edit/>}</WithHeader>} />
            <Route exact={true} path="/purchase" component={() => <WithHeader>{<Purchase/>}</WithHeader>} />
            <Route exact={true} path="/purchase_history" component={() => <WithHeader>{<PurchaseHistory/>}</WithHeader>} />
           
            <Route exact={true} path="/logout" component={Logout} />
            <Route exact={true} path="/songs" component={Songs} />
            <Route exact={true} path="/admin/dashboard" component={() => <WithadminHeader>{<Dashboard/>}</WithadminHeader>} />
            <Route exact={true} path="/admin/addsong"   component={() => <WithadminHeader>{<AddSong/>}</WithadminHeader>} />
      
            <Route exact={true} path="/admin/plans" component={() => <WithadminHeader>{<Plans/>}</WithadminHeader>} />
            <Route exact={true} path="/admin/songs" component={() => <WithadminHeader>{<Songs/>}</WithadminHeader>} />
            <Route exact={true} path="/admin/playlists" component={() => <WithadminHeader>{<Genres/>}</WithadminHeader>} />
            <Route exact={true} path="/admin/add_playlist" component={() => <WithadminHeader>{<AddGenre/>}</WithadminHeader>} />
            <Route exact={true} path="/admin/subgenres/:id" component={(props: any) => <WithadminHeader>{<SubGenres {...props}/>}</WithadminHeader>} />
            <Route exact={true} path="/admin/add_subgenre" component={() => <WithadminHeader>{<AddSubGenre/>}</WithadminHeader>} />
            <Route exact={true} path="/admin/mood" component={() => <WithadminHeader>{<Mood/>}</WithadminHeader>} />
            <Route exact={true} path="/admin/key" component={() => <WithadminHeader>{<Keyword/>}</WithadminHeader>} />
            <Route exact={true} path="/admin/tempo" component={() => <WithadminHeader>{<Tempo/>}</WithadminHeader>} />
            <Route exact={true} path="/admin/add_tempo" component={() => <WithadminHeader>{<AddTempo/>}</WithadminHeader>} />
            <Route exact={true} path="/admin/add_mood" component={() => <WithadminHeader>{<AddMood/>}</WithadminHeader>} />
            <Route exact={true} path="/admin/add_keyword" component={() => <WithadminHeader>{<AddKeyword/>}</WithadminHeader>} />
            <Route exact={true} path="/admin/edit_keyword/:id" component={(props: any) => <WithadminHeader>{<EditKeyword {...props}/>}</WithadminHeader>} />
            <Route exact={true} path="/admin/edit_mood/:id" component={(props: any) => <WithadminHeader>{<EditMood {...props}/>}</WithadminHeader>} />
            <Route exact={true} path="/admin/edit_tempo/:id" component={(props: any) => <WithadminHeader>{<EditTempo {...props}/>}</WithadminHeader>} />
            <Route exact={true} path="/admin/edit_genre/:id" component={(props: any) => <WithadminHeader>{<EditGenre {...props}/>}</WithadminHeader>} />
            <Route exact={true} path="/admin/edit_plan/:id" component={(props: any) => <WithadminHeader>{<EditPlan {...props}/>}</WithadminHeader>} />
            <Route exact={true} path="/admin/edit_subgenre/:id" component={(props: any) => <WithadminHeader>{<EditSubGenre {...props}/>}</WithadminHeader>} />
            <Route exact={true} path="/admin/user_detail/:id" component={(props: any) => <WithadminHeader>{<UserDetail {...props}/>}</WithadminHeader>} />
            <Route exact={true} path="/admin/order_detail/:id" component={(props: any) => <WithadminHeader>{<OrderDetail {...props}/>}</WithadminHeader>} />
            <Route exact={true} path="/admin/plalist_songs/:id" component={(props: any) => <WithadminHeader>{<PlaylistSongs {...props}/>}</WithadminHeader>} />
            <Route exact={true} path="/admin/users" component={() => <WithadminHeader>{<Users/>}</WithadminHeader>} />
            <Route exact={true} path="/admin/add_producer" component={() => <WithadminHeader>{<AddProducer/>}</WithadminHeader>} />
            <Route exact={true} path="/admin/producers" component={() => <WithadminHeader>{<Producer/>}</WithadminHeader>} />
            <Route exact={true} path="/admin/edit_producer/:id" component={(props: any) => <WithadminHeader>{<EditProducer {...props}/>}</WithadminHeader>} />
            <Route exact={true} path="/admin/edit_song/:id" component={(props: any) => <WithadminHeader>{<EditSong {...props}/>}</WithadminHeader>} />
            <Route exact={true} path="/admin/edit_soundlike/:id" component={(props: any) => <WithadminHeader>{<EditSoundLike {...props}/>}</WithadminHeader>} />
            <Route exact={true} path="/admin/add_soundlike" component={() => <WithadminHeader>{<AddSoundLike/>}</WithadminHeader>} />
            <Route exact={true} path="/admin/soundlike" component={() => <WithadminHeader>{<SoundLike/>}</WithadminHeader>} />
            <Route exact={true} path="/admin/orders" component={() => <WithadminHeader>{<AddOn_orders/>}</WithadminHeader>} />
            <Route exact={true} path="/admin/changepassword" component={() => <WithadminHeader>{<AdminChangePassword/>}</WithadminHeader>} />
          
            
             
            {/* <Route path="*" component={NotFoundPage} />
            <Route path="*" component={NotFoundPage} /> */}
          </Switch>
          
     </Router>
    


     <div style={{width: '100%'}}>
        <Player/>
      </div>
    </Provider>
    </MusicContextProvider>
  );
}

export default App;
