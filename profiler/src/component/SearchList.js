import React from "react";
import Card from "./Card";
import {apiCall} from "../api/api";
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

class SearchList extends React.Component {
	state={
		users:[],
    userName:"",
	}

  getUser = ()=>{
    //wanneer er een zoekterm is haal deze gebruiker op
          if(this.props.search){
            console.log("zoekterm",this.props.search)
       apiCall(`http://localhost:3003/users/${this.props.search}`)
       .then(data => this.setState({users:[data],userName: this.props.search}))
      .catch(err => console.log(err))
    }else{
      //geen zoekterm haal dan alle gebruikers op
       apiCall(`http://localhost:3003/users/all`)
       .then(data => this.setState({users:data}))
      .catch(err => console.log(err))
    }
  }

	componentDidMount(){
    this.setState({userName:this.props.search})
   this.getUser()
    }
    

  render(){
  	const list = this.state.users;
    if(this.state.userName !== this.props.search){
      this.getUser()
    }
    
  return (
    <div>
       {
        list.map((user, i) => {
          return (
            <Card searchTerm={this.props.searchTerm}
              key={i}
              id={list[i].id}
              name={list[i].name}
              email={list[i].email}
              />
          );
        })
      }
    </div>
  );
}
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchList);