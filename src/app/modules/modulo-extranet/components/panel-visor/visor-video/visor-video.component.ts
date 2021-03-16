import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-visor-video',
  templateUrl: './visor-video.component.html',
  styleUrls: ['./visor-video.component.css']
})
export class VisorVideoComponent implements OnInit {
 
  @Input() isFile: Blob;
  blobURL: any;
  constructor() { }

  ngOnInit(): void {
    // console.log(this.isFile);
    // let file = new window.Blob([this.isFile], {type: this.isFile.type});
    // console.log('file', file);
    // this.blobURL = URL.createObjectURL(this.isFile);

    // console.log('this.blo', this.blobURL);

    this.handleInputChange(this.isFile);

  }

  handleInputChange(files) {
    let file = files;
    let reader = new FileReader();

    reader.onloadend = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }

  _handleReaderLoaded(e) {
    let reader = e.target;
    this.blobURL = reader.result;

    console.log('reader', e);
    console.log('blob', this.blobURL);
  }
}
