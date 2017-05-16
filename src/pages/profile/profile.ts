import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { ProfileProvider } from '../../providers/profile/profile';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage({
  name: 'profile'
})
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})

export class ProfilePage {
  public userProfile: any;
  public birthDate: string;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, 
    public profileProvider: ProfileProvider, public authProvider: AuthProvider) {}

  ionViewDidEnter() {
    this.profileProvider.getUserProfile().then( profileSnap => {
      this.userProfile = profileSnap;
      this.birthDate = this.userProfile.birthDate;

      console.info('----- ProfilePage, ionViewDidEnter, profileSnap -----');
      console.info(profileSnap);
      console.info('-----------------------------------------------------');
    });
  }

  logOut(){
    this.authProvider.logoutUser().then(() => {
      this.navCtrl.setRoot('login');
    });
  }

  updateName(){
    let alert = this.alertCtrl.create({
      message: "Ваши имя и фамилия",
      inputs: [
        {
          name: 'firstName',
          placeholder: 'Имя',
          value: this.userProfile.firstName
        },
        {
          name: 'lastName',
          placeholder: 'Фамилия',
          value: this.userProfile.lastName
        },
      ],
      buttons: [
        {
          text: 'Отмена',
        },
        {
          text: 'Сохранить',
          handler: data => {
            this.profileProvider.updateName(data.firstName, data.lastName);
          }
        }
      ]
    });
    alert.present();
  }

  updateDOB(birthDate){
    this.profileProvider.updateDOB(birthDate);
  }

  updateEmail(){
    let alert = this.alertCtrl.create({
      inputs: [
        {
          name: 'newEmail',
          placeholder: 'Новый e-mail',
        },
        {
          name: 'password',
          placeholder: 'Ваш пароль',
          type: 'password'
        },
      ],
      buttons: [
        {
          text: 'Отмена',
        },
        {
          text: 'Сохранить',
          handler: data => {
            this.profileProvider.updateEmail(data.newEmail, data.password);
          }
        }
      ]
    });
    alert.present();
  }

  updatePassword(){
    let alert = this.alertCtrl.create({
      inputs: [
        {
          name: 'newPassword',
          placeholder: 'Старый пароль',
          type: 'password'
        },
        {
          name: 'oldPassword',
          placeholder: 'Новый пароль',
          type: 'password'
        },
      ],
      buttons: [
        {
          text: 'Отмена',
        },
        {
          text: 'Сохранить',
          handler: data => {
            this.profileProvider.updatePassword(data.newPassword, data.oldPassword);
          }
        }
      ]
    });
    alert.present();
  }

}