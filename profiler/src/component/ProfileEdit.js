import React from 'react';
import { Link} from "react-router-dom";

let link = [];

 class ProfileEdit extends React.Component {
  state={
    name:this.props.user.name,
    age:this.props.user.age,
    location:this.props.user.location,
    about:this.props.user.about,
    gender:this.props.user.gender,
    link:this.props.user.link

  }
  componentDidMount(){
    link = this.props.user.link
  }

  onProfileUpdate = (data) => {
    fetch(`http://localhost:3003/users/${this.props.user.id}`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': window.sessionStorage.getItem('token')
      },
      body: JSON.stringify({
        formInput: data
      })
    }).then(resp => {
      if (resp.status === 200 || resp.status === 304) {
       console.log("update succesvol")
      }
    }).catch(console.log)
  }


  onFormChange = (event) => {
    switch(event.target.name) {
      case 'user-name':
        this.setState({name: event.target.value.toLowerCase()})
        break;
      case 'user-age':
       console.log("leeftijd",event.target.value)
        this.setState({age: event.target.value})
        break;
      case 'user-location':
        this.setState({location: event.target.value.toLowerCase()})
        break;
        case 'user-about':
        this.setState({about: event.target.value.toLowerCase()})
        break;
        case 'user-gender':
        this.setState({gender: event.target.value})
        break;
      default:
        return;
    }
  }
  
  linkList = (event)=>{
    link[event.target.name] = event.target.value
    this.setState({link:link})
  }

  render(){
  const state = this.state;
  console.log(state)
  return (
    <div className='profile-modal'>
      <article className='br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center bg-white'>
        <main className='pa4 black-80 w-80'>
          <img
            src='http://tachyons.io/img/logo.jpg'
            className='h3 w3 dib' alt='avatar'
          />
          <h1>{this.props.user.name}</h1>
          <h4>Hi!</h4>
          <p>{`Member since: ${new Date(this.props.user.joined).toLocaleDateString()}`}</p>
          <hr />
          <label className='mt2 fw6' htmlFor='user-name'>Name:</label>
          <input onChange={this.onFormChange} type='text' name='user-name' className='pa2 ba w-100' placeholder={this.props.user.name}></input>
          <label className='mt2 fw6' htmlFor='user-location'>location:</label>
          <input onChange={this.onFormChange} type='text' name='user-location' className='pa2 ba w-100' placeholder={this.props.user.location}></input>
          <label className='mt2 fw6' htmlFor='user-gender'>Gender:</label>
          <br/>
          <label>Male: <input type='checkbox' name='user-gender' onClick={this.onFormChange} value="male"/></label>
          <label>Female: <input type='checkbox' name='user-gender'  onClick={this.onFormChange} value="Female"/></label>
          <br/>
          <label className='mt2 fw6' htmlFor='user-about'>About:</label>
          <textarea onChange={this.onFormChange} type='text' name='user-about' className='pa2 ba w-100' placeholder={this.props.user.about}></textarea>
          <label className='mt2 fw6' htmlFor='user-age'>Age:</label>
          <input onClick={this.onFormChange} type='date' name='user-age' className='pa2 ba w-90' placeholder={this.props.user.age}></input>
          <label className='mt2 fw6' htmlFor='user-pet'>links:</label>
          {
					this.props.user.link.map((user, index)=>{
						return(
         						<input type='text' key={index} onChange={this.linkList} name={index} className='pa2 mv2 ba w-100' placeholder={user}></input>
					       )}
				      )
				  }
          <p></p>
          <div className='mt4' style={{ display: 'flex', justifyContent: 'space-evenly'}}>
            <button className='b pa2 grow pointer hover-white w-40 bg-light-blue b--black-20' onClick={() => this.onProfileUpdate(state)}>
              Save
            </button>
            <Link to="/profile">
              <button className='b pa2 grow pointer hover-white w-100 bg-light-red b--black-20'>
                Cancel
              </button>
            </Link>
          </div>

         </main>
        <div className='modal-close' >
          &times;
        </div>
      </article>
    </div>
  );
}
}
 export default ProfileEdit;