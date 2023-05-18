import { Component, OnInit } from '@angular/core';
import { EquipmentMonitorService } from '../service/equipment-monitor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
})
export class ListComponent implements OnInit {

  public equipmentsMonitors: any[];
  public cols = [
    { field: 'pais', header: 'País' },
    { field: 'cliente', header: 'Cliente' },
    { field: 'punto', header: 'Punto' },
    { field: 'flag_estado_conexion_red', header: 'Estado conexión' },
    { field: 'fecha_estado_conexion_red', header: 'Ultima conexión' },
    { field: 'tiempo_ultima_conexion', header: 'Tiempo' },
  ];

  constructor(private equipmentMonitorService: EquipmentMonitorService, private router: Router) { }

  ngOnInit(): void {
    this.getEquimentsMonitors()
  }

  getEquimentsMonitors() {
    this.equipmentMonitorService.getEquimentMonitor().subscribe(resp => {
      this.equipmentsMonitors = resp;
    })
  }

  exportExcel() {
    this.equipmentMonitorService.exportExcel(this.equipmentsMonitors);
  }

  exportPdf() {
    this.equipmentMonitorService.exportPdf(this.equipmentsMonitors, this.cols);
  }

  viewEquipmentMonitor(equipmentMonitor) {
    this.router.navigate(
      ['monitor-equipos/detail', equipmentMonitor.equipo_inventario.id]
    );
  }

}
