import { Component } from '@angular/core';
import { PieChartData } from '../highChartsComponents/pie-chart.component';

@Component({
  selector: 'app-down',
  templateUrl: './down.component.html',
  styleUrls: ['./down.component.scss']
})
export class DownComponent {
  pieChart:PieChartData = {} as PieChartData;
  constructor() { 
    this.pieChart = {
      title: 'Pie Chart',
      colors: ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'],
      data: [
        { name: 'A', value: 10 },
        { name: 'B', value: 20 },
        { name: 'C', value: 30 },
        { name: 'D', value: 40 },
        { name: 'E', value: 50 },
        { name: 'F', value: 60 },
        
      ],
    };
  }
}
