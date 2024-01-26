import { Link, useNavigate, useLocation } from "react-router-dom";
import '../styles/nav.css';

export const Nav = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const refresh = (e) => {
		if (location.pathname !== '/') return;
		navigate(0);
	};

	return (
		<div id="nav">
			<h1>MY BLOG</h1>
			<Link
				to='/'
				className="home-btn"
				onClick={refresh}
			>
				HOME
			</Link>
		</div>
	);
};
