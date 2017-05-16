import { Injectable } from '@angular/core';
import firebase from 'firebase';


@Injectable()
export class ProfileProvider {

	constructor() {}

	getUserProfile(): Promise<any> {
		console.info('ProfilePage.getUserProfile()');

		return new Promise( (resolve, reject) => {
			firebase.database()
				.ref('/userProfile')
				.child(firebase.auth().currentUser.uid)
				.on('value', data => {

					console.info('----- ProfileProvider, getUserProfile(), data -----');
					console.info(data);
					console.info('---------------------------------------------------');

					console.info('----- ProfileProvider, getUserProfile(), data.val() -----');
					console.info(data.val());
					console.info('---------------------------------------------------------');

					resolve(data.val());
				});
		});
	}

	updateName(firstName: string, lastName: string): firebase.Promise<any> {
		return firebase.database()
			.ref('/userProfile')
			.child(firebase.auth().currentUser.uid)
			.update({
				firstName: firstName, 
				lastName: lastName,
			});
	}

	updateDOB(birthDate: string): firebase.Promise<any> {
		return firebase.database().ref('/userProfile')
			.child(firebase.auth().currentUser.uid)
			.update({
				birthDate: birthDate,
			});
	}

	updateEmail(newEmail: string, password: string): firebase.Promise<any> {
		const credential = firebase.auth
				.EmailAuthProvider
				.credential(firebase.auth().currentUser.email, password);

		console.info('----- credential -----');
		console.info(credential);
		console.info('----------------------');
		
		return firebase.auth().currentUser.reauthenticate(credential)
			.then( user => {
				firebase.auth().currentUser.updateEmail(newEmail).then( user => {
					firebase.database()
					.ref('/userProfile')
					.child(firebase.auth().currentUser.uid)
					.update({ email: newEmail });
			});
		});
	}

	updatePassword(newPass: string, oldPassword: string): firebase.Promise<any> {
		const credential = firebase.auth
			.EmailAuthProvider
			.credential(firebase.auth().currentUser.email, oldPassword);
		
		return firebase.auth().currentUser.reauthenticate(credential)
			.then( user => {
				firebase.auth().currentUser.updatePassword(newPass).then( user => {
					console.log("Пароль изменён");
				}, error => {
					console.log(error);
				});
		});
	}
}
