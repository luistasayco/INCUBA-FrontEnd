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
    console.log('visor-img');
    debugger;
    this.handleInputChange(this.isFile)
  }

  handleInputChange(files) {
    debugger;
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
    debugger;
    console.log(reader.result);
    this.base64result = reader.result
  }

}
