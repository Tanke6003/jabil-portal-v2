import { Component, Input, OnInit, ElementRef, Renderer2, SimpleChanges, OnChanges, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsExporting from 'highcharts/modules/exporting';

export interface valuesSeries {
  y: number;
  color: string;
}

export class MixedChartConfig {
  series: {
    name: string;
    type: "column" | "line" | "spline" | "scatter" | "area";
    values: number[] | valuesSeries[];
    dashStyle?: "Solid" | "ShortDash" | "ShortDot" | "ShortDashDot" | "ShortDashDotDot" | "Dot" | "Dash" | "LongDash";
    yAxis?: number;
    label?: {
      boxesToAvoid?: number;
      format?: string;
      formatter?: (value: number) => string;
    },
    dataLabels?: {
      enabled: boolean;
      inside: boolean;
      color: string;
      style: {
        textOutline: string;
      }
    }
  }[];
  tooltip?: {
    shared: boolean;
    formatter?: (value: number) => string;
  };
  categories: string[];
  colors?: string[];
  title?: string;
  xAxisTitle?: string;
  yAxis?: YAxis[];

  constructor() {
    this.series = [];
    this.categories = [];
  }
}

export interface YAxis {
  title: {
    text: string;
  };
  labels?: {
    format?: string;
    formatter?: () => string;
  };
  opposite?: boolean;
  min?: number;
  max?: number;
}

@Component({
  selector: 'app-mixed-chart',
  template: `<div [id]="chartId" style='height:100%!important;' class='pb-3' ></div>`,
})
export class MixedChartComponent implements OnInit, OnChanges {
  @Input() chartData!: MixedChartConfig | undefined;
  @Output() EmitterData: EventEmitter<any> = new EventEmitter<any>();
  chartId: string = '';
  chartInstance: Highcharts.Chart | undefined;

  constructor(private el: ElementRef, private renderer: Renderer2, private _translate: TranslateService) {
    this.chartId = Array.from({ length: 5 }, () => String.fromCharCode(Math.floor(Math.random() * 26) + 97)).join('') + '-mixed-chart'
  }

  async ngOnInit() {
    HighchartsMore(Highcharts);
    HighchartsExporting(Highcharts);
    await this.renderChart();
    window.addEventListener('resize', this.onWindowResize.bind(this));
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.onWindowResize.bind(this));
  }

  async renderChart() {
    if (this.chartData != undefined) {
      const chartOptions: Highcharts.Options = {
        chart: {
          type: 'column',
          marginTop: 50,
          renderTo: this.chartId,
          // get the height of the parent element
          height: this.el.nativeElement.parentElement.clientHeight,
        },
        legend: {
          align: 'center',
          verticalAlign: 'top',
          layout: 'horizontal',
          itemStyle: {
            color: '#7d7d7d',
          },
        },
        title: {
          text: this.chartData.title ? this.chartData.title : "\u200B",
        },
        xAxis: {
          categories: this.chartData.categories,
          title: {
            text: this.chartData.xAxisTitle || '',
          },
          labels: {
            formatter: function () {
              return this.value.toString().length > 30 ? this.value.toString().substring(0, 30) + '...' : this.value.toString();
            }
          }

        },
        yAxis: this.chartData.yAxis as Array<Highcharts.YAxisOptions>,
        tooltip: this.chartData.tooltip ? this.chartData.tooltip as Highcharts.Tooltip : {
          shared: true,
        },
        series: this.generateSeries(),
        exporting: {
          enabled: true,
        },
        credits: {
          enabled: false,
        },
        plotOptions: {
          series: {
            point: {
              events: {
                click: (event) => {
                  //console.log(event.point);
                  this.sendEvent(event.point);
                }
              }
            }
          }
        }
      }
      //console.log(chartOptions)
      await this.waitForElementToBeAvailable(this.chartId);
      this.chartInstance = Highcharts.chart(this.chartId, chartOptions);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['chartData'] && !changes['chartData'].firstChange) {
      this.renderChart();
    }
  }

  onWindowResize() {
    if (this.chartInstance) {
      this.chartInstance.setSize(this.el.nativeElement.parentElement.clientWidth, this.el.nativeElement.parentElement.clientHeight, false);
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

  sendEvent(event: any) {
    this.EmitterData.emit(event);
  }

  private generateSeries(): Highcharts.SeriesOptionsType[] {
    const series: Highcharts.SeriesOptionsType[] = [];
    if (this.chartData != undefined) {
      for (let i = 0; i < this.chartData.series.length; i++) {
        const item = this.chartData.series[i];
        const color = this.chartData.colors ? this.chartData.colors[i] : this.getColor(i);
        const seriesItem: Highcharts.SeriesOptionsType = {
          name: this._translate.instant(item.name) ?? '',
          type: item.type,
          data: item.values,
          color: color,
          dashStyle: item.dashStyle,
          dataLabels: item.dataLabels ? item.dataLabels : {
            enabled: item.type === 'column',
            y: -10,
            rotation: -15,
            //inside: false,
            color: '#7d7d7d',
            style: {
              textOutline: 'none',
            }
          },
          label: item.label as Highcharts.SeriesLabelOptionsObject,
          yAxis: item.yAxis
        };

        series.push(seriesItem);
      }
    }
    return series;
  }

  getRandomColor(): string {
    const colors = [
      "#003865",
      "#008651",
      "#002B49",
      "#DC582A",
      "#CB333B",
      "#15BEF0",
    ];
    // Genera un índice aleatorio para seleccionar un color pastel
    const indiceAleatorio = Math.floor(Math.random() * colors.length);
    // Devuelve el color pastel aleatorio
    return colors[indiceAleatorio];
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
