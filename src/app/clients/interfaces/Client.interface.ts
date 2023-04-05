export interface Client {
    horarios_cliente?: any;
    paises_extras?: any[];
    razon_social: string;
    razon_comercial: string;
    nit: string;
    id?: any;
    observaciones: string;
    paises: Pais;
    paises_extra: number[];
    subgrupo_economico: number | any;
    tipo_cliente: number | any;
    usuario_comercial: number | any;
    datos_contacto: DatosContacto[];
    horarios: Horarios;
    pais_nombre?: string;
    grupo_cliente?: number;
}

export interface DatosContacto {
    nombre_contacto: string;
    telefono_contacto: string;
    correo_contacto: string;
    cliente_tipo_contacto: number;
}

export interface Horarios {
    id?: any;
    lunes: Dia;
    martes: Dia;
    miercoles: Dia;
    jueves: Dia;
    viernes: Dia;
    sabado: Dia;
    domingo: Dia;
    festivos: Dia;
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