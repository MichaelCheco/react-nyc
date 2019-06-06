import React from 'react';
import './App.css';
import { firebase, db } from './firebase';
import { Router } from '@reach/router';
import Posts from './Posts';
import Nav from './Nav';
import styled from 'styled-components';
// Custom Consumer Hook

// custom authentication hook for users

function App() {
	const [user, setUser] = React.useState(null);
	React.useEffect(() => {
		return firebase.auth().onAuthStateChanged(auth => {
			const { displayName, photoURL, uid } = auth;
			if (auth) {
				const user = {
					displayName,
					photoURL,
					uid,
				};
				setUser(user);
				db.collection('users')
					.doc(user.uid)
					.set(user, { merge: true });
			} else {
				setUser(null);
			}
		});
	}, []);
	return user ? (
		<div>
			<Nav user={user} />
			<Router>
				<Posts path="posts/:userId" />
				<Login path="/foo" />
			</Router>
		</div>
	) : (
		<Container>
			<Login />
		</Container>
	);
}
function Login() {
	return (
		<div className="Login">
			<Button onClick={handleSignIn}>Sign in with Google</Button>
		</div>
	);
}

export default App;

const Button = styled.button`
	width: 250px;
	height: 56px;
	background-color: #ff6f61;
	color: white;
	border-radius: 2px;
	font-size: 18px;
	transition: all 0.4s ease;
	outline: 0;
	&:hover {
		background-color: #ffffff;
		color: #ff6f61;
		border: 1px solid #ff6f61;
		cursor: pointer;
		transition: all 0.4s ease;
		box-shadow: 0 0 11px rgba(33, 33, 33, 0.2);
	}
`;
const handleSignIn = async () => {
	const provider = new firebase.auth.GoogleAuthProvider();
	try {
		await firebase.auth().signInWithPopup(provider);
	} catch (error) {
		console.log(error);
	}
};
const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
	width: 100vw;
`;
