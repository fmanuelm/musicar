export interface Externo {
    id: number,
    mensaje_tipo_esquema: number,
    referencia_mensaje: string,
    contenido_mensaje: string,
    archivo_adjuntado?: any,
    observaciones: string,
    fechas_programacion_mensaje: any,
    tipo_de_dias: number,
    dias_asociados: any[],
    horas_tocado_mensaje: any,
    hora_tocado_inicio: string,
    hora_tocado_fin: string,
    secuencia: number,
    horas_pico: any[],
    horas_no_pico: any[],
    puntos_asociados: any[],
    aprobar_mensaje: boolean,
    usuario: number,
    clientes: number,
    categoria_mensaje: number,
    tipo_grabacion: number,
    prioridad_grabacion: number,
    locutor: number,
    tipo_pregrabado: string,
    termina_cancion: boolean,
    /**
     * {
  "id": 1,
  "mensaje_tipo_esquema": 1,
  "referencia_mensaje": "SDO",
  "contenido_mensaje": "DSF",
  "archivo_adjuntado": {},
  "observaciones": "DSF",
  "fechas_programacion_mensaje": {
    "fecha_inicio": "12/02/2023",
    "fecha_fin": "23/02/2023"
  },
  "tipo_de_dias": 1,
  "dias_asociados": [
    "Lunes",
    "Martes"
  ],
  "horas_tocado_mensaje": {
    "fecha_inicio": "12/02/2023",
    "fecha_fin": "23/02/2023"
  },
  "hora_tocado_inicio": "DSF",
  "hora_tocado_fin": "DSF",
  "secuencia": 1,
  "horas_pico": [
    {
      "id_hora_pico": 1,
      "id_pautas_pico": 2
    },
    {
      "id_hora_pico": 2,
      "id_pautas_pico": 3
    }
  ],
  "horas_no_pico": [
    {
      "id_hora_no_pico": 1,
      "id_pautas_no_pico": 2
    },
    {
      "id_hora_no_pico": 2,
      "id_pautas_no_pico": 3
    }
  ],
  "puntos_asociados": [
    1,
    2
  ],
  "aprobar_mensaje": true,
  "usuario": 1,
  "clientes": 1,
  "categoria_mensaje": 1,
  "tipo_grabacion": 1,
  "prioridad_grabacion": 1,
  "locutor": 1,
  "tipo_pregrabado": "DJFW",
  "termina_cancion": true
}
     * */    
}
