import Vue from 'vue'
import VueFire from 'vuefire'
import * as Firebase from 'firebase'

Vue.use(VueFire);

const config = {
  apiKey: "AIzaSyBkVybKnmkkyubltp70SZECBmKo1QOFTo8",
  authDomain: "movie-calalog.firebaseapp.com",
  databaseURL: "https://movie-calalog.firebaseio.com",
  projectId: "movie-calalog",
  storageBucket: "movie-calalog.appspot.com",
  messagingSenderId: "955080892730"
};

const firebase = Firebase.initializeApp(config);
const articlesRef = firebase.database().ref('articles');
const tagsRef = firebase.database().ref('tags');

export {
	firebase,
	articlesRef,
	tagsRef
}
