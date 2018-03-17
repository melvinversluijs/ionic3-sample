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

  private cameraOptions: CameraOptions;
  public scanOptions: OpenALPROptions;

  constructor(private camera: Camera, private openALPR: OpenALPR, private alertCtrl: AlertController, private modalCtrl: ModalController) {

    this.cameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: false
    }

    this.scanOptions = {
      country: this.openALPR.Country.EU,
      amount: 3
    }

  }

  /**
   * Take picture and send it to OpenALPR
   * @param input 
   */
  scan(input: string) {

    this.cameraOptions.sourceType = (input === 'camera' ? this.camera.PictureSourceType.CAMERA : this.camera.PictureSourceType.PHOTOLIBRARY);

    this.camera.getPicture(this.cameraOptions)
      .then((imageData) => {

        this.openALPR.scan(imageData, this.scanOptions)
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
