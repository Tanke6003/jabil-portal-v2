import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { exportToCsv } from 'src/app/core/functions/exportToCsv';
import { BuildingService } from 'src/app/core/services/application.service';
import { DiscrepancyService } from 'src/app/core/services/discrepancy.service';
import { LoadConfigService } from 'src/app/core/services/load-config.service';
import { ProjectService } from 'src/app/core/services/project.service';
import { SiteService } from 'src/app/core/services/sites.service';
import { Site, Building, Project, DiscrepancyReportDto } from 'src/app/core/types/general';

@Component({
  selector: 'app-discrepancie-report',
  templateUrl: './discrepancie-report.component.html',
  styleUrls: ['./discrepancie-report.component.scss']
})
export class DiscrepancieReportComponent {
  loading:boolean = false;
showFilters: boolean = true;
  sites: Site[] = [];
  selectedsSites: number[] = [];
  buildings: Building[] = [];
  selectedsBuildings: number[] = [];
  projects: Project[] = [];
  selectedsProjects: number[] = [];
  beginDate: string = new Date(new Date().setDate(new Date().getDate() - 3)).toISOString().slice(0, 10);
  endDate: string = new Date().toISOString().slice(0, 10);
  discrepancies:DiscrepancyReportDto[]=[]
  filters = {
    discrepancyDate: '',
    projectName: '',
    departmentName: '',
    shift: '',
    stationName: '',
    m: '',
    discrepancyName: '',
    reasonName: '',
    createdDate: '',
    createdUser: ''
  } as any;

  filteredDiscrepancies = [...this.discrepancies];

 constructor(
    private _siteService: SiteService,
    private _buildingService: BuildingService,
    private _projectService: ProjectService,
    private _messageService: MessageService,
    private _loadConfigService: LoadConfigService,
    private _discrepancyService:DiscrepancyService

  ) { }
  applyFilter() {
    this.filteredDiscrepancies = this.discrepancies.filter((discre: DiscrepancyReportDto) =>
      Object.keys(this.filters).every((key: string) =>
        this.filters[key]
          ? discre[key as keyof DiscrepancyReportDto]
            .toString()
            .toLowerCase()
            .includes(this.filters[key].toLowerCase())
          : true
      )
    );
  }
  async ngOnInit() {
    await this.getSites();
    this.selectedsSites = this.sites.map(x => x.id);
    await this.getBuildings();
    this.selectedsBuildings = this.buildings.map(x => x.id);
    await this.getProjects();
    this.selectedsProjects = this.projects.map(x => x.id);
    await this.getReport();
  }

  async getSites() {
    return new Promise((resolve, reject) => {
      this._siteService.GetSites(1).subscribe({
        next: (data) => {
          this.sites = data;
          resolve(data);
        },
        error: (error) => {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al cargar los sitios', key: 'tr' });
          reject(error);
        }
      })
    });
  }
  async getBuildings() {
    return new Promise((resolve, reject) => {
      this._buildingService.GetBuildingsBySiteIds(this.selectedsSites.join(',')).subscribe({
        next: (data) => {
          this.buildings = data;
          resolve(data);
        },
        error: (error) => {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al cargar los edificios', key: 'tr' });
          reject(error);
        }
      })
    });
  }
  async getProjects() {
    return new Promise((resolve, reject) => {
      this._projectService.getProjectsByBuildingIds(this.selectedsBuildings.join(',')).subscribe({
        next: (data) => {
          this.projects = data;
          resolve(data);
        },
        error: (error) => {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al cargar los proyectos', key: 'tr' });
          reject(error);
        }
      })
    });
  }
  async onChangesSites() {
    await this.getBuildings();
    this.selectedsBuildings = this.selectedsBuildings.filter(id => this.buildings.some(x => x.id == id));
    await this.getProjects();
    this.selectedsProjects = this.selectedsProjects.filter(id => this.projects.some(x => x.id == id));
    //await this.search();
  }
  async onChangesBuildings() {
    await this.getProjects();
    this.selectedsProjects = this.selectedsProjects.filter(id => this.projects.some(x => x.id == id));
    //await this.search();
  }
  async getReport(){
    return new Promise<void>((resolve,reject)=>{
      this._discrepancyService.GetDiscrepanciesReport(this.selectedsProjects.join(','),this.beginDate,this.endDate).subscribe({
        next:(res)=>{
          this.discrepancies = res;
          //console.log(res)
          resolve();
        },
        error:(err)=>{
          console.error(err)
          this._messageService.add({
            key:"tr",
            severity:'danger',
            summary:'No se pudo obtener el reporte'
          })
          reject()
        }
      })
    })
  }
  search(){
    this.getReport()
  }
  export(){
    exportToCsv(this.discrepancies,null,"discrepancies")
  }
}

