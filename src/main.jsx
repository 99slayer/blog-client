import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { App } from './App.jsx'
import { List } from './components/List.jsx';
import { Read } from './components/Read.jsx';
import './styles/index.css'

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				index: true,
				element: <List />
			},
			{
				path: 'read',
				element: <Read />
			}
		]
	}
]);

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RouterProvider router={router} />
  </React.StrictMode>,
)
