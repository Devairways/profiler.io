import React, {Component} from "react";
import {apiCall} from "../api/api";
import { Link} from "react-router-dom";

class Profile extends Component {
 state={
 	user:{
 		link:[]
 	},
 }

 componentDidMount(){
 	if (this.props.path === "/user"){
		apiCall(`http://localhost:3003/users/${this.props.search}`)
		.then(data =>{
			this.setState({user:data})
		})
		.catch(err =>{console.log(err)})		 
	}
	
 }

saveAuthTokenInSessions = (token) => {
    window.sessionStorage.setItem('token', token);
    }

render(){
	let user = "";
		//beslissing te nemen profiel data
		if(this.props.path === "/profile"){
			user = this.props.user;
			if(this.props.token){
			this.saveAuthTokenInSessions(this.props.token)
			}
		}
		else if (this.state.user){
		user  = this.state.user;
		}
		
	
	console.log(this.state.user,user)
	

	return(
		<div>
			<div>
				<h2>name: {user.name}</h2>
				<h4>location: {user.country}</h4>
				<h4>Gender: {user.gender}</h4>
				<h4>Birthday: {new Date(user.age).toLocaleDateString()}</h4>
				<h4>email: {user.email}</h4>
				<h5>joined: {new Date(user.joined).toLocaleDateString()}</h5>
			 </div>
			<div>
				<h3>about me:</h3>
				<p>{user.about}</p>
			</div>
			<div>
			    <h3>Social links:</h3>
				{user.link ? 
					user.link.map((user,i)=>{
						return(
							<div>
								<img alt="nothing" src={`https://logo.clearbit.com/${user}?size=25`}/>
								<h5> {user}</h5>
						    </div>
						    )
					    })
					:""
				}
			</div>
			{this.props.path === "/profile" ? <Link to="/profileEdit"><button>edit profile</button></Link>:null}
		</div> 
			)
	}
}

export default Profile;