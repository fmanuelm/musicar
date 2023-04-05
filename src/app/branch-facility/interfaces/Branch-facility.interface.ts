export interface BranchFacility {
    id?:any;
    nombre: string,
    alias: string,
    observaciones: string,
    clientes: number,
    regionales_ciudades: number,
    centro_operacion_vende: number,
    centro_operacion_atiende: number,
}

export interface Regional {
    id?:any;
    nombre: string,
    nombre_sala: string,
    creado: string,
    actualizado: string,
    paises: any
}

export interface City {
    id?:any;
    nombre: string,
    creado: string,
    actualizado: string,
    regionales: Regional
}

export interface Center {   
    id?:any; 
    codigo_co: string,
    sede: string,
    creado: string,
    actualizado: string,
    paises:any

}