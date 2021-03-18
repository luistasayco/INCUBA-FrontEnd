import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-visor-pdf',
  templateUrl: './visor-pdf.component.html',
  styleUrls: ['./visor-pdf.component.css']
})
export class VisorPdfComponent implements OnInit {
  @Input() isFile: Blob;
  constructor() { }

  ngOnInit(): void {
    let file = new window.Blob([this.isFile], {type: "application/pdf"});
    let fileURL = window.URL.createObjectURL(file);
      
    var aa= window.open(fileURL+"#toolbar=0", 'iframe');
  } 
}
