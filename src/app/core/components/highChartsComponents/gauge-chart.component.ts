import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsMore from 'highcharts/highcharts-more';
import { YAxisPlotBandsOptions } from 'highcharts';
export interface gaugeChartData {
  minValue: number;
  maxValue: number;
  value: number;
  title?: string;
  colorRanges: { from: number; to: number; color: string }[];
}
@Component({
  selector: 'app-gauge-chart',
  template: `<div id="gaugeChartContainer"></div>`,
})
export class GaugeChartComponent implements OnInit {
  @Input() chartData: gaugeChartData = {
    minValue: 0,
    maxValue: 100,
    value: 0,
    colorRanges: [],
  };

  ngOnInit() {
    HighchartsExporting(Highcharts);
    HighchartsMore(Highcharts);

    const chartOptions: Highcharts.Options = {
      chart: {
        type: 'gauge',
      },
      title: {
        text: this.chartData.title || '',
      },
      pane: {
        startAngle: -150,
        endAngle: 150,
        background: [
          {
            backgroundColor: {
              linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
              stops: [
                [0, '#FFF'],
                [1, '#333'],
              ],
            },
            borderWidth: 0,
            outerRadius: '109%',
          },
          {
            backgroundColor: {
              linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
              stops: [
                [0, '#333'],
                [1, '#FFF'],
              ],
            },
            borderWidth: 1,
            outerRadius: '107%',
          },
          {
            // default background
          },
          {
            backgroundColor: '#DDD',
            borderWidth: 0,
            outerRadius: '105%',
            innerRadius: '103%',
          },
        ],
      },
      yAxis: {
        min: this.chartData.minValue,
        max: this.chartData.maxValue,
        minorTickInterval: 'auto',
        minorTickWidth: 1,
        minorTickLength: 10,
        minorTickPosition: 'inside',
        minorTickColor: '#666',
        tickPixelInterval: 30,
        tickWidth: 2,
        tickPosition: 'inside',
        tickLength: 10,
        tickColor: '#666',
        labels: {
          step: 2,
          rotation: 0,
        },
        title: {
          text: '',
        },
        plotBands: this.generatePlotBands(),
      },
      series: [
        {
          name: 'Value',
          type: 'gauge',
          data: [this.chartData.value],
          tooltip: {
            valueSuffix: '',
          },
        },
      ],
      credits: {
        enabled: false,
      }
    };

    Highcharts.chart('gaugeChartContainer', chartOptions);
  }

  private generatePlotBands(): YAxisPlotBandsOptions[] {
    const plotBands: YAxisPlotBandsOptions[] = [];

    for (const range of this.chartData.colorRanges) {
      const plotBand: YAxisPlotBandsOptions = {
        from: range.from,
        to: range.to,
        color: range.color,
      };

      plotBands.push(plotBand);
    }

    return plotBands;
  }
}
