import React,{ Fragment,useEffect } from "react";
import {BrowserRouter as Router , Switch ,Route , Redirect} from 'react-router-dom'
import Navbar from './components/Layout/Navbar'
import Landing  from './components/Layout/Landing'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Alert from './components/Layout/alert'
import './App.css';
import {Provider} from 'react-redux'
import store from './Store'
import setAuthToken from './utils/setAuthToken'
import {loadUser} from './actions/auth'
import PrivateRoute from './components/Routing/PrivateRoute'
import  Dashboard from './components/Dashboard/Dashboard'
import Profiles from './components/profiles/Profiles'
import Profile from './components/Profile/Profile'
//import CreateProfile from './components/profile-forms/CreateProfile'
import EditProfile from './components/profile-forms/EditProfile'
import AddEducation from './components/profile-forms/AddEducation'
import Posts from './components/posts/Posts'
import NewPost from './components/posts/NewPost'
import Post from'./components/Post/Post'

if(localStorage.token){
  setAuthToken(localStorage.token)
}

const App =()=>{
  useEffect(()=>{
    store.dispatch(loadUser())
  },[])

  return(
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path='/' component ={Landing} />
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path ="/register" component={Register } />
              <Route exact path ="/login" component={ Login } />
              <Route exact path ="/profiles" component={ Profiles } />
              <Route exact path="/profile/:id" component={ Profile } />
              <PrivateRoute exact path="/posts" component={ Posts } />
              <PrivateRoute exact path="/post/:id" component={ Post } />
              <PrivateRoute exact path="/newPost" component={ NewPost } />
              <PrivateRoute exact path ='/dashboard' component ={Dashboard} />
              <PrivateRoute exact path ='/create-profile' component ={EditProfile} />
              <PrivateRoute exact path='/edit-profile' component ={EditProfile} />
              <PrivateRoute exact path='/add-education' component ={AddEducation} />
              <Redirect to='/' />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  )
}
export default App;
