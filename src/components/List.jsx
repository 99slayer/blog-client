import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import '../styles/list.css';
import { getPostList } from '../api';

export const List = () => {
	const [cards, setCards] = useState(null);

	useEffect(() => {
		async function populateList() {
			const listElements = [];
			const posts = await getPostList();

			if (posts === undefined) {
				setCards('ERROR');
				return;
			}
			
			posts.forEach((post) => {
				if (!post.published) return;

				listElements.push(
					<Card key={post._id} post={ post } />
				);
			});

			if (listElements.length < 1) {
				setCards('THERE ARE NO BLOG POSTS.');
				return;
			}

			setCards(listElements);
		};

		populateList();
	}, []);

	return (
		<div id='list'>
			<ul id='post-list-wrapper'>
				{cards}
			</ul>
		</div>
	);
};

const Card = (props) => {
	const { post } = props;

	return (
		<li className='list-card'>
			<Link to='read' state={{id: post._id}}>
				<div className='list-card-header'>
					<div className='card-header-top'>
						<h3 className='card-header-title'>{ post.title }</h3>
						<p>{ post.published_timestamp_formatted }</p>
					</div>
					<p>{ post.creator.username }</p>
				</div>
				<p className='list-card-text'>{ post.text }</p>
			</Link>
		</li>
	);
};
