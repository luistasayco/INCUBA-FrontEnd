import { NgModule } from '@angular/core';

//Module PrimeNG
import { PanelModule } from 'primeng/panel'; 
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { ChartModule } from 'primeng/chart';
//Services

@NgModule({
    declarations: [],
    exports: [
        PanelModule,
        DropdownModule,
        CalendarModule,
        ChartModule
    ],
    providers: []
})
export class DashboardPrimeNgModule {}
