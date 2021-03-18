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

    let file = this.blobToFile(this.isFile, 'prueba.mp3');

    let URL = window.URL;

    let urlData = URL.createObjectURL(file);
    this.blobURL = this._sanitizer.bypassSecurityTrustUrl(urlData);

  }

  public blobToFile = (theBlob: Blob, fileName:string): File => {
    var b: any = theBlob;
    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    b.lastModifiedDate = new Date();
    b.name = fileName;

    //Cast to a File() type
    return <File>theBlob;
  }

}
