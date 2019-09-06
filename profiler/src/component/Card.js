import React from "react";
import { Link } from "react-router-dom";

const Card = ({searchTerm,name,id,email}) =>{
	return (
		<Link onClick={()=>{searchTerm(name)}} to="/user">
			<div className="tc  dib br3 pa3 ma2 grow bw2 shadow-5">
			      <p>{id}</p>
			      <p>{name}</p>
			      <p>{email}</p>
			</div>
		</Link>
		    );
}



export default Card;