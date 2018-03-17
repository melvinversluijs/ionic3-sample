import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';

declare var cordova: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(protected camera: Camera) {

  }

  scan(input: string) {

    let type = this.camera.PictureSourceType.PHOTOLIBRARY;

    if (input == 'camera') {
      type = this.camera.PictureSourceType.CAMERA;
    }

    if (cordova !== undefined) {

      const cameraOptions: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.FILE_URI,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        sourceType: type,
        allowEdit: false
      }

      this.camera.getPicture(cameraOptions).then((imageData) => {

        cordova.plugins.OpenALPR.scan(
          imageData,
          (response) => {
            console.log(response)
          },
          (error) => {
            console.log(error)
          }
        );

      }, (error) => {
        console.log(error);
      });

    } else {
      console.log('fail');
    }
  }

}
