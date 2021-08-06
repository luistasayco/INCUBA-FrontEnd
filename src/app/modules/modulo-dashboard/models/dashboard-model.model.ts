export class DashboardModel {
    dashboardID: number;
    dashboardName: string;
    dashboardCategoryID: number;

    constructor(){
        this.dashboardID = 0;
        this.dashboardName = '';
        this.dashboardCategoryID = 0;
    }
}

export class DashboardModelPorCategoria {
    dashboardCategory: string;

    constructor(){
        this.dashboardCategory = '';
    }
}
