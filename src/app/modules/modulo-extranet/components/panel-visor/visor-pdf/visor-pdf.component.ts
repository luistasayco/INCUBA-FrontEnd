import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-visor-pdf',
  templateUrl: './visor-pdf.component.html',
  styleUrls: ['./visor-pdf.component.css']
})
export class VisorPdfComponent implements OnInit {
  @Input() isFile: Blob;
  strBlobURL: string;

  constructor(private _sanitizer: DomSanitizer) { }
//application
  ngOnInit(): void {
   
    this.handleInputChange(this.isFile)
      
  } 

 handleInputChange(files) {
     let file = files;
    let pattern = /pdf-*/;
    let reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    reader.onloadend = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }

  _handleReaderLoaded(e) {
    let reader = e.target;
    this.strBlobURL = reader.result
  }

}
