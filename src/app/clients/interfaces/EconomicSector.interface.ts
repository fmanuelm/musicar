export interface EconomicSector {
    id:                   number;
    nombre:               string;
    descripcion:          string;
    creado:               Date;
    actualizado:          Date;
    actividad_economica?: EconomicSector;
    sector_economico?:    EconomicSector;
}
