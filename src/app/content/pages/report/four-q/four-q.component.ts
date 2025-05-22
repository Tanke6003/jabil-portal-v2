import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { MixedChartConfig } from 'src/app/core/components/highChartsComponents/mixed-chart.component';
import { ActionService } from 'src/app/core/services/action.service';
import { BuildingService } from 'src/app/core/services/application.service';
import { DiscrepanciesReportService } from 'src/app/core/services/discrepancies-report.service';
import { ProjectService } from 'src/app/core/services/project.service';
import { SiteService } from 'src/app/core/services/sites.service';
import { ActionDto } from 'src/app/core/types/config/actions';
import { Building, ChartItem, Project, Site } from 'src/app/core/types/general';

@Component({
  selector: 'app-four-q',
  templateUrl: './four-q.component.html',
  styleUrls: ['./four-q.component.scss']
})
export class FourQComponent implements OnInit {
  sites:Site[] = [];
  selectedSites:number[] = [];
  buildings:Building[] = [];
  selectedBuildings:number[] = [];
  projects:Project[] = [];
  selectedProjects:number[] = [];
  date: Date = new Date(new Date().setDate(new Date().getDate() ));
  graphLastTwelveWeeks: MixedChartConfig = new MixedChartConfig();
  graphParetoDiscrepancies: MixedChartConfig = new MixedChartConfig();
  painter:any[]= [];
  actions:ActionDto[] = [];
  formStep: number = 0;
  selectedActionId: number = 0;
  displayFormAction: boolean = false;
  constructor(
    private _buildingService: BuildingService,
    private _siteService: SiteService,
    private _messageService:MessageService,
    private _projectService:ProjectService,
    private _discrepanciesReportService:DiscrepanciesReportService,
    private _actionService:ActionService
  ) { }

  async ngOnInit() {
    await this.getSites();
    this.selectedSites = this.sites.map(x=>x.id);
    await this.getBuildings(this.selectedSites);
    this.selectedBuildings = this.buildings.map(x=>x.id);
    await this.getProjects(this.selectedBuildings);
    this.selectedProjects = this.projects.map(x=>x.id);
    await this.loadReport();

  }

  async getSites(){ 
    return new Promise((resolve,reject)=>{
      this._siteService.GetSites(1).subscribe((data)=>{
        this.sites = data;
        resolve(true);
      },(error)=>{
        this._messageService.add({severity:'error',summary:'Error',detail:'An error has occurred while getting sites', key:'tr'});
        reject(error);
      });
    });
  }
  async getBuildings(siteIds:number[]){
    return new Promise((resolve,reject)=>{
      this._buildingService.GetBuildingsBySiteIds(siteIds.join(",")).subscribe((data)=>{
        this.buildings = data;
        resolve(true);
      },(error)=>{
        this._messageService.add({severity:'error',summary:'Error',detail:'An error has occurred while getting buildings', key:'tr'});
        reject(error);
      });
    });
  }
  async getProjects(buildingIds:number[]){
    return new Promise((resolve,reject)=>{
      this._projectService.getProjectsByBuildingIds(buildingIds.join(",")).subscribe({
        next: (data)=>{
          this.projects = data;
          resolve(true);
        },
        error: (error)=>{
          this._messageService.add({severity:'error',summary:'Error',detail:'An error has occurred while getting projects', key:'tr'});
          reject(error);
        }
      });
    });
  }
  async getLastTwelveWeeks(){
      this.graphLastTwelveWeeks = new MixedChartConfig();
      this._discrepanciesReportService.getLastTwelveWeeks(this.selectedProjects.join(","),this.date.toISOString().substring(0, 10)).subscribe({
        next: async (data)=>{
          await this.drawChartTwelveWeeks(data);
        },
        error: (error)=>{
          this._messageService.add({severity:'error',summary:'Error',detail:'An error has occurred while getting the last twelve weeks', key:'tr'});
        }
      });
  }
  async drawChartTwelveWeeks(data:ChartItem[]){
    this.graphLastTwelveWeeks = {
      series:
        [
          {
            name: "Discrepancies",
            type: "column",
            values: data.map((x: any) => x.value),
            yAxis: 0,
            label: {
              //boxesToAvoid: 4,
              format: "{value}"
            },
            dataLabels: {

              enabled: true,
              inside: false,
              color: "#222",
              style: {
                textOutline: "none"
              }
            }
          }
        ],
      categories: data.map((x: any) => x.column),
      yAxis: [{
        title: {
          text: ""
        },
        max: Math.ceil(Math.max(...data.map((x: any) => x?.value ?? 0)) * 1.1) > 0 ? Math.ceil(Math.max(...data.map((x: any) => x?.value ?? 0)) * 1.1) : 10,
        min: Math.ceil(Math.min(...data.map((x: any) => x?.value ?? 0))) != 0 ? Math.ceil(Math.min(...data.map((x: any) => x?.value ?? 0)) * 0.6) : 0
      }],
      colors: [
        // "#FFED59",
        "#003865",
        "#15BEF0"]
    }
  }
  async getParetoDiscrepancies(){
    this.graphParetoDiscrepancies = new MixedChartConfig();
    this._discrepanciesReportService.getParetoDiscrepancies(this.selectedProjects.join(","),this.date.toISOString().substring(0, 10)).subscribe({
      next: async (data)=>{
        await this.drawChartParetoDiscrepancies(data);
      },
      error: (error)=>{
        this._messageService.add({severity:'error',summary:'Error',detail:'An error has occurred while getting the Pareto discrepancies', key:'tr'});
      }
    });
  }
  async drawChartParetoDiscrepancies(data:ChartItem[]){
    this.graphParetoDiscrepancies = {
      series:
        [
          {
            name: "Discrepancies",
            type: "column",
            values: data.map((x: any) => x.value),
            yAxis: 0,
            label: {
              //boxesToAvoid: 4,
              format: "{value} %"
            },
            dataLabels: {

              enabled: true,
              inside: false,
              color: "#222",
              style: {
                textOutline: "none"
              }
            }
          },
          {
            name: "Cumulative",
            type: "line",
            values: data.map((x: any) => x.secondValue),
            yAxis: 1,
            label: {
              //boxesToAvoid: 4,
              format: "{value} %"
            },
            dataLabels: {

              enabled: true,
              inside: false,
              color: "#222",
              style: {
                textOutline: "none"
              }
            }
          }
        ],
      categories: data.map((x: any) => x.column),
      yAxis: [{
        title: {
          text: ""
        },
        max: Math.ceil(Math.max(...data.map((x: any) => x?.value ?? 0)) * 1.2),
        min: 0//Math.ceil(Math.min(...data.map((x: any) => x?.value ?? 0))) != 0 ? Math.ceil(Math.min(...data.map((x: any) => x?.value ?? 0)) * 0.6) : 0
      },{
        title: {
          text: ""
        },
        labels: {
          format: "{value} %"
        },
        max: 100,
        min: 0,
        opposite: true
      }],
      colors: [
        // "#FFED59",
        "#003865",
        "#15BEF0"]
    }
    //console.log(this.graphParetoDiscrepancies)
  }
  async getPainterDiscrepancies(){
    this.painter = [];
    this._discrepanciesReportService.getPainterDiscrepancies(this.selectedProjects.join(","),this.date.toISOString().substring(0, 10)).subscribe({
      next: async (data)=>{
        this.painter = data;
      },
      error: (error)=>{
        this._messageService.add({severity:'error',summary:'Error',detail:'An error has occurred while getting the painter discrepancies', key:'tr'});
      }
    });
  }
  async loadReport(){
    await this.getLastTwelveWeeks();
    await this.getParetoDiscrepancies();
    await this.getPainterDiscrepancies();
    await this.getActions();
  }
  async onSiteChange(){

      await this.getBuildings(this.selectedSites);
      this.selectedBuildings = this.getNewSelectedBuildings();
      await this.onBuildingChange();
  }
  getNewSelectedBuildings(){
    return this.selectedBuildings.filter(id => 
      this.buildings.some(building => building.id === id)
    );
    
  }
  async onBuildingChange(){
    await this.getProjects(this.selectedBuildings);
    this.selectedProjects = this.getNewSelectedProjects();
  }
  getNewSelectedProjects(){
    return this.selectedProjects.filter(id => 
      this.projects.some(project => project.id === id)
    );
  }
  async onProjectChange(){ 
    await this.loadReport();
  }
  async onDateChange(){
    await this.loadReport();
  }

  getColorBadgeActions(action: ActionDto, actionType: number) {
    let actionsArryas = (action.actionTasks ?? []).filter(x => x.typeID === actionType).slice();
    // Verificar si hay actionTasks

    if ((actionsArryas ?? []).length > 0) {

      // Verificar si hay actionTasks no completadas o canceladas
      if ((actionsArryas ?? []).filter(x => x.statusID != 2).length > 0) {

        // Verificar si alguna actionTask tiene una fecha de vencimiento anterior a hoy
        if ((actionsArryas ?? []).filter(x => ((x.statusID != 2 && new Date(x.dueDate) < new Date()) || x.statusID == 3)).length > 0) {
          return "badge-danger"; // Alguna tarea tiene fecha vencida
        }
        else {
          return "badge-warning"; // Todas las tareas están pendientes o en progreso
        }
      }
      else {
        return "badge-success"; // Todas las tareas están completadas o canceladas
      }
    }
    else {
      return "badge-warning"; // No hay actionTasks
    }

  }
  getNumberBadgeActions(action: ActionDto, actionType: number) {
    return (action.actionTasks ?? []).filter(x => x.typeID === actionType).slice().length;
  }
  editAction(actionId: number) {
    this.formStep = 3;
    this.selectedActionId = actionId;
    this.displayFormAction = true;

  }
  getProjectName(id: number) {
    return this.projects.find((x) => x.id == id)?.name;
  }
  addAction() {
    this.formStep = 0;
    this.selectedActionId = 0;
    this.displayFormAction = true;

  }
  getActions() {
    return new Promise<void>((resolve, reject) => {
      this.actions = [];
      if (this.selectedProjects.length !== 0) {
        this._actionService.GetActions(this.selectedProjects.join(',')).subscribe({
          next: (res) => {
            this.actions = res;
            
            resolve();
          },
          error: (err) => {
            console.error(err);
            reject();
          }
        })
      }
    });

  }
}
