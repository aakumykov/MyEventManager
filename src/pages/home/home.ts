import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

@IonicPage({
	name: 'home'
})

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

	constructor(public navCtrl: NavController) {}

	goToProfile(){ this.navCtrl.push('profile'); }

	goToCreate(){ this.navCtrl.push('event-create'); }
	
	goToList(){ this.navCtrl.push('event-list'); }
}
