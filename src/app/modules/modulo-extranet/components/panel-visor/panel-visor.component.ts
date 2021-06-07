import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-panel-visor',
  templateUrl: './panel-visor.component.html',
  styleUrls: ['./panel-visor.component.css']
})
export class PanelVisorComponent implements OnInit {
  @Input() isdataVisorCustom: any;
  @Input() isVisible: boolean;
  @Input() isNombreArchivo: string;
  constructor() { }

  ngOnInit(): void {
  }

}
