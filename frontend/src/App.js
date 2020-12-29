import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import  NavBar  from './components/NavBar'
import  HomeScreen  from './components/HomeScreen/HomeScreen'
import SignIn from './components/SignIn'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import AccountCreated from './components/AccountCreated';
import Profile from './components/Profile/Profile';
import SearchResult from './components/SearchResult'
import Logout from './components/Logout';
import SelectedQuestion from './components/SelectedQuestion/SelectedQuestion';
import DeleteProfile from './components/Profile/DeleteProfile';
import EditProfile from './components/Profile/EditProfile';




function App() {
  return (
   <BrowserRouter>
    <div className="grid-container">
    <NavBar/>
    <Switch>
      <Route path ="/signin" component={SignIn}/>
      <Route path="/" exact={true} component={HomeScreen}/>
      <Route path="/user/account_created" component={AccountCreated}/>
      
      <Route path="/profile/:id/delete_profile" component={DeleteProfile}/>
      <Route path="/profile/:id"  component={Profile}/>
      <Route path="/edit/:username/:id" exact={true} component={EditProfile}/>
      <Route path="/search/:id" component={SearchResult} />
      <Route path="/logout" component={Logout}/>
      <Route path="/:id" exact={true} component={SelectedQuestion}/>
      
      </Switch>
    
    </div>
   </BrowserRouter>
  );
}

export default App;
