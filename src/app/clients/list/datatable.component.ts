import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ClientsService } from '../service/clients.service';
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable'
import * as FileSaver from "file-saver";
import { Client } from '../interfaces/Client.interface';

@Component({
  selector: 'app-data-table-cmp',
  templateUrl: 'datatable.component.html'
})

export class DataTableComponent implements OnInit {

  constructor(private clientService: ClientsService) { }

  public clients: any[];
  public first: number = 0;
  public exportColumns: any[];


  public cols = [
    { field: 'razon_social', header: 'Razón social' },
    { field: 'razon_comercial', header: 'Razón comercial' },
    { field: 'nit', header: 'NIT' },
    { field: 'tipo_cliente', header: 'Tipo cliente' },
    { field: 'pais_nombre', header: 'País' },
  ];

  ngOnInit() {
    this.getClients()
    this.exportColumns = this.cols.map(col => ({ title: col.header, dataKey: col.field }));
  }


  getClients() {
    this.clientService.getClients().subscribe(resp => {
      this.clients = resp;
    })
  }

  exportPdf() {
    const datos = this.clients.map(cliente => {
      return {
        razon_social: cliente.razon_social,
        razon_comercial: cliente.razon_comercial,
        nit: cliente.nit,
        tipo_cliente: cliente.tipo_cliente,
        pais: cliente.pais_nombre,
      }
    });
    const exportColumns = this.cols.map(col => ({
      title: col.header,
      dataKey: col.field
    }));

    const doc = new jsPDF('p', 'pt');
    autoTable(doc, {
      columns: exportColumns,
      body: datos,
      didDrawPage: (dataArg) => {
        doc.text('clientes', dataArg.settings.margin.left, datos.length);
      }
    })

    doc.save(`clientes.pdf`);
  }



  exportExcel() {
    const datos = this.clients.map(cliente => {
      return {
        razon_social: cliente.razon_social,
        razon_comercial: cliente.razon_comercial,
        nit: cliente.nit,
        tipo_cliente: cliente.tipo_cliente,
        pais: cliente.pais_nombre,
      }
    });
    import('xlsx').then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(datos);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook,
        {
          bookType: 'xlsx',
          type: 'array'
        });
      this.saveAsExcelFile(excelBuffer, 'clientes');
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }


}
