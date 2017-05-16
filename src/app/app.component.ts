import { Component, NgZone } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import firebase from 'firebase';

@Component({
	templateUrl: 'app.html'
})
export class MyApp {
	rootPage: any;
	zone: NgZone;

	constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
		this.zone = new NgZone({});

		platform.ready().then(() => {
			statusBar.styleDefault();
			splashScreen.hide();
		});

		firebase.initializeApp({
			apiKey: "AIzaSyCmGxfQyOXjYV0IH64mAP8gX69gpzScBcA",
			authDomain: "myeventmanager-bba77.firebaseapp.com",
			databaseURL: "https://myeventmanager-bba77.firebaseio.com",
			projectId: "myeventmanager-bba77",
			storageBucket: "myeventmanager-bba77.appspot.com",
			messagingSenderId: "861656768051"
		});

		const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
	      this.zone.run( () => {
	        if (!user) {
	          this.rootPage = 'login';
	          unsubscribe();
	        } else { 
	          this.rootPage = 'home';
	          unsubscribe();
	        }
	      });     
	    });

		
	}
}

