import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';

/**
 * Generated class for the PasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-password',
  templateUrl: 'password.html',
})
export class PasswordPage {
  @ViewChild('password1') p1;
  @ViewChild('password2') p2;
  constructor(public navCtrl: NavController, public navParams: NavParams, public firebase: AngularFireDatabase, public alertCtrl: AlertController) {
  
  }

  change()
  {
    if(this.p1.value==this.p2.value)
    {
      this.firebase.list('/Admin').remove("password");
      this.firebase.list('/Admin/password').push(this.p1.value);
      this.navCtrl.popTo(this.navCtrl.getPrevious());
    }
    else{
      this.showDifferentPasswordAlert();
    }
  }

  showDifferentPasswordAlert()
  {
    let alert = this.alertCtrl.create({
      title:'Different Password!',
      message: 'Your entered two different passwords, try again!',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            console.log('Yes clicked');
          }
        }
      ]
    })
    alert.present();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad PasswordPage');
  }

}
