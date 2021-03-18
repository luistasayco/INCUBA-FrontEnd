import { Injectable } from "@angular/core";
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn : 'root'
})
export class MensajesService {

  constructor(private toastr: ToastrService) {
  }

  public _MENSAJE_SATISFACTORIO(mensaje: string, titulo?: string) {
    if (mensaje) {
      this.toastr.success(mensaje, titulo ? titulo : '');
    }
  }

  public _MENSAJE_INFORMACION(mensaje: string, titulo?: string) {
    if (mensaje) {
      this.toastr.info(mensaje, titulo ? titulo : 'Información');
    }
  }

  public _MENSAJE_ERROR(mensaje: string, titulo?: string) {
    if (mensaje) {
      this.toastr.error(mensaje, titulo ? titulo : 'Error');
    }
  }

  public _MENSAJE_ADVERTENCIA(mensaje: string, titulo?: string) {
    if (mensaje) {
      this.toastr.warning(mensaje, titulo ? titulo : 'Advertencia');
    }
  }


}
