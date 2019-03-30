import { Component,ViewChild } from '@angular/core';
import { NavController, ToastController, MenuController,AlertController } from 'ionic-angular';
import { App } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { RegisterPage } from '../register/register';
import { SelectSearchableComponent } from 'ionic-select-searchable';
import { PasswordPage } from '../password/password';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  @ViewChild('selected') selectComponent: SelectSearchableComponent;
  currentuser={
    username:'Not selected'
  };
  pressureRecords = [];
  glucoseRecords = [];
  pressureTimes = [];
  glucoseTimes = [];
  datas=[];
  usernames = [];
  
  times=[];
  constructor(
    public navCtrl: NavController,
    public app: App,
    private toastController: ToastController,
    public firebase: AngularFireDatabase,
    public menuCtrl: MenuController,
    public alertCtrl: AlertController
    ) { 
      this.firebase.list('/').valueChanges().subscribe(
        _data =>
        {  
          var unames;
          unames = Object.keys(_data[1]);
          for(var i=0;i<unames.length;i++)
          {
            this.usernames.push({
              username: unames[i]
            });
          }
        }
      )
    }
  

   showPromptAlert() {
      var password;
      this.firebase.list("/Admin/password").valueChanges().subscribe(
        _data =>
        {
          password=_data[0];
        })
      let alert = this.alertCtrl.create({
        enableBackdropDismiss:true,
        title: 'Change password',
        inputs: [
          {
            name: 'password',
            placeholder: 'Enter current password',
            type: 'password'
          }
        ],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: data => {
              console.log('You Clicked on Cancel');
            }
          },
          {
            text: 'Login',
            handler: data => {
                if(data.password!=password){
                  this.showWrongPasswordAlert();
                  return;
                }
                else
                {
                  this.navCtrl.push(PasswordPage);
                  return;
                    //alert.dismiss();
                }
                  
              }
            }
          
        ]
      });
      alert.present();
    }
  
  showWrongPasswordAlert()
  {
    let alert = this.alertCtrl.create({
      title:'Wrong Password!',
      message: 'Pleas try again!',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            return;
          }
        }
      ]
    })
    alert.present();
  }
   
  
  

  newUser()
  {
    this.navCtrl.push(RegisterPage);
  }  

  userChanged(event: {component: SelectSearchableComponent, value: any})
  {
    this.viewPressure();
  }

  onClose()
  {
    let toast = this.toastController.create(
      {
        message:'User selected',
        duration:2000
      }
    )
    toast.present();
  }

  openFromCode()
  {
    this.selectComponent.open();
    
  }

  viewPressure()
  {
    
    this.datas=[];
    this.firebase.list('/users/'+this.currentuser.username+'/bloodpressure/record').valueChanges().subscribe(
      _data =>
      {
        this.pressureRecords=_data;
      }
    )
    this.firebase.list('/users/'+this.currentuser.username+'/bloodpressure/time').valueChanges().subscribe(
      _data =>
      {
        this.pressureTimes=_data;
      }
    )
    
    for(var i=0;i<this.pressureRecords.length;i++)
    {
      console.log(this.datas.length);
      this.datas[i]={
        Record:this.pressureRecords[i],
        Time:this.pressureTimes[i]
      };
    }
   
    
  }

  viewGlucose()
  {
    console.log("hi");
    this.datas=[];
    this.firebase.list('/users/'+this.currentuser.username+'/bloodglucose/record').valueChanges().subscribe(
      _data =>
      {
        this.glucoseRecords=_data;
      }
    )
    this.firebase.list('/users/'+this.currentuser.username+'/bloodglucose/time').valueChanges().subscribe(
      _data =>
      {
        this.glucoseTimes=_data;
      }
    )
    for(var i=0;i<this.glucoseRecords.length;i++)
    {
      this.datas[i]={
        Record:this.glucoseRecords[i],
        Time:this.glucoseTimes[i]
      };
      
    }
  }

  
}
