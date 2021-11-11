import { Component, OnInit, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Platform } from 'ProyectoAppMoviles/node_modules/@ionic/angular';
import { Capacitor } from '@capacitor/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.page.html',
  styleUrls: ['./reporte.page.scss'],
})
export class ReportePage implements OnInit {

  @Output() imagePicker = new EventEmitter<string | File>();
  @ViewChild('filePicker') filePickerRef: ElementRef<HTMLInputElement>;
  selectedImage: string;
  usarPicker = false;
  constructor(
    private platform: Platform
    ) { }

  ngOnInit() {
    console.log('Platform: ', this.platform);
      if((this.platform.is('mobile') && !this.platform.is('hybrid')) || this.platform.is('desktop')){
        this.usarPicker = true;
      }
  }
  onPickImage(){
    if(!Capacitor.isPluginAvailable('Camera') || this.usarPicker){
      this.filePickerRef.nativeElement.click();
      return;
    }
    Camera.getPhoto({
      quality: 100,
      source: CameraSource.Prompt,
      correctOrientation: true,
      height: 320,
      width: 200,
      resultType: CameraResultType.DataUrl
    }).then(image => {
      this.selectedImage = image.dataUrl;
      this.imagePicker.emit(image.dataUrl);
    }).catch(error => {
      console.log(error);
      return false;
    });
  }
  onFileSelected(event: Event){
    console.log(event);
    const pickedFile = (event.target as HTMLInputElement).files[0];
    if(!pickedFile){
      return;
    }
    const fr = new FileReader();
    fr.onload = () => {
      const dataUrl = fr.result.toString();
      this.selectedImage = dataUrl;
      this.imagePicker.emit(pickedFile);
    };
    fr.readAsDataURL(pickedFile);
  }

}
