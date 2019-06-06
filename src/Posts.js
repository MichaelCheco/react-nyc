import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import styled from 'styled-components';
import { autoGrid } from './autoGrid';

// `users/${userId}/posts`

function Posts({ userId }) {
	const [posts, setPosts] = React.useState(null);
	React.useEffect(() => {
		const collection = db.collection(`users/${userId}/posts`);
		return collection.onSnapshot(snapshot => {
			const posts = [];
			snapshot.forEach(post => {
				posts.push({
					...post.data(),
					id: post.id,
				});
			});
			setPosts(posts);
		});
	}, [userId]);
	if (!posts) return <p>Loading ....</p>;
	return (
		<Container>
			{posts.map(p => (
				<Card>
					<H2 key={p.id}>{p.title}</H2>
					<P>{p.content}</P>
				</Card>
			))}
		</Container>
	);
}

const Container = styled.div({
	...autoGrid(250, 15),
});
const H2 = styled.h2`
	font-weight: 400;
	font-size: 26px;
	font-family: 'Roboto';
`;
const P = styled.p`
	font-family: cursive;
	font-size: 16px;
`;
export default Posts;
// function useCollection(path, orderBy, where = []) {
// 	const [docs, setDocs] = useState([]);
// 	const [queryField, queryOperator, queryValue] = where;
// 	useEffect(() => {
// 		let collection = db.collection(path);
// 		if (orderBy) {
// 			collection = collection.orderBy(orderBy);
// 		}
// 		if (queryField) {
// 			collection = collection.where(queryField, queryOperator, queryValue);
// 		}
// 		return collection.onSnapshot(snapshot => {
// 			const docs = [];
// 			snapshot.forEach(doc => {
// 				docs.push({
// 					...doc.data(),
// 					id: doc.id,
// 				});
// 			});
// 			setDocs(docs);
// 		});
// 	}, [path, orderBy, queryField, queryOperator, queryValue]);
// 	return docs;
// }

const Card = styled.div`
	transition: box-shadow 0.3s;
	width: 250px;
	height: 250px;
	border-radius: 3px;
	padding: 12px;
	margin-bottom: 20px;
	background: #fff;
	box-shadow: 0 0 11px rgba(33, 33, 33, 0.2);
	transition: box-shadow 0.5s;
	&:hover {
		box-shadow: 0px 10px 30px -5px rgba(0, 0, 0, 0.3);
	}
`;
