import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-visor-audio',
  templateUrl: './visor-audio.component.html',
  styleUrls: ['./visor-audio.component.css']
})
export class VisorAudioComponent implements OnInit {

  @Input() isFile: Blob;
  blobURL: any;
  constructor(private _sanitizer: DomSanitizer) { }

  ngOnInit(): void {

    let URL = window.URL;

    let urlData = URL.createObjectURL(this.isFile);
    this.blobURL = this._sanitizer.bypassSecurityTrustStyle(urlData);

    // console.log('this.blo', this.blobURL);
    // console.log('blobUrl', this.isFile.arrayBuffer);
    // this.handleInputChange(this.isFile);
    
  }

  // handleInputChange(files) {
  //   let file = files;
  //   let reader = new FileReader();

  //   reader.onloadend = this._handleReaderLoaded.bind(this);
  //   reader.readAsDataURL(file);
  // }

  // _handleReaderLoaded(e) {
  //   let reader = e.target;
  //   let stringBase64 = reader.result;

  //   console.log('reader', e);
  //   console.log('blob', this.blobURL);

  //   var binary= this.convertDataURIToBinaryFF(stringBase64);
  //   var blob=new Blob([binary], {type : this.isFile.type});

  //   this.blobURL = this._sanitizer.bypassSecurityTrustStyle(`${URL.createObjectURL(blob)}`);
  //   console.log('blobUrl', this.blobURL);
  // }
}
