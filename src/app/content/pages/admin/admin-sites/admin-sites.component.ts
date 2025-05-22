import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { SiteService } from 'src/app/core/services/sites.service';
import { Site } from 'src/app/core/types/general';

@Component({
  selector: 'app-admin-sites',
  templateUrl: './admin-sites.component.html',
  styleUrls: ['./admin-sites.component.scss']
})
export class AdminSitesComponent implements OnInit {
  isLoad: boolean = false;
  sites: Site[] = [];
  selectedSite: Site = {} as Site;
  openDialogSite: boolean = false;
  @ViewChild('dt1') table!: Table;
  @ViewChild('inputSearch') inputSearch!: any;
  constructor(
    private _siteService: SiteService,
    private _messageService: MessageService
  ) { }

  async ngOnInit() {
    await this.getSites();
    this.isLoad = true;
  }
  async getSites(){
    return new Promise((resolve, reject) => {
      this._siteService.GetSites().subscribe(
        {
          next: (data) => {
            this.sites = data;
            resolve(data);
          },
          error: (error) => {
            console.error(error);
            this._messageService.add({severity:'error', summary:'Error', detail:'Error al obtener los sitios',key:'tr'});
            reject(error);
          }
        }
      )
    })
  }
  addSite() {
    this.selectedSite = {} as Site;
    this.selectedSite.id = 0;
    this.selectedSite.available = true; 
    this.openDialogSite = true;
  }

  applyFilter(event: any, stringVal:any) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.table.filterGlobal(filterValue, stringVal);
  }
  editSite(siteId: number) {
    this.selectedSite = this.sites.find(x => x.id == siteId) ?? {} as Site;
    this.openDialogSite = true;

  }
  onCancelSite(){
    this.selectedSite = {} as Site;
    this.openDialogSite = false;
  }
  validateSite(){
    if(this.selectedSite.name == "" || this.selectedSite.name == undefined){
      this._messageService.add({severity:'error', summary:'Error', detail:'El nombre del sitio es requerido',key:'tr'});
      return false;

    }
    return true;
  }
  onSaveSite(){
    if(!this.validateSite()){
      return;
    }
    this._siteService.AddOrUpdateSite(this.selectedSite).subscribe(
      {
        next: (data) => {
          this.getSites();
          this.openDialogSite = false;
          this._messageService.add({severity:'success', summary:'Success', detail:'Sitio guardado',key:'tr'});
        },
        error: (error) => {
          console.error(error);
          this._messageService.add({severity:'error', summary:'Error', detail:'Error al guardar el sitio',key:'tr'});
        }
      }
    )
 
  }
}
