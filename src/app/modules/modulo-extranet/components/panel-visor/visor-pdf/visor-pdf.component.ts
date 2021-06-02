import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-visor-pdf',
  templateUrl: './visor-pdf.component.html',
  styleUrls: ['./visor-pdf.component.css']
})
export class VisorPdfComponent implements OnInit {

  @Input() isFile: Blob;
  strBlobURL: any;

  constructor(private _sanitizer: DomSanitizer) { }
//application
  ngOnInit(): void {

    this.handleInputChange(this.isFile)

    // this.strBlobURL = window.URL.createObjectURL(this.isFile);
// this.strBlobURL = fileURL;
//           window.open(fileURL);
//           console.log('fileURL', fileURL);

    // var reader = new FileReader();
    // reader.addEventListener("loadend", function() {
    //    // reader.result contains the contents of blob as a typed array
    //    this.onloadend = await this.onda
    //    console.log('reader.result', reader.result);

    // });
    // reader.readAsArrayBuffer(this.isFile);

    // // console.log('isFile', this.isFile);
    // this.strBlobURL = this.isFile.arrayBuffer();
  } 

  // onData(reader) {
  //   this.strBlobURL = reader.result;
  // }

 async handleInputChange(files) {
     let file = files;
    let pattern = /pdf-*/;
    let reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
     reader.onloadend = await this._handleReaderLoaded.bind(this);
     await reader.readAsDataURL(file);
  }

  _handleReaderLoaded(e) {
    // console.log('e', e);
    let reader = e.target;

    // console.log('reader', reader);

    this.strBlobURL = reader.result
  }

}
