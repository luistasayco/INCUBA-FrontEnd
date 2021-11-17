import { Component, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-galeria-imagen',
  templateUrl: './galeria-imagen.component.html',
  styles: [`
        /* Table */
        .ui-table.ui-table-cars .ui-table-caption.ui-widget-header {
            border: 0 none;
            padding: 12px;
            text-align: left;
            font-size: 20px;
        }

        .ui-column-filter {
            margin-top: 1em;
        }

        .ui-column-filter .ui-multiselect-label {
            font-weight: 500;
        }

        .ui-table.ui-table-cars .ui-table-thead > tr > th {
            border: 0 none;
            text-align: left;
        }

        .ui-table-globalfilter-container {
            float: right;
            display: inline;
        }

        .ui-table.ui-table-cars .ui-table-tbody > tr > td {
            border: 0 none;
        }

        .ui-table.ui-table-cars .ui-table-tbody .ui-column-title {
            font-size: 16px;
        }

        .ui-table.ui-table-cars .ui-paginator {
            border: 0 none;
            padding: 1em;
        }

        /* Dataview */
        .filter-container {
            text-align: center;
        }

        .car-details-list {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 2em;
            border-bottom: 1px solid #d9dad9;
        }

        .car-details-list > div {
            display: flex;
            align-items: center;
        }

        .car-details-list > div img {
            margin-right: 14px;
        }

        .car-detail {
            padding: 0 1em 1em 1em;
            border-bottom: 1px solid #d9dad9;
            margin: 1em;
        }

        .ui-panel-content {
            padding: 1em;
        }

        @media (max-width: 1024px) {
            .car-details-list img {
                width: 75px;
            }

            .filter-container {
                text-align: left;
            }
        }

        /* Carousel */
        .car-item {
            padding-top: 5px;
        }

        .car-item .ui-md-3 {
            text-align: center;
        }

        .car-item .ui-g-10 {
            font-weight: bold;
        }

        .empty-car-item-index {
            background-color: #f1f1f1;
            width: 60px;
            height: 60px;
            margin: 36px auto 0 auto;
            animation: pulse 1s infinite ease-in-out;
        }

        .empty-car-item-image {
            background-color: #f1f1f1;
            width: 120px;
            height: 120px;
            animation: pulse 1s infinite ease-in-out;
        }

        .empty-car-item-text {
            background-color: #f1f1f1;
            height: 18px;
            animation: pulse 1s infinite ease-in-out;
        }

        .title-container {
            padding: 1em;
            text-align: right;
        }

        .sort-container {
            text-align: left;
        }

		.ui-carousel .ui-carousel-content .ui-carousel-item .car-details > .p-grid {
			border: 1px solid #b3c2ca;
			border-radius: 3px;
			margin: 0.3em;
			text-align: center;
			padding: 2em 0 2.25em 0;
		}
		.ui-carousel .ui-carousel-content .ui-carousel-item .car-data .car-title {
			font-weight: 700;
			font-size: 20px;
			margin-top: 24px;
		}
		.ui-carousel .ui-carousel-content .ui-carousel-item .car-data .car-subtitle {
			margin: 0.25em 0 2em 0;
		}
		.ui-carousel .ui-carousel-content .ui-carousel-item .car-data button {
			margin-left: 0.5em;
		}
		.ui-carousel .ui-carousel-content .ui-carousel-item .car-data button:first-child {
			margin-left: 0;
		}
		.ui-carousel.custom-carousel .ui-carousel-dot-icon {
			width: 16px !important;
			height: 16px !important;
			border-radius: 50%;
		}
		.ui-carousel.ui-carousel-horizontal .ui-carousel-content .ui-carousel-item.ui-carousel-item-start .car-details > .p-grid {
			margin-left: 0.6em;
        }

        @media (max-width: 40em) {
            .car-item {
                text-align: center;
            }
            .index-col {
                display: none;
            }
            .image-col {
                display: none;
            }
        }
        @keyframes pulse {
            0% {
                background-color: rgba(165, 165, 165, 0.1)
            }
            50% {
                background-color: rgba(165, 165, 165, 0.3)
            }
            100% {
                background-color: rgba(165, 165, 165, 0.1)
            }
        }
    `],
    encapsulation: ViewEncapsulation.None
})
export class GaleriaImagenComponent {

  @Input() carouselCars: IImagen[];
  @Output() listUpdate = new EventEmitter<IImagen[]>();

  responsiveOptions;

  displayMaximizable: boolean;

  constructor() {

    this.responsiveOptions = [
      {
          breakpoint: '1024px',
          numVisible: 3,
          numScroll: 3
      },
      {
          breakpoint: '768px',
          numVisible: 2,
          numScroll: 2
      },
      {
          breakpoint: '560px',
          numVisible: 1,
          numScroll: 1
      }
    ];

  }

    deleteItem(data: string) {
        debugger;

        var galeria = [...this.carouselCars];
        var galeriaDepurada = galeria.filter(x => x.imagen !== data);

        // this.carouselCars = [...this.carouselCars].filter(x => x.imagen !== data);
        this.carouselCars = galeriaDepurada;
        this.listUpdate.emit(this.carouselCars);
    }


    // deleteItem(index: number) {

    //     this.carouselCars.splice(+index, 1);

    //     // this.carouselCars = [...this.carouselCars].filter(x => x.imagen !== data);
    //     this.listUpdate.emit(this.carouselCars);
    // }

    newImg(data: string) {

        if (!this.carouselCars) 
        { 
            this.carouselCars = []; 
        }

        var galeria = [...this.carouselCars];
        galeria.push({imagen: data})

        this.carouselCars = galeria;
        this.listUpdate.emit(this.carouselCars);
    }

}

interface IImagen {
  imagen: string;
}