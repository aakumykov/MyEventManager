import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import firebase from 'firebase';

@Injectable()
export class AuthProvider {

	constructor(public http: Http) {
		console.info('AuthProvider.constructor()');
	}


	signupUser(email: string, password: string): firebase.Promise<any> {
		return firebase.auth().createUserWithEmailAndPassword(email, password)
			.then( newUser => {
				firebase.database().ref('userProfile').child(newUser.uid)
					.set({ email: email });
			});
	}


	loginUser(email: string, password: string): firebase.Promise<any> {
		// console.info('AuthProvider.loginUser()');
		return firebase.auth().signInWithEmailAndPassword(email, password)
			.then( () => {
				console.info('ОБЕЩАЛ ЗАЙТИ');
			});
	}


	resetPassword(email: string): firebase.Promise<void> {
		return firebase.auth().sendPasswordResetEmail(email)
			.then( () => {
				console.info('ОБЕЩАЛ ВСПОМНИТЬ');
			});
	}


	logoutUser(): firebase.Promise<void> {
		return firebase.auth().signOut()
			.then( () => {
				console.info('ОБЕЩАЛ УЙТИ');
			});
	}

}
