import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { OpenALPR, OpenALPROptions, OpenALPRResult } from '@ionic-native/openalpr';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(private camera: Camera, private openALPR: OpenALPR) {

  }

  /**
   * Take picture and send it to OpenALPR
   * @param input 
   */
  scan(input: string) {

    const cameraOptions: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
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
            const bestResult = result[0];

            console.log(bestResult.confidence);
            console.log(bestResult.number);
          }).catch((error: Error) => console.error(error));
      }).catch((error: Error) => console.error(error));
  }
}
