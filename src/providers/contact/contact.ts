import { Injectable } from '@angular/core';
import { LoadingController, Loading, AlertController, ToastController } from 'ionic-angular';
import { Contacts, ContactFieldType, ContactFindOptions } from '@ionic-native/contacts';
/*
  Generated class for the ContactProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ContactProvider {
  private loading: Loading;
  private contactList: any;
  constructor(private contacts: Contacts,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,) {
    console.log('Hello ContactProvider Provider');
  }

  getPhoneContacts(): Promise<any> {
    var promise = new Promise((resolve, reject) => {
      if (this.contactList && this.contactList.length) {
        console.log("already availalbe");
        resolve(this.contactList);
        return;
      }
      this.showLoading();
      this.retrieveContacts().then((contacts) => {
        console.log("contacts fetched");
        this.hideLoading();
        this.contactList = contacts;
        resolve(contacts);
      });
    });
    return promise;
  }

  refreshContacts(): Promise<any> {
    var promise = new Promise((resolve, reject) => {     
      this.showLoading();
      this.retrieveContacts().then((contacts) => {
        console.log("contacts fetched");
        this.hideLoading();
        this.contactList = contacts;
        resolve(contacts);
      });
    });
    return promise;
  }

  retrieveContacts(): Promise<any> {
    let fields: ContactFieldType[] = ['displayName'];
    const options = new ContactFindOptions();
    options.filter = "";//To fetch all the contacts
    options.multiple = true;
    options.hasPhoneNumber = true;
    return this.contacts.find(fields, options);
  }

  public showLoading(msg: string = null) {
    if (this.loading) {
      return;
    }
    if (msg == null) {
      msg = 'Please wait...'
    }
    this.loading = this.loadingCtrl.create({
      content: msg
    });
    return this.loading.present();
  }

  public hideLoading() {
    if (this.loading) {
      this.loading.dismiss();
      this.loading = null;
    }
  }


  public showMsg(text: string = "", msgDuration: number = 5000) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: msgDuration
    });
    toast.present();
  }

}
