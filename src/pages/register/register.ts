import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  @ViewChild('username') uname;
  @ViewChild('password') password;
  @ViewChild('name') name;
  constructor(public navCtrl: NavController,public toastCtrl: ToastController, public alertCtrl: AlertController, public navParams: NavParams, public auth: AngularFireAuth, public firedb: AngularFireDatabase) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  register()
  {
    try{
      this.auth.auth.createUserWithEmailAndPassword(this.uname.value,this.password.value);
      var tname=this.uname.value.split('.').join('');
      this.writeUserData(tname,this.name.value);
      this.onRegisterSuccess();
      
    }
    catch (e){
      this.presentAlert();
    }
    finally
    {
      this.navCtrl.pop();
    };
    
    // var ref = this.firedb.database.ref('/users');
    // var usersRef = ref.child("users");
    
    // usersRef.set({
    //   tname:{
    //     name:this.name
    //   }
    // });
    //this.firedb.list('/users/'+this.uname.split('.').join('')).push(name);
  }

  writeUserData(userId, username) {
    this.firedb.database.ref('users/' + userId).set({
      name: username,
      username: userId
    });
  }

  onRegisterSuccess() {
    let toast = this.toastCtrl.create({
      message: this.uname.value+" registered successfully.",
      duration: 2000,
      position: 'middle'
    });
    toast.present();
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      title: 'Register fail!',
      subTitle: 'Please try another username!',
      buttons: ['OK']
    });
    await alert.present();
  }
}
