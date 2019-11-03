import React from 'react';
import { Link, Redirect } from "react-router-dom";
import { apiCall } from "../api/api";

class Register extends React.Component{
	
	state = {
		name:"",
		email:'',
		password:'',
		incorrect: false,
		alreadyInUse:false,
		redirect: false
	}
	
	
    onNameChange = (event)=>{
		this.setState({name: event.target.value.toLowerCase()})
	}
    onEmailChange = (event)=>{
		this.setState({email: event.target.value.toLowerCase()})
	}
	onPasswordChange = (event)=>{
		this.setState({password: event.target.value.toLowerCase()})
	}
    onButtonSubmit = () => {
    	if(!this.state.email || !this.state.password){
    		this.setState({incorrect: true})
    	}
    	else{
		apiCall('http://localhost:3003/register',{
			method:'post',
			headers: {'Content-type': 'application/json'},
			body: JSON.stringify({
				email:this.state.email,
				password:this.state.password,
				name: this.state.name
			})
	})
		.then(user =>{
			console.log("this is the user",user)
			if (!user.id){
				this.setState({alreadyInUse:true})
			}else{
				this.setState({redirect:true})
			}
		})
		.catch(err =>{console.log(err)})
		}
	}

	keyCheck = (e)=>{
 	if (e.keyCode === 13){
 		this.onButtonSubmit();
 	}
 }

	render(){
		if (this.state.redirect){ return <Redirect to="/login" />;}
		else if (this.props.pending){
        	return <div className="br3 mv4 w-100  w-50-m w-25-l mw6 center">
        	<img alt="loader" src={require("../img/Eclipse-1s-200px.gif")}/></div>
        }
        else{
		return (
			<article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l shadow-3 mw6 center">
				<main className="pa4 black-80">
					<div className="measure">
						<fieldset id="sign_up" className="ba b--transparent ph0 mh0">
							<legend className="f1 fw6 ph0 mh0">Register</legend>
							<div className="mt3">
								<label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
								<input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" onChange= {this.onNameChange} type="text" name="naam"  id="name"/>
							</div>
							<div className="mt3">
								<label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
								<input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" onChange= {this.onEmailChange} type="email" name="email-address"  id="email-address"/>
							</div>
							<div className="mv3">
								<label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
								<input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" onChange= {this.onPasswordChange} type="password" name="password" onKeyUp={this.keyCheck} id="password"/>
							</div>
							{this.state.incorrect ? <h4 className="red">vul alle velden goed in AUB</h4>:""}
						</fieldset>
						<div> {this.state.alreadyInUse ? <h5 className="red">this combination is already in use</h5> : "" }</div>
						<div className="">
							<input className="b ph3 pv2 ma2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" onClick={this.onButtonSubmit}value="Register"/>
							<Link to="/login">
							<input className="b ph3 pv2 ma2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Back to Log in"/>
							</Link>
						</div>
					</div>
				</main>
			</article>

		);
   }
}
}

export default Register;