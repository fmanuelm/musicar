import { Component, OnInit } from '@angular/core';
import { EquipmentMonitorService } from '../service/equipment-monitor.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as Chartist from 'chartist';
import { sum } from 'chartist';
import { LoginComponent } from '../../pages/login/login.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private equipmentMonitorService: EquipmentMonitorService, private route: ActivatedRoute, private router: Router) { }

  idDashboard: any;
  dataDashboard: any;
  dataGraphics: any[];
  min: any;
  max: any;
  prom: any;

  minBand: any;
  maxBand: any;
  promBand: any;




  async ngOnInit() {
    this.idDashboard = this.route.snapshot.paramMap.get('id');
    await this.getEquimentMonitorById();
  }

  getEquimentMonitorById() {
    this.equipmentMonitorService.getEquimentMonitorById(this.idDashboard).subscribe(resp => {
      this.dataDashboard = resp[0];
      this.dataGraphics = this.dataDashboard.log_equipo_inventario_hardware.datos;
      this.getBarSize();


      new Chartist.Pie('#xd', {
        // series: [this.dataGraphics[1].uso, this.dataGraphics[1].libres],
        series: [90, 10],
        labels: ['En uso', 'Libres']
      }, {
        donut: true,
        donutWidth: 20,
        donutSolid: true,
        startAngle: 270,
        showLabel: false
      });

      let arrTempLabels = [];
      let arrTempValues = [];
      let sum = 0;
      this.dataGraphics[3].informacion.forEach(info => {
        arrTempLabels.push(info.cont);
        arrTempValues.push(info.temperatura);
        sum += info.temperatura;
      });

      this.prom = sum / arrTempValues.length;
      this.max = Math.max(...arrTempValues);
      this.min = Math.min(...arrTempValues);
      new Chartist.Line('#temp', {
        labels: arrTempLabels,
        series: [
          arrTempValues
        ]
      }, {
        low: 0,
        showArea: true
      });

      let arrWidthLabels = [];
      let arrWidthValues = [];
      let sumBand = 0;
      this.dataGraphics[4].informacion.forEach(info => {
        arrWidthLabels.push(info.cont);
        arrWidthValues.push(info.ancho_banda);
        sumBand += info.ancho_banda;
      });

      this.promBand = sumBand / arrWidthValues.length;
      this.maxBand = Math.max(...arrWidthValues);
      this.minBand = Math.min(...arrWidthValues);
      new Chartist.Line('#width-band', {
        labels: arrWidthLabels,
        series: [
          arrWidthValues
        ]
      }, {
        low: 0,
        showArea: true
      });

      console.log(this.dataGraphics);

    })
  }

  getBarSize() {
    return this.dataGraphics[0].uso;
  }

}
