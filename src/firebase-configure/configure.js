import firebase from "firebase";
const config =  {
    apiKey: "AIzaSyADWnCu5u0AKYm68IubSUb8rIKNA2YU9jo",
    authDomain: "chat-app-6528b.firebaseapp.com",
    databaseURL: "https://chat-app-6528b.firebaseio.com",
    projectId: "chat-app-6528b",
    storageBucket: "gs://chat-app-6528b.appspot.com/",
    messagingSenderId: "41472102072",
    appId: "1:41472102072:web:5e0606a2bb92a65f"
};
 firebase.initializeApp(config);

 export default firebase;