import React from "react";
import Search from "./Search";
import { Link, Redirect} from "react-router-dom";

const Menu = (props) =>{
	const {authed,searchTerm, login} = props;

	return (
		<div style={getStyle()}>
	       <Search searchTerm={searchTerm}/>
	       <Link to="/profile">
	       	<button className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib">{authed ? "profile" : "Log in"}</button>
	       	</Link>
	       	{authed ? <Link onClick={()=>{login()}} to="/"><input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit"  value="Log out"/></Link>: ""}
		</div>
		)
}

export default Menu;

const getStyle = () =>{
	return {
		width:"100%",
		boxShadow: "rgba(75, 86, 99, 0.094) 0px 8px 16px",
  		background: "rgb(255, 255, 255)",
		display: "flex",
		justifyContent: "space-between",
		flexWrap: "wrap",
		fontWeight:"500",
		fontSize:"15px"
	}
}
