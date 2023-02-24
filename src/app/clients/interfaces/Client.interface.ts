export interface Client {
    razon_social: string ;
    razon_comercial: string ;
    nit: string ;
    observaciones: string ;
    paises: Pais ;
    paises_extra: number [];
    subgrupo_economico: number ;
    tipo_cliente: number ;
    usuario_comercial: number ;
    datos_contacto: DatosContacto [];
    horarios: Horarios ;
    pais_nombre: string ;
}

export interface DatosContacto {
    nombre_contacto: string;
    telefono_contacto: string;
    correo_contacto: string;
    cliente_tipo_contacto: number;
}

export interface Horarios {
    lunes: Dia;
    martes: Dia;
    miercoles: Dia;
    jueves: Dia;
    viernes: Dia;
    sabado: Dia;
    domingo: Dia;
}

export interface Dia {
    hora_inicial: null | string;
    hora_final: null | string;
}

export interface Pais {
    id: number,
    nombre: string,
    creado: string
    actualizado: string
}