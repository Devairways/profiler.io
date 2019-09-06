import React, {Suspense, Lazy} from 'react';
import { connect } from 'react-redux';
import { requestProfile, requestProfileToken, setSearchField } from '../actions';
import { Route, Redirect } from 'react-router-dom';

import Profile from './Profile';
import LogIn from '../component/Login';
import Register from '../component/Register';
import ProfileEdit from '../component/ProfileEdit';
import Search from '../component/Search';
import Menu from '../component/Menu'
import SearchList from "../component/SearchList";




// parameter state comes from index.js provider store state(rootReducers)
const mapStateToProps = (state) => {
  
  return {
    profile: state.updateProfile.profile,
    authed: state.updateProfile.authed,
    token: state.updateProfile.token,
    pending: state.updateProfile.pending,
    search: state.getUser.search
  }
}

// dispatch the DOM changes to call an action. note mapStateToProps returns object, mapDispatchToProps returns function
// the function returns an object then uses connect to change the data from reducers.
const mapDispatchToProps = (dispatch) => {
    
  return {
    // logIn: (event) => dispatch(setSearchField(event.target.value)),
    Login: (email,password) => dispatch(requestProfile(email,password)),
    LoginToken: (token) => dispatch(requestProfileToken(token)),
    searchTerm: (text) => dispatch(setSearchField(text))
  }
}

class App extends React.Component {
  state={
    tokenAuth:false
  }
    componentDidMount() {
    const token = window.sessionStorage.getItem('token');
    if (token) {
      // check of de token geldig is
      this.props.LoginToken(token);
      this.setState({tokenAuth:true})
    }
  }

   render() {
    const { Login, profile, authed, search, token} = this.props;
    return (
        <div className="App">
        <Menu authed={authed}  login={Login}/>
          <Suspense fallback={<div><h3>Loading...</h3></div>}>
            <Route exact path="/" render={(props) => <h3>This is the main page</h3>} />
            <Route path="/login" render={(props) => <LogIn {...props} Login={Login} authed={this.props.authed} />} />
            <Route path="/register" render={(props) => <Register {...props} loadUser={this.loadUser} />}/>
            
            <PrivateRoute authed={authed} token={token} user={profile}  path='/profile' component={Profile} />
            <PrivateRoute authed={authed} path='/search' component={SearchList} />
            <PrivateRoute authed={authed} user={search} path='/user' component={Profile} />
            <PrivateRoute authed={authed} user={profile} path="/profileEdit" component={ProfileEdit} />
          </Suspense>
        </div>
    );
  }
}

function PrivateRoute ({component: Component, authed, user, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed
        ? <Component {...rest} user={user}  />
        : <Redirect to={{pathname: '/login'}} />}
    />
  )
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
