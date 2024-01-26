import { Outlet } from 'react-router-dom';
import './styles/app.css'
import { Nav } from './components/Nav';

export function App() {
  return (
		<div id='app'>
			<Nav />
			<Outlet />
		</div>
  );
}
