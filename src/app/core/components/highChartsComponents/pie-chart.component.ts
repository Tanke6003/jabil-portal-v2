import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HighchartsExporting from 'highcharts/modules/exporting';
export interface PieChartData {
  data: Data[];
  colors: string[];
  title?: string;
}

export interface Data {
  name: string;
  value: number;
}


@Component({
  selector: 'app-pie-chart',
  template: `<div [id]="chartId" style='height:100%!important;'></div>`,
})
export class PieChartComponent implements OnInit {
  chartId: string;
  @Input() chartData!: PieChartData;
  constructor() {
    this.chartId = Array.from({ length: 5 }, () => String.fromCharCode(Math.floor(Math.random() * 26) + 97)).join('') + '-pie-chart'
  }
  async ngOnInit() {
    HighchartsExporting(Highcharts);
    await this.renderChart();
   
  }
  async renderChart() {
    if(this.chartData!=undefined){
      
    const chartOptions: Highcharts.Options = {
      chart: {
        type: 'pie',
      },
      title: {
        text: this.chartData.title || '',
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          colors: this.chartData.colors,
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
            style: {
              color: 'black',
            },
          },
        },
      },
      series: [
        {
          name: 'Percentage',
          type: 'pie',
          data: this.chartData.data.map((item:Data) => [item.name, item.value]),
        },
      ],
      exporting: {
        enabled: true,
      },
      credits: {
        enabled: false,
      },
    };

      await this.waitForElementToBeAvailable(this.chartId);
      Highcharts.chart(this.chartId, chartOptions);
    }
  }
  private async waitForElementToBeAvailable(elementId: string, intervalMs = 100): Promise<void> {
    return new Promise<void>((resolve) => {
      const intervalId = setInterval(() => {
        const element = document.getElementById(elementId);
        if (element) {
          clearInterval(intervalId);
          resolve();
        }
      }, intervalMs);
    });
  }

  
}
