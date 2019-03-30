import { Component,ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AlertController } from 'ionic-angular';
import { HomePage } from '../home/home'
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  Tuname;
  Tpassword;
  statusMessage: string;
  @ViewChild('username') uname;
  @ViewChild('password') password;
  constructor(public navCtrl: NavController, public navParams: NavParams, public firedb: AngularFireDatabase, public alertCtrl: AlertController) {
    
  }

  signIn()
  {
    this.firedb.list("/Admin/username").valueChanges().subscribe(
      data =>
      {
        this.Tuname=data[0];
        if(this.uname.value==data[0])
        {
          
        }
        else{
          this.presentAlert();
          return;
        }
      }
    )
    this.firedb.list("/Admin/password").valueChanges().subscribe(
      _data =>
      {
        if(this.password.value==_data[0])
        {
          this.navCtrl.push(HomePage);
          return;
        }
        else
        {
          this.presentAlert();
          return;
        }
      }
    )
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      title: 'Login fail!',
      subTitle: 'You entered wrong username or password, try again!',
      buttons: ['OK']
    });
    await alert.present();
  }
}
