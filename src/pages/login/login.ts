import { Component } from '@angular/core';
import {
	IonicPage,
	Loading,
	LoadingController,
	NavController,
	AlertController,
} from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { EmailValidator } from '../../validators/email';
import { AuthProvider } from '../../providers/auth/auth';


@IonicPage({ name: 'login' })
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {

	public imageData = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4QURChUtTnTiugAABHNJREFUeNrt3E9Ik38Ax/G3oc88tMNc1JQuxTOHmjAvBtlFhCjITnkIL/MUdLUd/EOELD0kGJ1ChC128hkj0VF4kjr5p1ui2Ja7aHgoh+DBReTvtOenOc09vwW/X7/PG4TxfPd8/c6Xz7OvHlaRTqf3Uf+azuhHIBAlEIEogQhECUQgSiACUQJRAhGIEohAlEAEogQiECUQJRCBKIEIRAlEIEogAlECUQIRiBKIQJRABKIEIhAlECUQgaj/O4jf78fv9wtECUQg6vdWedJ9GCCdTpc0NjU1RSKRYGVlhXw+T21tLTdu3ODBgwe43e5D5/+qYvP/3OrqKo8fP2Z5eRnTNBkeHrbHlpeX6e/v59OnT1y5coWhoSECgcCh8799+0Y0GiWVSpHNZgG4dOkSd+7cIRQKUVVV5XjNp537YBXHfRpQqSD7+/v09vYyMzNTdKGmaWJZFm63u2wgW1tb3L59m52dHfuY1+vl69evRx4DeDweUqkU58+fByCfz9PT08PS0lLR+a9evUo0GqWqqqrkNZcy92+5ZSUSCWZmZvD5fDx//pyFhQU+fPiAZVk0NzeTyWR48eKFveiDXwdfTLHjxzU+Ps7Ozg7Nzc28efOGxcVFrl27Zo+3tbWxuLjI69evaWpqIpfLMT4+bo/HYjGWlpZwu92MjIwwPz/P/Pw8w8PDnD17loWFBWKxmKM1lzL3bwGxLAuAsbExbt26RU1NDdXV1bS0tPDs2TMAZmdny3q/fffuHQCDg4OYponH42F0dNQef/r0KR6PB7/fz+Dg4KFzAPtqHhgY4O7du3i9XrxeL11dXfT19R16Tqk5nbvyNHv607S2tgbAvXv3jn3O5uZmWUE+f/4MQH19/d+/YWfOFH1ceO84uIbCfb29vf3I3B0dHQwMDLC+vu5obU7nLtsVsr//6w+m+/79u7ZR/3Tb+/M98rh7e+FKSiaTRc857ftCKfl8PgA+fvxoH/vx40fRx4UruHBOYccD8Pbt2yNzz83NAXD58mVHa3M6d9mukO7ubgDu37+PZVlsbGywt7dHPp8nm80yOTlJV1dXWUHa2toAePLkCZlMhlwuRzgctsfD4TC5XI5MJkMkEgHg+vXr9nhnZycAkUiEV69esb29zfb2Nslk0t4+F55Tak7nLtu2F2BoaIh4PF7yVvak73VSGxsbdHZ2sru7ax87d+4cX758OfIYwO12k0qlqKurs7emoVCI9+/fF52/tbWVaDSKYRglr9np3GX9S/3Ro0e8fPmSmzdvcuHCBSorK3G5XJimSU9PD9PT02W9Qi5evEg8HicYDGIYBo2NjUxMTNjjExMTNDQ0YBgGwWCQeDxuYwC4XC5isRgPHz4kEAhgGAYul4tAIEA4HD4W4zQ5nbviT/yYWKdXnP6XpQQiEFVSlX/ii/ovvnfoChGIEohAlEAEogQiECUQJRCBKIEIRAlEIEogAlECUQIRiBKIQJRABKIEIhAlEIHoRyAQJRCBKIEIRAlEIEogAlECUQIRiHLSX7ohF1UXvhWJAAAAAElFTkSuQmCC";

	public loginForm: FormGroup;
	public loading: Loading;

	constructor(
		public navCtrl: NavController,
		public loadingCtrl: LoadingController, 
		public alertCtrl: AlertController,
		public authProvider: AuthProvider, 
		public formBuilder: FormBuilder,
	) {
		this.loginForm = formBuilder.group({
			email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
			password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
		});
	}


	loginUser(): void {
		if (!this.loginForm.valid){
			console.log(this.loginForm.value);
		} else {
			this.authProvider.loginUser(this.loginForm.value.email, this.loginForm.value.password)
			.then( AuthProvider => {
				this.loading.dismiss().then( () => {
					this.navCtrl.setRoot('home');
				});
			}, error => {
				this.loading.dismiss().then( () => {
					let alert = this.alertCtrl.create({
						message: error.message,
						buttons: [{text: "Ok",role: 'cancel'}]
					});
					alert.present();
				});
			});
			this.loading = this.loadingCtrl.create();
			this.loading.present();
		}
	}


	goToSignup(): void { this.navCtrl.push('signup'); }
	
	goToResetPassword(): void { this.navCtrl.push('reset-password'); }
}
