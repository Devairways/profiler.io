import React from "react";
import { Link} from "react-router-dom";
import { connect } from 'react-redux';
import { requestProfile, setSearchField } from '../actions';


const mapStateToProps = (state) => {
  
  return {
    profile: state.updateProfile.profile,
    authed: state.updateProfile.authed,
    search: state.getUser.search
  }
}

const mapDispatchToProps = (dispatch) => {
    
  return {
    // logIn: (event) => dispatch(setSearchField(event.target.value)),
    Login: (email,password) => dispatch(requestProfile(email,password)),
    searchTerm: (text) => dispatch(setSearchField(text))
  }
}


class Search extends React.Component{
 state={
 	searchUser: ''
 }
 onChange = (event)=>{
 	this.setState({searchUser:event.target.value})
 }

 onButtonSubmit = ()=>{
 	console.log("search",this.state.searchUser)
 	this.props.searchTerm(this.state.searchUser)
 }

	render(){
	return (
		<div>
			<main>
				<input type="text" className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-80" onChange={this.onChange} name="name" placeholder="search Users..."/>
				<Link to="/search">
				<input type="submit" className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" onClick={this.onButtonSubmit} value="search"/>
				</Link>
			</main>
			
		</div>
		);
}
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);