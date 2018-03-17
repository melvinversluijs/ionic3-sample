import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { OpenALPR, OpenALPROptions, OpenALPRResult } from '@ionic-native/openalpr';
import { AlertController, ModalController, NavParams, ViewController } from 'ionic-angular';

@Component({
    selector: 'modal-result',
    templateUrl: 'result.html'
})

export class ResultPage {

    public licensePlate: string;
    public car: any = {};

    constructor(private params: NavParams, private viewCtrl: ViewController) {
        this.licensePlate = this.params.get('licensePlate');

        this.car = {
            name: '[Car Brand]',
        }
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
}
