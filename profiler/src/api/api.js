export const apiCall = (link,req={}) =>{
	 console.log("hit")
return(
  fetch(link,req)
  .then(response => {
  	if (response.ok) {
    return response.json();
  } else {
    throw new Error('Something went wrong');
	}
  })
  .catch(err => console.log(err))
)}