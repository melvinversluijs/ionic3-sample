import { ResultPage } from './../result/result';
import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { OpenALPR, OpenALPROptions, OpenALPRResult } from '@ionic-native/openalpr';
import { AlertController, ModalController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private country: string;

  constructor(private camera: Camera, private openALPR: OpenALPR, private alertCtrl: AlertController, private modalCtrl: ModalController) {

  }

  /**
   * Take picture and send it to OpenALPR
   * @param input 
   */
  scan(input: string) {

    const cameraOptions: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: (input === 'camera' ? this.camera.PictureSourceType.CAMERA : this.camera.PictureSourceType.PHOTOLIBRARY),
      allowEdit: false
    }

    const scanOptions: OpenALPROptions = {
      country: this.openALPR.Country.EU,
      amount: 3
    }

    this.camera.getPicture(cameraOptions)
      .then((imageData) => {
        this.openALPR.scan(imageData, scanOptions)
          .then((result: [OpenALPRResult]) => {

            if (result.length < 1) {
              this.showError('No license plates found');
              return;
            }

            const bestResult = result[0];
            this.showResult(bestResult);

          }).catch((error: Error) => console.error(error));
      }).catch((error: Error) => console.error(error));

    this.camera.cleanup();
  }

  /**
   * Show error using a popup
   * @param text {string}
   */
  showError(text: string) {
    const alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: text,
      buttons: ['OK']
    });

    alert.present();
  }

  /**
   * Show result using a popup
   * @param result {OpenALPRResult}
   */
  showResult(result: OpenALPRResult) {
    const modal = this.modalCtrl.create(ResultPage, { licensePlate: result.number });
    modal.present();
  }

}
