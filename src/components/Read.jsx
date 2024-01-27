import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/read.css';
import { getPostDetail, setPostComment, getPostComments } from '../api';

export const Read = (props) => {
	const location = useLocation()
	const { id } = location.state;

	const [postData, setPostData] = useState([]);
	const [commentSection, setCommentSection] = useState(false);
	const [commentData, setCommentData] = useState([]);

	// Sets comment data.
	async function pullCommentData(id) {
		const data = await getPostComments(id);
		setCommentData(data);
	};

	// Creates array of comment elements.
	function generateComments(commentData) {
		if (!commentData) return;
		
		const elements = [];
		commentData.forEach((comment) => {
			elements.push(<Comment key={comment._id} data={comment} />);
		})

		return elements;
	};

	// Gets post data on component mount.
	useEffect(() => {
		async function pullPostData(id) {
			const data = await getPostDetail(id);
			setPostData(data);
		};

		pullPostData(id)
		pullCommentData(id);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div id='read'>
			<h2>{ postData.title }</h2>
			<p className='post-text'>{ postData.text }</p>
			<CommentForm
				postData={postData}
				pullCommentData={pullCommentData}
				setCommentSection={setCommentSection}
			/>
			<div id='comment-section-info'>
				<p>{`${commentData.length} COMMENTS`}</p>
				<button
					onClick={async (e) => {
						e.preventDefault();

						await pullCommentData(id);
						setCommentSection(!commentSection);
					}}
				>
					{commentSection ? 'HIDE COMMENTS' : 'SHOW COMMENTS'}
				</button>
			</div>
			<ul
				id='comment-section'
				className={commentSection && commentData.length > 0 ? '' : 'hidden'}
			>
				{generateComments(commentData)}
			</ul>
		</div>
	);
};

const CommentForm = (props) => {
	const { postData, pullCommentData, setCommentSection } = props;

	return (
		<form
			id='comment-form'
			onSubmit={async (e) => {
				e.preventDefault();
				await setPostComment(e, postData._id);
				pullCommentData(postData._id);
				setCommentSection(true);
				e.target.reset();
			}}
		>
			<div className='form-inputs'>
				<div className='form-group'>
					<label htmlFor='comment-name'></label>
					<input
						type='text'
						className='form-control'
						name='comment-name'
						placeholder='name'
						required
						maxLength={60}
					></input>
				</div>
				<div className='form-group'>
					<label htmlFor='comment-text'></label>
					<textarea
						className='form-control'
						name='comment-text'
						placeholder='comment'
						required
					></textarea>
				</div>
			</div>
			<button>SEND</button>
		</form>
	);
};

const Comment = (props) => {
	const { data } = props;

	return (
		<li className='comment'>
			<div className='comment-header'>
				<p className='comment-name'>{data.name}</p>
				<hr/>
				<p className='comment-date'>{data['timestamp_formatted']}</p>
			</div>
			<p className='comment-text'>{data.text}</p>
		</li>
	);
};
