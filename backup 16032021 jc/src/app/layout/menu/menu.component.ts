import { Component, OnInit, Input } from '@angular/core';
import { LayoutComponent } from '../layout.component';
import { MenuDinamicoService } from '../../services/menu-dinamico.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

    @Input() model: any[];

    constructor(public app: LayoutComponent) { }

    ngOnInit() {
    }
}
