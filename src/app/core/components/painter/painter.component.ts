import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-painter',
  templateUrl: './painter.component.html',
  styleUrls: ['./painter.component.scss']
})
export class PainterComponent implements OnInit  {
  @Input() data: { [key: string]: any }[] = [];
  @Input() colProperty: string = 'Week';
  @Input() colOrderProperty: string = 'PK';
  @Input() rowProperty: string = '';
  @Input() valueProperty: string = 'value';
  @Input() classProperty: string = 'Style';
  @Input() col_pos: string = '';
  @Input() col_pre: string = '';
  @Input() row_pre: string = '';
  @Input() row_pos: string = '';

  isready: boolean = false;
  cols: string[] = [];
  rows: string[] = [];
  table: string = "";

  constructor(private translate:TranslateService) { }

  ngOnInit(): void {
    this.updateColumnsAndSubAreas();
  }

  ngOnChanges(): void {
    this.updateColumnsAndSubAreas();
  }

  private updateColumnsAndSubAreas(): void {

    const rows = Array.from(new Set(this.data.map(x=>x[this.rowProperty])))
    const cols = Array.from(new Set(this.data.map(x => x[this.colProperty])))
    .sort((a, b) => {
      // Obtener los valores de colOrderProperty para a y b
      const aValue = this.data.find(item => item[this.colProperty] === a)?.[this.colOrderProperty] ?? 0;
      const bValue = this.data.find(item => item[this.colProperty] === b)?.[this.colOrderProperty] ?? 0;
      
      // Comparar los valores de colOrderProperty y ordenar en consecuencia
      if (aValue < bValue) {
        return -1;
      }
      if (aValue > bValue) {
        return 1;
      }
      return 0;
    });
    let table = "<table class='table jbl-table jbl-table-painter  freeze-header'>"
    table += '<tr class="position:sticky;top:0;">'
    table += '<th style="max-width:10rem!important"></th>'
    cols.forEach((col:string)=>{
      table += `<th>${this.col_pre!=""?this.translate.instant(this.col_pre):this.col_pre} ${col}${this.col_pos}</th>`
    })
    table += "</tr>"
    rows.forEach((row:string)=>{
      table += "<tr>"
      table += `<th class="row-header">${row}</th>`
      cols.forEach((col:string)=>{
        const cell = this.data.find(x=>x[this.rowProperty] == row && x[this.colProperty] == col)??{}
        if(cell[this.valueProperty] == null){
          cell[this.valueProperty] = "N/A"
        }
        table += `<td class='${cell[this.classProperty]}'>${cell[this.valueProperty]} ${this.row_pos}</td>`
      })
      table += "</tr>"
    })
    table += "</table>"
    this.table = table
  }

}
