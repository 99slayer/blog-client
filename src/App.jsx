// import { useState } from 'react'
import { Outlet } from 'react-router-dom';
import './styles/app.css'
import { Nav } from './components/Nav';

export function App() {
  return (
		<div>
			<Nav />
			<Outlet />
		</div>
  );
}
