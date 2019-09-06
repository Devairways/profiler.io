import React from 'react';
import { Link} from "react-router-dom";


 class ProfileEdit extends React.Component {
  state={
    name:"",
    age:"",
    location:"",
    about:""
  }

  onProfileUpdate = (data) => {
    console.log('boom',this.props.user.id)
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
        this.setState({name: event.target.value})
        break;
      case 'user-age':
        this.setState({age: event.target.value})
        break;
      case 'user-location':
        this.setState({location: event.target.value})
        break;
        case 'user-about':
        this.setState({about: event.target.value})
        break;
      default:
        return;
    }
  }

  render(){
  const {name, age, location, about} = this.state;
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
          <input type='checkbox' name='user-gender' value="male"/>
          <input type='checkbox' name='user-gender' value="Female"/>
          <label className='mt2 fw6' htmlFor='user-about'>About:</label>
          <input onChange={this.onFormChange} type='text' name='user-about' className='pa2 ba w-100' placeholder={this.props.user.about}></input>
          <label className='mt2 fw6' htmlFor='user-age'>Age:</label>
          <input onChange={this.onFormChange} type='text' name='user-age' className='pa2 ba w-100' placeholder={this.props.user.age}></input>
          <label className='mt2 fw6' htmlFor='user-pet'>link:</label>
          <input type='text' name='user-pet' className='pa2 ba w-100' placeholder={this.props.user.pet}></input>
          <div className='mt4' style={{ display: 'flex', justifyContent: 'space-evenly'}}>
            <button className='b pa2 grow pointer hover-white w-40 bg-light-blue b--black-20' onClick={() => this.onProfileUpdate({name, age, location,about})}>
              Save
            </button>
            <Link to="/profile">
              <button className='b pa2 grow pointer hover-white w-40 bg-light-red b--black-20'>
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