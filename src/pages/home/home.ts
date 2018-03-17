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

  scan() {
    if (cordova !== undefined) {
      const cameraOptions: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.FILE_URI,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
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
