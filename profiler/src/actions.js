import { apiCall } from './api/api';

export const requestProfile = (email,password) => (dispatch) => {
	
  dispatch({ type: 'REQUEST_PROFILE_PENDING' })
  if(email && password){
  apiCall('http://localhost:3003/login',{
			method:'post',
			headers: {'Content-type': 'application/json'},
			body: JSON.stringify({
				email:email,
				password:password
			})
	    })
    .then(data => { if (data){dispatch({ type: 'REQUEST_PROFILE_SUCCESS', payload: data }) }else{ throw new Error('Something went wrong')}})
    .catch(error => dispatch({ type: 'REQUEST_PROFILE_FAILED', payload: error }))
}else{
	dispatch({ type: 'REQUEST_PROFILE_FAILED', payload: 'error' })
}
}

export const requestProfileToken=(token)=>(dispatch)=>{
	dispatch({ type: 'REQUEST_PROFILE_PENDING' })
if (token){
	 fetch('http://localhost:3003/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      })
	 .then(res=> res.json())
	 .then(data => {
	 	console.log("dig",data)
          // zit deze data haal dan gebruiker op
          if (data) {
            fetch(`http://localhost:3003/users/${data.id}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': token
              }})
	 .then(res=> res.json())
	 .then(data => { console.log("token",data);  if (data){dispatch({ type: 'REQUEST_PROFILE_SUCCESS', payload: {user:data} }) }else{ throw new Error('Something went wrong')}})
    .catch(error => dispatch({ type: 'REQUEST_PROFILE_FAILED', payload: error }))
}})}else{
	dispatch({ type: 'REQUEST_PROFILE_FAILED', payload: 'error' })
}
}

export const setSearchField = (text) => ({ type: 'CHANGE_SEARCH', payload: text })


 