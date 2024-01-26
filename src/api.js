export async function getPostList() {
	try {
		const res = await fetch('http://localhost:3000/api/posts', {
			method: 'GET'
		});

		if (!res.ok) throw new Error(
			`${res.status} ${res.statusText}`,
			{ cause: res.status }
		);

		const data = await res.json();

		return data.posts;
	} catch (error) {
		console.log(error);
	};
};

export async function getPostDetail(id) {
	try {
		const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
			method: 'GET'
		});

		if (!res.ok) throw new Error(
			`${res.status} ${res.statusText}`,
			{ cause: res.status }
		);

		const data = await res.json();

		return data.post;
	} catch (error) {
		console.log(error);
	};
};

export async function getPostComments(id) {
	try {
		const res = await fetch(`http://localhost:3000/api/posts/${id}/comments`, {
			method: 'GET'
		});

		if (!res.ok) throw new Error(
			`${res.status} ${res.statusText}`,
			{ cause: res.status }
		);

		const data = await res.json();

		return data;
	} catch (error) {
		console.log(error);
	};
};

export async function setPostComment(e, id) {
	const rawInput = new FormData(e.target).entries();
	const input = JSON.stringify(Object.fromEntries(rawInput));

	try {
		const res = await fetch(`http://localhost:3000/api/posts/${id}/comments`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: input
		});

		if (!res.ok) throw new Error(
			`${res.status} ${res.statusText}`,
			{ cause: res.status }
		);

	} catch (error) {
		console.log(error);
	};
};
