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
  archivoEnBase64: any;
  nombrePdf: string = '';
  origen: string = '';

  BASE64_MARKER = ';base64,';
  archivoUrl: string = '';
  fileEnServidor = '';
  urlSanitizer: SafeResourceUrl = null;

  pagina: number = 1;

  // filePdf = 'data:application/pdf;base64,'
  constructor(private _sanitizer: DomSanitizer) { }

  ngAfterViewInit(): void {
    this.inHabilitarClickDerecho();
  }

  inHabilitarClickDerecho() {
    const div = document.getElementById('container');
    div.oncontextmenu = inhabilitar;
    function inhabilitar() {
      console.log('CLICK DERECHO INHABILITADO');
      return false;
    }
  }

  ngOnInit() {
    this.origen = `${window.location.origin}/Invetsa`;
    if (isDevMode()) {
      // origen =  'https://auditoria.invetsa.com/Invetsa';
      this.origen =  window.location.origin;
    }
    console.log('origen:', this.origen);


      // console.log('isFile', this.isFile);
      // console.log('archivoUrl', this.archivoUrl);
      // console.log('archivoEnBase64', this.archivoEnBase64);

      //this.fileEnServidor = `${origen}/assets/file-pdf/${this.isFile.nameAleatorio}.pdf#toolbar=0&navpanes=0&scrollbar=0&view=fitH&&page=1`;
      this.nombrePdf = this.isFile.nameAleatorio;
      //this.fileEnServidor = `${origen}/assets/file-pdf/${nombrePdf}.pdf`;
      const parametro = new Date();
      this.fileEnServidor = `${this.origen}/assets/file-pdf/${this.nombrePdf}.pdf?param=${parametro}#toolbar=0&navpanes=0`;
      console.log('this.fileEnServidor:', this.fileEnServidor);
      this.urlSanitizer = this._sanitizer.bypassSecurityTrustResourceUrl(this.fileEnServidor);

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
    this.archivoEnBase64 =  reader.result;
    this.archivoUrl = this.convertirBase64Afile(this.BlobToBase64_2(this.archivoEnBase64), 'archivo.pdf');

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

  public primeraPagina() {
    this.pagina = 1;
    this.MostrarPagina(this.pagina);
  }


  public ultimaPagina() {
    this.pagina = 100;
    this.MostrarPagina(this.pagina);
  }

  public PaginaAnterior() {
    this.pagina--;
    this.MostrarPagina(this.pagina);
  }


  public PaginaSiguiente() {
    this.pagina++;
    this.MostrarPagina(this.pagina);
  }

  private MostrarPagina(pagina: number) {
    try {
      const parametro = new Date();
      this.fileEnServidor = `${this.origen}/assets/file-pdf/${this.nombrePdf}.pdf?param=${parametro}#toolbar=0&navpanes=0&&page=${pagina}`;
      this.urlSanitizer = this._sanitizer.bypassSecurityTrustResourceUrl(this.fileEnServidor);
    } catch (error) {
      console.error('Error:', error);
    }

  }

}
