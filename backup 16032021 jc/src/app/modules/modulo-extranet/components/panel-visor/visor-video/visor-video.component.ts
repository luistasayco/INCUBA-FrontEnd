import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-visor-video',
  templateUrl: './visor-video.component.html',
  styleUrls: ['./visor-video.component.css']
})
export class VisorVideoComponent implements OnInit {
 
  @Input() isFile: Blob;

  constructor() { }

  ngOnInit(): void {


  }

}
