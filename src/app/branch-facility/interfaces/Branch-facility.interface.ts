export interface BranchFacility {
    nombre: string,
    alias: string,
    observaciones: string,
    clientes: number,
    regionales_ciudades: number,
    centro_operacion_vende: number,
    centro_operacion_atiende: number
}

export interface Regional {
    nombre: string,
    nombre_sala: string,
    creado: string,
    actualizado: string,
    paises: any
}

export interface City {
    nombre: string,
    creado: string,
    actualizado: string,
    regionales: Regional
}

export interface Center {    
    codigo_co: string,
    sede: string,
    creado: string,
    actualizado: string,
    paises:any

}