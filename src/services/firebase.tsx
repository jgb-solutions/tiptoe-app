import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/auth"

const firebaseConfig = {
	apiKey: "AIzaSyCLi2-tm5k8h260P1wzwbcUqNTaVwsuXBc",
	authDomain: "project-x-c7df8.firebaseapp.com",
	databaseURL: "https://project-x-c7df8.firebaseio.com",
	projectId: "project-x-c7df8",
	storageBucket: "project-x-c7df8.appspot.com",
	messagingSenderId: "752917206791",
	appId: "1:752917206791:web:89b3e229936a409d3797a2",
	measurementId: "G-5P489M2G9M",
}

// Initialize Firebase if it hasn't been initialized yet
if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig)
	// firebase.analytics()
}

// Services
const DB = firebase.firestore()
const Auth = firebase.auth()

// Models
const UserRef = DB.collection("users")
const ModelRef = DB.collection("models")
const RoomRef = DB.collection("rooms")

export { firebase, DB, Auth, UserRef, ModelRef, RoomRef }
