import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Platform } from 'ionic-angular';

declare var cordova: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(protected camera: Camera, protected platform: Platform) {

  }

  scan(input: string) {

    // Get input (camera vs photo library)
    let type = this.camera.PictureSourceType.PHOTOLIBRARY;
    if (input == 'camera') {
      type = this.camera.PictureSourceType.CAMERA;
    }

    // Set Camera Options
    const cameraOptions: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: type,
      allowEdit: false
    }

    // Check if Cordova is ready
    this.platform.ready().then(() => {

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

    });

  }
}
