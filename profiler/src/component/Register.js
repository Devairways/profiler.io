import React from 'react';
import { Link, Redirect } from "react-router-dom";
import { apiCall } from "../api/api";

class Register extends React.Component{
	
	state = {
		name:"",
		email:'',
		password:'',
		alreadyInUse:false,
		redirect: false
	}
	
	
    onNameChange = (event)=>{
		this.setState({name: event.target.value})
	}
    onEmailChange = (event)=>{
		this.setState({email: event.target.value})
	}
	onPasswordChange = (event)=>{
		this.setState({password: event.target.value})
	}
    onButtonSubmit = () => {
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
			if (!user.id){
				this.setState({alreadyInUse:true})
			}else{
				this.setState({redirect:true})
			}
		})
		.catch(err =>{console.log(err)})
	}

	render(){
		if (this.state.redirect){ return <Redirect to="/login" />;}
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
								<input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" onChange= {this.onPasswordChange} type="password" name="password"  id="password"/>
							</div>
						</fieldset>
						<div> {this.state.alreadyInUse ? <h5 style={{ color:'red'}}>this combination is already in use</h5> : "" }</div>
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