import React from "react";
import Card from "./Card";
import {apiCall} from "../api/api";
import { connect } from 'react-redux';
import { requestProfile, setSearchField } from '../actions';

const mapStateToProps = (state) => {
  
  return {
    search: state.getUser.search
  }
}

const mapDispatchToProps = (dispatch) => {
    
  return {
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
     }
     else{
      //geen zoekterm haal dan alle gebruikers op
       apiCall(`http://localhost:3003/users/all`)
       .then(data => this.setState({users:data}))
      .catch(err => console.log(err))
    }
  }

	componentDidMount(){
    this.setState({userName:this.props.search})
    setTimeout(e =>{this.getUser()},1000)
    }
    

  render(){
  	const list = this.state.users;
    
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