import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-visor-imagen',
  templateUrl: './visor-imagen.component.html',
  styleUrls: ['./visor-imagen.component.css']
})
export class VisorImagenComponent implements OnInit {

  @Input() isFile: Blob;
  base64result: string;
  constructor() { }

  ngOnInit(): void {
    this.handleInputChange(this.isFile)
  }

  handleInputChange(files) {
    let file = files;
    let pattern = /image-*/;
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
    this.base64result = reader.result
  }

}
