import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleriaModule } from 'primeng/galleria';
import { CarouselModule } from 'primeng/carousel';
import { GaleriaImagenComponent } from './galeria-imagen.component';
import { ButtonModule } from 'primeng/button';
import { CapturarImagenModule } from '../capturar-imagen/capture-imagen.module';

@NgModule({
    declarations: [GaleriaImagenComponent],
    imports: [ CommonModule, GalleriaModule, CarouselModule, ButtonModule, CapturarImagenModule ],
    exports: [GaleriaImagenComponent],
    providers: [],
})
export class GaleriaImagenModule {}