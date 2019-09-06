import React from "react";
import { Link, Redirect} from "react-router-dom";


class LogIn extends React.Component {
	// You can just use state here, the linter does the work for you ;)
	state = {
			logInEmail:'',
			logInPassword:'',
		}


	onEmailChange = (event)=>{
		this.setState({logInEmail: event.target.value})
	}
	onPasswordChange = (event)=>{
		this.setState({logInPassword: event.target.value})
	}

	onButtonSubmit = () => {
		this.props.Login(this.state.logInEmail,this.state.logInPassword)
	}

    
render(){
	  
         let a = this.props.authed;

        if (a){ return <Redirect to="/profile" />;}
        else{
    	return (
			<article className="br3 ba b--black-10 mv4 w-100  w-50-m w-25-l shadow-3 mw6 center">
				<main className="pa4 black-80">
					<div className="measure">
						<fieldset id="sign_up" className="ba b--transparent ph0 mh0">
							<legend className="f1 fw6 ph0 mh0">Log In</legend>
							<div className="mt3">
								<label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
								<input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" onChange= {this.onEmailChange} type="email" name="email-address"  id="email-address"/>
							</div>
							<div className="mv3">
								<label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
								<input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" onChange= {this.onPasswordChange} type="password" name="password"  id="password"/>
							</div>
							{ this.state.wrongLogin? <h5>incorrect login combination</h5>: "" }
						</fieldset>
						<Link to="/profile">
							<input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" onClick={this.onButtonSubmit} value="Log In"/>
						</Link>
						<div className="lh-copy mt3">
							<Link to="/register" className="f6 link pointer dim black db">Register</Link>
						</div>
					</div>
				</main>
			</article>

		);
	}
  }
}


export default LogIn;