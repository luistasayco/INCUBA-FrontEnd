import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GlobalsConstants } from '../../models/globals-constants';

@Component({
  selector: 'app-panel-firma-digital',
  templateUrl: './panel-firma-digital.component.html',
  styleUrls: ['./panel-firma-digital.component.css']
})
export class PanelFirmaDigitalComponent {

  @Input() vFirmaOk: string;
  @Input() vFirmaClear: string;

  @Output() vDataFirma = new EventEmitter<string>();
  @Output() vDataFirmaClear = new EventEmitter<string>();

  points = [];
  signatureImage;

  constructor() { }

  showImage(data) {
    this.signatureImage = data;
    this.vDataFirma.emit(this.signatureImage);
  }

  clearImage() {
    this.vDataFirmaClear.emit('');
  }

}
