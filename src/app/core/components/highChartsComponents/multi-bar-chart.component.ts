import { Component, Input, OnInit, ElementRef, Renderer2 } from '@angular/core';
import * as Highcharts from 'highcharts';
import HighchartsExporting from 'highcharts/modules/exporting';

export interface SerieData {
  name: string;
  values: number[];
}
export interface MultiBarChartData {
  series: SerieData[];
  categories: string[];
  colors: string[];
  orientation: "vertical" | "horizontal";
  stacked: boolean;
  title?: string;
  xAxisTitle?: string;
  yAxisTitle?: string;
}
@Component({
  selector: 'app-multi-bar-chart',
  template: `<div id="multiBarChartContainer"></div>`,
})
export class MultiBarChartComponent implements OnInit {
  @Input() chartData!: MultiBarChartData;

  ngOnInit() {
    HighchartsExporting(Highcharts);
    const chartType = this.chartData.orientation === 'vertical' ? 'column' : 'bar';
    const chartOptions: Highcharts.Options = {
      chart: {
        type: chartType,
      },
      title: {
        text: this.chartData.title || '',
      },
      xAxis: {
        categories: this.chartData.categories,
        title: {
          text: this.chartData.xAxisTitle || '',
        },
      },
      yAxis: {
        title: {
          text: this.chartData.yAxisTitle || '',
        },
      },
      tooltip: {
        shared: true,
      },
      plotOptions: {
        column: {
          stacking: this.chartData.stacked ? 'normal' : undefined,
        },
      },
      series: this.generateSeries(),
      exporting: {
        enabled: true,
      },
      credits: {
        enabled: false,
      },
    };

    Highcharts.chart('multiBarChartContainer', chartOptions);
  }

  private generateSeries(): Highcharts.SeriesOptionsType[] {
    const series: Highcharts.SeriesOptionsType[] = [];

    for (let i = 0; i < this.chartData.series.length; i++) {
      const item = this.chartData.series[i];
      const color = this.chartData.colors[i];

      const seriesItem: Highcharts.SeriesOptionsType = {
        name: item.name,
        type: 'column',
        data: item.values,
        color: color,
      };

      series.push(seriesItem);
    }

    return series;
  }

  getColor(i:number):string{
    const colors = [
      "#003865",
      "#008651",
      "#DC582A",
      "#CB333B",
      "#002B49",
      "#15BEF0",
    ];
    if(i<0||i>colors.length-1)
      return "#CCCCCC";
    return colors[i];
  }
}
