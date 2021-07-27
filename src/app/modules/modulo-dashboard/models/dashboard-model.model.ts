import { DashboardModule } from '../modulo-dashboard.module';
export class DashboardModel {
    dashboardID: number;
    dashboardName: string;
    dashboardDescription: string;

    constructor(){
        this.dashboardID = 0;
        this.dashboardName = '';
        this.dashboardDescription = '';
    }
}

export class DashboardModelPorCategoria {
    dashboardCategory: string;

    constructor(){
        this.dashboardCategory = '';
    }
}
