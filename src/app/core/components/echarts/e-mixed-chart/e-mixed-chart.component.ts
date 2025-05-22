import { AfterViewInit, Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
// import * as echarts from 'echarts';

@Component({
  selector: 'app-e-mixed-chart',
  template: `<div [id]="chartId" style="width: 100%; height: 100%; min-height: 300px;" class='pb-3'></div>`,
  styleUrls: ['./e-mixed-chart.component.scss']
})
export class EMixedChartComponent implements AfterViewInit {
  chartId: string = '';
  chartInstance:any
   constructor(private el: ElementRef, private renderer: Renderer2 ) {
      this.chartId = Array.from({ length: 5 }, () => String.fromCharCode(Math.floor(Math.random() * 26) + 97)).join('') + '-e-mixed-chart'
      //console.log(this.chartId)
     
    }
    ngAfterViewInit(): void {
    //   console.log("set")
    // this.chartInstance = echarts.init(document.getElementById(this.chartId));
    // this.chartInstance.setOption({
    //   title: {
    //     text: 'ECharts Getting Started Example'
    //   },
    //   tooltip: {  },
    //   xAxis: {
    //     data: [
    //       "El operador(a) tiene certificación vigente en la máquina o estación de trabajo.",
    //         "Verifica que todo el equipo de protección personal ESD concuerde con las señalizaciones en la estación de trabajo y/o instrucción de trabajo y asegurate que se encuentre en buen estado y se este utilizando. (Ejemplo; bata, taloneras, pulseras, etc.).",
    //         "El operador(a) leyó y comprendio los métodos que requiere la instrucción de trabajo."
    //     ]
    //   },
    //   //yAxis: {},
    //   yAxis: [
    //     {
    //       type: 'value',
    //       name: 'Evaporation',
    //       position: 'left',
    //       alignTicks: true,
    //       //offset: 80,
          
    //       axisLine: {
    //         show: true,
    //         // lineStyle: {
    //         //   color: colors[0]
    //         // }
    //       },
    //       axisLabel: {
    //         formatter: '{value} ml'
    //       }
    //     },
    //     {
    //       type: 'value',
    //       name: 'Precipitation',
    //       position: 'right',
    //       alignTicks: true,
    //      // offset: 80,
    //       axisLine: {
    //         show: true,
    //         // lineStyle: {
    //         //   color: colors[1]
    //         // }
    //       },
    //       axisLabel: {
    //         formatter: '{value} ml'
    //       },
    //       max:100,
    //       min:0
    //     },
    //     // {
    //     //   type: 'value',
    //     //   name: '温度',
    //     //   position: 'left',
    //     //   alignTicks: true,
    //     //   axisLine: {
    //     //     show: true,
    //     //     lineStyle: {
    //     //       color: colors[2]
    //     //     }
    //     //   },
    //     //   axisLabel: {
    //     //     formatter: '{value} °C'
    //     //   }
    //     // }
    //   ],
    //   series: [
    //     // {
    //     //   name: 'sales',
    //     //   type: 'bar',
    //     //   data: [5, 20, 36, 10, 10, 20]
    //     // }
    //     {
    //       "name": "Discrepancias",
    //       "type": "bar",
    //       "data": [
    //           2,
    //           1,
    //           1
    //       ],
    //       // "color": "#003865",
    //       // "dataLabels": {
    //       //     "enabled": true,
    //       //     "inside": false,
    //       //     "color": "#222",
    //       //     "style": {
    //       //         "textOutline": "none"
    //       //     }
    //       // },
    //       // "label": {
    //       //     "format": "{value}%"
    //       // },
    //       //"yAxisIndex": 1
    //   },
    //   {
    //       "name": "Cumulative",
    //       "type": "line",
    //       "data": [
    //           50,
    //           75,
    //           100
    //       ],
    //       // "color": "#008651",
    //       // "dataLabels": {
    //       //     "enabled": true,
    //       //     "inside": false,
    //       //     "color": "#222",
    //       //     "style": {
    //       //         "textOutline": "none"
    //       //     }
    //       // },
    //       // "label": {
    //       //     "format": "{value}%"
    //       // },
    //       "yAxisIndex": 1
    //   }
    //   ],
    //   toolbox: {
    //     show: true,
    //     feature: {
    //       dataZoom: {
    //         yAxisIndex: "none"
    //       },
    //       dataView: {
    //         readOnly: false
    //       },
    //       magicType: {
    //         type: ["line", "bar"]
    //       },
    //       restore: {},
    //       saveAsImage: {}
    //     }
    //   },
    // });
  }
}
