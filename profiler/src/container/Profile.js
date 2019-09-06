import React, {Component} from "react";
import {apiCall} from "../api/api";
import { Link} from "react-router-dom";

class Profile extends Component {
 state={
 	user:'',
 	fetched:false
 }

componentDidMount(){
	//controleerd of niet het eigen profiel word bekeken
	if(this.props.path !== "/profile" && !this.state.user){

		apiCall(`http://localhost:3003/users/${this.props.user}`)
		.then(data =>{
			this.setState({user:data,
						   fetched:true})
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
	if (this.state.fetched){
		user  = this.state.user
	}else{
		user  = this.props.user;
		if(this.props.token)
		this.saveAuthTokenInSessions(this.props.token)
	}
	console.log("gebruiker",user)

	return(
		<div>
			<div>
				<h2>name: {user.name}</h2>
				<h4>location: NY city, New York</h4>
				<h4>Gender: {user.gender}</h4>
				<h4>Age: {user.age}</h4>
				<h4>email: {user.email}</h4>
				<h5>joined: {new Date(user.joined).toLocaleDateString()}</h5>
			 </div>
			<div>
				<h3>about me:</h3>
				<p>{user.about}</p>
			</div>
			<div>
				<h3>Social links:</h3>
				<img alt="nothing" src={`https://logo.clearbit.com/${user.link}?size=25`}/>:<h5> {user.link}</h5>
				<img alt="nothing" src="https://logo.clearbit.com/twitter.com?size=25"/>:<h5>Twitter: http://FakeBook.com</h5>
				<img alt="nothing" src="https://logo.clearbit.com/instagram.com?size=25"/>:<h5>Instagram: http://FakeBook.com</h5>
				<img alt="nothing" src="https://logo.clearbit.com/linkedin.com?size=25"/>:<h5>LinkedIn: http://FakeBook.com</h5>
				<img alt="nothing" src="https://logo.clearbit.com/github.com?size=25"/>:<h5>GitHub: http://FakeBook.com</h5>
				<img alt="nothing" src="https://logo.clearbit.com/facebook.com?size=25"/>:<h5>Website: http://FakeBook.com</h5>
			</div>
			{this.props.path === "/profile" ? <Link to="/profileEdit"><button>edit profile</button></Link>:null}
		</div> 
			)
}
}

export default Profile;