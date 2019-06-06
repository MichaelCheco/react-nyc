import React from 'react';
import { Link } from '@reach/router';
import styled from 'styled-components';
import { db } from './firebase';
const NavWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	align-content: center;
	justify-items: center;
	width: 100%;
	margin: 20px 0;
	height: 40px;
	a {
		margin-left: 10px;
	}
`;
export default function Nav({ user }) {
	const [count, setCount] = React.useState(2);
	async function createPost(post, userId) {
		setCount(c => c + 1);
		return db
			.collection(`users/${userId}/posts`)
			.add({ ...post })
			.then(ref => ref.get())
			.then(doc => ({ ...doc.data(), id: doc.id }));
	}
	const post = { title: `Title ${count}`, content: `Content ${count}` };
	return (
		<NavWrapper>
			<Link to={`/posts/${user.uid}`}>See Posts</Link>
			<Button onClick={() => createPost(post, user.uid)}>Add Post</Button>
		</NavWrapper>
	);
}
const Button = styled.button`
	  width: 100px;
  height: 27px;
  background-color: #ffffff;
  color: #000000;
  border-radius: 5px;
  font-size: 13px;
  border: 1px solid #000000
  transition: all 0.4s ease;
  outline: 0;
	margin-right: 10px;
  &:hover {
    background-color: #000000;
    color: #ffffff;
    border: 1px solid #ffffff;
    cursor: pointer;
    transition: all 0.4s ease;
    box-shadow: 0 0 11px rgba(33, 33, 33, 0.2);
  }
`;
