import { Component, EventEmitter, Input, Output, ViewChild, OnInit } from '@angular/core';
import { GlobalsConstants } from '../../models/globals-constants';

@Component({
  selector: 'app-panel-firma-digital',
  templateUrl: './panel-firma-digital.component.html',
  styleUrls: ['./panel-firma-digital.component.css']
})
export class PanelFirmaDigitalComponent implements OnInit {

  @Input() vFirmaOk: string;
  @Input() vFirmaClear: string;

  @Output() vDataFirma = new EventEmitter<string>();
  @Output() vDataFirmaClear = new EventEmitter<string>();

  signatureImage;
  finalizafirma: boolean;

  constructor() {
    this.finalizafirma = false;
   }
  ngOnInit() {

  }

  showImage(data) {
    this.signatureImage = data;
    this.finalizafirma = true;
    this.vDataFirma.emit(this.signatureImage);
  }

  clearImage() {
    this.finalizafirma = false;
    this.vDataFirmaClear.emit('');
  }
}
