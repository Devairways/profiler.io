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
 	this.setState({searchUser:event.target.value.toLowerCase()})
 }

 onButtonSubmit = ()=>{
 	this.props.searchTerm(this.state.searchUser)
 }

 keyCheck = (e)=>{
 	console.log("key",e.keyCode)
 	if (e.keyCode === 13){
 		this.onButtonSubmit();
 	}
 }

	render(){
	return (
		<div>
			<main className="bg-light-red mw7 center pa4 br2-ns ba b--black-10 ">
				<input type="text" className="" onChange={this.onChange} onKeyUp={this.keyCheck} name="name" placeholder="search Users..."/>
				<Link to="/search">
				<input type="submit" className="" onClick={this.onButtonSubmit} value="search"/>
				</Link>
			</main>
			
		</div>
		);
}
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);