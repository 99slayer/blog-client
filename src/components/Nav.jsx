import { Link } from "react-router-dom";
import '../styles/nav.css';

export const Nav = () => {
	return (
		<div id="nav">
			<h1>NAV</h1>
			<Link to='/'>HOME</Link>
		</div>
	);
};
