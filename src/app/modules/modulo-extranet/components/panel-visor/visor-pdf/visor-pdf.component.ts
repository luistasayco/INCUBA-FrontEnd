import { AfterViewInit, Component, Input, isDevMode, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-visor-pdf',
  templateUrl: './visor-pdf.component.html',
  styleUrls: ['./visor-pdf.component.css']
})
export class VisorPdfComponent implements OnInit, AfterViewInit {

  @Input() isFile: any;
  strBlobURL: any;

  BASE64_MARKER = ';base64,';
  file: string = '';
  fileEnServidor = '';
  urlSanitizer: SafeResourceUrl;


  // filePdf = 'data:application/pdf;base64,'
  constructor(private _sanitizer: DomSanitizer) { }
//application
  ngOnInit(): void {
    this.handleInputChange(this.isFile);

    // let origen: string = `${window.location.origin}/Invetsa`;
    // if (isDevMode()) {
    //   origen =  'https://auditoria.invetsa.com/Invetsa';
    // }

    // this.fileEnServidor = `${origen}/assets/file-pdf/${this.isFile.nameAleatorio}.pdf#toolbar=0&navpanes=0&scrollbar=0&view=fitH&&page=1`;
    // this.urlSanitizer = this._sanitizer.bypassSecurityTrustResourceUrl(this.fileEnServidor);
    // console.log('this.fileOnLocal:', this.fileEnServidor);

  } 

  ngAfterViewInit() {
    // const div = document.getElementById('container');
    // div.oncontextmenu = inhabilitar;
    // function inhabilitar() {
    //     return false;
    // }
  }

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
    this.strBlobURL =  reader.result;
    this.file = this.convertirBase64Afile(this.BlobToBase64_2(this.strBlobURL), 'archivo.pdf');

  }

  //04/06/2021 NUEVOS CAMBIOS

  BlobToBase64_2(blob) {
    let base64Index = blob.indexOf(this.BASE64_MARKER) + this.BASE64_MARKER.length;
    let base64 = blob.substring(base64Index);
    let raw = window.atob(base64);
    return base64;
  }

  convertirBase64Afile(archivoEnBase64, nombreArchivoSalida): any {
    const archivoABlob = this.convertirBase64ToBlob(archivoEnBase64);
    return window.URL.createObjectURL(archivoABlob);

  }

  convertirBase64ToBlob(dataURI): any {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'application/pdf' });
    return blob;
  }

}
