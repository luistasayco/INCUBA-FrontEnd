import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-visor-pdf',
  templateUrl: './visor-pdf.component.html',
  styleUrls: ['./visor-pdf.component.css']
})
export class VisorPdfComponent implements OnInit {

  @Input() isFile: any;
  strBlobURL: any;

  BASE64_MARKER = ';base64,';
  file: string = '';

  filePdf = 'data:application/pdf;base64,'


  constructor(private _sanitizer: DomSanitizer) { }
//application
  ngOnInit(): void {

    // this.filePdf = this.isFile.fileBase64; 

    // console.log('this.filePdf', this.filePdf);

    this.handleInputChange(this.isFile);


//     this.strBlobURL = window.URL.createObjectURL(this.isFile);
// this.strBlobURL = fileURL;
//           window.open(fileURL);
//           console.log('fileURL', fileURL);

//     var reader = new FileReader();
//     reader.addEventListener("loadend", function() {
//        // reader.result contains the contents of blob as a typed array
//        this.onloadend = await this.onda
//        console.log('reader.result', reader.result);

//     });
//     reader.readAsArrayBuffer(this.isFile);

    // console.log('isFile', this.isFile);
    // this.strBlobURL = this.isFile.arrayBuffer();
  } 

  // onData(reader) {
  //   this.strBlobURL = reader.result;
  // }

 async handleInputChange(files) {
    let _file = files;
    let pattern = /pdf-*/;
    let reader = new FileReader();
    if (!_file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
     reader.onloadend = await this._handleReaderLoaded.bind(this);

     await reader.readAsDataURL(_file);

  }

  _handleReaderLoaded(e) {
    let reader = e.target;

    // console.log('reader', reader);
    this.strBlobURL =  reader.result;
    // console.log('READER 2: this.strBlobURL', this.strBlobURL);
    // const fileABase64 = this.BlobToBase64_2(this.strBlobURL);
    // console.log('ARCHIVO BLOB A BASE 64', fileABase64);
    this.file = this.convertirBase64Afile(this.BlobToBase64_2(this.strBlobURL), 'archivo.pdf');

  }

  //04/06/2021 NUEVOS CAMBIOS

  BlobToBase64_2(blob) {
    let base64Index = blob.indexOf(this.BASE64_MARKER) + this.BASE64_MARKER.length;
    let base64 = blob.substring(base64Index);
    // console.log('BlobToBase64_2: A BASE 64', base64);
    let raw = window.atob(base64);
    // console.log('BlobToBase64_2: A raw', raw);
    return base64;
  }

  convertirBase64Afile(archivoEnBase64, nombreArchivoSalida): any {

    const archivoABlob = this.convertirBase64ToBlob(archivoEnBase64);
    // const archivoPDF = new File([archivoABlob], nombreArchivoSalida, { type: 'application/pdf' });
    return window.URL.createObjectURL(archivoABlob);

  }

  convertirBase64ToBlob(dataURI): any {
    // console.log('ARCHIVO EN BASE 64', dataURI);
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'application/pdf' });
    // console.log('ARCHIVO EN BLOB', blob);

    return blob;
  }

}
