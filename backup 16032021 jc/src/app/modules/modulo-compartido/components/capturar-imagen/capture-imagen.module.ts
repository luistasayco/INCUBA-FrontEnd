import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CapturarImagenComponent } from './capturar-imagen.component';
import { FileUploadModule } from 'primeng/fileupload';
import { ImageCropperModule } from 'ngx-image-cropper';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [CapturarImagenComponent],
    imports: [ CommonModule, FileUploadModule, ImageCropperModule, FormsModule],
    exports: [CapturarImagenComponent],
    providers: [],
})
export class CapturarImagenModule {}