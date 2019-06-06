import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
	apiKey: 'AIzaSyDZAbSLGjLgIsB_Yax-PyunJXfZJdTC5yE',
	authDomain: 'react-nyc.firebaseapp.com',
	databaseURL: 'https://react-nyc.firebaseio.com',
	projectId: 'react-nyc',
	storageBucket: 'react-nyc.appspot.com',
	messagingSenderId: '129516887860',
	appId: '1:129516887860:web:0d2b801a2290f8b6',
};

firebase.initializeApp(config);
const db = firebase.firestore();

export { db, firebase };
