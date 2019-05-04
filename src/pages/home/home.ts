import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  options: BarcodeScannerOptions;
  encodText:string='';
  encodedData:any={};
  scannedData:any={};
  
  constructor(public navCtrl: NavController,
     public scanner:BarcodeScanner,
     public admob: AdMobFree) {
    this.showBanner();
  }
  
  scann(){
    this.options={
      prompt:'Scan barcode'
    };
    this.scanner.scan(this.options).then((data)=>{
      this.scannedData=data;
    },(err)=>{
      console.log('Errornya : ',err);
    })
  }

  encode(){
    this.scanner.encode(this.scanner.Encode.TEXT_TYPE, this.encodText).then((data)=>{
      this.encodedData=data;
    },(err)=>{
      console.log('Errornya : ',err);
    })
  }

  showBanner() {
 
    let bannerConfig: AdMobFreeBannerConfig = {
        // isTesting: true, // Remove in production
        autoShow: true,
        id: 'ca-app-pub-7643369510656938/1044140743'
        // id: 'ca-app-pub-3940256099942544/6300978111' //develop
        //id: Your Ad Unit ID goes here
    };

    this.admob.banner.config(bannerConfig);

    this.admob.banner.prepare().then(() => {
        // success
    }).catch(e => console.log(e));

}
}
