export interface IEstadoTablasDelSistema {
  tablaMstEmpresa: boolean;
  tablaMstPlanta: boolean;
  tablaMstModelo: boolean;
  tablaMstCondicionLimpieza: boolean;
  tablaMstRequerimientoEquipo: boolean;
  tablaMstEquipo: boolean;
  tablaMstMantenimientoPorModelo: boolean;
  tablaMstRepuestoPorModelo: boolean;
  tablaMstCalidad: boolean;
  tablaTrxExamenFisicoPollitoDetalle: boolean;
  tablaMsSociedades: boolean;

  tablaMstBoquilla: boolean;
  tablaMstVacuna: boolean;
  tablaMstProcesoSpray: boolean;
  tablaMstProcesoDetalleSpray: boolean;
  tablaTrxVacunacionSprayNew: boolean;

  tablaMstAguja: boolean;
  tablaMstIndiceEficiencia: boolean;
  tablaMstIrregularidad: boolean;
  tablaMstProcesoSubCutanea: boolean;
  tablaMstProcesoDetalleSubCutanea: boolean;
  tablaTrxVacunacionSubCutaneaNew: boolean;

  tablaTrxSINMIDetalleNew: boolean;
  //Luis Chumpitaz
  //tablaMstUsuario: boolean;
}
