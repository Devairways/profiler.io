export const apiCall = (link,req={}) =>{
	console.log("call",link, req)
return(
  fetch(link,req)
  .then(response => {
    console.log("apiCall",response)
  	if (response.ok) {
       
    return response.json();
  } else {
    throw new Error('Something went wrong');
	}
  })
  .catch(err => console.log(err))
)}