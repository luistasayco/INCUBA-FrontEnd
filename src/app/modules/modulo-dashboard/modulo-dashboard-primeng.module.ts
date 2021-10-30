import { NgModule } from '@angular/core';

//Module PrimeNG
import { PanelModule } from 'primeng/panel'; 
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { ChartModule } from 'primeng/chart';
import 'chartjs-plugin-labels';
import { CardModule } from 'primeng/card';
import { ScrollPanelModule } from 'primeng';
import { MultiSelectModule } from 'primeng/multiselect';
//Services

@NgModule({
    declarations: [],
    exports: [
        PanelModule,
        DropdownModule,
        CalendarModule,
        ChartModule,
        CardModule,
        ScrollPanelModule,
        MultiSelectModule
    ],
    providers: []
})
export class DashboardPrimeNgModule {}
